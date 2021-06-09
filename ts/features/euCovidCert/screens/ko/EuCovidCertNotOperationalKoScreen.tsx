import { View } from "native-base";
import * as React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GlobalState } from "../../../../store/reducers/types";
import { BaseEuCovidCertificateLayout } from "../BaseEuCovidCertificateLayout";
import { InfoScreenComponent } from "../../../../components/infoScreen/InfoScreenComponent";
import I18n from "../../../../i18n";
import notOperational from "../../../../../img/messages/empty-due-date-list-icon.png";
import EuCovidCertLearnMoreLink from "../../components/EuCovidCertLearnMoreLink";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const EuCovidCertNotOperationalComponent = (): React.ReactElement => (
  <>
    <View spacer extralarge />
    <View spacer extralarge />
    <InfoScreenComponent
      image={
        <Image
          importantForAccessibility={"no"}
          accessibilityElementsHidden={true}
          source={notOperational}
          style={{ width: 104, height: 104, resizeMode: "cover" }}
        />
      }
      title={I18n.t("features.euCovidCertificate.ko.notOperational.title")}
      body={<EuCovidCertLearnMoreLink />}
    />
  </>
);

const EuCovidCertNotOperationalKoScreen = (_: Props): React.ReactElement => (
  <BaseEuCovidCertificateLayout
    testID={"EuCovidCertNotOperationalKoScreen"}
    content={<EuCovidCertNotOperationalComponent />}
  />
);

const mapDispatchToProps = (_: Dispatch) => ({});
const mapStateToProps = (_: GlobalState) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EuCovidCertNotOperationalKoScreen);
