import * as pot from "italia-ts-commons/lib/pot";
import * as React from "react";
import { useEffect, useState } from "react";
import { NavigationActions, NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CreatedMessageWithContentAndAttachments } from "../../../definitions/backend/CreatedMessageWithContentAndAttachments";
import { euCovidCertificateEnabled } from "../../config";
import { LoadingErrorComponent } from "../../features/bonus/bonusVacanze/components/loadingErrorScreen/LoadingErrorComponent";
import { navigateToEuCovidCertificateDetailScreen } from "../../features/euCovidCert/navigation/actions";
import { EUCovidCertificateAuthCode } from "../../features/euCovidCert/types/EUCovidCertificate";
import I18n from "../../i18n";
import { mixpanelTrack } from "../../mixpanel";
import { loadMessages } from "../../store/actions/messages";
import { navigateToMessageDetailScreenAction } from "../../store/actions/navigation";
import { messagesAllIdsSelector } from "../../store/reducers/entities/messages/messagesAllIds";
import { messageStateByIdSelector } from "../../store/reducers/entities/messages/messagesById";
import { GlobalState } from "../../store/reducers/types";
import { InferNavigationParams } from "../../types/react";
import { isStrictSome } from "../../utils/pot";
import { MessageDetailScreen } from "./MessageDetailScreen";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  NavigationInjectedProps<InferNavigationParams<typeof MessageDetailScreen>>;

/**
 * In order to have the final CreatedMessageWithContentAndAttachments, these conditions should be verified:
 * - props.allMessages should be pot.some
 * - messageId should be in props.allMessages
 * - props.messageState(messageId) should be defined and pot.some
 * @param props
 */
const getLoadingState = (
  props: Props
): pot.Pot<
  CreatedMessageWithContentAndAttachments | undefined,
  string | undefined
> => {
  const messageId = props.navigation.getParam("messageId");
  if (!isStrictSome(props.allMessages)) {
    void mixpanelTrack("MESSAGE_ROUTING_FAILURE", {
      reason: "all Messages is not some"
    });
    return pot.map(props.allMessages, _ => undefined);
  }
  if (!props.allMessages.value.some(id => id === messageId)) {
    void mixpanelTrack("MESSAGE_ROUTING_FAILURE", {
      reason: "id not in list"
    });
    return pot.noneError(`Cannot found ${messageId} in messages list`);
  }
  const messageState = props.messageState(messageId);
  if (messageState === undefined) {
    void mixpanelTrack("MESSAGE_ROUTING_FAILURE", {
      reason: "MessageState is undefined"
    });
    return pot.noneError("MessageState is undefined");
  }
  return messageState.message;
};

/**
 * Choose the screen where to navigate, based on the message.content.eu_covid_cert
 * @param message
 * @param props
 */
const navigateToScreenHandler = (
  message: CreatedMessageWithContentAndAttachments,
  props: Props
) => {
  if (
    euCovidCertificateEnabled &&
    message.content.eu_covid_cert !== undefined
  ) {
    props.navigateToEuCovidCertificate(
      message.content.eu_covid_cert.auth_code as EUCovidCertificateAuthCode,
      message.id
    );
  } else {
    props.navigateToDetails(message.id);
  }
};

const MessageRouterScreen = (props: Props): React.ReactElement => {
  // used to automatically dispatch loadMessages if the pot is not some at the first rendering
  // (avoid displaying error at the first frame)
  const [isFirstRendering, setFirstRendering] = useState(true);
  const loadingState = getLoadingState(props);
  const isLoading = !pot.isError(loadingState);

  useEffect(() => {
    // all the messages data are ready, exit condition, navigate to the right screen
    if (isStrictSome(loadingState) && loadingState.value !== undefined) {
      navigateToScreenHandler(loadingState.value, props);
      return;
    }
    if (isFirstRendering) {
      props.loadMessages();
      setFirstRendering(false);
    }
  }, [loadingState]);

  return (
    <LoadingErrorComponent
      isLoading={isLoading}
      loadingCaption={I18n.t("messageDetails.loadingText")}
      onAbort={props.cancel}
      onRetry={props.loadMessages}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  cancel: () => dispatch(NavigationActions.back()),
  loadMessages: () => dispatch(loadMessages.request()),
  navigateToDetails: (messageId: string) => {
    dispatch(NavigationActions.back());
    dispatch(navigateToMessageDetailScreenAction({ messageId }));
  },
  navigateToEuCovidCertificate: (
    authCode: EUCovidCertificateAuthCode,
    messageId: string
  ) => {
    dispatch(NavigationActions.back());
    dispatch(navigateToEuCovidCertificateDetailScreen({ authCode, messageId }));
  }
});
const mapStateToProps = (state: GlobalState) => ({
  messageState: (messageId: string) =>
    messageStateByIdSelector(messageId)(state),
  allMessages: messagesAllIdsSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageRouterScreen);
