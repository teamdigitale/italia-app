import { View } from "native-base";
import * as React from "react";
import { useRef } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import image from "../../../../img/features/euCovidCert/eu-flag.png";
import { H1 } from "../../../components/core/typography/H1";
import { H2 } from "../../../components/core/typography/H2";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import I18n from "../../../i18n";
import { WithTestID } from "../../../types/WithTestID";
import { setAccessibilityFocus } from "../../../utils/accessibility";
import { emptyContextualHelp } from "../../../utils/emptyContextualHelp";
import SectionStatusComponent from "../../../components/SectionStatusComponent";

type Props = WithTestID<{
  content: React.ReactElement;
  footer?: React.ReactElement;
}>;

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  euFlag: {
    width: 84,
    height: 56,
    flex: 0
  }
});

export const Header = () => (
  <>
    <View style={styles.row}>
      <H1 style={IOStyles.flex}>
        {I18n.t("features.euCovidCertificate.common.title")}
      </H1>
      <Image
        source={image}
        style={styles.euFlag}
        importantForAccessibility={"no"}
        accessibilityElementsHidden={true}
      />
    </View>
    <H2>{I18n.t("features.euCovidCertificate.common.subtitle")}</H2>
  </>
);

export const BaseEuCovidCertificateLayout = (props: Props) => {
  const elementRef = useRef(null);
  return (
    <BaseScreenComponent goBack={true} contextualHelp={emptyContextualHelp}>
      <NavigationEvents onDidFocus={() => setAccessibilityFocus(elementRef)} />
      <SafeAreaView
        style={IOStyles.flex}
        testID={"BaseEuCovidCertificateLayout"}
        ref={elementRef}
      >
        <ScrollView
          style={[IOStyles.horizontalContentPadding]}
          testID={props.testID}
        >
          <Header />
          {props.content}
        </ScrollView>
        <SectionStatusComponent sectionKey={"euCovidCert"} />
        {props.footer}
      </SafeAreaView>
    </BaseScreenComponent>
  );
};
