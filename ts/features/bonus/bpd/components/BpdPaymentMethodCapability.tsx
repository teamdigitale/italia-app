/**
 * Display the bpd capability for a payment method
 * @constructor
 */
import * as pot from "italia-ts-commons/lib/pot";
import { View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { H4 } from "../../../../components/core/typography/H4";
import { H5 } from "../../../../components/core/typography/H5";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import I18n from "../../../../i18n";
import { GlobalState } from "../../../../store/reducers/types";
import { PaymentMethod } from "../../../../types/pagopa";
import { useLoadPotValue } from "../../../../utils/hooks/useLoadPotValue";
import { getPaymentMethodHash } from "../../../../utils/paymentMethod";
import { bpdOnboardingStart } from "../store/actions/onboarding";
import {
  bpdPaymentMethodActivation,
  bpdUpdatePaymentMethodActivation,
  HPan
} from "../store/actions/paymentMethods";
import { bpdEnabledSelector } from "../store/reducers/details/activation";
import { bpdPaymentMethodValueSelector } from "../store/reducers/details/paymentMethods";
import { BpdToggle } from "./paymentMethodActivationToggle/base/BpdToggle";
import {
  calculateBpdToggleGraphicalState,
  GraphicalValue
} from "./paymentMethodActivationToggle/base/PaymentMethodBpdToggle";
import { useChangeActivationConfirmationBottomSheet } from "./paymentMethodActivationToggle/bottomsheet/BpdChangeActivationConfirmationScreen";
import { useNotActivableInformationBottomSheet } from "./paymentMethodActivationToggle/bottomsheet/BpdNotActivableInformation";

type OwnProps = { paymentMethod: PaymentMethod };

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  OwnProps;

const styles = StyleSheet.create({
  row: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  left: {
    ...IOStyles.flex,
    paddingRight: 8
  }
});

const handleValueChanged = (props: Props, changeActivation: () => void) => {
  if (pot.getOrElse(props.bpdEnabled, false)) {
    changeActivation();
  } else {
    props.onboardToBpd();
  }
};

/**
 * Represent the bpd capability on a payment method.
 * The user can choose to activate o deactivate bpd on that payment method.
 * If the user is not enrolled to bpd, the activation triggers the onboarding to bpd.
 * @constructor
 */
const BpdPaymentMethodCapability: React.FunctionComponent<Props> = props => {
  const hash = getPaymentMethodHash(props.paymentMethod);
  // Without hash we cannot asks the state for bpd
  if (hash === undefined) {
    return null;
  }
  useLoadPotValue(hash, props.bpdPotActivation, () =>
    props.loadActualValue(hash as HPan)
  );
  const graphicalState: GraphicalValue = calculateBpdToggleGraphicalState(
    props.bpdPotActivation
  );

  const askConfirmation = useChangeActivationConfirmationBottomSheet({
    caption: props.paymentMethod.caption,
    icon: props.paymentMethod.icon
  }).present;

  const showExplanation = useNotActivableInformationBottomSheet({
    caption: props.paymentMethod.caption,
    icon: props.paymentMethod.icon
  }).present;

  return (
    <View style={styles.row} testID={"BpdPaymentMethodCapability"}>
      <View style={styles.left}>
        <H4 weight={"SemiBold"} color={"bluegreyDark"}>
          {I18n.t("bonus.bpd.title")}
        </H4>
        <H5 weight={"Regular"} color={"bluegrey"}>
          {I18n.t("bonus.bpd.description")}
        </H5>
      </View>
      <BpdToggle
        graphicalValue={graphicalState}
        onPress={() => showExplanation("NotActivable")}
        onValueChanged={newVal =>
          handleValueChanged(props, () =>
            askConfirmation(newVal, () =>
              props.updateValue(hash as HPan, newVal)
            )
          )
        }
      />
    </View>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadActualValue: (hPan: HPan) =>
    dispatch(bpdPaymentMethodActivation.request(hPan)),
  updateValue: (hPan: HPan, value: boolean) =>
    dispatch(bpdUpdatePaymentMethodActivation.request({ hPan, value })),
  onboardToBpd: () => dispatch(bpdOnboardingStart())
});

const mapStateToProps = (state: GlobalState, props: OwnProps) => ({
  bpdPotActivation: bpdPaymentMethodValueSelector(
    state,
    getPaymentMethodHash(props.paymentMethod) as HPan
  ),
  bpdEnabled: bpdEnabledSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BpdPaymentMethodCapability);
