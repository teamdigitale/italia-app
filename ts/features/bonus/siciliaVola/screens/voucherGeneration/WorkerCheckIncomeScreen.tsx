import * as React from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import { isSome } from "fp-ts/lib/Option";
import BaseScreenComponent from "../../../../../components/screens/BaseScreenComponent";
import { emptyContextualHelp } from "../../../../../utils/emptyContextualHelp";
import { setAccessibilityFocus } from "../../../../../utils/accessibility";
import { IOStyles } from "../../../../../components/core/variables/IOStyles";
import { H1 } from "../../../../../components/core/typography/H1";
import { GlobalState } from "../../../../../store/reducers/types";
import {
  svGenerateVoucherBack,
  svGenerateVoucherCancel,
  svGenerateVoucherFailure,
  svGenerateVoucherUnderThresholdIncome
} from "../../store/actions/voucherGeneration";
import FooterWithButtons from "../../../../../components/ui/FooterWithButtons";
import {
  navigateToSvKoCheckIncomeThresholdScreen,
  navigateToSvWorkerSelectDestinationScreen
} from "../../navigation/actions";
import { selectedBeneficiaryCategorySelector } from "../../store/reducers/voucherRequest";
import I18n from "../../../../../i18n";
import ButtonDefaultOpacity from "../../../../../components/ButtonDefaultOpacity";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const WorkerCheckIncomeScreen = (props: Props): React.ReactElement | null => {
  const [isIncomeUnderThreshold, setIsIncomeUnderThreshold] = React.useState<
    boolean | undefined
  >();

  const elementRef = useRef(null);
  const backButtonProps = {
    primary: false,
    bordered: true,
    onPress: props.back,
    title: "Back"
  };
  const continueButtonProps = {
    primary: false,
    bordered: true,
    onPress:
      isIncomeUnderThreshold === true
        ? props.navigateToSvWorkerSelectDestination
        : props.navigateToSvKoCheckIncomeThreshold,
    title: "Continue",
    disabled: isIncomeUnderThreshold === undefined
  };

  if (
    isSome(props.selectedBeneficiaryCategory) &&
    props.selectedBeneficiaryCategory.value !== "worker"
  ) {
    props.failure("The selected category is not Worker");
    return null;
  }

  return (
    <BaseScreenComponent goBack={true} contextualHelp={emptyContextualHelp}>
      <NavigationEvents onDidFocus={() => setAccessibilityFocus(elementRef)} />
      <SafeAreaView
        style={IOStyles.flex}
        testID={"WorkerCheckIncomeScreen"}
        ref={elementRef}
      >
        <ScrollView style={[IOStyles.horizontalContentPadding]}>
          <H1>
            {I18n.t("bonus.sv.voucherGeneration.worker.checkIncome.title")}
          </H1>

          <ButtonDefaultOpacity onPress={() => setIsIncomeUnderThreshold(true)}>
            <Text> {"< 25000€"} </Text>
          </ButtonDefaultOpacity>
          <ButtonDefaultOpacity
            onPress={() => setIsIncomeUnderThreshold(false)}
          >
            <Text> {"> 25000€"} </Text>
          </ButtonDefaultOpacity>
        </ScrollView>
        <FooterWithButtons
          type={"TwoButtonsInlineHalf"}
          leftButton={backButtonProps}
          rightButton={continueButtonProps}
        />
      </SafeAreaView>
    </BaseScreenComponent>
  );
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  back: () => dispatch(svGenerateVoucherBack()),
  cancel: () => dispatch(svGenerateVoucherCancel()),
  failure: (reason: string) => dispatch(svGenerateVoucherFailure(reason)),
  underThresholdIncome: () =>
    dispatch(svGenerateVoucherUnderThresholdIncome(true)),
  navigateToSvWorkerSelectDestination: () =>
    dispatch(navigateToSvWorkerSelectDestinationScreen()),
  navigateToSvKoCheckIncomeThreshold: () =>
    dispatch(navigateToSvKoCheckIncomeThresholdScreen())
});
const mapStateToProps = (state: GlobalState) => ({
  selectedBeneficiaryCategory: selectedBeneficiaryCategorySelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkerCheckIncomeScreen);
