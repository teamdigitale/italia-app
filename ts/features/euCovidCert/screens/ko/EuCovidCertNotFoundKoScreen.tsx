import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Image, StyleSheet } from "react-native";
import { View } from "native-base";
import I18n from "../../../../i18n";
import { GlobalState } from "../../../../store/reducers/types";
import { BaseEuCovidCertificateLayout } from "../BaseEuCovidCertificateLayout";
import CopyButtonComponent from "../../../../components/CopyButtonComponent";
import doubtImage from "../../../../../img/pictograms/doubt.png";
import { InfoScreenComponent } from "../../../../components/infoScreen/InfoScreenComponent";
import { H4 } from "../../../../components/core/typography/H4";
import { EUCovidCertificateAuthCode } from "../../types/EUCovidCertificate";
import { currentAuthCodeSelector } from "../../store/reducers/currentAuthCode";
import WorkunitGenericFailure from "../../../../components/error/WorkunitGenericFailure";
import { mixpanelTrack } from "../../../../mixpanel";
import { confirmButtonProps } from "../../../bonus/bonusVacanze/components/buttons/ButtonConfigurations";
import FooterWithButtons from "../../../../components/ui/FooterWithButtons";
import { openWebUrl } from "../../../../utils/url";
import { euCovidCertificateUrl } from "../../../../urls";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const CopyWithTitleItem: React.FC<{ title: string; toCopy: string }> = ({
  title,
  toCopy
}) => (
  <>
    <View>
      <H4 weight={"Regular"}>{title}</H4>
    </View>
    <View style={styles.row}>
      <H4 weight={"Bold"}>{toCopy}</H4>
      <CopyButtonComponent textToCopy={toCopy} />
    </View>
  </>
);

const EuCovidCertNotFoundKoComponent: React.FC<{
  currentAuthCode: EUCovidCertificateAuthCode;
  messageId: string;
}> = ({ currentAuthCode, messageId }) => (
  <>
    <InfoScreenComponent
      image={
        <Image
          source={doubtImage}
          importantForAccessibility={"no"}
          accessibilityElementsHidden={true}
          style={{ width: 104, height: 104, resizeMode: "contain" }}
        />
      }
      title={I18n.t("features.euCovidCertificate.ko.notFound.title")}
    />
    <H4 weight={"Regular"}>
      {I18n.t("features.euCovidCertificate.ko.notFound.subtitle")}
    </H4>
    <View spacer={true} />
    <CopyWithTitleItem
      title={I18n.t("features.euCovidCertificate.common.authorizationCode")}
      toCopy={currentAuthCode}
    />
    <View spacer={true} />
    <CopyWithTitleItem
      title={I18n.t("features.euCovidCertificate.common.messageIdentifier")}
      toCopy={messageId}
    />
  </>
);

const EuCovidCertNotFoundKoScreen = (props: Props): React.ReactElement => {
  // Handling unexpected error
  if (props.currentAuthCode === null) {
    void mixpanelTrack("EUCOVIDCERT_UNEXPECTED_ERROR");
    return <WorkunitGenericFailure />;
  }

  return (
    <BaseEuCovidCertificateLayout
      testID={"EuCovidCertNotFoundKoScreen"}
      content={
        <EuCovidCertNotFoundKoComponent
          currentAuthCode={props.currentAuthCode}
          messageId={"1235"}
        />
      }
      footer={
        <FooterWithButtons
          type={"SingleButton"}
          leftButton={confirmButtonProps(() =>
            openWebUrl(euCovidCertificateUrl)
          )}
        />
      }
    />
  );
};
const mapDispatchToProps = (_: Dispatch) => ({});
const mapStateToProps = (state: GlobalState) => ({
  currentAuthCode: currentAuthCodeSelector(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EuCovidCertNotFoundKoScreen);
