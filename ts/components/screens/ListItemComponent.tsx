import { Badge, ListItem, Text, View } from "native-base";
import * as React from "react";
import {
  AccessibilityRole,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
  AccessibilityState
} from "react-native";
import Switch from "../../components/ui/Switch";
import { makeFontStyleObject } from "../../theme/fonts";
import customVariables from "../../theme/variables";
import IconFont from "./../ui/IconFont";
import { BadgeComponent } from "./BadgeComponent";

type Props = Readonly<{
  title: string;
  titleBadge?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  subTitle?: string;
  isFirstItem?: boolean;
  isLastItem?: boolean;
  hasBadge?: boolean;
  iconName?: string;
  smallIconSize?: boolean;
  iconOnTop?: boolean;
  iconSize?: number;
  hideIcon?: boolean;
  paddingRightDescription?: number;
  useExtendedSubTitle?: boolean;
  style?: StyleProp<ViewStyle>;
  hideSeparator?: boolean;
  isItemDisabled?: boolean;
  onSwitchValueChanged?: (value: boolean) => void;
  switchValue?: boolean;
  switchDisabled?: boolean;
  keySwitch?: string;
  isLongPressEnabled?: boolean;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
  testID?: string;
}>;
const DEFAULT_ICON_SIZE = 24;
const PADDING_R_DESCRIPTION = 24;

const styles = StyleSheet.create({
  listItem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  spacingBase: {
    paddingTop: 6,
    paddingRight: customVariables.spacingBase
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  flexRow2: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1
  },
  flexColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1
  },
  serviceName: {
    fontSize: 18,
    color: customVariables.brandDarkestGray,
    ...makeFontStyleObject(Platform.select, "600"),
    alignSelf: "flex-start",
    paddingRight: 16
  },
  disabledItem: {
    color: customVariables.lightGray
  },
  description: {
    paddingRight: PADDING_R_DESCRIPTION,
    alignSelf: "flex-start"
  },
  center: {
    alignSelf: "center"
  },
  alignToStart: {
    alignSelf: "flex-start"
  },
  badgeStyle: {
    backgroundColor: customVariables.brandPrimary,
    borderColor: "white",
    borderWidth: 2,
    elevation: 0.1,
    shadowColor: "white",
    justifyContent: "center",
    alignContent: "center",
    marginTop: -3
  }
});

export default class ListItemComponent extends React.Component<Props> {
  public render() {
    const ICON_SIZE = this.props.iconSize || DEFAULT_ICON_SIZE;
    const showDefaultIcon =
      this.props.iconName === undefined && this.props.hideIcon !== true;
    return (
      <ListItem
        style={[styles.listItem, styles.flexRow, this.props.style]}
        onPress={this.props.onPress}
        onLongPress={this.props.onLongPress}
        first={this.props.isFirstItem}
        last={this.props.isLastItem || this.props.hideSeparator}
        accessible={this.props.accessible}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityState={this.props.accessibilityState}
        accessibilityRole={this.props.accessibilityRole}
        testID={this.props.testID}
      >
        <View style={styles.flexColumn}>
          <View style={styles.flexRow}>
            <View style={styles.flexRow2}>
              {this.props.hasBadge && (
                <View style={styles.spacingBase}>
                  <BadgeComponent />
                </View>
              )}
              <Text
                numberOfLines={2}
                style={[
                  styles.serviceName,
                  this.props.isItemDisabled && styles.disabledItem
                ]}
              >
                {this.props.title}
              </Text>
              {this.props.titleBadge && (
                <Badge style={styles.badgeStyle}>
                  <Text badge={true}>{this.props.titleBadge}</Text>
                </Badge>
              )}
            </View>
            {showDefaultIcon &&
              (this.props.isLongPressEnabled ? (
                <Switch
                  key={this.props.keySwitch}
                  value={this.props.switchValue}
                  onValueChange={this.props.onSwitchValueChanged}
                  disabled={this.props.switchDisabled}
                />
              ) : (
                <IconFont
                  name={"io-right"}
                  size={ICON_SIZE}
                  color={customVariables.contentPrimaryBackground}
                />
              ))}
          </View>
          {this.props.subTitle && (
            <Text
              numberOfLines={this.props.useExtendedSubTitle ? undefined : 1}
              style={[
                styles.description,
                {
                  paddingRight:
                    this.props.paddingRightDescription || PADDING_R_DESCRIPTION
                }
              ]}
            >
              {this.props.subTitle}
            </Text>
          )}
        </View>
        {this.props.iconName !== undefined && this.props.hideIcon !== true && (
          <View style={this.props.iconOnTop && styles.alignToStart}>
            <IconFont
              name={this.props.iconName}
              size={this.props.smallIconSize ? ICON_SIZE : ICON_SIZE * 2}
              style={styles.center}
              color={customVariables.contentPrimaryBackground}
            />
          </View>
        )}
      </ListItem>
    );
  }
}
