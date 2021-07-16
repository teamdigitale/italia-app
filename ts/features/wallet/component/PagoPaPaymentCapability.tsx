import { Badge, View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import ButtonDefaultOpacity from "../../../components/ButtonDefaultOpacity";
import { H4 } from "../../../components/core/typography/H4";
import { H5 } from "../../../components/core/typography/H5";
import { Link } from "../../../components/core/typography/Link";
import { IOColors } from "../../../components/core/variables/IOColors";
import { IOStyles } from "../../../components/core/variables/IOStyles";
import TouchableDefaultOpacity from "../../../components/TouchableDefaultOpacity";
import Markdown from "../../../components/ui/Markdown";
import Switch from "../../../components/ui/Switch";
import I18n from "../../../i18n";
import { PaymentMethod } from "../../../types/pagopa";
import { PaymentSupportStatus } from "../../../types/paymentMethodCapabilities";
import { useIOBottomSheet } from "../../../utils/bottomSheet";
import { isPaymentMethodSupported } from "../../../utils/paymentMethodCapabilities";
import { openWebUrl } from "../../../utils/url";

const styles = StyleSheet.create({
  row: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  left: {
    ...IOStyles.flex,
    paddingRight: 8
  },
  badgeInfo: {
    borderWidth: 1,
    borderStyle: "solid",
    height: 25,
    flexDirection: "row"
  },
  badgeAvailable: {
    backgroundColor: IOColors.blue,
    borderColor: IOColors.blue,
    width: 65
  },
  badgeArriving: {
    backgroundColor: IOColors.white,
    borderColor: IOColors.blue,
    width: 65
  },
  bottomSheetCTA: {
    backgroundColor: IOColors.white,
    paddingRight: 0,
    paddingLeft: 0
  },
  badgeNotAvailable: {
    backgroundColor: IOColors.white,
    borderColor: IOColors.blue,
    width: 130
  }
});

type Props = { paymentMethod: PaymentMethod };

const IN_APP_PAYMENTS_LEARN_MORE_VIDEO_URL =
  "https://www.youtube.com/watch?v=2URN1LNLpbU";

const getLocales = () => ({
  available: I18n.t("wallet.methods.card.pagoPaCapability.active"),
  arriving: I18n.t("wallet.methods.card.pagoPaCapability.arriving"),
  incompatible: I18n.t("wallet.methods.card.pagoPaCapability.incompatible")
});

const availabilityBadge = (badgeType: PaymentSupportStatus) => {
  const { available, arriving, incompatible } = getLocales();
  switch (badgeType) {
    case "available":
      return (
        <Badge style={[styles.badgeInfo, styles.badgeAvailable]}>
          <H5 color="white">{available}</H5>
        </Badge>
      );
    case "arriving":
      return (
        <Badge style={[styles.badgeInfo, styles.badgeArriving]}>
          <H5 color="blue">{arriving}</H5>
        </Badge>
      );
    case "not_available":
      return (
        <Badge style={[styles.badgeNotAvailable, styles.badgeInfo]}>
          <H5 color="blue">{incompatible}</H5>
        </Badge>
      );
    case "onboardableNotImplemented":
      return <Switch testID={"switchOnboardCard"} disabled={true} />;
  }
};

/**
 * Represent the capability to pay in PagoPa of a payment method.
 *
 * We have 4 possible different cases:
 *   - The card can pay on IO -> pagoPa === true
 *   - The card in the future can pay on IO -> Satispay, BPay
 *   - The card is not abilitated to pay on IO, pagoPa === false and type === PRV or Bancomat
 *   - The card can onboard another card that can pay on IO -> co-badge credit card pagoPa === false and type !== PRV
 * @param props
 */
const PagoPaPaymentCapability: React.FC<Props> = props => {
  const onOpenLearnMoreAboutInAppPayments = () =>
    openWebUrl(IN_APP_PAYMENTS_LEARN_MORE_VIDEO_URL);

  const { present } = useIOBottomSheet(
    <View>
      <Markdown>
        {I18n.t("wallet.methods.card.pagoPaCapability.bottomSheetBody")}
      </Markdown>
      <ButtonDefaultOpacity
        onPress={onOpenLearnMoreAboutInAppPayments}
        style={styles.bottomSheetCTA}
        onPressWithGestureHandler={true}
      >
        <Link>
          {I18n.t("wallet.methods.card.pagoPaCapability.bottomSheetCTA")}
        </Link>
      </ButtonDefaultOpacity>
    </View>,
    I18n.t("wallet.methods.card.pagoPaCapability.bottomSheetTitle"),
    300
  );

  return (
    <TouchableDefaultOpacity onPress={present}>
      <View style={styles.row}>
        <View style={styles.left}>
          <H4
            weight={"SemiBold"}
            color={"bluegreyDark"}
            testID={"PagoPaPaymentCapabilityTitle"}
          >
            {I18n.t("wallet.methods.card.pagoPaCapability.title")}
          </H4>
          <H5
            weight={"Regular"}
            color={"bluegrey"}
            testID={"PagoPaPaymentCapabilityDescription"}
          >
            {I18n.t("wallet.methods.card.pagoPaCapability.description")}
          </H5>
        </View>
        {availabilityBadge(isPaymentMethodSupported(props.paymentMethod))}
      </View>
    </TouchableDefaultOpacity>
  );
};

export default PagoPaPaymentCapability;
