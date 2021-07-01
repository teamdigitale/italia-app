import { Badge, Text, View } from "native-base";
import * as React from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  ViewStyle
} from "react-native";
import IconFont from "../../../components/ui/IconFont";
import I18n from "../../../i18n";
import customVariables from "../../../theme/variables";
import TouchableDefaultOpacity from "../../TouchableDefaultOpacity";

export type SectionCardStatus = "add" | "refresh" | "loading" | "show";
type Props = {
  onPress: () => void;
  label: string;
  status?: SectionCardStatus;
  isError?: boolean;
  isNew?: boolean;
  cardStyle?: ViewStyle;
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  row: {
    flexDirection: "row"
  },
  topSpacing: {
    marginTop: 2
  },
  flexRow2: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  brandLightGray: {
    color: customVariables.brandGray
  },
  badgeColor: {
    height: 18,
    marginTop: 4,
    backgroundColor: customVariables.brandHighLighter
  },
  headerText: {
    fontSize: 17,
    marginRight: 9
  },
  badgeText: {
    marginTop: 3,
    fontSize: customVariables.fontSizeSmall,
    lineHeight: 16,
    color: customVariables.brandDarkGray
  },
  cardInner: {
    paddingBottom: 13,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 13
  },
  card: {
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    borderRadius: 8,
    zIndex: -7,
    elevation: -7,
    height: 88,
    marginLeft: 0,
    marginRight: 0
  },
  cardGrey: {
    backgroundColor: customVariables.brandDarkGray
  },
  flatBottom: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  rotateCard: {
    shadowColor: "#000",
    marginBottom: -38,
    flex: 1,
    shadowRadius: 10,
    shadowOpacity: 0.15,
    transform: [{ perspective: 1200 }, { rotateX: "-20deg" }, { scaleX: 0.99 }]
  },
  rotateText: {
    flex: 1
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  labelButton: {
    marginLeft: customVariables.fontSizeBase / 4,
    color: customVariables.colorWhite
  },
  shadowBox: {
    marginBottom: -15,
    borderRadius: 8,
    borderTopWidth: 8,
    borderTopColor: "rgba(0,0,0,0.1)",
    height: 15
  }
});

const SectionCardComponent: React.FunctionComponent<Props> = (props: Props) => {
  const { label, onPress, isNew, isError, cardStyle } = props;
  const rightLabel = () => {
    switch (props.status) {
      case undefined:
      case "add":
        return (
          <>
            <IconFont
              name="io-plus"
              color={customVariables.colorWhite}
              size={customVariables.fontSize2}
            />
            <Text
              bold={true}
              style={[
                styles.labelButton,
                { fontSize: customVariables.fontSize1 + 1 }
              ]}
            >
              {I18n.t("wallet.newPaymentMethod.add").toUpperCase()}
            </Text>
          </>
        );
      case "loading":
        return (
          <ActivityIndicator
            size={24}
            color={"white"}
            accessible={false}
            importantForAccessibility={"no-hide-descendants"}
            accessibilityElementsHidden={true}
          />
        );
      case "refresh":
        return (
          <View style={styles.row}>
            <Text
              bold={true}
              style={[
                styles.labelButton,
                { fontSize: customVariables.fontSize1 + 1 }
              ]}
            >
              {I18n.t("wallet.newPaymentMethod.refresh").toUpperCase()}
            </Text>
            <Text
              style={{
                fontSize: customVariables.fontSize1 + 16,
                height: 22,
                paddingTop: 8,
                color: "white"
              }}
            >
              {" ⟳"}
            </Text>
          </View>
        );
      case "show":
        return (
          <View style={styles.row}>
            <Text
              bold={true}
              style={[
                styles.labelButton,
                { fontSize: customVariables.fontSize1 + 1 }
              ]}
            >
              {I18n.t("wallet.newPaymentMethod.show").toUpperCase()}
            </Text>
            <IconFont
              style={{ marginTop: 1, marginLeft: 2 }}
              name={"io-right"}
              color={customVariables.colorWhite}
              size={20}
            />
          </View>
        );
    }
  };

  return (
    <>
      {Platform.OS === "android" && <View style={styles.shadowBox} />}
      <View style={[styles.rotateCard]}>
        <TouchableDefaultOpacity
          onPress={onPress}
          accessible={true}
          accessibilityRole={"button"}
        >
          <View
            style={[
              styles.card,
              styles.flatBottom,
              cardStyle || styles.cardGrey
            ]}
          >
            <View
              style={[styles.cardInner]}
              accessibilityLabel={I18n.t(
                "wallet.accessibility.sectionCardLabel",
                { label }
              )}
              accessibilityRole="button"
            >
              <View style={[styles.flexRow, styles.topSpacing]}>
                <View style={styles.flexRow2}>
                  <Text
                    style={[styles.brandLightGray, styles.headerText]}
                    ellipsizeMode="tail"
                  >
                    {label}
                  </Text>
                  {isNew && (
                    <Badge style={styles.badgeColor}>
                      <Text
                        semibold={true}
                        style={styles.badgeText}
                        dark={true}
                      >
                        {I18n.t("wallet.methods.newCome")}
                      </Text>
                    </Badge>
                  )}
                </View>
                {!isError && (
                  <View style={[styles.button]}>{rightLabel()}</View>
                )}
              </View>
            </View>
          </View>
        </TouchableDefaultOpacity>
      </View>
    </>
  );
};

export default SectionCardComponent;
