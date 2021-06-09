import { compareAsc, startOfDay } from "date-fns";
import { none, Option, some } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import {
  FiscalCode,
  IPatternStringTag,
  NonEmptyString,
  WithinRangeString
} from "italia-ts-commons/lib/strings";
import { Tuple2 } from "italia-ts-commons/lib/tuples";
import { PaymentAmount } from "../../../../definitions/backend/PaymentAmount";
import { TimeToLiveSeconds } from "../../../../definitions/backend/TimeToLiveSeconds";
import { MessagesStateAndStatus } from "../../../store/reducers/entities/messages";
import { isCreatedMessageWithContentAndDueDate } from "../../../types/CreatedMessageWithContentAndDueDate";
import {
  isFakeItem,
  MessageAgendaItem,
  MessageAgendaSection,
  Sections
} from "../MessageAgenda";
import { getLastDeadlineId, getNextDeadlineId } from "../MessagesDeadlines";

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
            return [
              ...accumulator,
              Tuple2(message.value, {
                isRead
              })
            ];
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
                // eslint-disable-next-line functional/immutable-data
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

const setDate = (year: number, hour: number): Date => {
  const d = new Date();
  return new Date(
    d.getFullYear() + year,
    d.getMonth(),
    d.getDate(),
    hour,
    12,
    12
  );
};
const fiscalCode = "ISPXNB32R82Y766A" as FiscalCode;
const messagesState: pot.Pot<ReadonlyArray<MessagesStateAndStatus>, string> = {
  kind: "PotSome",
  value: [
    {
      meta: {
        created_at: setDate(-1, 12),
        fiscal_code: fiscalCode,
        id: "01DTH3SAA23QJ436BDHDXJ4H5Y",
        sender_service_id: "01DP8VSP2HYYMXSMHN7CV1GNHJ" as NonEmptyString,
        time_to_live: 3600 as TimeToLiveSeconds
      },
      isRead: true,
      isArchived: false,
      message: {
        kind: "PotSome",
        value: {
          content: {
            subject: "test wrong organization name 9 😊 😋 😎" as WithinRangeString<
              10,
              121
            >,
            markdown: "😊 😋 😎 organization name test wrong organization…ng organization name test wrong organization name" as WithinRangeString<
              80,
              10001
            >,
            due_date: setDate(-1, 12)
          },
          created_at: setDate(-1, 12),
          fiscal_code: fiscalCode,
          id: "01DTH3SAA23QJ436BDHDXJ4H5Y",
          sender_service_id: "01DP8VSP2HYYMXSMHN7CV1GNHJ" as NonEmptyString,
          time_to_live: 3600 as TimeToLiveSeconds
        }
      }
    },
    {
      meta: {
        created_at: setDate(0, 3),
        fiscal_code: fiscalCode,
        id: "01DQQGBXWSCNNY44CH2QZ95J7A",
        sender_service_id: "01DP8VSP2HYYMXSMHN7CV1GNHJ" as NonEmptyString,
        time_to_live: 3600 as TimeToLiveSeconds
      },
      isRead: false,
      isArchived: false,
      message: {
        kind: "PotSome",
        value: {
          content: {
            subject: "[pagoPaTest] payment 2" as WithinRangeString<10, 121>,
            markdown: "demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo" as WithinRangeString<
              80,
              10001
            >,
            due_date: setDate(0, 15),
            payment_data: {
              amount: 1 as PaymentAmount,
              notice_number: "002718270840468918" as string &
                IPatternStringTag<"^[0123][0-9]{17}$">,
              invalid_after_due_date: true
            }
          },
          created_at: setDate(0, 3),
          fiscal_code: fiscalCode,
          id: "01DQQGBXWSCNNY44CH2QZ95J7A",
          sender_service_id: "01DP8VSP2HYYMXSMHN7CV1GNHJ" as NonEmptyString,
          time_to_live: 3600 as TimeToLiveSeconds
        }
      }
    },
    {
      meta: {
        created_at: setDate(1, 12),
        fiscal_code: fiscalCode,
        id: "01DQQGBXWSCNNY44CH2QZ95PIO",
        sender_service_id: "01DP8VSP2HYYMXSMHN7CV1GNHJ" as NonEmptyString,
        time_to_live: 3600 as TimeToLiveSeconds
      },
      isRead: false,
      isArchived: false,
      message: {
        kind: "PotSome",
        value: {
          content: {
            subject: "[pagoPaTest] payment 2" as WithinRangeString<10, 121>,
            markdown: "demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo demo" as WithinRangeString<
              80,
              10001
            >,
            due_date: setDate(1, 12),
            payment_data: {
              amount: 1 as PaymentAmount,
              notice_number: "002718270840468918" as string &
                IPatternStringTag<"^[0123][0-9]{17}$">,
              invalid_after_due_date: true
            }
          },
          created_at: setDate(1, 12),
          fiscal_code: fiscalCode,
          id: "01DQQGBXWSCNNY44CH2QZ95PIO",
          sender_service_id: "01DP8VSP2HYYMXSMHN7CV1GNHJ" as NonEmptyString,
          time_to_live: 3600 as TimeToLiveSeconds
        }
      }
    }
  ]
};

const sections = generateSections(messagesState);
describe("last id check", () => {
  it("should retrieve the last section loaded", () => {
    const lastDeadlineId = getLastDeadlineId(sections);
    expect(lastDeadlineId.isSome()).toBeTruthy();
    if (lastDeadlineId.isSome()) {
      expect(lastDeadlineId.value).toEqual("01DTH3SAA23QJ436BDHDXJ4H5Y");
    }
  });

  it("getLastDeadlineId should return none", () => {
    const lastDeadlineId = getLastDeadlineId([]);
    expect(lastDeadlineId.isNone()).toBeTruthy();
  });
});

describe("next section check", () => {
  it("should return the next (in time) section", () => {
    const nextDeadlineId = getNextDeadlineId(sections);
    expect(nextDeadlineId.isSome()).toBeTruthy();
    if (nextDeadlineId.isSome()) {
      expect(nextDeadlineId.value).toEqual("01DQQGBXWSCNNY44CH2QZ95J7A");
    }
  });

  it("should return none", () => {
    const sectionsWithNoNext = sections.filter(s => {
      // remove any sections with due_date greater than today (no future)
      const item = s.data[0];
      if (isFakeItem(item)) {
        return true;
      }
      return (
        item.e1.content.due_date.getTime() < startOfDay(new Date()).getTime()
      );
    });
    const nextDeadlineId = getNextDeadlineId(sectionsWithNoNext);
    expect(nextDeadlineId.isNone()).toBeTruthy();
  });

  it("should return none", () => {
    const nextDeadlineId = getNextDeadlineId([]);
    expect(nextDeadlineId.isNone()).toBeTruthy();
  });
});
