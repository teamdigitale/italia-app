import * as pot from "italia-ts-commons/lib/pot";
import { fromNullable, Option } from "fp-ts/lib/Option";
import { capitalize } from "lodash";
import { View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CreatedMessageWithContent } from "../../../definitions/backend/CreatedMessageWithContent";
import { ServicePublic } from "../../../definitions/backend/ServicePublic";
import { loadServiceMetadata } from "../../store/actions/content";
import { Dispatch } from "../../store/actions/types";
import { servicesMetadataByIdSelector } from "../../store/reducers/content";
import { PaidReason } from "../../store/reducers/entities/payments";
import { GlobalState } from "../../store/reducers/types";
import customVariables from "../../theme/variables";
import { formatDateAsDay, formatDateAsMonth } from "../../utils/dates";
import {
  getCTA,
  isExpirable,
  isExpired,
  isExpiring,
  paymentExpirationInfo
} from "../../utils/messages";
import ExtractedCTABar from "../cta/ExtractedCTABar";
import { ViewEUCovidButton } from "../../features/euCovidCert/components/ViewEUCovidButton";
import { euCovidCertificateEnabled } from "../../config";
import CalendarEventButton from "./CalendarEventButton";
import CalendarIconComponent from "./CalendarIconComponent";

type OwnProps = {
  message: CreatedMessageWithContent;
  onEUCovidCTAPress?: () => void;
  service?: ServicePublic;
  payment?: PaidReason;
  disabled?: boolean;
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row"
  },
  topContainerLarge: {
    paddingVertical: customVariables.contentPadding / 2,
    paddingHorizontal: customVariables.contentPadding,
    backgroundColor: customVariables.brandGray
  },
  topContainerPaid: {
    paddingVertical: 0,
    paddingHorizontal: 0
  }
});

/**
 * A component to show the action buttons of a message.
 * For messages with the proper configuration renders, on a row:
 * - a calendar icon
 * - a button to add/remove a calendar event
 * - a button to show/start a payment
 * - cta defined inside the markdown content as front-matter
 */
class MessageListCTABar extends React.PureComponent<Props> {
  get paymentExpirationInfo() {
    return paymentExpirationInfo(this.props.message);
  }

  get paid(): boolean {
    return this.props.payment !== undefined;
  }

  get isPaymentExpirable() {
    return this.paymentExpirationInfo.fold(false, isExpirable);
  }

  get isPaymentExpired() {
    return this.paymentExpirationInfo.fold(false, isExpired);
  }

  get isPaymentExpiring() {
    return this.paymentExpirationInfo.fold(false, isExpiring);
  }

  get hasPaymentData() {
    return this.paymentExpirationInfo.fold(false, _ => true);
  }

  get dueDate(): Option<Date> {
    return fromNullable(this.props.message.content.due_date);
  }

  public componentDidMount() {
    if (!this.props.serviceMetadata && this.props.service) {
      this.props.loadServiceMetadata(this.props.service);
    }
  }

  private renderEUCovidViewCTA() {
    return (
      euCovidCertificateEnabled &&
      this.props.message.content.eu_covid_cert && (
        <ViewEUCovidButton onPress={this.props.onEUCovidCTAPress} />
      )
    );
  }

  private renderCalendarIcon = () => {
    const { dueDate } = this;

    // The calendar icon is shown if:
    // - the message has a due date
    // - the payment related to the message is not yet paid
    // - the payment related to the message is not yet expired
    if (dueDate.isSome() && !this.paid && !this.isPaymentExpired) {
      return (
        <CalendarIconComponent
          small={true}
          month={capitalize(formatDateAsMonth(dueDate.value))}
          day={formatDateAsDay(dueDate.value)}
          backgroundColor={customVariables.brandDarkGray}
          textColor={customVariables.colorWhite}
        />
      );
    }
    return undefined;
  };

  // Render a button to add/remove an event related to the message in the calendar
  private renderCalendarEventButton = () =>
    // The add/remove reminder button is shown if:
    // - if the message has a due date
    // - if the message has a payment and it is not paid nor expired
    this.dueDate
      .filter(() => !this.paid && !this.isPaymentExpired)
      .fold(undefined, _ => (
        <CalendarEventButton
          small={true}
          disabled={this.props.disabled}
          message={this.props.message}
        />
      ));

  public render() {
    const calendarIcon = this.renderCalendarIcon();
    const calendarEventButton = this.renderCalendarEventButton();
    const euCovidCertCTA = this.renderEUCovidViewCTA();
    const maybeCTA = getCTA(this.props.message, this.props.serviceMetadata);
    const isPaymentStillValid =
      !this.isPaymentExpirable || !this.isPaymentExpired;
    const nestedCTA =
      !this.hasPaymentData && maybeCTA.isSome() ? (
        <ExtractedCTABar
          ctas={maybeCTA.value}
          xsmall={true}
          dispatch={this.props.dispatch}
          serviceMetadata={this.props.serviceMetadata}
          service={this.props.service}
        />
      ) : null;
    /**
     * cta priority
     * 1. eu covid
     * 2. nested CTA (cta included in message content front-matter)
     * 3. calendar
     */
    const content =
      euCovidCertCTA ||
      nestedCTA ||
      (isPaymentStillValid && (calendarIcon || calendarEventButton) && (
        <>
          {calendarIcon}
          {calendarIcon && <View hspacer={true} small={true} />}
          {calendarEventButton}
          {calendarEventButton && <View hspacer={true} small={true} />}
        </>
      ));
    if (!content) {
      return null;
    }
    return (
      <>
        <View spacer={true} large={true} />
        <View
          style={[styles.topContainer, this.paid && styles.topContainerPaid]}
          accessible={false}
          accessibilityElementsHidden={true}
          importantForAccessibility={"no-hide-descendants"}
        >
          {content}
        </View>
      </>
    );
  }
}

const mapStateToProps = (state: GlobalState, ownProps: OwnProps) => {
  const servicesMetadataByID = servicesMetadataByIdSelector(state);

  return {
    serviceMetadata: ownProps.service
      ? servicesMetadataByID[ownProps.service.service_id]
      : pot.none
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadServiceMetadata: (service: ServicePublic) =>
    dispatch(loadServiceMetadata.request(service.service_id)),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageListCTABar);
