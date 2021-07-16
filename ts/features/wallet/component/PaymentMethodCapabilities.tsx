import { View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { BpdConfig } from "../../../../definitions/content/BpdConfig";
import { H3 } from "../../../components/core/typography/H3";
import { IOColors } from "../../../components/core/variables/IOColors";
import ItemSeparatorComponent from "../../../components/ItemSeparatorComponent";
import IconFont from "../../../components/ui/IconFont";
import { bpdEnabled } from "../../../config";
import I18n from "../../../i18n";
import { bpdRemoteConfigSelector } from "../../../store/reducers/backendStatus";
import { GlobalState } from "../../../store/reducers/types";
import {
  EnableableFunctionsTypeEnum,
  PaymentMethod
} from "../../../types/pagopa";
import BpdPaymentMethodCapability from "../../bonus/bpd/components/BpdPaymentMethodCapability";
import PagoPaPaymentCapability from "./PagoPaPaymentCapability";

type OwnProps = { paymentMethod: PaymentMethod };

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  OwnProps;

const styles = StyleSheet.create({
  icon: { alignSelf: "center" },
  row: { flex: 1, flexDirection: "row" }
});

const capabilityFactory = (
  paymentMethod: PaymentMethod,
  capability: EnableableFunctionsTypeEnum,
  index: number,
  bpdRemoteConfig?: BpdConfig
) => {
  switch (capability) {
    case EnableableFunctionsTypeEnum.FA:
    case EnableableFunctionsTypeEnum.pagoPA:
      return null;
    case EnableableFunctionsTypeEnum.BPD:
      return bpdEnabled && bpdRemoteConfig?.program_active ? (
        <>
          <BpdPaymentMethodCapability
            paymentMethod={paymentMethod}
            key={`capability_item_${index}`}
          />
          <ItemSeparatorComponent noPadded={true} />
        </>
      ) : null;
  }
};

/** *
 * Extracts the capabilities from a {@link PaymentMethod}, based on the enableableFunctions
 * @param paymentMethod
 * @param bpdRemoteConfig
 */
const generateCapabilityItems = (
  paymentMethod: PaymentMethod,
  bpdRemoteConfig?: BpdConfig
): ReadonlyArray<React.ReactNode> =>
  paymentMethod.enableableFunctions.reduce((acc, val, i): ReadonlyArray<
    React.ReactNode
  > => {
    const handlerForCapability = capabilityFactory(
      paymentMethod,
      val,
      i,
      bpdRemoteConfig
    );
    return handlerForCapability === null ? acc : [...acc, handlerForCapability];
  }, [] as ReadonlyArray<React.ReactNode>);

/**
 * Display the capabilities available for a payment method
 * @param props
 * @constructor
 */
const PaymentMethodCapabilities: React.FunctionComponent<Props> = props => {
  const capabilityItems = generateCapabilityItems(
    props.paymentMethod,
    props.bpdRemoteConfig
  );

  return (
    <>
      <View style={styles.row}>
        <IconFont
          name={"io-preferenze"}
          size={20}
          color={IOColors.bluegreyDark}
          style={styles.icon}
        />
        <View hspacer={true} />
        <H3 color={"bluegrey"}>{I18n.t("wallet.capability.title")}</H3>
      </View>
      {capabilityItems}
      <PagoPaPaymentCapability paymentMethod={props.paymentMethod} />
    </>
  );
};

const mapDispatchToProps = (_: Dispatch) => ({});

const mapStateToProps = (state: GlobalState) => ({
  bpdRemoteConfig: bpdRemoteConfigSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodCapabilities);
