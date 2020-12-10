import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { none } from "fp-ts/lib/Option";
import { View } from "native-base";
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
import ButtonDefaultOpacity from "../ButtonDefaultOpacity";
import { H1 } from "../core/typography/H1";
import { H3 } from "../core/typography/H3";
import { H4 } from "../core/typography/H4";
import { H5 } from "../core/typography/H5";
import { IOColors } from "../core/variables/IOColors";
import ItemSeparatorComponent from "../ItemSeparatorComponent";
import TouchableDefaultOpacity from "../TouchableDefaultOpacity";
import IconFont from "../ui/IconFont";
import { useHardwareBackButton } from "../../features/bonus/bonusVacanze/components/hooks/useHardwareBackButton";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type NavigationListItem = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

const styles = StyleSheet.create({
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
  },
  descriptionPadding: { marginRight: 4 },

  badgeContainer: { height: 18, backgroundColor: IOColors.blue },
  badgeText: { fontSize: 12, lineHeight: 18 }
});

const WalletHomeHeader: React.FC<Props> = (props: Props) => {
  const { present, dismiss } = useBottomSheetModal();
  const [isBottomSheetOpen, setBottomSheetOpen] = React.useState(false);

  useHardwareBackButton(() => {
    const isOpen = isBottomSheetOpen;
    closeBS();
    // true only if we handle the back
    return isOpen;
  });

  const closeBS = () => {
    setBottomSheetOpen(false);
    dismiss();
  };

  const openBS = async () => {
    setBottomSheetOpen(true);
    await openModalBox();
  };

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
      <FlatList
        data={navigationListItems}
        keyExtractor={item => item.title}
        renderItem={({ item, index }) => (
          <>
            <ButtonDefaultOpacity
              onPress={() => {
                closeBS();
                item.onPress();
              }}
              style={styles.container}
              onPressWithGestureHandler={true}
            >
              <View style={styles.flexColumn}>
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <H3 color={"bluegreyDark"} weight={"SemiBold"}>
                      {item.title}
                    </H3>
                    <H5 color={"bluegrey"} weight={"Regular"}>
                      {item.subtitle}
                    </H5>
                  </View>
                  <IconFont name={"io-right"} color={IOColors.blue} size={24} />
                </View>
              </View>
            </ButtonDefaultOpacity>

            {index !== navigationListItems.length - 1 && (
              <ItemSeparatorComponent noPadded />
            )}
          </>
        )}
      />,
      I18n.t("global.buttons.add"),
      315,
      closeBS
    );

    present(bottomSheetProps.content, {
      ...bottomSheetProps.config
    });
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 8
        }
      ]}
    >
      <H1 color={"white"}>{I18n.t("wallet.wallet")}</H1>
      <TouchableDefaultOpacity
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
        onPress={openBS}
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
