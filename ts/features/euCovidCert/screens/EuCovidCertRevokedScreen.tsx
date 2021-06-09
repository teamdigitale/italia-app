import { View } from "native-base";
import * as React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import revokedImage from "../../../../img/features/euCovidCert/certificate_revoked.png";
import { InfoScreenComponent } from "../../../components/infoScreen/InfoScreenComponent";
import I18n from "../../../i18n";
import { GlobalState } from "../../../store/reducers/types";
import EuCovidCertLearnMoreLink from "../components/EuCovidCertLearnMoreLink";
import { MarkdownHandleCustomLink } from "../components/MarkdownHandleCustomLink";
import { BaseEuCovidCertificateLayout } from "./BaseEuCovidCertificateLayout";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> & { revokeInfo?: string };

const EuCovidCertRevokedContentComponent = (props: Props) => (
  <>
    <View spacer extralarge />
    <View spacer extralarge />
    <InfoScreenComponent
      image={
        <Image
          source={revokedImage}
          importantForAccessibility={"no"}
          accessibilityElementsHidden={true}
          style={{ width: 104, height: 104, resizeMode: "contain" }}
        />
      }
      title={I18n.t("features.euCovidCertificate.revoked.title")}
      body={<EuCovidCertLearnMoreLink />}
    />
    <View spacer />
    {props.revokeInfo && (
      <MarkdownHandleCustomLink extraBodyHeight={60}>
        {props.revokeInfo}
      </MarkdownHandleCustomLink>
    )}
  </>
);

const EuCovidCertRevokedScreen = (props: Props): React.ReactElement => (
  <BaseEuCovidCertificateLayout
    testID={"EuCovidCertRevokedScreen"}
    content={<EuCovidCertRevokedContentComponent {...props} />}
  />
);

const mapDispatchToProps = (_: Dispatch) => ({});
const mapStateToProps = (_: GlobalState) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EuCovidCertRevokedScreen);
