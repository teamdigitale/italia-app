import * as React from "react";
import { Image, ImageStyle, StyleProp } from "react-native";
import { Option } from "fp-ts/lib/Option";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Body } from "../../../../components/core/typography/Body";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import { GlobalState } from "../../../../store/reducers/types";
import { CardPreview } from "../../component/CardPreview";
import { navigateToCobadgeDetailScreen } from "../../../../store/actions/navigation";
import { CreditCardPaymentMethod } from "../../../../types/pagopa";
import { useImageResize } from "../../onboarding/bancomat/screens/hooks/useImageResize";
import { getCardIconFromBrandLogo } from "../../../../components/wallet/card/Logo";

type OwnProps = {
  cobadge: CreditCardPaymentMethod;
};

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  OwnProps;

const BASE_IMG_W = 160;
const BASE_IMG_H = 20;
/**
 * Render the image (if available) or the bank name (if available)
 * or the generic CreditCardPaymentMethod caption (final fallback).
 * @param props
 * @param size
 */
const renderLeft = (props: Props, size: Option<[number, number]>) =>
  size.fold(
    <Body style={IOStyles.flex} numberOfLines={1} testID={"bankLogoFallback"}>
      {props.cobadge.caption}
    </Body>,
    imgDim => {
      const imageUrl = props.cobadge.abiInfo?.logoUrl;

      const imageStyle: StyleProp<ImageStyle> = {
        width: imgDim[0],
        height: imgDim[1],
        resizeMode: "contain"
      };
      return imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={imageStyle}
          testID={"bankLogo"}
        />
      ) : null;
    }
  );

/**
 * A card preview for a cobadge card
 * @param props
 * @constructor
 */
const CobadgeWalletPreview: React.FunctionComponent<Props> = props => {
  const imgDimensions = useImageResize(
    BASE_IMG_W,
    BASE_IMG_H,
    props.cobadge.abiInfo?.logoUrl
  );

  const brandLogo = getBrandLogo(props.cobadge);
  return (
    <CardPreview
      left={renderLeft(props, imgDimensions)}
      image={getCardIconFromBrandLogo(props.cobadge.info)}
      onPress={() => props.navigateToCobadgeDetails(props.cobadge)}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigateToCobadgeDetails: (
    cobadge: CreditCardPaymentMethod,
    brandLogo: ImageSourcePropType
  ) => dispatch(navigateToCobadgeDetailScreen(cobadge, brandLogo))
});

const mapStateToProps = (_: GlobalState) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CobadgeWalletPreview);
