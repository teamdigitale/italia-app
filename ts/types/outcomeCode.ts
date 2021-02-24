import * as t from "io-ts";

const LocalizedMessage = t.type({
  "en-EN": t.string,
  "it-IT": t.string
});

const Status = t.keyof({
  errorBlocking: null,
  errorTryAgain: null,
  success: null
});
const OutcomeCodeR = t.type({
  status: Status
});

const OutcomeCodeO = t.partial({
  title: LocalizedMessage,
  description: LocalizedMessage,
  icon: t.unknown
});

const OutcomeCode = t.intersection([OutcomeCodeR, OutcomeCodeO]);
// This are the errors that we want to map specifically at the moment.
// All the other errors will fall back in the generic error category.
const OutcomeCodes = {
  "0": OutcomeCodeR,
  "1": OutcomeCode,
  "2": OutcomeCode,
  "4": OutcomeCode,
  "7": OutcomeCode,
  "8": OutcomeCode,
  "10": OutcomeCode
};

const OutcomeCodesCodec = t.type(OutcomeCodes);

export type OutcomeStatus = t.TypeOf<typeof Status>;
export type OutcomeCode = t.TypeOf<typeof OutcomeCode>;
export type OutcomeCodes = t.TypeOf<typeof OutcomeCodesCodec>;
export const OutcomeCodesKey = t.keyof(OutcomeCodes);
export type OutcomeCodesKey = t.TypeOf<typeof OutcomeCodesKey>;
