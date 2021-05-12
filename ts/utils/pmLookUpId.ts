/**
 * utility that manages the lookup ID injected in some PM flows toward the Payment Manager
 * more info https://pagopa.atlassian.net/wiki/spaces/IOAPP/pages/135693522/PM+-+tracking+delle+chiamate+di+rete
 */
import uuid from "uuid/v4";
import { fromNullable } from "fp-ts/lib/Option";

export type LookUpId = string | undefined;
// eslint-disable-next-line functional/no-let
let pmLookUpId: LookUpId;
export const pmLookupHeaderKey = "Request-Id";
export const getLookUpId = (): LookUpId => pmLookUpId;
// return the lookupID inside a plain object where the key is pmLookupHeaderKey
export const getLookUpIdPO = (): Record<string, string> =>
  fromNullable(getLookUpId()).fold<Record<string, string>>({}, id => ({
    [pmLookupHeaderKey]: id
  }));
export const newLookUpId = (): LookUpId => {
  pmLookUpId = uuid();
  return pmLookUpId;
};
export const resetLookUpId = (): void => {
  pmLookUpId = undefined;
};
