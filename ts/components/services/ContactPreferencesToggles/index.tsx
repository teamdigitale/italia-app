import * as pot from "italia-ts-commons/lib/pot";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { fromNullable } from "fp-ts/lib/Option";
import { GlobalState } from "../../../store/reducers/types";
import I18n from "../../../i18n";
import ItemSeparatorComponent from "../../ItemSeparatorComponent";
import { NotificationChannelEnum } from "../../../../definitions/backend/NotificationChannel";
import { Dispatch } from "../../../store/actions/types";
import {
  servicePreferenceSelector,
  ServicePreferenceState
} from "../../../store/reducers/entities/services/servicePreference";
import { ServiceId } from "../../../../definitions/backend/ServiceId";
import {
  loadServicePreference,
  upsertServicePreference
} from "../../../store/actions/services/servicePreference";
import {
  isServicePreferenceResponseSuccess,
  ServicePreference
} from "../../../types/services/ServicePreferenceResponse";
import { isStrictSome } from "../../../utils/pot";
import { showToast } from "../../../utils/showToast";
import SectionHeader from "../SectionHeader";
import PreferenceToggleRow from "./PreferenceToggleRow";

type Item = "email" | "push" | "inbox";

type Props = {
  channels?: ReadonlyArray<NotificationChannelEnum>;
  serviceId: ServiceId;
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const hasChannel = (
  channel: NotificationChannelEnum,
  channels?: ReadonlyArray<NotificationChannelEnum>
) =>
  fromNullable(channels)
    .map(anc => anc.indexOf(channel) !== -1)
    .getOrElse(true);

/**
 * Utility function to get the user preference value for a specific channel
 * return false if preference state is pot.none or if an error occurred on API Response
 * */
const getChannelPreference = (
  potServicePreference: ServicePreferenceState,
  key: Item
): boolean => {
  if (
    pot.isSome(potServicePreference) &&
    isServicePreferenceResponseSuccess(potServicePreference.value)
  ) {
    return potServicePreference.value.value[key];
  }
  return false;
};

const ContactPreferencesToggle: React.FC<Props> = (props: Props) => {
  const { isLoading, isError } = props;
  const [isFirstRender, setIsFirstRender] = useState(true);

  const loadPreferences = () => props.loadServicePreference(props.serviceId);

  useEffect(() => {
    loadPreferences();
  }, [props.serviceId]);

  useEffect(() => {
    if (!isFirstRender) {
      if (isError) {
        showToast(I18n.t("global.genericError"));
      }
    } else {
      setIsFirstRender(false);
    }
  }, [isError]);

  const onValueChange = (value: boolean, type: Item) => {
    if (
      isStrictSome(props.servicePreferenceStatus) &&
      isServicePreferenceResponseSuccess(props.servicePreferenceStatus.value)
    ) {
      props.upsertServicePreference(props.serviceId, {
        ...props.servicePreferenceStatus.value.value,
        [type]: value
      });
    }
  };

  const graphicalState = useMemo(
    () => (isLoading ? "loading" : isError ? "error" : "ready"),
    [isLoading, isError]
  );

  return (
    <>
      <SectionHeader
        iconName="io-envelope"
        title={"serviceDetail.contacts.title"}
      />
      <PreferenceToggleRow
        label={I18n.t("services.serviceIsEnabled")}
        onPress={(value: boolean) => onValueChange(value, "inbox")}
        graphicalState={graphicalState}
        onReload={loadPreferences}
        value={getChannelPreference(props.servicePreferenceStatus, "inbox")}
        testID={"contact-preferences-inbox-switch"}
      />
      <ItemSeparatorComponent noPadded />
      {hasChannel(NotificationChannelEnum.WEBHOOK, props.channels) &&
        getChannelPreference(props.servicePreferenceStatus, "inbox") && (
          // toggle is disabled if the inbox value is false to prevent inconsistent data
          <>
            <PreferenceToggleRow
              label={I18n.t("services.pushNotifications")}
              onPress={(value: boolean) => onValueChange(value, "push")}
              value={getChannelPreference(
                props.servicePreferenceStatus,
                "push"
              )}
              graphicalState={graphicalState}
              onReload={loadPreferences}
              testID={"contact-preferences-webhook-switch"}
            />
            <ItemSeparatorComponent noPadded />
          </>
        )}

      {/* Email toggle is temporary removed until the feature will be enabled back from the backend */}
      {/* TODO this option should be reintegrated once option will supported back from backend https://pagopa.atlassian.net/browse/IARS-17 */}
      {/* {hasChannel(NotificationChannelEnum.EMAIL, props.channels) && getChannelPreference(props.servicePreferenceStatus, "inbox") && ( */}
      {/*  <> */}
      {/*    <PreferenceToggleRow */}
      {/*      label={I18n.t("services.emailForwarding")} */}
      {/*      onPress={(value: boolean) => onValueChange(value, "email")} */}
      {/*      value={getChannelPreference(props.servicePreferenceStatus, "email")} */}
      {/*      graphicalState={graphicalState} */}
      {/*      isError={isError} */}
      {/*      testID={"contact-preferences-email-switch"} */}
      {/*    /> */}
      {/*    <ItemSeparatorComponent noPadded /> */}
      {/*  </> */}
      {/* )} */}
    </>
  );
};

const mapStateToProps = (state: GlobalState) => {
  const servicePreferenceStatus = servicePreferenceSelector(state);
  const isLoading =
    pot.isLoading(servicePreferenceStatus) ||
    pot.isUpdating(servicePreferenceStatus);

  const isError =
    pot.isError(servicePreferenceStatus) ||
    (isStrictSome(servicePreferenceStatus) &&
      servicePreferenceStatus.value.kind !== "success");

  return {
    isLoading,
    isError,
    servicePreferenceStatus
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  upsertServicePreference: (id: ServiceId, sp: ServicePreference) =>
    dispatch(upsertServicePreference.request({ id, ...sp })),
  loadServicePreference: (id: ServiceId) =>
    dispatch(loadServicePreference.request(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPreferencesToggle);
