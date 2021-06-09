import { View } from "native-base";
import * as React from "react";
import { useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { CaptureOptions } from "react-native-view-shot";
import { NavigationInjectedProps } from "react-navigation";
import ButtonDefaultOpacity from "../../../../components/ButtonDefaultOpacity";
import { Label } from "../../../../components/core/typography/Label";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import BaseScreenComponent from "../../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../../components/ui/FooterWithButtons";
import I18n from "../../../../i18n";
import { mixpanelTrack } from "../../../../mixpanel";
import { emptyContextualHelp } from "../../../../utils/emptyContextualHelp";
import { showToast } from "../../../../utils/showToast";
import { cancelButtonProps } from "../../../bonus/bonusVacanze/components/buttons/ButtonConfigurations";
import {
  FlashAnimatedComponent,
  FlashAnimationState
} from "../../components/FlashAnimatedComponent";
import { MarkdownHandleCustomLink } from "../../components/MarkdownHandleCustomLink";
import { captureScreenShoot } from "../../utils/screenshoot";

type NavigationParams = Readonly<{
  markdownDetails: string;
}>;

const styles = StyleSheet.create({
  viewShot: {
    flex: 1,
    backgroundColor: "white"
  },
  save: {
    width: "100%"
  }
});

const showToastError = (error: string = I18n.t("global.genericError")) =>
  showToast(error);
const screenShotOption: CaptureOptions = {
  width: Dimensions.get("window").width,
  format: "jpg",
  quality: 1.0
};

export const EuCovidCertMarkdownDetailsScreen = (
  props: NavigationInjectedProps<NavigationParams>
): React.ReactElement => {
  const [loadMarkdownComplete, setLoadMarkdownComplete] = useState(false);
  const [isCapturingScreenShoot, setIsCapturingScreenShoot] = useState(false);
  const [flashAnimationState, setFlashAnimationState] = useState<
    FlashAnimationState
  >();
  const screenShotViewContainerRef = React.createRef<View>();

  React.useEffect(() => {
    if (isCapturingScreenShoot) {
      // at the end of fadeIn animation, the views inside screenShotViewContainerRef
      // will be captured in an screenshot image
      setFlashAnimationState("fadeIn");
    }
  }, [isCapturingScreenShoot]);

  const saveScreenShoot = () => {
    // it should not never happen
    if (screenShotViewContainerRef.current === null) {
      showToastError();
      setIsCapturingScreenShoot(false);
      return;
    }
    captureScreenShoot(screenShotViewContainerRef, screenShotOption, {
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
  // show button when markdown is loaded and it is not capturing the screenshot
  const canShowButton = !isCapturingScreenShoot && loadMarkdownComplete;
  return (
    <BaseScreenComponent
      goBack={true}
      headerTitle={I18n.t(
        "features.euCovidCertificate.valid.markdownDetails.headerTitle"
      )}
      contextualHelp={emptyContextualHelp}
    >
      <SafeAreaView
        style={IOStyles.flex}
        testID={"EuCovidCertQrCodeFullScreen"}
      >
        <ScrollView style={IOStyles.horizontalContentPadding}>
          {/* add an extra padding while capturing the screenshot */}
          <View
            collapsable={false}
            ref={screenShotViewContainerRef}
            style={[
              styles.viewShot,
              isCapturingScreenShoot
                ? IOStyles.horizontalContentPadding
                : undefined
            ]}
          >
            {/* add an extra top and bottom (as extra height in the markdown component)
            margin while capturing the screenshot  */}
            {isCapturingScreenShoot && <View large={true} spacer={true} />}
            <MarkdownHandleCustomLink
              extraBodyHeight={60}
              onLoadEnd={() => setLoadMarkdownComplete(true)}
            >
              {props.navigation.getParam("markdownDetails")}
            </MarkdownHandleCustomLink>
            {canShowButton && (
              <>
                <View spacer={true} />
                <ButtonDefaultOpacity
                  style={styles.save}
                  onPress={() => {
                    void mixpanelTrack("EUCOVIDCERT_SAVE_MARKDOWN_DETAILS");
                    setIsCapturingScreenShoot(true);
                  }}
                >
                  <Label color={"white"}>
                    {I18n.t(
                      "features.euCovidCertificate.valid.markdownDetails.save"
                    )}
                  </Label>
                </ButtonDefaultOpacity>
                <View spacer={true} />
              </>
            )}
          </View>
        </ScrollView>
        {canShowButton && (
          <FooterWithButtons
            type={"SingleButton"}
            leftButton={cancelButtonProps(
              () => props.navigation.goBack(),
              I18n.t("global.buttons.close")
            )}
          />
        )}
      </SafeAreaView>
      {/* this view must be the last one, since it must be drawn on top of all */}
      <FlashAnimatedComponent
        state={flashAnimationState}
        onFadeInCompleted={saveScreenShoot}
      />
    </BaseScreenComponent>
  );
};
