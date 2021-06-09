import { fromNullable } from "fp-ts/lib/Option";
import { Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { CreatedMessageWithContent } from "../../../definitions/backend/CreatedMessageWithContent";
import { ServicePublic } from "../../../definitions/backend/ServicePublic";
import I18n from "../../i18n";
import TransactionSummaryScreen from "../../screens/wallet/payment/TransactionSummaryScreen";
import {
  navigateToMessageRouterScreen,
  navigateToPaymentTransactionSummaryScreen,
  navigateToWalletHome
} from "../../store/actions/navigation";
import { loadServiceDetail } from "../../store/actions/services";
import { paymentInitializeState } from "../../store/actions/wallet/payment";
import { serverInfoDataSelector } from "../../store/reducers/backendInfo";
import { isProfileEmailValidatedSelector } from "../../store/reducers/profile";
import { GlobalState } from "../../store/reducers/types";
import { InferNavigationParams } from "../../types/react";
import { isUpdateNeeded } from "../../utils/appVersion";
import {
  isExpirable,
  isExpired,
  isExpiring,
  MessagePaymentExpirationInfo,
  paymentExpirationInfo
} from "../../utils/messages";
import {
  formatPaymentAmount,
  getAmountFromPaymentAmount,
  getRptIdFromNoticeNumber
} from "../../utils/payment";
import ButtonDefaultOpacity from "../ButtonDefaultOpacity";

type OwnProps = {
  paid: boolean;
  messagePaymentExpirationInfo: MessagePaymentExpirationInfo;
  small?: boolean;
  disabled?: boolean;
  message: CreatedMessageWithContent;
  service?: ServicePublic;
  enableAlertStyle?: boolean;
};

type Props = OwnProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const styles = StyleSheet.create({
  half: {
    flex: 1
  },
  twoThird: {
    flex: 7
  },
  marginTop1: { marginTop: 1 }
});

/**
 * A component to render the button related to the payment
 * paired with a message.
 */
class PaymentButton extends React.PureComponent<Props> {
  get paymentExpirationInfo() {
    return paymentExpirationInfo(this.props.message);
  }
  get isPaymentInvalidAfterDueDate() {
    return this.paymentExpirationInfo.fold(false, isExpirable);
  }

  get isPaymentExpiredAndInvalid() {
    return this.isPaymentExpired && this.isPaymentInvalidAfterDueDate;
  }

  private getButtonText = (): string => {
    const { messagePaymentExpirationInfo } = this.props;
    const { amount } = messagePaymentExpirationInfo;

    if (this.props.paid) {
      return I18n.t("messages.cta.paid", {
        amount: formatPaymentAmount(amount)
      });
    }

    return I18n.t("messages.cta.seeNotice");
  };

  get isPaymentExpired() {
    return (
      !this.props.paid && isExpired(this.props.messagePaymentExpirationInfo)
    );
  }

  private handleOnPress = () => {
    const {
      messagePaymentExpirationInfo,
      service,
      paid,
      disabled,
      message
    } = this.props;

    const amount = getAmountFromPaymentAmount(
      messagePaymentExpirationInfo.amount
    );

    const rptId = fromNullable(service).chain(_ =>
      getRptIdFromNoticeNumber(
        _.organization_fiscal_code,
        messagePaymentExpirationInfo.noticeNumber
      )
    );

    // (small means in list -.-')
    // if it is rendered in list and the payment is expired and it is not still valid to pay (invalid after due date)
    // navigate to message detail screen
    if ((this.props.small && this.isPaymentExpiredAndInvalid) || paid) {
      this.props.navigateToMessageDetail();
      return;
    }

    if (!disabled && !paid && amount.isSome() && rptId.isSome()) {
      this.props.refreshService(message.sender_service_id);
      // TODO: optimize the managment of the payment initialization
      if (this.props.isEmailValidated && !this.props.isUpdatedNeededPagoPa) {
        this.props.paymentInitializeState();
        this.props.navigateToPaymentTransactionSummaryScreen({
          rptId: rptId.value,
          initialAmount: amount.value
        });
      } else {
        // Navigating to Wallet home, having the email address is not validated,
        // it will be displayed RemindEmailValidationOverlay
        this.props.navigateToWalletHomeScreen();
      }
    }
  };

  public render() {
    const {
      messagePaymentExpirationInfo,
      small,
      disabled,
      paid,
      enableAlertStyle
    } = this.props;
    return (
      <ButtonDefaultOpacity
        primary={!this.isPaymentExpired && !disabled}
        disabled={disabled}
        onPress={this.handleOnPress}
        gray={paid}
        darkGray={
          !paid &&
          this.isPaymentExpired &&
          messagePaymentExpirationInfo.kind === "EXPIRABLE"
        }
        xsmall={small}
        alert={
          enableAlertStyle && !paid && isExpiring(messagePaymentExpirationInfo)
        }
        style={this.props.small ? styles.twoThird : styles.half}
      >
        <Text style={styles.marginTop1}>{this.getButtonText()}</Text>
      </ButtonDefaultOpacity>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  isEmailValidated: isProfileEmailValidatedSelector(state),
  isUpdatedNeededPagoPa: isUpdateNeeded(
    serverInfoDataSelector(state),
    "min_app_version_pagopa"
  )
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  navigateToMessageDetail: () =>
    dispatch(navigateToMessageRouterScreen({ messageId: ownProps.message.id })),
  refreshService: (serviceId: string) =>
    dispatch(loadServiceDetail.request(serviceId)),
  paymentInitializeState: () => dispatch(paymentInitializeState()),
  navigateToPaymentTransactionSummaryScreen: (
    params: InferNavigationParams<typeof TransactionSummaryScreen>
  ) => dispatch(navigateToPaymentTransactionSummaryScreen(params)),
  navigateToWalletHomeScreen: () => dispatch(navigateToWalletHome())
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentButton);
