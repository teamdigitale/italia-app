/**
 * This component will display the payment methods that can be registered
 * on the app
 */

import color from "color";
import { Badge, ListItem, Text, View } from "native-base";
import * as React from "react";
import { FlatList, Image, Platform, StyleSheet } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import I18n from "../../i18n";
import { makeFontStyleObject } from "../../theme/fonts";
import customVariables from "../../theme/variables";
import variables from "../../theme/variables";
import { ContextualHelp } from "../ContextualHelp";
import { withLightModalContext } from "../helpers/withLightModalContext";
import { EdgeBorderComponent } from "../screens/EdgeBorderComponent";
import TouchableDefaultOpacity from "../TouchableDefaultOpacity";
import IconFont from "../ui/IconFont";
import { LightModalContextInterface } from "../ui/LightModal";
import Markdown from "../ui/Markdown";

type OwnProps = Readonly<{
  navigateToAddCreditCard: () => void;
}>;

type Props = OwnProps & LightModalContextInterface;

type IPaymentMethod = Readonly<{
  name: string;
  maxFee?: string;
  icon?: any;
  image?: any;
  implemented: boolean;
  isNew?: boolean;
  onPress?: () => void;
}>;

const underlayColor = "transparent";
const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingRight: 0,
    flexDirection: "row"
  },
  disabled: {
    opacity: 0.75
  },
  methodItem: {
    flexDirection: "column",
    justifyContent: "center"
  },
  methodTitle: {
    ...makeFontStyleObject(Platform.select, "600"),
    fontSize: 18
  },
  methodImage: {
    width: 70
  },
  columnLeft: {
    flex: 0.7
  },
  columnRight: {
    flex: 0.3,
    alignItems: "center",
    alignContent: "center"
  }
});

const implementedMethod: IPaymentMethod = {
  name: I18n.t("wallet.methods.card.name"),
  icon: "io-48-card",
  implemented: true
};

const paymentMethods: ReadonlyArray<IPaymentMethod> = [
  {
    name: I18n.t("wallet.methods.applepay.name"),
    image: require("../../../img/wallet/payment-methods/applepay-logo.png"),
    implemented: false
  },
  {
    name: I18n.t("wallet.methods.googlepay.name"),
    image: require("../../../img/wallet/payment-methods/googlepay-logo.png"),
    implemented: false
  },
  {
    name: I18n.t("wallet.methods.satispay.name"),
    image: require("../../../img/wallet/payment-methods/satispay-logo.png"),
    implemented: false
  },
  {
    name: I18n.t("wallet.methods.postepay.name"),
    image: require("../../../img/wallet/payment-methods/postepay-logo.png"),
    implemented: false
  },
  {
    name: I18n.t("wallet.methods.paypal.name"),
    image: require("../../../img/wallet/payment-methods/paypal-logo.png"),
    implemented: false
  },
  {
    name: I18n.t("wallet.methods.bank.name"),
    image: require("../../../img/wallet/payment-methods/bancomatpay-logo.png"),
    implemented: false
  }
].sort((a, b) =>
  a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
);

const AddMethodStyle = StyleSheet.create({
  transactionText: {
    color: color(variables.colorWhite).darken(0.35).string()
  },
  notImplementedBadge: {
    height: 18,
    marginTop: 2,
    backgroundColor: variables.lightGray
  },
  newImplementedBadge: {
    height: 18,
    marginTop: 2,
    backgroundColor: variables.brandHighLighter
  },
  notImplementedText: {
    fontSize: 10,
    lineHeight: Platform.OS === "ios" ? 14 : 16,
    color: customVariables.colorWhite
  },
  centeredContents: {
    alignItems: "center"
  }
});

class PaymentMethodsList extends React.Component<Props, never> {
  private showHelp = () => {
    this.props.showModal(
      <ContextualHelp
        onClose={this.props.hideModal}
        title={I18n.t("wallet.whyAFee.title")}
        body={() => <Markdown>{I18n.t("wallet.whyAFee.text")}</Markdown>}
      />
    );
  };

  public render(): React.ReactNode {
    const methods: ReadonlyArray<IPaymentMethod> = [
      {
        ...implementedMethod,
        onPress: this.props.navigateToAddCreditCard
      },
      ...paymentMethods
    ];
    return (
      <View>
        <View spacer={true} large={true} />
        <FlatList
          removeClippedSubviews={false}
          data={methods}
          keyExtractor={item => item.name}
          renderItem={itemInfo => {
            const isItemDisabled = !itemInfo.item.implemented;
            const disabledStyle = isItemDisabled ? styles.disabled : {};
            const isItemNew = itemInfo.item.implemented && itemInfo.item.isNew;
            return (
              <ListItem
                style={styles.listItem}
                onPress={itemInfo.item.onPress}
                underlayColor={underlayColor}
              >
                <View style={styles.columnLeft}>
                  <Grid>
                    <Row>
                      <View style={styles.methodItem}>
                        <Text style={[disabledStyle, styles.methodTitle]}>
                          {itemInfo.item.name}
                        </Text>
                        {isItemDisabled && (
                          <Badge style={AddMethodStyle.notImplementedBadge}>
                            <Text style={AddMethodStyle.notImplementedText}>
                              {I18n.t("wallet.methods.comingSoon")}
                            </Text>
                          </Badge>
                        )}
                        {isItemNew && (
                          <Badge style={AddMethodStyle.newImplementedBadge}>
                            <Text style={AddMethodStyle.notImplementedText}>
                              {I18n.t("wallet.methods.newCome")}
                            </Text>
                          </Badge>
                        )}
                      </View>
                    </Row>
                    {itemInfo.item.maxFee && (
                      <Row>
                        <Text
                          style={[
                            AddMethodStyle.transactionText,
                            disabledStyle
                          ]}
                        >
                          {itemInfo.item.maxFee}
                        </Text>
                      </Row>
                    )}
                  </Grid>
                </View>
                <View style={styles.columnRight}>
                  {itemInfo.item.icon && (
                    <IconFont
                      name={itemInfo.item.icon}
                      color={
                        isItemDisabled
                          ? variables.brandLightGray
                          : variables.brandPrimary
                      }
                      size={variables.iconSize6}
                    />
                  )}
                  {itemInfo.item.image && (
                    <Image
                      source={itemInfo.item.image}
                      style={styles.methodImage}
                      resizeMode={"contain"}
                    />
                  )}
                </View>
              </ListItem>
            );
          }}
        />
        <View spacer={true} large={true} />
        <TouchableDefaultOpacity onPress={this.showHelp}>
          <Text link={true}>{I18n.t("wallet.whyAFee.title")}</Text>
        </TouchableDefaultOpacity>
        {methods.length > 0 && <EdgeBorderComponent />}
      </View>
    );
  }
}

export default withLightModalContext(PaymentMethodsList);
