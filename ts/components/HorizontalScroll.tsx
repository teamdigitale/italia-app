/**
 * This component allows to display a carousel with rounded indicators at the bottom
 */
import { View } from "native-base";
import * as React from "react";
import { Animated, Dimensions, ScrollView, StyleSheet } from "react-native";
import I18n from "../i18n";
import variables from "../theme/variables";
import { fromNullable } from "fp-ts/lib/Option";

type Props = {
  cards: ReadonlyArray<JSX.Element>;
  onCurrentElement?: (index: number) => void;
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
  const animVal = new Animated.Value(0);

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
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={props.cards.length}
        pagingEnabled={true}
        onScroll={event => {
          const currentIndex = Math.floor(
            event.nativeEvent.contentOffset.x / Dimensions.get("window").width
          );
          fromNullable(props.onCurrentElement).foldL(() => void 0, onCurrElement => onCurrElement(currentIndex));
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

      <View style={styles.barContainer}>{barArray}</View>
      <View spacer={true} />
    </View>
  );
};
