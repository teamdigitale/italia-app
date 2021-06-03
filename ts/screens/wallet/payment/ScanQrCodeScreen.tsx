/**
 * The screen allows to identify a transaction by the QR code on the analogic notice
 */
import { AmountInEuroCents, RptId } from "italia-pagopa-commons/lib/pagopa";
import { ITuple2 } from "italia-ts-commons/lib/tuples";
import { Container, Text, View } from "native-base";
import * as React from "react";
import { Alert, Dimensions, ScrollView, StyleSheet } from "react-native";

import ImagePicker from "react-native-image-picker";
import * as ReaderQR from "react-native-lewin-qrcode";
import QRCodeScanner from "react-native-qrcode-scanner";
import { NavigationEvents, NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import ButtonDefaultOpacity from "../../../components/ButtonDefaultOpacity";
import BaseScreenComponent, {
  ContextualHelpPropsMarkdown
} from "../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../components/ui/FooterWithButtons";
import { CameraMarker } from "../../../components/wallet/CameraMarker";

import I18n from "../../../i18n";
import {
  navigateToPaymentManualDataInsertion,
  navigateToPaymentTransactionSummaryScreen,
  navigateToWalletHome
} from "../../../store/actions/navigation";
import { Dispatch } from "../../../store/actions/types";
import { paymentInitializeState } from "../../../store/actions/wallet/payment";
import variables from "../../../theme/variables";
import customVariables from "../../../theme/variables";
import { ComponentProps } from "../../../types/react";
import { openAppSettings } from "../../../utils/appSettings";
import { decodePagoPaQrCode } from "../../../utils/payment";
import { showToast } from "../../../utils/showToast";

type OwnProps = NavigationInjectedProps;

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

type State = {
  scanningState: ComponentProps<typeof CameraMarker>["state"];
  isFocused: boolean;
};

const screenWidth = Dimensions.get("screen").width;
const cameraTextOverlapping = 20;

const styles = StyleSheet.create({
  padded: {
    paddingRight: variables.contentPadding,
    paddingLeft: variables.contentPadding
  },

  white: {
    backgroundColor: variables.brandPrimaryInverted
  },

  bottomText: {
    paddingTop: cameraTextOverlapping
  },

  content: {
    backgroundColor: variables.colorWhite,
    marginTop: -cameraTextOverlapping,
    zIndex: 1
  },

  cameraContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  button: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: -cameraTextOverlapping,
    width: screenWidth - variables.contentPadding * 2,
    backgroundColor: variables.colorWhite,
    zIndex: 999
  },

  camera: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: screenWidth
  },

  notAuthorizedContainer: {
    padding: variables.contentPadding,
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: 14
  },
  notAuthorizedText: {
    marginBottom: 25
  },
  notAuthorizedBtn: {
    flex: 1,
    alignSelf: "stretch"
  }
});

/**
 * Delay for reactivating the QR scanner after a scan
 */
const QRCODE_SCANNER_REACTIVATION_TIME_MS = 5000;

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "wallet.QRtoPay.contextualHelpTitle",
  body: "wallet.QRtoPay.contextualHelpContent"
};
class ScanQrCodeScreen extends React.Component<Props, State> {
  private scannerReactivateTimeoutHandler?: number;
  private goBack = () => this.props.navigation.goBack();
  private qrCodeScanner = React.createRef<QRCodeScanner>();

  /**
   * Handles valid pagoPA QR codes
   */
  private onValidQrCode = (data: ITuple2<RptId, AmountInEuroCents>) => {
    this.setState({
      scanningState: "VALID"
    });
    this.props.runPaymentTransactionSummarySaga(data.e1, data.e2);
  };

  /**
   * Handles invalid pagoPA QR codes
   */
  private onInvalidQrCode = () => {
    showToast(I18n.t("wallet.QRtoPay.wrongQrCode"), "danger");

    this.setState({
      scanningState: "INVALID"
    });
    // eslint-disable-next-line
    this.scannerReactivateTimeoutHandler = setTimeout(() => {
      // eslint-disable-next-line
      this.scannerReactivateTimeoutHandler = undefined;
      if (this.qrCodeScanner.current) {
        this.qrCodeScanner.current.reactivate();
        this.setState({
          scanningState: "SCANNING"
        });
      }
    }, QRCODE_SCANNER_REACTIVATION_TIME_MS);
  };

  /**
   * Gets called by the QR code reader on new QR code reads
   */
  private onQrCodeData = (data: string) => {
    const resultOrError = decodePagoPaQrCode(data);
    resultOrError.foldL<void>(this.onInvalidQrCode, this.onValidQrCode);
  };

  /**
   * Start image chooser
   */
  private showImagePicker = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: "images"
      },
      // PermissionDenied message only for Android
      permissionDenied: {
        title: I18n.t("wallet.QRtoPay.settingsAlert.title"),
        text: I18n.t("wallet.QRtoPay.settingsAlert.message"),
        okTitle: I18n.t("wallet.QRtoPay.settingsAlert.buttonText.cancel"),
        reTryTitle: I18n.t("wallet.QRtoPay.settingsAlert.buttonText.settings")
      }
    };
    // Open Image Library
    ImagePicker.launchImageLibrary(options, response => {
      const path = response.path ? response.path : response.uri;
      if (path != null) {
        ReaderQR.readerQR(path)
          .then((data: string) => {
            this.onQrCodeData(data);
          })
          .catch(() => {
            this.onInvalidQrCode();
          });
      } else if (response.error !== undefined) {
        // Alert to invite user to enable the permissions
        Alert.alert(
          I18n.t("wallet.QRtoPay.settingsAlert.title"),
          I18n.t("wallet.QRtoPay.settingsAlert.message"),
          [
            {
              text: I18n.t("wallet.QRtoPay.settingsAlert.buttonText.cancel"),
              style: "cancel"
            },
            {
              text: I18n.t("wallet.QRtoPay.settingsAlert.buttonText.settings"),
              onPress: openAppSettings
            }
          ],
          { cancelable: false }
        );
      } // else if the user has not selected a file, do nothing
    });
  };

  public constructor(props: Props) {
    super(props);
    this.state = {
      scanningState: "SCANNING",
      isFocused: false
    };
  }

  public componentWillUnmount() {
    if (this.scannerReactivateTimeoutHandler) {
      // cancel the QR scanner reactivation before unmounting the component
      clearTimeout(this.scannerReactivateTimeoutHandler);
    }
  }

  private handleDidFocus = () => this.setState({ isFocused: true });

  private handleWillBlur = () => this.setState({ isFocused: false });

  public render(): React.ReactNode {
    const primaryButtonProps = {
      buttonFontSize: customVariables.btnFontSize - 1,
      block: true,
      primary: true,
      onPress: this.props.navigateToPaymentManualDataInsertion,
      title: I18n.t("wallet.QRtoPay.setManually")
    };

    const secondaryButtonProps = {
      buttonFontSize: customVariables.btnFontSize - 1,
      block: true,
      cancel: true,
      onPress: this.props.navigation.goBack,
      title: I18n.t("global.buttons.cancel")
    };

    return (
      <Container style={styles.white}>
        <NavigationEvents
          onDidFocus={this.handleDidFocus}
          onWillBlur={this.handleWillBlur}
        />
        <BaseScreenComponent
          headerTitle={I18n.t("wallet.QRtoPay.byCameraTitle")}
          goBack={this.goBack}
          contextualHelpMarkdown={contextualHelpMarkdown}
          faqCategories={["wallet"]}
        >
          <ScrollView bounces={false}>
            {this.state.isFocused && (
              <QRCodeScanner
                onRead={(reading: { data: string }) =>
                  this.onQrCodeData(reading.data)
                }
                ref={this.qrCodeScanner}
                containerStyle={styles.cameraContainer as any}
                showMarker={true}
                cameraStyle={styles.camera as any}
                customMarker={
                  <CameraMarker
                    screenWidth={screenWidth}
                    state={this.state.scanningState}
                  />
                }
                bottomContent={
                  <View>
                    <ButtonDefaultOpacity
                      onPress={this.showImagePicker}
                      style={styles.button}
                      bordered={true}
                    >
                      <Text>{I18n.t("wallet.QRtoPay.chooser")}</Text>
                    </ButtonDefaultOpacity>
                    <View style={styles.content}>
                      <View spacer={true} />
                      <Text style={[styles.padded, styles.bottomText]}>
                        {I18n.t("wallet.QRtoPay.cameraUsageInfo")}
                      </Text>
                      <View spacer={true} extralarge={true} />
                    </View>
                  </View>
                }
                // "captureAudio" enable/disable microphone permission
                cameraProps={{ captureAudio: false }}
                // "checkAndroid6Permissions" property enables permission checking for
                // Android versions greater than 6.0 (23+).
                checkAndroid6Permissions={true}
                permissionDialogTitle={I18n.t(
                  "wallet.QRtoPay.cameraUsagePermissionInfobox.title"
                )}
                permissionDialogMessage={I18n.t(
                  "wallet.QRtoPay.cameraUsagePermissionInfobox.message"
                )}
                // "notAuthorizedView" is by default available on iOS systems ONLY.
                // In order to make Android systems act the same as iOSs you MUST
                // enable "checkAndroid6Permissions" property as well.
                // On devices before SDK version 23, the permissions are automatically
                // granted if they appear in the manifest, so message customization would
                // be impossible.
                notAuthorizedView={
                  <View style={styles.notAuthorizedContainer}>
                    <Text style={styles.notAuthorizedText}>
                      {I18n.t("wallet.QRtoPay.enroll_cta")}
                    </Text>

                    <ButtonDefaultOpacity
                      onPress={openAppSettings}
                      style={styles.notAuthorizedBtn}
                    >
                      <Text>{I18n.t("global.buttons.settings")}</Text>
                    </ButtonDefaultOpacity>
                  </View>
                }
              />
            )}
          </ScrollView>
        </BaseScreenComponent>
        <FooterWithButtons
          type="TwoButtonsInlineThird"
          leftButton={secondaryButtonProps}
          rightButton={primaryButtonProps}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigateToWalletHome: () => dispatch(navigateToWalletHome()),
  navigateToPaymentManualDataInsertion: () =>
    dispatch(navigateToPaymentManualDataInsertion()),
  runPaymentTransactionSummarySaga: (
    rptId: RptId,
    initialAmount: AmountInEuroCents
  ) => {
    dispatch(paymentInitializeState());
    dispatch(
      navigateToPaymentTransactionSummaryScreen({
        rptId,
        initialAmount
      })
    );
  }
});

export default connect(undefined, mapDispatchToProps)(ScanQrCodeScreen);
