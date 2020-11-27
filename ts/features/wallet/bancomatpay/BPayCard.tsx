import * as React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";
import { connect } from "react-redux";
import BaseCardComponent from "../component/BaseCardComponent";
import bancomatLogoMin from "../../../../img/wallet/payment-methods/bancomatpay-logo.png";
import { Body } from "../../../components/core/typography/Body";
import { GlobalState } from "../../../store/reducers/types";
import { profileNameSurnameSelector } from "../../../store/reducers/profile";
import { useImageResize } from "../onboarding/bancomat/screens/hooks/useImageResize";
import { H3 } from "../../../components/core/typography/H3";

type Props = {
  bankName?: string;
  abiLogo?: string;
} & ReturnType<typeof mapStateToProps>;

const styles = StyleSheet.create({
  bpayLogo: {
    width: 80,
    height: 40,
    resizeMode: "contain"
  },
  bankName: { textTransform: "capitalize" }
});

const BASE_IMG_W = 160;
const BASE_IMG_H = 40;

const BPayCard: React.FunctionComponent<Props> = (props: Props) => {
  const imgDimensions = useImageResize(BASE_IMG_W, BASE_IMG_H, props.abiLogo);

  const imageStyle: StyleProp<ImageStyle> | undefined = imgDimensions.fold(
    undefined,
    imgDim => ({
      width: imgDim[0],
      height: imgDim[1],
      resizeMode: "contain"
    })
  );

  return (
    <BaseCardComponent
      topLeftCorner={
        props.abiLogo && imageStyle ? (
          <Image source={{ uri: props.abiLogo }} style={imageStyle} />
        ) : (
          <H3 style={styles.bankName}>{props.bankName}</H3>
        )
      }
      bottomLeftCorner={
        <Body>{(props.nameSurname ?? "").toLocaleUpperCase()}</Body>
      }
      bottomRightCorner={
        <Image style={styles.bpayLogo} source={bancomatLogoMin} />
      }
    />
  );
};

const mapStateToProps = (state: GlobalState) => ({
  nameSurname: profileNameSurnameSelector(state)
});

export default connect(mapStateToProps)(BPayCard);
