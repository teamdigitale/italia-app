import * as React from "react";
import { useMemo } from "react";
import { LatLng, MapEvent, Marker } from "react-native-maps";
import { ImageBackground, StyleSheet } from "react-native";
import { fromNullable } from "fp-ts/lib/Option";
import bluePin from "../../../../../../../img/bonus/cgn/map/pin-lightblue.png";
import fuchsiaPin from "../../../../../../../img/bonus/cgn/map/pin-fuchsia.png";
import IconFont from "../../../../../../components/ui/IconFont";
import { IOColors } from "../../../../../../components/core/variables/IOColors";
import { categoryIconMap, CategoryType } from "../../../utils/filters";

type Props = {
  coordinate: LatLng;
  category: CategoryType;
  selected: boolean;
  onMarkPress: () => void;
};

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 52,
    justifyContent: "center",
    paddingHorizontal: 12
  },
  backgroundImage: { width: 46, height: 58, resizeMode: "cover" }
});

const ICON_SIZE = 22;

/**
 * Custom component to display a marker position on map for the related merchant showing it's category icon
 * @param props
 * @constructor
 */
const CgnMerchantMarker: React.FunctionComponent<Props> = (props: Props) => {
  const iconName = useMemo(
    () => fromNullable(categoryIconMap.get(props.category)),
    [props.category]
  );

  const handleOnPress = (e: MapEvent) => {
    props.onMarkPress();
    e.stopPropagation();
  };

  return (
    <Marker coordinate={props.coordinate} onPress={handleOnPress}>
      <ImageBackground
        source={props.selected ? fuchsiaPin : bluePin}
        imageStyle={styles.backgroundImage}
        style={styles.container}
      >
        {iconName.isSome() && (
          <IconFont
            name={iconName.value}
            color={props.selected ? IOColors.white : IOColors.bluegreyDark}
            size={ICON_SIZE}
          />
        )}
      </ImageBackground>
    </Marker>
  );
};

export default CgnMerchantMarker;
