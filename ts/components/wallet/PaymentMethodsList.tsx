/**
 * This component will display the payment methods that can be registered
 * on the app
 */
import { Badge, ListItem, Text, View } from "native-base";
import * as React from "react";
import { Alert, FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Option } from "fp-ts/lib/Option";
import { H3 } from "../core/typography/H3";
import { H5 } from "../core/typography/H5";
import { IOColors } from "../core/variables/IOColors";
import { withLightModalContext } from "../helpers/withLightModalContext";
import IconFont from "../ui/IconFont";
import { LightModalContextInterface } from "../ui/LightModal";
import I18n from "../../i18n";
import { BackendStatus, SectionStatusKey } from "../../api/backendPublic";
import { GlobalState } from "../../store/reducers/types";
import { backendStatusSelector } from "../../store/reducers/backendStatus";
import {
  getSectionMessageLocale,
  statusColorMap
} from "../SectionStatusComponent";

type OwnProps = Readonly<{
  paymentMethods: ReadonlyArray<IPaymentMethod>;
  navigateToAddCreditCard: () => void;
}>;

type Props = OwnProps &
  LightModalContextInterface &
  ReturnType<typeof mapStateToProps>;

export type IPaymentMethod = Readonly<{
  name: string;
  description: string;
  maxFee?: string;
  icon?: any;
  image?: any;
  status: "implemented" | "incoming" | "notImplemented";
  section?: SectionStatusKey;
  onPress?: () => void;
}>;

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 0,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  flexColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  descriptionPadding: { paddingRight: 24 },

  badgeContainer: { height: 18, backgroundColor: IOColors.blue },
  badgeText: { fontSize: 12, lineHeight: 18 }
});

export const showPaymentMethodIncomingAlert = () =>
  Alert.alert(
    I18n.t("wallet.incoming.title"),
    I18n.t("wallet.incoming.message"),
    undefined,
    { cancelable: true }
  );

/**
 * return a status badge displaying the section.badge label
 * the badge background color is according with the status (normal | warning | critical)
 * if it is critical status, it returns also an alert function, undefined otherwise
 * the alert display a title (section.badge) and a message (section.message) with default dismiss button
 * @param paymentMethod
 * @param backendStatus
 */
const getBadgeStatus = (
  paymentMethod: IPaymentMethod,
  backendStatus: Option<BackendStatus>
): null | { badge: React.ReactNode; alert?: () => void } => {
  const itemSection = paymentMethod.section;
  // no section
  if (itemSection === undefined) {
    return null;
  }
  return backendStatus
    .mapNullable(bs => bs.sections)
    .fold(null, sections => {
      const section = sections[itemSection];
      // no badge if section is not visible or badge is not defined
      if (section.is_visible === false || section.badge === undefined) {
        return null;
      }
      const locale = getSectionMessageLocale();
      const badgeLabel = section.badge[locale];
      return {
        badge: (
          <Badge
            style={[
              styles.badgeContainer,
              { backgroundColor: statusColorMap[section.level] }
            ]}
          >
            <Text style={styles.badgeText} semibold={true}>
              {badgeLabel}
            </Text>
          </Badge>
        ),
        alert:
          section.level === "critical"
            ? () => Alert.alert(badgeLabel, section.message[locale])
            : undefined
      };
    });
};

const renderListItem = (
  itemInfo: ListRenderItemInfo<IPaymentMethod>,
  paymentMethodsLength: number,
  backendStatus: Option<BackendStatus>
) => {
  switch (itemInfo.item.status) {
    case "implemented": {
      const badgeStatus = getBadgeStatus(itemInfo.item, backendStatus);
      return (
        <ListItem
          onPress={badgeStatus?.alert ?? itemInfo.item.onPress}
          style={styles.container}
          first={itemInfo.index === 0}
          last={itemInfo.index === paymentMethodsLength}
        >
          <View style={styles.flexColumn}>
            <View style={styles.row}>
              <View>
                {badgeStatus?.badge}
                <H3 color={"bluegreyDark"} weight={"SemiBold"}>
                  {itemInfo.item.name}
                </H3>
              </View>
              <IconFont name={"io-right"} color={IOColors.blue} size={24} />
            </View>
            <H5
              color={"bluegrey"}
              weight={"Regular"}
              style={styles.descriptionPadding}
            >
              {itemInfo.item.description}
            </H5>
          </View>
        </ListItem>
      );
    }
    case "incoming":
      return (
        <ListItem
          onPress={showPaymentMethodIncomingAlert}
          style={styles.container}
          first={itemInfo.index === 0}
          last={itemInfo.index === paymentMethodsLength}
        >
          <View style={styles.flexColumn}>
            <View>
              <Badge style={styles.badgeContainer}>
                <Text style={styles.badgeText} semibold={true}>
                  {I18n.t("wallet.methods.comingSoon")}
                </Text>
              </Badge>
              <H3 color={"bluegrey"} weight={"SemiBold"}>
                {itemInfo.item.name}
              </H3>
            </View>
            <H5
              color={"bluegrey"}
              weight={"Regular"}
              style={styles.descriptionPadding}
            >
              {itemInfo.item.description}
            </H5>
          </View>
        </ListItem>
      );
      break;
    case "notImplemented":
      return null;
      break;
  }
};

const PaymentMethodsList: React.FunctionComponent<Props> = (props: Props) => (
  <>
    <View spacer={true} large={true} />
    <FlatList
      removeClippedSubviews={false}
      data={props.paymentMethods}
      keyExtractor={item => item.name}
      ListFooterComponent={<View spacer />}
      renderItem={i =>
        renderListItem(
          i,
          props.paymentMethods.filter(pm => pm.status !== "notImplemented")
            .length - 1,
          props.sectionStatus
        )
      }
    />
  </>
);
const mapStateToProps = (state: GlobalState) => ({
  sectionStatus: backendStatusSelector(state)
});
export default connect(mapStateToProps)(
  withLightModalContext(PaymentMethodsList)
);
