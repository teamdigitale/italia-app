import React, { FC, useEffect, useState } from "react";
import { List } from "native-base";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import I18n from "../../i18n";
import { GlobalState } from "../../store/reducers/types";
import { getFingerprintSettings } from "../../sagas/startup/checkAcknowledgedFingerprintSaga";
import TopScreenComponent from "../../components/screens/TopScreenComponent";
import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import ScreenContent from "../../components/screens/ScreenContent";
import ListItemComponent from "../../components/screens/ListItemComponent";
import { navigateToFingerprintSecurityScreen } from "../../store/actions/navigation";
import { updatePin } from "../../store/actions/pinset";
import { identificationRequest } from "../../store/actions/identification";
import { shufflePinPadOnPayment } from "../../config";

// FIXME: ADD CORRECT FAQ TITLE AND DESCRIPTION
const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "profile.preferences.contextualHelpTitle",
  body: "profile.preferences.contextualHelpContent"
};

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const SecurityScreen: FC<Props> = ({
  isFingerprintEnabled,
  navigateToFingerprintSecurityScreen,
  requestIdentificationAndResetPin
}): JSX.Element => {
  const [isFingerprintAvailable, setisFingerprintAvailable] = useState(false);

  useEffect(() => {
    getFingerprintSettings().then(
      biometryTypeOrUnsupportedReason => {
        setisFingerprintAvailable(
          biometryTypeOrUnsupportedReason !== "UNAVAILABLE" &&
            biometryTypeOrUnsupportedReason !== "NOT_ENROLLED"
        );
      },
      _ => undefined
    );
  }, []);

  return (
    <TopScreenComponent
      contextualHelpMarkdown={contextualHelpMarkdown}
      // FIXME: ADD FAQ CATEGORIES
      faqCategories={[]}
      goBack
    >
      <ScreenContent
        title={I18n.t("profile.security.title")}
        subtitle={I18n.t("profile.security.subtitle")}
      >
        <List withContentLateralPadding>
          {/* Enable/disable biometric authentication */}
          {isFingerprintAvailable && (
            <ListItemComponent
              title={I18n.t("profile.security.list.biometric_recognition")}
              onPress={navigateToFingerprintSecurityScreen}
              subTitle={
                isFingerprintEnabled
                  ? I18n.t(
                      "profile.security.list.biometric_recognition_status.enabled"
                    )
                  : I18n.t(
                      "profile.security.list.biometric_recognition_status.disabled"
                    )
              }
            />
          )}
          {/* Ask for verification and reset unlock code */}
          <ListItemComponent
            title={I18n.t("identification.unlockCode.reset.button_short")}
            subTitle={I18n.t("identification.unlockCode.reset.subtitle")}
            onPress={requestIdentificationAndResetPin}
          />
        </List>
      </ScreenContent>
    </TopScreenComponent>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigateToFingerprintSecurityScreen: () =>
    dispatch(navigateToFingerprintSecurityScreen()),
  requestIdentificationAndResetPin: () => {
    const onSuccess = () => dispatch(updatePin());

    return dispatch(
      identificationRequest(
        true,
        false,
        undefined,
        undefined,
        {
          onSuccess
        },
        shufflePinPadOnPayment
      )
    );
  }
});

const mapStateToProps = (state: GlobalState) => ({
  isFingerprintEnabled: state.persistedPreferences.isFingerprintEnabled
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityScreen);
