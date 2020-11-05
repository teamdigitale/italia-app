import { View } from "native-base";
import * as React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { H4 } from "../../../../../components/core/typography/H4";
import { H5 } from "../../../../../components/core/typography/H5";
import { ShadowBox } from "../../screens/details/components/summary/base/ShadowBox";

type Props = {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  rightText: string;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  body: {
    height: 64 - 12 - 12,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardIcon: {
    width: 40,
    height: 25,
    overflow: "hidden",
    resizeMode: "contain",
    alignSelf: "center"
  }
});

/**
 * Graphical settings and layout for the BpdTransactionItem
 * @param props
 * @constructor
 */
export const BaseBpdTransactionItem: React.FunctionComponent<Props> = props => (
  <View style={{ marginVertical: 4 }}>
    <ShadowBox>
      <View style={[styles.body, styles.row]}>
        <View style={[styles.row]}>
          <Image source={props.image} style={styles.cardIcon} />
          <View hspacer={true} />
          <View>
            <H4 weight={"SemiBold"} color={"bluegreyDark"}>
              {props.title}
            </H4>
            <H5 color={"bluegrey"}>{props.subtitle}</H5>
          </View>
        </View>

        <H4 weight={"SemiBold"} color={"bluegreyDark"}>
          {props.rightText}
        </H4>
      </View>
    </ShadowBox>
  </View>
);
