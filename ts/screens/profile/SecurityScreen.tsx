import React, { FC, useEffect, useState } from "react";
import { Alert } from "react-native";
import { List } from "native-base";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import TouchID, { AuthenticationError } from "react-native-touch-id";
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
import { authenticateConfig } from "../../utils/biometric";
import { showToast } from "../../utils/showToast";
import { preferenceFingerprintIsEnabledSaveSuccess } from "../../store/actions/persistedPreferences";
import { openAppSecuritySettings } from "../../utils/appSettings";
import Switch from "../../components/ui/Switch";

// FIXME: ADD CORRECT FAQ TITLE AND DESCRIPTION
const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "profile.preferences.contextualHelpTitle",
  body: "profile.preferences.contextualHelpContent"
};

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const SecurityScreen: FC<Props> = ({
  isFingerprintEnabled,
  requestIdentificationAndResetPin,
  setFingerprintPreference
}): JSX.Element => {
  const [isFingerprintAvailable, setIsFingerprintAvailable] = useState(false);

  useEffect(() => {
    getFingerprintSettings().then(
      biometryTypeOrUnsupportedReason => {
        setIsFingerprintAvailable(
          biometryTypeOrUnsupportedReason !== "UNAVAILABLE" &&
            biometryTypeOrUnsupportedReason !== "NOT_ENROLLED"
        );
      },
      _ => undefined
    );
  }, []);

  const onPressBiometricRecognition = () => {
    if (!isFingerprintAvailable) {
      Alert.alert(
        I18n.t("profile.security.list.biometric_recognition.popup.title"),
        I18n.t("profile.security.list.biometric_recognition.popup.description"),
        [
          {
            text: I18n.t("global.buttons.cancel"),
            style: "cancel"
          },
          {
            text: I18n.t("global.buttons.settings"),
            onPress: openAppSecuritySettings
          }
        ],
        { cancelable: true }
      );
    }
  };

  const setBiometricPreference = (biometricPreference: boolean): void => {
    if (biometricPreference) {
      // if user asks to enable biometric then call enable action directly
      setFingerprintPreference(biometricPreference);
      return;
    }
    // if user asks to disable biometric recnognition is required to proceed
    TouchID.authenticate(
      I18n.t("identification.biometric.popup.title"),
      authenticateConfig
    )
      .then(() => setFingerprintPreference(biometricPreference))
      .catch((_: AuthenticationError) =>
        // this toast will be show either if recognition fails (mismatch or user aborts)
        // or if meanwhile user disables biometric recognition in OS settings
        showToast(I18n.t("biometric_recognition.needed_to_disable"), "danger")
      );
  };

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
          {/* Ask for verification and reset unlock code */}
          <ListItemComponent
            title={I18n.t("identification.unlockCode.reset.button_short")}
            subTitle={I18n.t("identification.unlockCode.reset.subtitle")}
            onPress={requestIdentificationAndResetPin}
          />
          {/* Enable/disable biometric authentication */}
          <ListItemComponent
            title={I18n.t("profile.security.list.biometric_recognition.title")}
            subTitle={I18n.t(
              "profile.security.list.biometric_recognition.subtitle"
            )}
            onPress={onPressBiometricRecognition}
            onSwitchValueChanged={setBiometricPreference}
            switchValue={isFingerprintEnabled}
            switchDisabled={!isFingerprintAvailable}
            isLongPressEnabled
          />
        </List>
      </ScreenContent>
    </TopScreenComponent>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
  },
  setFingerprintPreference: (fingerprintPreference: boolean) =>
    dispatch(
      preferenceFingerprintIsEnabledSaveSuccess({
        isFingerprintEnabled: fingerprintPreference
      })
    )
});

const mapStateToProps = (state: GlobalState) => ({
  isFingerprintEnabled: state.persistedPreferences.isFingerprintEnabled
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityScreen);
