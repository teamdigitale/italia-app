import { NavigationActions } from "react-navigation";
import { InferNavigationParams } from "../../../types/react";
import EuCovidCertificateRouterScreen from "../screens/EuCovidCertificateRouterScreen";
import { EuCovidCertMarkdownDetailsScreen } from "../screens/valid/EuCovidCertMarkdownDetailsScreen";
import { EuCovidCertQrCodeFullScreen } from "../screens/valid/EuCovidCertQrCodeFullScreen";
import EUCOVIDCERT_ROUTES from "./routes";

export const navigateToEuCovidCertificateDetailScreen = (
  params: InferNavigationParams<typeof EuCovidCertificateRouterScreen>
) =>
  NavigationActions.navigate({
    routeName: EUCOVIDCERT_ROUTES.CERTIFICATE,
    params
  });

export const navigateToEuCovidCertificateQrCodeFullScreen = (
  params: InferNavigationParams<typeof EuCovidCertQrCodeFullScreen>
) =>
  NavigationActions.navigate({
    routeName: EUCOVIDCERT_ROUTES.QRCODE,
    params
  });

export const navigateToEuCovidCertificateMarkdownDetailsScreen = (
  params: InferNavigationParams<typeof EuCovidCertMarkdownDetailsScreen>
) =>
  NavigationActions.navigate({
    routeName: EUCOVIDCERT_ROUTES.MARKDOWN_DETAILS,
    params
  });
