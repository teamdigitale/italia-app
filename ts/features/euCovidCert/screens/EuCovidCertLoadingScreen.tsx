import { View } from "native-base";
import * as React from "react";
import { ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Body } from "../../../components/core/typography/Body";
import { InfoScreenComponent } from "../../../components/infoScreen/InfoScreenComponent";
import { GlobalState } from "../../../store/reducers/types";
import I18n from "../../../i18n";
import { BaseEuCovidCertificateLayout } from "./BaseEuCovidCertificateLayout";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const euActivityIndicator = (
  <ActivityIndicator
    color={"black"}
    size={"large"}
    accessible={false}
    importantForAccessibility={"no-hide-descendants"}
    accessibilityElementsHidden={true}
  />
);

const EuCovidCertLoadingScreen = (_: Props): React.ReactElement => (
  <BaseEuCovidCertificateLayout
    testID={"EuCovidCertLoadingScreen"}
    content={
      <View>
        <View spacer={true} extralarge={true} />
        <View spacer={true} extralarge={true} />
        <View spacer={true} extralarge={true} />
        <InfoScreenComponent
          image={euActivityIndicator}
          title={I18n.t("features.euCovidCertificate.loading.title")}
          body={
            <Body>
              {I18n.t("features.euCovidCertificate.loading.subtitle")}
            </Body>
          }
        />
      </View>
    }
  />
);

const mapDispatchToProps = (_: Dispatch) => ({});
const mapStateToProps = (_: GlobalState) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EuCovidCertLoadingScreen);
