import { createStackNavigator } from "react-navigation";
import EuCovidCertificateRouterScreen from "../screens/EuCovidCertificateRouterScreen";
import { EuCovidCertQrCodeFullScreen } from "../screens/EuCovidCertQrCodeFullScreen";
import EUCOVIDCERT_ROUTES from "./routes";

const EuCovidCertNavigator = createStackNavigator(
  {
    [EUCOVIDCERT_ROUTES.DETAILS]: {
      screen: EuCovidCertificateRouterScreen
    },
    [EUCOVIDCERT_ROUTES.QRCODE]: {
      screen: EuCovidCertQrCodeFullScreen
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

export default EuCovidCertNavigator;
