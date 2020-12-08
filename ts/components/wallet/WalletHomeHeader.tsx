import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { none } from "fp-ts/lib/Option";
import { ListItem, View } from "native-base";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { navigateToAvailableBonusScreen } from "../../features/bonus/bonusVacanze/navigation/action";
import I18n from "../../i18n";
import { navigateToWalletAddPaymentMethod } from "../../store/actions/navigation";
import { Dispatch } from "../../store/actions/types";
import { navSelector } from "../../store/reducers/navigationHistory";
import { GlobalState } from "../../store/reducers/types";
import customVariables from "../../theme/variables";
import { bottomSheetContent } from "../../utils/bottomSheet";
import { getCurrentRouteKey } from "../../utils/navigation";
import { H1 } from "../core/typography/H1";
import { H3 } from "../core/typography/H3";
import { H4 } from "../core/typography/H4";
import { H5 } from "../core/typography/H5";
import { IOColors } from "../core/variables/IOColors";
import TouchableDefaultOpacity from "../TouchableDefaultOpacity";
import IconFont from "../ui/IconFont";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type NavigationListItem = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

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

const WalletHomeHeader: React.FC<Props> = (props: Props) => {
  const { present, dismiss } = useBottomSheetModal();

  const navigationListItems: ReadonlyArray<NavigationListItem> = [
    {
      title: I18n.t("wallet.paymentMethod"),
      subtitle: I18n.t("wallet.paymentMethodDesc"),
      onPress: () =>
        props.navigateToWalletAddPaymentMethod(getCurrentRouteKey(props.nav))
    },
    {
      title: I18n.t("wallet.methods.bonus.name"),
      subtitle: I18n.t("wallet.methods.bonus.description"),
      onPress: props.navigateToBonusList
    }
  ];

  const openModalBox = async () => {
    const bottomSheetProps = await bottomSheetContent(
      <>
        <View spacer />
        <FlatList
          data={navigationListItems}
          keyExtractor={item => item.title}
          renderItem={({ item, index }) => (
            <ListItem
              onPress={() => {
                dismiss();
                item.onPress();
              }}
              style={styles.container}
              first={index === 0}
              last={index === navigationListItems.length - 1}
            >
              <View style={styles.flexColumn}>
                <View style={styles.row}>
                  <H3 color={"bluegreyDark"} weight={"SemiBold"}>
                    {item.title}
                  </H3>
                  <IconFont name={"io-right"} color={IOColors.blue} size={24} />
                </View>
                <H5
                  color={"bluegrey"}
                  weight={"Regular"}
                  style={styles.descriptionPadding}
                >
                  {item.subtitle}
                </H5>
              </View>
            </ListItem>
          )}
        />
      </>,
      I18n.t("global.buttons.add"),
      325,
      dismiss
    );

    present(bottomSheetProps.content, {
      ...bottomSheetProps.config
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <H1 color={"white"}>{I18n.t("wallet.wallet")}</H1>
      <TouchableDefaultOpacity
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
        onPress={openModalBox}
      >
        <IconFont
          name="io-plus"
          color={customVariables.colorWhite}
          size={customVariables.fontSize2}
        />
        <View hspacer={true} small />
        <H4 color={"white"}>
          {I18n.t("wallet.newPaymentMethod.add").toUpperCase()}
        </H4>
      </TouchableDefaultOpacity>
    </View>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  nav: navSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigateToWalletAddPaymentMethod: (keyFrom?: string) =>
    dispatch(navigateToWalletAddPaymentMethod({ inPayment: none, keyFrom })),
  navigateToBonusList: () => dispatch(navigateToAvailableBonusScreen())
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletHomeHeader);
