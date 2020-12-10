/**
 * This component allows to display a carousel with rounded indicators at the bottom
 */
import { View } from "native-base";
import * as React from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet
} from "react-native";
import { fromNullable } from "fp-ts/lib/Option";
import I18n from "../i18n";
import variables from "../theme/variables";
import { roundToThirdDecimal } from "../utils/number";

type Props = {
  cards: ReadonlyArray<JSX.Element>;
  onCurrentElement?: (index: number) => void;
  indexToScroll?: number;
};

const itemWidth = 10; // Radius of the indicators
const noWidth = 0;
const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  track: {
    backgroundColor: variables.brandLightGray,
    overflow: "hidden",
    width: itemWidth,
    height: itemWidth,
    borderRadius: itemWidth / 2
  },

  bar: {
    backgroundColor: variables.brandPrimary,
    borderRadius: itemWidth / 2,
    width: itemWidth,
    height: itemWidth
  },

  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  barContainer: {
    zIndex: itemWidth,
    flexDirection: "row"
  }
});

export const HorizontalScroll: React.FunctionComponent<Props> = (
  props: Props
) => {
  const scrollOffset =
    (props.indexToScroll ?? 0) * Dimensions.get("window").width;
  const animVal = new Animated.Value(scrollOffset);
  const scrollRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    fromNullable(props.indexToScroll).map(_ =>
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: scrollOffset,
            y: 0,
            animated: false
          });
        }
      }, 0)
    );
  }, [scrollRef]);

  const barArray = props.cards.map((_, i) => {
    const scrollBarVal = animVal.interpolate({
      inputRange: [screenWidth * (i - 1), screenWidth * (i + 1)],
      outputRange: [-itemWidth, itemWidth],
      extrapolate: "clamp"
    });

    return (
      <View
        key={`bar${i}`}
        style={[
          styles.track,
          {
            marginLeft: i === 0 ? noWidth : itemWidth
          }
        ]}
      >
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{ translateX: scrollBarVal }]
            }
          ]}
        />
      </View>
    );
  });

  return (
    <View style={styles.scrollView}>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={props.cards.length > 1}
        scrollEventThrottle={props.cards.length}
        pagingEnabled={true}
        onScroll={event => {
          const currentIndex = Platform.select({
            ios: Math.floor(
              event.nativeEvent.contentOffset.x / Dimensions.get("window").width
            ),
            default: Math.floor(
              roundToThirdDecimal(event.nativeEvent.contentOffset.x) /
                roundToThirdDecimal(Dimensions.get("window").width)
            )
          });
          fromNullable(props.onCurrentElement).map(onCurrElement =>
            onCurrElement(currentIndex)
          );
          Animated.event([{ nativeEvent: { contentOffset: { x: animVal } } }])(
            event
          );
        }}
        accessible={true}
        accessibilityLabel={I18n.t(
          "authentication.landing.accessibility.carousel.label"
        )}
        accessibilityHint={I18n.t(
          "authentication.landing.accessibility.carousel.hint"
        )}
      >
        {props.cards}
      </ScrollView>

      {props.cards.length > 1 && (
        <View style={styles.barContainer}>{barArray}</View>
      )}
      <View spacer={true} />
    </View>
  );
};
