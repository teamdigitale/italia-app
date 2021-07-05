import { NavigationActions } from "react-navigation";
import SV_ROUTES from "./routes";

export const navigateToSvCheckStatusRouterScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.CHECK_STATUS
  });

export const navigateToSvSelectbBeneficiaryCategoryScreen = () =>
  NavigationActions.navigate({
    routeName: SV_ROUTES.VOUCHER_GENERATION.SELECT_BENEFICIARY_CATEGORY
  });
