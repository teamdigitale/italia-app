import { View } from "native-base";
import * as React from "react";
import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { CaptureOptions } from "react-native-view-shot";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import FooterWithButtons from "../../../../components/ui/FooterWithButtons";
import I18n from "../../../../i18n";
import { mixpanelTrack } from "../../../../mixpanel";
import { GlobalState } from "../../../../store/reducers/types";
import themeVariables from "../../../../theme/variables";
import {
  cancelButtonProps,
  confirmButtonProps
} from "../../../bonus/bonusVacanze/components/buttons/ButtonConfigurations";
import { MarkdownHandleCustomLink } from "../../components/MarkdownHandleCustomLink";
import {
  navigateToEuCovidCertificateMarkdownDetailsScreen,
  navigateToEuCovidCertificateQrCodeFullScreen
} from "../../navigation/actions";
import { ValidCertificate } from "../../types/EUCovidCertificate";
import {
  BaseEuCovidCertificateLayout,
  Header
} from "../BaseEuCovidCertificateLayout";
import { useIOBottomSheet } from "../../../../utils/bottomSheet";
import ButtonDefaultOpacity from "../../../../components/ButtonDefaultOpacity";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import { H3 } from "../../../../components/core/typography/H3";
import { H5 } from "../../../../components/core/typography/H5";
import IconFont from "../../../../components/ui/IconFont";
import { IOColors } from "../../../../components/core/variables/IOColors";
import { showToast } from "../../../../utils/showToast";
import { captureScreenShoot } from "../../utils/screenshoot";
import {
  FlashAnimatedComponent,
  FlashAnimationState
} from "../../components/FlashAnimatedComponent";
import { euCovidCertCurrentSelector } from "../../store/reducers/current";

type OwnProps = {
  validCertificate: ValidCertificate;
};

const styles = StyleSheet.create({
  qrCode: {
    // TODO: it's preferable to use the hook useWindowDimensions, but we need to upgrade react native
    width: Dimensions.get("window").width - themeVariables.contentPadding * 2,
    height: Dimensions.get("window").width - themeVariables.contentPadding * 2,
    flex: 1
  },
  container: {
    paddingRight: 0,
    paddingLeft: 0,
    marginVertical: 20,
    height: 60,
    backgroundColor: IOColors.white
  },
  flexColumn: {
    flexDirection: "column",
    flex: 1
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  }
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  OwnProps;

type EuCovidCertValidComponentProps = Props & {
  markdownWebViewStyle?: StyleProp<ViewStyle>;
  messageId?: string;
};
const EuCovidCertValidComponent = (
  props: EuCovidCertValidComponentProps
): React.ReactElement => (
  <View>
    {props.validCertificate.qrCode.mimeType === "image/png" && (
      <TouchableOpacity
        testID={"QRCode"}
        accessible={true}
        accessibilityRole={"imagebutton"}
        accessibilityLabel={I18n.t(
          "features.euCovidCertificate.valid.accessibility.qrCode"
        )}
        accessibilityHint={I18n.t(
          "features.euCovidCertificate.valid.accessibility.hint"
        )}
        onPress={() =>
          props.navigateToQrCodeFullScreen(
            props.validCertificate.qrCode.content
          )
        }
      >
        <Image
          source={{
            uri: `data:image/png;base64,${props.validCertificate.qrCode.content}`
          }}
          style={styles.qrCode}
          onError={() => {
            void mixpanelTrack("EUCOVIDCERT_QRCODE_IMAGE_NOT_VALID", {
              messageId: props.messageId
            });
          }}
        />
      </TouchableOpacity>
    )}
    {props.validCertificate.markdownInfo && (
      <View style={props.markdownWebViewStyle}>
        <MarkdownHandleCustomLink
          testID={"markdownPreview"}
          extraBodyHeight={60}
        >
          {props.validCertificate.markdownInfo}
        </MarkdownHandleCustomLink>
        <View spacer={true} />
      </View>
    )}
  </View>
);

const showToastError = (error: string = I18n.t("global.genericError")) =>
  showToast(error);
const addBottomSheetItem = (config: {
  title: string;
  subTitle: string;
  onPress: () => void;
}) => (
  <ButtonDefaultOpacity
    onPress={config.onPress}
    style={styles.container}
    onPressWithGestureHandler={true}
  >
    <View style={styles.flexColumn}>
      <View style={styles.row}>
        <View style={IOStyles.flex}>
          <H3 color={"bluegreyDark"} weight={"SemiBold"}>
            {config.title}
          </H3>
          <H5 color={"bluegrey"} weight={"Regular"}>
            {config.subTitle}
          </H5>
        </View>
        <IconFont name={"io-right"} color={IOColors.blue} size={24} />
      </View>
    </View>
    <View spacer={true} large={true} />
    <View spacer={true} large={true} />
  </ButtonDefaultOpacity>
);

type FooterProps = Props & { onSave: () => void };
const Footer = (props: FooterProps): React.ReactElement => {
  const { present: presentBottomSheet, dismiss } = useIOBottomSheet(
    <View>
      {addBottomSheetItem({
        title: I18n.t(
          "features.euCovidCertificate.save.bottomSheet.saveAsImage.title"
        ),
        subTitle: I18n.t(
          "features.euCovidCertificate.save.bottomSheet.saveAsImage.subTitle"
        ),
        onPress: () => {
          props.onSave();
          dismiss();
        }
      })}
    </View>,
    <View style={IOStyles.flex}>
      <H3 color={"bluegreyDark"} weight={"SemiBold"}>
        {I18n.t("features.euCovidCertificate.save.bottomSheet.title")}
      </H3>
      <H5 color={"bluegrey"} weight={"Regular"}>
        {I18n.t("features.euCovidCertificate.save.bottomSheet.subTitle")}
      </H5>
      <View spacer={true} />
      <View spacer={true} />
    </View>,
    320
  );

  const saveButton = confirmButtonProps(
    presentBottomSheet,
    I18n.t("global.genericSave")
  );
  const markdownDetails = props.validCertificate.markdownDetails;

  return markdownDetails ? (
    <FooterWithButtons
      type={"TwoButtonsInlineHalf"}
      leftButton={cancelButtonProps(
        () => props.navigateToMarkdown(markdownDetails),
        I18n.t("global.buttons.details")
      )}
      rightButton={saveButton}
    />
  ) : (
    <FooterWithButtons type={"SingleButton"} leftButton={saveButton} />
  );
};

const screenShotOption: CaptureOptions = {
  width: Dimensions.get("window").width,
  format: "jpg",
  quality: 1.0
};
const EuCovidCertValidScreen = (props: Props): React.ReactElement => {
  const screenShotViewContainer = React.createRef<View>();
  const [flashAnimationState, setFlashAnimationState] = useState<
    FlashAnimationState
  >();
  const [isCapturingScreenShoot, setIsCapturingScreenShoot] = useState(false);
  React.useEffect(() => {
    if (isCapturingScreenShoot) {
      // at the end of fadeIn animation, the views inside screenShotViewContainerRef
      // will be captured in an screenshot image
      setFlashAnimationState("fadeIn");
    }
  }, [isCapturingScreenShoot]);

  const saveScreenShoot = () => {
    // it should not never happen
    if (screenShotViewContainer.current === null) {
      showToastError();
      return;
    }
    captureScreenShoot(screenShotViewContainer, screenShotOption, {
      onSuccess: () =>
        showToast(I18n.t("features.euCovidCertificate.save.ok"), "success"),
      onNoPermissions: () =>
        showToast(I18n.t("features.euCovidCertificate.save.noPermission")),
      onError: () => showToast(I18n.t("global.genericError")),
      onEnd: () => {
        setFlashAnimationState("fadeOut");
        setIsCapturingScreenShoot(false);
      }
    });
  };
  return (
    <BaseEuCovidCertificateLayout
      testID={"EuCovidCertValidScreen"}
      content={
        <View
          collapsable={false}
          ref={screenShotViewContainer}
          style={[IOStyles.flex, { backgroundColor: IOColors.white }]}
        >
          {/* add extra space (top,sides,bottom) and padding while capturing the screenshot */}
          {isCapturingScreenShoot && <View spacer={true} large={true} />}
          {isCapturingScreenShoot && (
            <View style={IOStyles.horizontalContentPadding}>
              <Header />
            </View>
          )}
          {isCapturingScreenShoot && <View spacer={true} large={true} />}
          <EuCovidCertValidComponent
            messageId={props.euCovidCert?.messageId}
            {...props}
            markdownWebViewStyle={
              isCapturingScreenShoot
                ? IOStyles.horizontalContentPadding
                : undefined
            }
          />
          {isCapturingScreenShoot && <View spacer={true} large={true} />}
        </View>
      }
      footer={
        <>
          <Footer
            {...props}
            onSave={() => {
              void mixpanelTrack("EUCOVIDCERT_SAVE_QRCODE");
              setIsCapturingScreenShoot(true);
            }}
          />
          {/* this view must be the last one, since it must be drawn on top of all */}
          <FlashAnimatedComponent
            state={flashAnimationState}
            onFadeInCompleted={saveScreenShoot}
          />
        </>
      }
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigateToQrCodeFullScreen: (qrCodeContent: string) =>
    dispatch(navigateToEuCovidCertificateQrCodeFullScreen({ qrCodeContent })),
  navigateToMarkdown: (markdownDetails: string) =>
    dispatch(
      navigateToEuCovidCertificateMarkdownDetailsScreen({ markdownDetails })
    )
});
const mapStateToProps = (state: GlobalState) => ({
  euCovidCert: euCovidCertCurrentSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EuCovidCertValidScreen);
