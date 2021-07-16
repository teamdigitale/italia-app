import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { View } from "native-base";
import { InfoScreenComponent } from "../../../../../../components/infoScreen/InfoScreenComponent";
import { renderInfoRasterImage } from "../../../../../../components/infoScreen/imageRendering";
import image from "../../../../../../../img/servicesStatus/error-detail-icon.png";
import I18n from "../../../../../../i18n";
import { Body } from "../../../../../../components/core/typography/Body";
import { GlobalState } from "../../../../../../store/reducers/types";

const SvCheckIncomeKoScreen = () => (
  <>
    <View spacer={true} extralarge={true} />
    <View spacer={true} extralarge={true} />
    <InfoScreenComponent
      image={renderInfoRasterImage(image)}
      title={I18n.t("bonus.sv.voucherGeneration.ko.checkResidence.title")}
      body={
        <Body style={{ textAlign: "center" }}>
          {I18n.t("bonus.sv.voucherGeneration.ko.checkResidence.body")}
        </Body>
      }
    />
  </>
);

const mapDispatchToProps = (_: Dispatch) => ({});
const mapStateToProps = (_: GlobalState) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SvCheckIncomeKoScreen);
