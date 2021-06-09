import { left, right } from "fp-ts/lib/Either";

import * as t from "io-ts";
import { testSaga } from "redux-saga-test-plan";

import { NonEmptyString } from "italia-ts-commons/lib/strings";
import { CreatedMessageWithContentAndAttachments } from "../../../../definitions/backend/CreatedMessageWithContentAndAttachments";
import { loadMessage as loadMessageAction } from "../../../store/actions/messages";
import { fetchMessage, loadMessage } from "../messages";

const testMessageId1 = "01BX9NSMKAAAS5PSP2FATZM6BQ";
const testServiceId1 = "5a563817fcc896087002ea46c49a";

const testMessageWithContent1: CreatedMessageWithContentAndAttachments = {
  id: testMessageId1,
  fiscal_code: "" as any,
  created_at: new Date(),
  content: {
    markdown: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget fringilla neque, laoreet volutpat elit. Nunc leo nisi, dignissim eget lobortis non, faucibus in augue." as any,
    subject: "Lorem ipsum..." as any
  },
  sender_service_id: testServiceId1 as NonEmptyString
};

describe("messages", () => {
  describe("fetchMessage test plan", () => {
    it("should call getMessage with the right parameters", () => {
      const getMessage = jest.fn();
      testSaga(fetchMessage, getMessage, testMessageWithContent1)
        .next()
        .call(getMessage, { id: testMessageId1 });
    });

    it("should only return an `Either` holding a `Left` validatorError if the getMessage response gets an error", () => {
      const getMessage = jest.fn();
      const validatorError = {
        value: "some error occurred",
        context: [{ key: "", type: t.string }]
      };
      testSaga(fetchMessage, getMessage, testMessageWithContent1)
        .next()
        // Return a new `Either` holding a `Left` validatorError as getMessage response
        .next(left([validatorError]))
        .returns(left(Error("some value at [root] is not a valid [string]")));
    });

    it("should only return the error if the getMessage response status is not 200", () => {
      const getMessage = jest.fn();
      const error = Error("Backend error");
      testSaga(fetchMessage, getMessage, testMessageWithContent1)
        .next()
        // Return 500 with an error message as getMessage response
        .next(right({ status: 500, value: { title: error.message } }))
        .returns(left(error));
    });

    it("should return the message if the getMessage response status is 200", () => {
      const getMessage = jest.fn();
      testSaga(fetchMessage, getMessage, testMessageWithContent1)
        .next()
        // Return 200 with a valid value as getMessage response
        .next(right({ status: 200, value: testMessageWithContent1 }))
        .returns(right(testMessageWithContent1));
    });
  });

  describe("loadMessage test plan", () => {
    it("should call fetchMessage with the right parameters", () => {
      const getMessage = jest.fn();
      testSaga(loadMessage, getMessage, testMessageWithContent1)
        .next()
        .next()
        .call(fetchMessage, getMessage, testMessageWithContent1);
    });

    it("should put MESSAGE_LOAD_FAILURE and return the error if the message can't be fetched", () => {
      const getMessage = jest.fn();
      testSaga(loadMessage, getMessage, testMessageWithContent1)
        .next()
        .next()
        .call(fetchMessage, getMessage, testMessageWithContent1)
        // Return 200 with a valid message as getMessage response
        .next(left(Error("Error")))
        .put(
          loadMessageAction.failure({
            id: testMessageId1,
            error: Error("Error")
          })
        )
        .next()
        .returns(left(Error("Error")));
    });

    it("should put MESSAGE_LOAD_SUCCESS and return the message if the message is fetched sucessfully", () => {
      const getMessage = jest.fn();
      testSaga(loadMessage, getMessage, testMessageWithContent1)
        .next()
        .next()
        .call(fetchMessage, getMessage, testMessageWithContent1)
        // Return 200 with a valid message as getMessage response
        .next(right(testMessageWithContent1))
        .put(loadMessageAction.success(testMessageWithContent1))
        .next()
        .returns(right(testMessageWithContent1));
    });
  });
});
