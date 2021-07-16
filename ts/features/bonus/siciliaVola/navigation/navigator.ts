import { createStackNavigator } from "react-navigation";
import CheckStatusRouterScreen from "../screens/voucherGeneration/CheckStatusRouterScreen";
import SelectBeneficiaryCategoryScreen from "../screens/voucherGeneration/SelectBeneficiaryCategoryScreen";
import StudentSelectDestinationScreen from "../screens/voucherGeneration/StudentSelectDestinationScreen";
import DisabledAdditionalInfoScreen from "../screens/voucherGeneration/DisabledAdditionalInfoScreen";
import WorkerCheckIncomeScreen from "../screens/voucherGeneration/WorkerCheckIncomeScreen";
import SickCheckIncomeScreen from "../screens/voucherGeneration/SickCheckIncomeScreen";
import WorkerSelectDestinationScreen from "../screens/voucherGeneration/WorkerSelectDestinationScreen";
import SickSelectDestinationScreen from "../screens/voucherGeneration/SickSelectDestinationScreen";
import SelectFlightsDateScreen from "../screens/voucherGeneration/SelectFlightsDateScreen";
import SummaryScreen from "../screens/voucherGeneration/SummaryScreen";
import VoucherGeneratedScreen from "../screens/voucherGeneration/VoucherGeneratedScreen";
import SvCheckIncomeKoScreen from "../screens/voucherGeneration/ko/SvCheckIncomeKoScreen";
import SvCheckResidenceKoScreen from "../screens/voucherGeneration/ko/SvCheckResidenceKoScreen";
import SvSelectBeneficiaryCategoryKoScreen from "../screens/voucherGeneration/ko/SvSelectBeneficiaryCategoryKoScreen";
import SvGeneratedVoucherTimeoutScreen from "../screens/voucherGeneration/ko/SvGeneratedVoucherTimeoutScreen";
import SV_ROUTES from "./routes";

const SvNavigator = createStackNavigator(
  {
    [SV_ROUTES.VOUCHER_GENERATION.CHECK_STATUS]: {
      screen: CheckStatusRouterScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.SELECT_BENEFICIARY_CATEGORY]: {
      screen: SelectBeneficiaryCategoryScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.STUDENT_SELECT_DESTINATION]: {
      screen: StudentSelectDestinationScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.DISABLED_ADDITIONAL_INFO]: {
      screen: DisabledAdditionalInfoScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.WORKER_CHECK_INCOME_THRESHOLD]: {
      screen: WorkerCheckIncomeScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.WORKER_SELECT_DESTINATION]: {
      screen: WorkerSelectDestinationScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.SICK_CHECK_INCOME_THRESHOLD]: {
      screen: SickCheckIncomeScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.SICK_SELECT_DESTINATION]: {
      screen: SickSelectDestinationScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.SELECT_FLIGHTS_DATA]: {
      screen: SelectFlightsDateScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.SUMMARY]: {
      screen: SummaryScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.VOUCHER_GENERATED]: {
      screen: VoucherGeneratedScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.KO_CHECK_RESIDENCE]: {
      screen: SvCheckResidenceKoScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.KO_SELECT_BENEFICIARY_CATEGORY]: {
      screen: SvSelectBeneficiaryCategoryKoScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.KO_CHECK_INCOME_THRESHOLD]: {
      screen: SvCheckIncomeKoScreen
    },
    [SV_ROUTES.VOUCHER_GENERATION.TIMEOUT_GENERATED_VOUCHER]: {
      screen: SvGeneratedVoucherTimeoutScreen
    }
  },
  {
    // Let each screen handle the header and navigation
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default SvNavigator;
