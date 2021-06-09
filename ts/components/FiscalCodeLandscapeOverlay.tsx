/**
 * A component to show the fiscal code fac-simile in Landscape
 */
import * as pot from "italia-ts-commons/lib/pot";
import { Body, Button, Container, Right, View } from "native-base";
import * as React from "react";
import { BackHandler, ScrollView, StatusBar, StyleSheet } from "react-native";
import { InitializedProfile } from "../../definitions/backend/InitializedProfile";
import { Municipality } from "../../definitions/content/Municipality";
import IconFont from "../components/ui/IconFont";
import I18n from "../i18n";
import customVariables from "../theme/variables";
import { useMaxBrightness } from "../utils/brightness";
import FiscalCodeComponent from "./FiscalCodeComponent";
import AppHeader from "./ui/AppHeader";

export type Props = Readonly<{
  onCancel: () => void;
  profile: InitializedProfile;
  municipality: pot.Pot<Municipality, Error>;
  showBackSide?: boolean;
}>;

const styles = StyleSheet.create({
  content: {
    backgroundColor: customVariables.brandDarkGray,
    paddingHorizontal: customVariables.contentPadding,
    paddingTop: 0
  }
});

const FiscalCodeLandscapeOverlay: React.FunctionComponent<Props> = (
  props: Props
) => {
  // eslint-disable-next-line functional/no-let
  let scrollTimeout: number | undefined;

  const ScrollViewRef = React.createRef<ScrollView>();

  const handleBackPress = () => {
    // On backpress the component gets unmounted, so the brightness is restored by the
    // cleanup function
    props.onCancel();
    return true;
  };

  const scrollToEnd = () => {
    if (props.showBackSide && ScrollViewRef.current) {
      // delay the scroll to end command to wait until the ingress animation is completed
      // eslint-disable-next-line
      scrollTimeout = setTimeout(() => {
        if (ScrollViewRef.current) {
          ScrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 300);
    }
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      // if there is an active timeout, clear it!
      if (scrollTimeout !== undefined) {
        clearTimeout(scrollTimeout);
        // eslint-disable-next-line
        scrollTimeout = undefined;
      }
    };
  }, []);

  useMaxBrightness();

  return (
    <Container style={{ backgroundColor: customVariables.brandDarkGray }}>
      <AppHeader noLeft={true} dark={true}>
        <Body />
        <Right>
          <Button
            transparent={true}
            onPress={props.onCancel}
            accessible={true}
            accessibilityRole={"button"}
            accessibilityLabel={I18n.t("global.buttons.close")}
          >
            <IconFont name="io-close" color={customVariables.colorWhite} />
          </Button>
        </Right>
      </AppHeader>
      <StatusBar
        backgroundColor={customVariables.brandDarkGray}
        barStyle={"light-content"}
      />
      <ScrollView
        onLayout={scrollToEnd}
        ref={ScrollViewRef}
        style={styles.content}
      >
        <View spacer={true} />
        <View>
          <FiscalCodeComponent
            type={"Landscape"}
            profile={props.profile}
            getBackSide={false}
            municipality={props.municipality}
          />
        </View>

        <View spacer={true} />

        <FiscalCodeComponent
          type={"Landscape"}
          profile={props.profile}
          getBackSide={true}
          municipality={props.municipality}
        />

        <View spacer={true} large={true} />
        <View spacer={true} large={true} />
      </ScrollView>
    </Container>
  );
};

export default FiscalCodeLandscapeOverlay;
