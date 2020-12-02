/* eslint-disable functional/immutable-data */
import {
  compareAsc,
  differenceInMonths,
  endOfMonth,
  endOfYesterday,
  startOfDay,
  startOfMonth,
  startOfToday,
  subMonths
} from "date-fns";
import { index as fpIndex } from "fp-ts/lib/Array";
import { fromNullable, isNone, none, Option, some } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { Tuple2 } from "italia-ts-commons/lib/tuples";
import { View } from "native-base";
import React from "react";
import { SectionListScrollParams, StyleSheet } from "react-native";
import I18n from "../../i18n";
import {
  lexicallyOrderedMessagesStateSelector,
  MessagesStateAndStatus
} from "../../store/reducers/entities/messages";
import { MessageState } from "../../store/reducers/entities/messages/messagesById";
import { isCreatedMessageWithContentAndDueDate } from "../../types/CreatedMessageWithContentAndDueDate";
import { ComponentProps } from "../../types/react";
import { DateFromISOString } from "../../utils/dates";
import {
  InjectedWithItemsSelectionProps,
  withItemsSelection
} from "../helpers/withItemsSelection";
import { ListSelectionBar } from "../ListSelectionBar";
import MessageAgenda, {
  isFakeItem,
  MessageAgendaItem,
  MessageAgendaSection,
  Sections
} from "./MessageAgenda";

// How many past months to load in batch
const PAST_DATA_MONTHS = 3;

const styles = StyleSheet.create({
  listWrapper: {
    flex: 1
  },
  listContainer: {
    flex: 1
  }
});

type OwnProps = {
  currentTab: number;
  messagesState: ReturnType<typeof lexicallyOrderedMessagesStateSelector>;
  navigateToMessageDetail: (id: string) => void;
  setMessagesArchivedState: (
    ids: ReadonlyArray<string>,
    archived: boolean
  ) => void;
};

type Props = Pick<
  ComponentProps<typeof MessageAgenda>,
  "servicesById" | "paymentsByRptId" | "animated"
> &
  OwnProps &
  InjectedWithItemsSelectionProps;

type State = {
  isWorking: boolean;
  sections: Sections;
  // Here we save the sections to render.
  // We only want to render sections starting from a specific time limit.
  sectionsToRender: Sections;
  maybeLastLoadedStartOfMonthTime: Option<number>;
  lastMessagesState?: pot.Pot<ReadonlyArray<MessageState>, string>;
  allMessageIdsState: Set<string>;
  isContinuosScrollEnabled: boolean;
  lastDeadlineId: Option<string>;
  nextDeadlineId: Option<string>;
};

/**
 * Get the last deadline id (the oldest in time is the first in array position)
 */
export const getLastDeadlineId = (sections: Sections): Option<string> =>
  fromNullable(sections)
    .chain(s => fpIndex(0, s))
    .chain(d => fpIndex(0, [...d.data]))
    .fold(none, item => {
      if (!isFakeItem(item)) {
        return some(item.e1.id);
      }
      return none;
    });

/**
 * Get the next deadline id
 */
export const getNextDeadlineId = (sections: Sections): Option<string> => {
  const now = startOfDay(new Date()).getTime();
  return sections
    .reduce<Option<MessageAgendaItem>>((acc, curr) => {
      const item = curr.data[0];
      // if item is fake, return the accumulator
      if (isFakeItem(item)) {
        return acc;
      }
      const newDate = new Date(item.e1.content.due_date).getTime();
      const diff = newDate - now;
      // if the acc is none, we don't need to make comparison with previous value
      if (isNone(acc)) {
        // just check the newDate is about future
        return diff >= 0 ? some(item) : none;
      }
      const lastDate = acc.value.e1.content.due_date.getTime();
      // if the new date is about future and is less than in accomulator
      if (diff >= 0 && diff < now - lastDate) {
        return some(item);
      }
      return acc;
    }, none)
    .map(item => item.e1.id);
};

/**
 * Filter only the messages with a due date and group them by due_date day.
 */
const generateSections = (
  potMessagesState: pot.Pot<ReadonlyArray<MessagesStateAndStatus>, string>
): Sections =>
  pot.getOrElse(
    pot.map(
      potMessagesState,
      _ =>
        // eslint-disable-next-line
        _.reduce<MessageAgendaItem[]>((accumulator, messageState) => {
          const { message, isArchived, isRead } = messageState;
          if (
            !isArchived &&
            pot.isSome(message) &&
            isCreatedMessageWithContentAndDueDate(message.value)
          ) {
            accumulator.push(
              Tuple2(message.value, {
                isRead
              })
            );
          }

          return accumulator;
        }, [])
          // Sort by due_date
          .sort((messageAgendaItem1, messageAgendaItem2) =>
            compareAsc(
              messageAgendaItem1.e1.content.due_date,
              messageAgendaItem2.e1.content.due_date
            )
          )
          // Now we have an array of messages sorted by due_date.
          // To create groups (by due_date day) we can just iterate the array and
          // -  if the current message due_date day is different from the one of
          //    the prevMessage create a new section
          // -  if the current message due_date day is equal to the one of prevMessage
          //    add the message to the last section
          .reduce<{
            lastTitle: Option<string>;
            // eslint-disable-next-line
            sections: MessageAgendaSection[];
          }>(
            (accumulator, messageAgendaItem) => {
              // As title of the section we use the ISOString rapresentation
              // of the due_date day.
              const title = startOfDay(
                messageAgendaItem.e1.content.due_date
              ).toISOString();
              if (
                accumulator.lastTitle.isNone() ||
                title !== accumulator.lastTitle.value
              ) {
                // We need to create a new section
                const newSection = {
                  title,
                  data: [messageAgendaItem]
                };
                return {
                  lastTitle: some(title),
                  sections: [...accumulator.sections, newSection]
                };
              } else {
                // We need to add the message to the last section.
                // We are sure that pop will return at least one element because
                // of the previous `if` step.
                const prevSection = accumulator.sections.pop() as MessageAgendaSection;
                const newSection = {
                  title,
                  data: [...prevSection.data, messageAgendaItem]
                };
                return {
                  lastTitle: some(title),
                  // We used pop so we need to re-add the section.
                  sections: [...accumulator.sections, newSection]
                };
              }
            },
            {
              lastTitle: none,
              sections: []
            }
          ).sections
    ),
    []
  );

/**
 * Return all the section with a date between the from and to time limit.
 */
const filterSectionsWithTimeLimit = (
  sections: Sections,
  fromTimeLimit: number,
  toTimeLimit: number
): Sections => {
  const filteredSections: Sections = [];

  for (const section of sections) {
    const decodedValue = DateFromISOString.decode(section.title);
    const sectionTime = decodedValue.isRight()
      ? decodedValue.value.getTime()
      : section.title;
    if (sectionTime > toTimeLimit) {
      break;
    }

    if (sectionTime >= fromTimeLimit && sectionTime <= toTimeLimit) {
      filteredSections.push(section);
    }
  }

  return filteredSections;
};

const selectFutureData = (sections: Sections): Sections => {
  const startOfTodayTime = startOfToday().getTime();

  const initialIndex = sections.findIndex(
    section => new Date(section.title).getTime() >= startOfTodayTime
  );

  return initialIndex < 0 ? [] : sections.slice(initialIndex);
};

const selectCurrentMonthRemainingData = (sections: Sections): Sections => {
  const startOfCurrentMonthTime = startOfMonth(new Date()).getTime();
  const endOfYesterdayTime = endOfYesterday().getTime();

  return filterSectionsWithTimeLimit(
    sections,
    startOfCurrentMonthTime,
    endOfYesterdayTime
  );
};

const selectPastMonthsData = (
  sections: Sections,
  howManyMonthsBack: number,
  initialStartOfMonthTime: number = startOfMonth(new Date()).getTime()
): Sections => {
  const newSections: Sections = [];

  new Array(howManyMonthsBack).fill(0).forEach((_, index) => {
    const selectedMonth = subMonths(
      initialStartOfMonthTime,
      howManyMonthsBack - index
    );

    const startOfSelectedMonthTime = startOfMonth(selectedMonth).getTime();
    const endOfSelectedMonthTime = endOfMonth(selectedMonth).getTime();

    const monthSections = filterSectionsWithTimeLimit(
      sections,
      startOfSelectedMonthTime,
      endOfSelectedMonthTime
    );

    // If we have no sections for this month create an ad-hoc empty section
    if (monthSections.length === 0) {
      const emptySection: MessageAgendaSection = {
        title: startOfSelectedMonthTime,
        fake: true,
        data: [{ fake: true }]
      };
      monthSections.push(emptySection);
    }

    newSections.push(...monthSections);
  });

  return newSections;
};

// return true if the last section is loaded
const isLastSectionLoaded = (
  lastDeadlineId: Option<string>,
  sections: Sections
): boolean =>
  lastDeadlineId.fold(false, lastId =>
    sections
      .map(s => s.data)
      .some(items =>
        items.some(item => !isFakeItem(item) && item.e1.id === lastId)
      )
  );

const selectInitialSectionsToRender = (
  sections: Sections,
  maybeLastLoadedStartOfMonthTime: Option<number>
): Sections => {
  const sectionsToRender: Sections = [];

  if (maybeLastLoadedStartOfMonthTime.isSome()) {
    // Select past months data
    const lastLoadedStartOfMonthTime = maybeLastLoadedStartOfMonthTime.value;
    const startOfCurrentMonthTime = startOfMonth(new Date()).getTime();
    const howManyMonthsBack = differenceInMonths(
      startOfCurrentMonthTime,
      lastLoadedStartOfMonthTime
    );
    sectionsToRender.push(...selectPastMonthsData(sections, howManyMonthsBack));

    // Select current month remaining data
    sectionsToRender.push(...selectCurrentMonthRemainingData(sections));
  }

  // Select future data (calendar events from today)
  sectionsToRender.push(...selectFutureData(sections));

  return sectionsToRender;
};

const selectMoreSectionsToRenderAsync = async (
  sections: Sections,
  maybeLastLoadedStartOfMonthTime: Option<number>
): Promise<Sections> =>
  new Promise(resolve => {
    const moreSectionsToRender: Sections = [];

    moreSectionsToRender.push(
      ...selectPastMonthsData(
        sections,
        PAST_DATA_MONTHS,
        maybeLastLoadedStartOfMonthTime.toUndefined()
      )
    );

    if (maybeLastLoadedStartOfMonthTime.isNone()) {
      moreSectionsToRender.push(...selectCurrentMonthRemainingData(sections));
    }

    resolve(moreSectionsToRender);
  });

/**
 * A component to show the messages with a due_date.
 */
class MessagesDeadlines extends React.PureComponent<Props, State> {
  private scrollToLocation: Option<SectionListScrollParams> = none;
  private messageAgendaRef = React.createRef<MessageAgenda>();

  /**
   * Used to maintain the same ScrollView position when loading
   * "previous" data.
   */
  private onContentSizeChange = () => {
    if (this.messageAgendaRef.current && this.scrollToLocation.isSome()) {
      // Scroll to the sectionIndex we was before the content size change.
      this.messageAgendaRef.current.scrollToLocation(
        this.scrollToLocation.value
      );
      // Reset the value to none.
      // eslint-disable-next-line
      this.scrollToLocation = none;
    }
  };

  private handleOnPressItem = (id: string) => {
    if (this.props.selectedItemIds.isSome()) {
      // Is the selection mode is active a simple "press" must act as
      // a "longPress" (select the item).
      this.handleOnLongPressItem(id);
    } else {
      this.props.navigateToMessageDetail(id);
    }
  };

  private handleOnLongPressItem = (id: string) => {
    this.props.toggleItemSelection(id);
  };

  private toggleAllMessagesSelection = () => {
    const { allMessageIdsState } = this.state;
    const { selectedItemIds } = this.props;
    if (selectedItemIds.isSome()) {
      this.props.setSelectedItemIds(
        some(
          allMessageIdsState.size === selectedItemIds.value.size
            ? new Set()
            : allMessageIdsState
        )
      );
    }
  };

  private archiveMessages = () => {
    this.props.resetSelection();
    this.props.setMessagesArchivedState(
      this.props.selectedItemIds.map(_ => Array.from(_)).getOrElse([]),
      true
    );
  };

  private onLoadMoreDataRequest = () => {
    const { sections, maybeLastLoadedStartOfMonthTime } = this.state;

    this.setState({
      isWorking: true
    });
    selectMoreSectionsToRenderAsync(sections, maybeLastLoadedStartOfMonthTime)
      .then(moreSectionsToRender => {
        this.setState((prevState: State) => {
          // Save the sectionIndex we want to scroll-to onContentSizeChange.
          if (prevState.sectionsToRender.length === 0) {
            // If not sections are redered we need to move to the bottom after rendering more sections
            const sectionIndex = moreSectionsToRender.length - 1;
            const itemIndex =
              moreSectionsToRender[moreSectionsToRender.length - 1].data
                .length - 1;
            // eslint-disable-next-line
            this.scrollToLocation = some({
              sectionIndex,
              itemIndex,
              viewOffset: 0,
              viewPosition: 1,
              animated: true
            });
          } else {
            // eslint-disable-next-line
            this.scrollToLocation = some({
              sectionIndex: moreSectionsToRender.length,
              itemIndex: -1,
              viewOffset: 0,
              viewPosition: 1,
              animated: true
            });
          }

          const lastLoadedStartOfMonthTime = maybeLastLoadedStartOfMonthTime.getOrElse(
            startOfMonth(new Date()).getTime()
          );

          return {
            isWorking: false,
            sectionsToRender: [
              ...moreSectionsToRender,
              ...prevState.sectionsToRender
            ],
            allMessageIdsState: new Set([
              ...this.generateMessagesIdsFromMessageAgendaSection(
                moreSectionsToRender
              ),
              ...prevState.allMessageIdsState
            ]),
            maybeLastLoadedStartOfMonthTime: some(
              startOfMonth(
                subMonths(lastLoadedStartOfMonthTime, PAST_DATA_MONTHS)
              ).getTime()
            ),
            isContinuosScrollEnabled: !isLastSectionLoaded(
              this.state.lastDeadlineId,
              [...moreSectionsToRender, ...prevState.sectionsToRender]
            )
          };
        });
      })
      .catch(() => 0);
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isWorking: true,
      sections: [],
      sectionsToRender: [],
      maybeLastLoadedStartOfMonthTime: none,
      allMessageIdsState: new Set(),
      isContinuosScrollEnabled: true,
      lastDeadlineId: none,
      nextDeadlineId: none
    };
  }

  public async componentDidMount() {
    const { messagesState } = this.props;
    const { maybeLastLoadedStartOfMonthTime } = this.state;

    const sections = await Promise.resolve(generateSections(messagesState));
    const lastDeadlineId = await Promise.resolve(getLastDeadlineId(sections));
    const nextDeadlineId = await Promise.resolve(getNextDeadlineId(sections));

    const sectionsToRender = await Promise.resolve(
      selectInitialSectionsToRender(sections, maybeLastLoadedStartOfMonthTime)
    );
    // If there are older deadlines the scroll must be enabled to allow data loading when requested
    const isContinuosScrollEnabled = await Promise.resolve(
      !isLastSectionLoaded(lastDeadlineId, sectionsToRender)
    );

    this.setState({
      isWorking: false,
      sections,
      sectionsToRender,
      allMessageIdsState: this.generateMessagesIdsFromMessageAgendaSection(
        sectionsToRender
      ),
      isContinuosScrollEnabled,
      lastDeadlineId,
      nextDeadlineId
    });
  }

  public async componentDidUpdate(prevProps: Props) {
    const { messagesState } = this.props;
    const { messagesState: prevMessagesState } = prevProps;
    const { maybeLastLoadedStartOfMonthTime } = this.state;

    if (prevProps.currentTab !== this.props.currentTab) {
      this.props.resetSelection();
    }

    if (messagesState !== prevMessagesState) {
      this.setState({
        isWorking: true
      });

      const sections = await Promise.resolve(generateSections(messagesState));
      const lastDeadlineId = await Promise.resolve(getLastDeadlineId(sections));
      const nextDeadlineId = await Promise.resolve(getNextDeadlineId(sections));

      const sectionsToRender = await Promise.resolve(
        selectInitialSectionsToRender(sections, maybeLastLoadedStartOfMonthTime)
      );
      // If there are older deadlines the scroll must be enabled to allow data loading when requested
      const isContinuosScrollEnabled = await Promise.resolve(
        !isLastSectionLoaded(lastDeadlineId, sectionsToRender)
      );

      this.setState({
        isWorking: false,
        sections,
        sectionsToRender,
        allMessageIdsState: this.generateMessagesIdsFromMessageAgendaSection(
          sectionsToRender
        ),
        isContinuosScrollEnabled,
        lastDeadlineId,
        nextDeadlineId
      });
    }
  }

  private generateMessagesIdsFromMessageAgendaSection(
    sections: Sections
  ): Set<string> {
    // eslint-disable-next-line
    const messagesIds: string[] = [];
    sections.forEach(messageAgendaSection =>
      messageAgendaSection.data.forEach(item => {
        const idMessage = !isFakeItem(item) ? item.e1.id : undefined;
        if (idMessage !== undefined) {
          messagesIds.push(idMessage);
        }
      })
    );
    return messagesIds.length > 0 ? new Set(messagesIds) : new Set();
  }

  public render() {
    const {
      messagesState,
      servicesById,
      paymentsByRptId,
      selectedItemIds,
      resetSelection,
      animated
    } = this.props;
    const {
      allMessageIdsState,
      isWorking,
      sectionsToRender,
      isContinuosScrollEnabled,
      lastDeadlineId,
      nextDeadlineId
    } = this.state;

    const isRefreshing = pot.isLoading(messagesState) || isWorking;

    return (
      <View style={styles.listWrapper}>
        <View style={styles.listContainer}>
          <MessageAgenda
            ref={this.messageAgendaRef}
            sections={sectionsToRender}
            servicesById={servicesById}
            paymentsByRptId={paymentsByRptId}
            refreshing={isRefreshing}
            selectedMessageIds={selectedItemIds}
            onPressItem={this.handleOnPressItem}
            onLongPressItem={this.handleOnLongPressItem}
            onMoreDataRequest={this.onLoadMoreDataRequest}
            onContentSizeChange={this.onContentSizeChange}
            isContinuosScrollEnabled={isContinuosScrollEnabled}
            lastDeadlineId={lastDeadlineId}
            nextDeadlineId={nextDeadlineId}
            animated={animated}
          />
        </View>
        <ListSelectionBar
          selectedItemIds={selectedItemIds}
          allItemIds={some(allMessageIdsState)}
          onToggleSelection={this.archiveMessages}
          onToggleAllSelection={this.toggleAllMessagesSelection}
          onResetSelection={resetSelection}
          primaryButtonText={I18n.t("messages.cta.archive")}
        />
      </View>
    );
  }
}

export default withItemsSelection(MessagesDeadlines);
