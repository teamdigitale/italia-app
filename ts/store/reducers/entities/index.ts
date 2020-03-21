/**
 * Entities reducer
 */
import { combineReducers } from "redux";

import { PersistPartial } from "redux-persist";
import { Action } from "../../actions/types";
import { GlobalState } from "../types";
import calendarEventsReducer, { CalendarEventsState } from "./calendarEvents";
import messagesReducer, { MessagesState } from "./messages";
import messageItemsReducer, {
  MessageItemsState
} from "./messages/messageItemState";
import organizationsReducer, { OrganizationsState } from "./organizations";
import { paymentByRptIdReducer, PaymentByRptIdState } from "./payments";
import {
  ReadTransactionsState,
  transactionsReadReducer
} from "./readTransactions";
import servicesReducer, { ServicesState } from "./services";

export type EntitiesState = Readonly<{
  messages: MessagesState;
  messageItems: MessageItemsState;
  services: ServicesState;
  organizations: OrganizationsState;
  paymentByRptId: PaymentByRptIdState;
  calendarEvents: CalendarEventsState;
  transactionsRead: ReadTransactionsState;
}>;

export type PersistedEntitiesState = EntitiesState & PersistPartial;

const reducer = combineReducers<EntitiesState, Action>({
  messages: messagesReducer,
  messageItems: messageItemsReducer,
  services: servicesReducer,
  organizations: organizationsReducer,
  paymentByRptId: paymentByRptIdReducer,
  calendarEvents: calendarEventsReducer,
  transactionsRead: transactionsReadReducer
});

export default reducer;

// Selector
export const transactionsReadSelector = (state: GlobalState) =>
  state.entities.transactionsRead;
