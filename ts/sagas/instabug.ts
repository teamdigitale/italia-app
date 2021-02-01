import { BugReporting, dismissType, Replies } from "instabug-reactnative";
import {
  call,
  Effect,
  fork,
  put,
  select,
  takeLatest
} from "redux-saga/effects";
import { instabugReportClosed } from "../store/actions/debug";
import {
  instabugUnreadMessagesLoaded,
  updateInstabugUnreadMessages
} from "../store/actions/instabug";
import { instabugReportingTypeSelector } from "../store/reducers/instabug/instabugUnreadMessages";

const loadInstabugUnreadMessages = () =>
  new Promise<number>(resolve => {
    Replies.getUnreadRepliesCount(count => {
      resolve(count);
    });
  });

// promise will be resolver when the OnNewReplyReceivedCallback will be executed
const onNewReplyReceived = () =>
  new Promise<void>(resolve => {
    Replies.setOnNewReplyReceivedCallback(() => {
      resolve();
    });
  });

function* watchIBSDKdismiss() {
  const onDismissPromise = () =>
    new Promise<dismissType>(resolve => {
      BugReporting.onSDKDismissedHandler((how: dismissType): void =>
        resolve(how)
      );
    });
  while (true) {
    const ibHowDismissed = yield call(onDismissPromise);
    const type = yield select(instabugReportingTypeSelector);
    yield put(instabugReportClosed({ type, how: ibHowDismissed }));
    yield put(updateInstabugUnreadMessages());
  }
}

function* watchInstabugSaga() {
  yield fork(watchIBSDKdismiss);
  yield call(updateInstabugBadgeSaga);

  while (true) {
    yield call(onNewReplyReceived);
    yield call(updateInstabugBadgeSaga);
  }
}

function* updateInstabugBadgeSaga(): Generator<any, void, number> {
  const repliesCount = yield call(loadInstabugUnreadMessages);
  yield put(instabugUnreadMessagesLoaded(repliesCount));
}

export default function* root(): IterableIterator<Effect> {
  // Update number of instabug unread messages
  yield takeLatest(updateInstabugUnreadMessages, updateInstabugBadgeSaga);
  yield fork(watchInstabugSaga);
}
