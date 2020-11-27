import { Option } from "fp-ts/lib/Option";
import * as React from "react";
import { Image, ImageStyle, ImageURISource, StyleProp } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import pagoBancomatImage from "../../../../../img/wallet/cards-icons/pagobancomat.png";
import { Body } from "../../../../components/core/typography/Body";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import I18n from "../../../../i18n";
import { navigateToBancomatDetailScreen } from "../../../../store/actions/navigation";
import { GlobalState } from "../../../../store/reducers/types";
import { BancomatPaymentMethod } from "../../../../types/pagopa";
import { CardPreview } from "../../component/CardPreview";
import { useImageResize } from "../../onboarding/bancomat/screens/hooks/useImageResize";
import { isImageURISource } from "../../../../utils/image";

type OwnProps = { bancomat: BancomatPaymentMethod };

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  OwnProps;

const BASE_IMG_W = 160;
const BASE_IMG_H = 20;

/**
 * Render the image (if available) or the bank name (if available)
 * or the generic bancomat string (final fallback).
 * @param props
 * @param size
 */
const renderLeft = (
  props: Props,
  size: Option<[number, number]>,
  imageURI: ImageURISource | undefined
) =>
  size.fold(
    <Body style={IOStyles.flex} numberOfLines={1}>
      {props.bancomat.abiInfo?.name ?? I18n.t("wallet.methods.bancomat.name")}
    </Body>,
    imgDim => {
      const imageStyle: StyleProp<ImageStyle> = {
        width: imgDim[0],
        height: imgDim[1],
        resizeMode: "contain"
      };
      return imageURI ? <Image source={imageURI} style={imageStyle} /> : null;
    }
  );

/**
 * A card preview for a bancomat card
 * @param props
 * @constructor
 */
const BancomatWalletPreview: React.FunctionComponent<Props> = props => {
  const imageURI = isImageURISource(props.bancomat.icon)
    ? props.bancomat.icon
    : undefined;
  const imgDimensions = useImageResize(BASE_IMG_W, BASE_IMG_H, imageURI?.uri);

  return (
    <CardPreview
      left={renderLeft(props, imgDimensions, imageURI)}
      image={pagoBancomatImage}
      onPress={() => props.navigateToBancomatDetails(props.bancomat)}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigateToBancomatDetails: (bancomat: BancomatPaymentMethod) =>
    dispatch(navigateToBancomatDetailScreen(bancomat))
});

const mapStateToProps = (_: GlobalState) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BancomatWalletPreview);
