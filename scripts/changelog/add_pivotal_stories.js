const fs = require("fs-extra");
const Pivotal = require("pivotaljs");
const pivotal = new Pivotal();

const jiraTicketBaseUrl = "https://pagopa.atlassian.net/browse/";

/**
 * Skip the use of API to find the story url if the url is already retrieved (contains pivotaltracker.com)
 * or the id length is < 9 (not a pivotal id)
 * @param id
 * @param url
 * @return {*|boolean}
 */
function skipStoryCheck(id, url) {
  return url.includes("pivotaltracker.com") || id.length < 9;
}

async function replacePivotalUrl(match, storyId, url) {
  const sameUrl = `[${storyId}](${url})`;
  try {
    // avoid to use the api if story is already linked to pivotal
    if (skipStoryCheck(storyId, url)) {
      return sameUrl;
    }
    // try to get the story with the specified id
    const story = await getStory(storyId.substr(1));

    // if the story doesn't exists (eg: story deleted) remove the markdown link
    return story.url !== undefined
      ? `[${storyId}](${story.url})`
      : `${storyId}`;
  } catch (err) {
    return sameUrl;
  }
}

async function addJiraUrl(match, ticketKey) {
  return `[[${ticketKey}](${new URL(
    ticketKey,
    jiraTicketBaseUrl
  ).toString()})]`;
}

async function replaceJiraStories(content) {
  // capture [JIRAID-123], avoid already linked ticket with pattern [JIRAID-123](http://jiraurl)
  // const jiraTagRegex = /\[([a-zA-Z0-9]+-\d+)\](?!\()/g;
  const jiraTagRegex = /\[(([a-zA-Z0-9]+-\d+),*)+\](?!\()/g;
  return await replaceAsync(content, jiraTagRegex, addJiraUrl);
}

async function replacePivotalStories() {
  // read changelog
  const content = fs.readFileSync("CHANGELOG.md").toString("utf8");
  // identify the pattern [#XXXXX](url) for markdown link
  const pivotalTagRegex = /\[(#\d+)\]\(([a-zA-z:\/\.\d-@:%._\+~#=]+)\)/g;

  // check for all the matches if is a pivotal story and update the url
  const updatedChangelog = await replaceAsync(
    content,
    pivotalTagRegex,
    replacePivotalUrl
  );

  const updatedJiraChangelog = await replaceJiraStories(updatedChangelog);

  // write the new modified changelog
  fs.writeFileSync("CHANGELOG.md", updatedJiraChangelog);
}

/**
 * A custom method created to allows the replace in a string using an async function
 * @param str
 * @param regex
 * @param asyncFn
 * @return {Promise<*>}
 */
async function replaceAsync(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

/**
 * Wrap the getStory callback with a promise
 * @param storyId
 * @return {Promise<Pivotal.Story>}
 */
getStory = storyId =>
  new Promise((resolve, reject) => {
    pivotal.getStory(storyId, (err, story) => {
      if (err) {
        return reject(err);
      }
      resolve(story);
    });
  });

// Execute the script to find the pivotal stories id in order to associate the right url in the changelog
replacePivotalStories()
  .then(() => console.log("done"))
  .catch(ex => console.log(ex));
