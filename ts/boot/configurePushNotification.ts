/**
 * Set the basic PushNotification configuration
 */
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { constNull } from "fp-ts/lib/function";
import { fromEither, fromNullable } from "fp-ts/lib/Option";
import * as t from "io-ts";
import { NonEmptyString } from "italia-ts-commons/lib/strings";
import { Alert } from "react-native";
import PushNotification from "react-native-push-notification";
import { store } from "../App";
import { debugRemotePushNotification } from "../config";
import { setMixpanelPushNotificationToken } from "../mixpanel";
import { loadMessages } from "../store/actions/messages";
import {
  updateNotificationsInstallationToken,
  updateNotificationsPendingMessage
} from "../store/actions/notifications";
import { isDevEnv } from "../utils/environment";
import { RTron } from "./configureStoreAndPersistor";

/**
 * Helper type used to validate the notification payload.
 * The message_id can be in different places depending on the platform.
 */
const NotificationPayload = t.partial({
  message_id: NonEmptyString,
  data: t.partial({
    message_id: NonEmptyString
  })
});

function configurePushNotifications() {
  // if isDevEnv, disable push notification to avoid crash for missing firebase settings

  // Create the default channel used for notifications, the callback return false if the channel already exists
  PushNotification.createChannel(
    {
      channelId: "io_default_notification_channel",
      channelName: "IO default notification channel",
      playSound: true,
      soundName: "default",
      importance: 4,
      vibrate: true
    },
    constNull
  );

  PushNotification.configure({
    // Called when token is generated
    onRegister: token => {
      // send token to enable PN through Mixpanel
      setMixpanelPushNotificationToken(token.token).then(constNull, constNull);
      // Dispatch an action to save the token in the store
      store.dispatch(updateNotificationsInstallationToken(token.token));
    },

    // Called when a remote or local notification is opened or received
    onNotification: notification => {
      if (debugRemotePushNotification) {
        Alert.alert("Notification", JSON.stringify(notification));
      }
      const maybeMessageId = fromEither(
        NotificationPayload.decode({ message_id: (notification as any).title })
      ).chain(payload =>
        fromNullable(payload.message_id).alt(
          fromNullable(payload.data).mapNullable(_ => _.message_id)
        )
      );
      maybeMessageId.map(messageId => {
        // We just received a push notification about a new message
        if (notification.foreground) {
          // The App is in foreground so just refresh the messages list
          store.dispatch(loadMessages.request());
        } else {
          // The App was closed/in background and has been now opened clicking
          // on the push notification.
          // Save the message id of the notification in the store so the App can
          // navigate to the message detail screen as soon as possible (if
          // needed after the user login/insert the unlock code)
          store.dispatch(
            updateNotificationsPendingMessage(
              messageId,
              notification.foreground
            )
          );

          // finally, refresh the message list to start loading the content of
          // the new message
          store.dispatch(loadMessages.request());
        }
      });

      // On iOS we need to call this when the remote notification handling is complete
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  });
}

export default configurePushNotifications;
