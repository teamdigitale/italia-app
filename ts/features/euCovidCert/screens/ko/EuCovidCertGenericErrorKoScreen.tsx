import { View } from "native-base";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import image from "../../../../../img/servicesStatus/error-detail-icon.png";
import { Body } from "../../../../components/core/typography/Body";
import WorkunitGenericFailure from "../../../../components/error/WorkunitGenericFailure";
import { renderInfoRasterImage } from "../../../../components/infoScreen/imageRendering";
import { InfoScreenComponent } from "../../../../components/infoScreen/InfoScreenComponent";
import FooterWithButtons from "../../../../components/ui/FooterWithButtons";
import I18n from "../../../../i18n";
import { GlobalState } from "../../../../store/reducers/types";
import { confirmButtonProps } from "../../../bonus/bonusVacanze/components/buttons/ButtonConfigurations";
import { euCovidCertificateGet } from "../../store/actions";
import { euCovidCertCurrentSelector } from "../../store/reducers/current";
import { EUCovidCertificateAuthCode } from "../../types/EUCovidCertificate";
import { BaseEuCovidCertificateLayout } from "../BaseEuCovidCertificateLayout";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const EuCovidCertGenericErrorKoComponent = () => (
  <>
    <View spacer={true} extralarge={true} />
    <View spacer={true} extralarge={true} />
    <InfoScreenComponent
      image={renderInfoRasterImage(image)}
      title={I18n.t("features.euCovidCertificate.ko.genericError.title")}
      body={
        <Body style={{ textAlign: "center" }}>
          {I18n.t("features.euCovidCertificate.ko.genericError.subtitle")}
        </Body>
      }
    />
  </>
);

type FooterProps = {
  onPress: () => void;
};

const Footer = (props: FooterProps) => (
  <FooterWithButtons
    type={"SingleButton"}
    leftButton={confirmButtonProps(
      props.onPress,
      I18n.t("global.buttons.retry")
    )}
  />
);

const EuCovidCertGenericErrorKoScreen = (props: Props): React.ReactElement => {
  // read from the store the authCode for the current certificate and create the refresh callback
  const authCode = props.currentCertificate?.authCode;
  const reloadCertificate = authCode ? () => props.reload(authCode) : undefined;

  // reloadCertificate === undefined should never happens, handled with WorkunitGenericFailure
  return reloadCertificate ? (
    <BaseEuCovidCertificateLayout
      testID={"EuCovidCertGenericErrorKoScreen"}
      content={<EuCovidCertGenericErrorKoComponent />}
      footer={<Footer onPress={reloadCertificate} />}
    />
  ) : (
    <WorkunitGenericFailure />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reload: (authCode: EUCovidCertificateAuthCode) =>
    dispatch(euCovidCertificateGet.request(authCode))
});
const mapStateToProps = (state: GlobalState) => ({
  currentCertificate: euCovidCertCurrentSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EuCovidCertGenericErrorKoScreen);
