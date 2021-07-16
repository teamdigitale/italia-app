import * as React from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SafeAreaView, ScrollView, Text } from "react-native";
import BaseScreenComponent from "../../../../components/screens/BaseScreenComponent";
import { emptyContextualHelp } from "../../../../utils/emptyContextualHelp";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import { H1 } from "../../../../components/core/typography/H1";
import { GlobalState } from "../../../../store/reducers/types";
import { svGenerateVoucherBack } from "../store/actions/voucherGeneration";
import FooterWithButtons from "../../../../components/ui/FooterWithButtons";
import {
  navigateToSvKoCheckResidenceScreen,
  navigateToSvSelectBeneficiaryCategoryScreen
} from "../navigation/actions";
import I18n from "../../../../i18n";
import ButtonDefaultOpacity from "../../../../components/ButtonDefaultOpacity";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const CheckResidenceComponent = (props: Props): React.ReactElement => {
  const [isResidentInSicily, setIsResidentInSicily] = React.useState<
    boolean | undefined
  >();

  const elementRef = useRef(null);
  const backButtonProps = {
    primary: false,
    bordered: true,
    onPress: props.back,
    title: "Back"
  };
  const cancelButtonProps = {
    primary: false,
    bordered: true,
    onPress:
      isResidentInSicily === true
        ? props.navigateToSvSelectBeneficiaryCategory
        : props.navigateToSvKoCheckResidence,
    title: "Continue",
    disabled: isResidentInSicily === undefined
  };

  return (
    <BaseScreenComponent
      goBack={true}
      contextualHelp={emptyContextualHelp}
      headerTitle={I18n.t("bonus.sv.headerTitle")}
    >
      <SafeAreaView
        style={IOStyles.flex}
        testID={"CheckResidenceComponent"}
        ref={elementRef}
      >
        <ScrollView style={[IOStyles.horizontalContentPadding]}>
          <H1>{I18n.t("bonus.sv.voucherGeneration.checkResidence.title")}</H1>

          <ButtonDefaultOpacity onPress={() => setIsResidentInSicily(true)}>
            <Text> {"Resident In Sicily"} </Text>
          </ButtonDefaultOpacity>
          <ButtonDefaultOpacity onPress={() => setIsResidentInSicily(false)}>
            <Text> {"Not ResidentInSicily"} </Text>
          </ButtonDefaultOpacity>
        </ScrollView>
        <FooterWithButtons
          type={"TwoButtonsInlineHalf"}
          leftButton={backButtonProps}
          rightButton={cancelButtonProps}
        />
      </SafeAreaView>
    </BaseScreenComponent>
  );
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  back: () => dispatch(svGenerateVoucherBack()),
  navigateToSvSelectBeneficiaryCategory: () =>
    dispatch(navigateToSvSelectBeneficiaryCategoryScreen()),
  navigateToSvKoCheckResidence: () =>
    dispatch(navigateToSvKoCheckResidenceScreen())
});
const mapStateToProps = (_: GlobalState) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckResidenceComponent);
