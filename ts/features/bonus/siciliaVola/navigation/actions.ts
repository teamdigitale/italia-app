import { NavigationActions } from "react-navigation";
import SV_ROUTES from "./routes";

export const navigateToSvCheckStatusRouterScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.CHECK_STATUS
  });

export const navigateToSvSelectBeneficiaryCategoryScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.SELECT_BENEFICIARY_CATEGORY
  });

export const navigateToSvStudentSelectDestinationScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.STUDENT_SELECT_DESTINATION
  });
export const navigateToSvDisableAdditionalInfoScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.DISABLE_ADDITIONAL_INFO
  });
export const navigateToSvWorkerCheckIncomeThresholdScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.WORKER_CHECK_INCOME_THRESHOLD
  });
export const navigateToSvWorkerSelectDestinationScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.WORKER_SELECT_DESTINATION
  });
export const navigateToSvSickCheckIncomeThresholdScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.SICK_CHECK_INCOME_THRESHOLD
  });
export const navigateToSvSickSelectDestinationScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.SICK_SELECT_DESTINATION
  });
export const navigateToSvSelectFlightsDateScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.SELECT_FLIGHTS_DATA
  });
export const navigateToSvSummaryScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.SUMMARY
  });
export const navigateToSvVoucherGeneratedScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.VOUCHER_GENERATED
  });
