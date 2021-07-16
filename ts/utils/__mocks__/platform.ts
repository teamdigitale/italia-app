// const platform = jest.createMockFromModule("./platform");

// eslint-disable-next-line functional/no-let
let isIos = true;
// eslint-disable-next-line functional/no-let
let isAndroid = true;

// eslint-disable-next-line no-underscore-dangle
function test_setPlatform(p: "ios" | "android") {
  isIos = p === "ios";
  isAndroid = p === "android";
}

export { isIos, isAndroid, test_setPlatform };
