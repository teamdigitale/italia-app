import * as React from "react";
import { useRef, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SafeAreaView, ScrollView, Text } from "react-native";
import BaseScreenComponent from "../../../../../components/screens/BaseScreenComponent";
import { emptyContextualHelp } from "../../../../../utils/emptyContextualHelp";
import { IOStyles } from "../../../../../components/core/variables/IOStyles";
import { H1 } from "../../../../../components/core/typography/H1";
import { GlobalState } from "../../../../../store/reducers/types";
import {
  svGenerateVoucherBack,
  svGenerateVoucherCancel,
  svGenerateVoucherSelectCategory
} from "../../store/actions/voucherGeneration";
import FooterWithButtons from "../../../../../components/ui/FooterWithButtons";
import ButtonDefaultOpacity from "../../../../../components/ButtonDefaultOpacity";
import { SvBeneficiaryCategory } from "../../types/SvVoucherRequest";
import { selectedBeneficiaryCategorySelector } from "../../store/reducers/voucherRequest";
import {
  navigateToSvDisabledAdditionalInfoScreen,
  navigateToSvSickCheckIncomeThresholdScreen,
  navigateToSvStudentSelectDestinationScreen,
  navigateToSvWorkerCheckIncomeThresholdScreen
} from "../../navigation/actions";
import I18n from "../../../../../i18n";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const SelectBeneficiaryCategoryScreen = (props: Props): React.ReactElement => {
  const elementRef = useRef(null);

  const [categoryBeneficiary, setCategoryBeneficiary] = useState<
    SvBeneficiaryCategory | "other" | undefined
  >(undefined);

  const routeNextScreen = () => {
    switch (categoryBeneficiary) {
      case "student":
        props.selectCategory(categoryBeneficiary);
        props.navigateToSvStudentSelectDestination();
        return;
      case "disabled":
        props.selectCategory(categoryBeneficiary);
        props.navigateToSvDisabledAdditionalInfo();
        return;
      case "worker":
        props.selectCategory(categoryBeneficiary);
        props.navigateToSvWorkerCheckIncomeThreshold();
        return;
      case "sick":
        props.selectCategory(categoryBeneficiary);
        props.navigateToSvSickCheckIncomeThreshold();
        return;
      case "other":
        // TODO: go to ko screen
        return;
    }
  };

  const backButtonProps = {
    primary: false,
    bordered: true,
    onPress: props.back,
    title: "Back"
  };
  const continueButtonProps = {
    primary: false,
    bordered: true,
    onPress: routeNextScreen,
    title: "Continue",
    disabled: categoryBeneficiary === undefined
  };

  return (
    <BaseScreenComponent
      goBack={true}
      contextualHelp={emptyContextualHelp}
      headerTitle={I18n.t("bonus.sv.headerTitle")}
    >
      <SafeAreaView
        style={IOStyles.flex}
        testID={"SelectBeneficiaryCategory"}
        ref={elementRef}
      >
        <ScrollView style={[IOStyles.horizontalContentPadding]}>
          <H1>
            {I18n.t(
              "bonus.sv.voucherGeneration.selectBeneficiaryCategory.title"
            )}
          </H1>

          <ButtonDefaultOpacity
            onPress={() => setCategoryBeneficiary("student")}
          >
            <Text>Student</Text>
          </ButtonDefaultOpacity>

          <ButtonDefaultOpacity
            onPress={() => setCategoryBeneficiary("disabled")}
          >
            <Text>Disabled</Text>
          </ButtonDefaultOpacity>

          <ButtonDefaultOpacity
            onPress={() => setCategoryBeneficiary("worker")}
          >
            <Text>Worker</Text>
          </ButtonDefaultOpacity>

          <ButtonDefaultOpacity onPress={() => setCategoryBeneficiary("sick")}>
            <Text>Sick</Text>
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
  selectCategory: (category: SvBeneficiaryCategory) =>
    dispatch(svGenerateVoucherSelectCategory(category)),
  navigateToSvStudentSelectDestination: () =>
    dispatch(navigateToSvStudentSelectDestinationScreen()),
  navigateToSvDisabledAdditionalInfo: () =>
    dispatch(navigateToSvDisabledAdditionalInfoScreen()),
  navigateToSvWorkerCheckIncomeThreshold: () =>
    dispatch(navigateToSvWorkerCheckIncomeThresholdScreen()),
  navigateToSvSickCheckIncomeThreshold: () =>
    dispatch(navigateToSvSickCheckIncomeThresholdScreen())
});
const mapStateToProps = (state: GlobalState) => ({
  selectedBeneficiaryCategory: selectedBeneficiaryCategorySelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectBeneficiaryCategoryScreen);
