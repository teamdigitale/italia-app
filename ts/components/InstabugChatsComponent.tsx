import { none, Option, some } from "fp-ts/lib/Option";
import { BugReporting, Replies } from "instabug-reactnative";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { openInstabugChat } from "../boot/configureInstabug";
import I18n from "../i18n";
import {
  instabugReportClosed,
  instabugReportOpened
} from "../store/actions/debug";
import { updateInstabugUnreadMessages } from "../store/actions/instabug";
import { Dispatch } from "../store/actions/types";
import { instabugMessageStateSelector } from "../store/reducers/instabug/instabugUnreadMessages";
import { GlobalState } from "../store/reducers/types";
import variables from "../theme/variables";
import ButtonDefaultOpacity from "./ButtonDefaultOpacity";
import CustomBadge from "./ui/CustomBadge";
import IconFont from "./ui/IconFont";

interface OwnProps {
  color?: string;
}

const styles = StyleSheet.create({
  textStyle: {
    paddingLeft: 0,
    paddingRight: 0
  },
  badgeStyle: {
    backgroundColor: variables.brandPrimary,
    borderColor: "white",
    borderWidth: 2,
    position: "absolute",
    elevation: 0.1,
    shadowColor: "white",
    height: 19,
    width: 19,
    left: 20,
    bottom: 20,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: "center",
    alignContent: "center"
  },
  noPadRight: {
    paddingRight: 0
  },
  buttonStyle: {
    padding: 8,
    paddingRight: 0
  }
});

type Props = ReturnType<typeof mapStateToProps> &
  OwnProps &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  instabugReportType: Option<BugReporting.reportType>;
  hasChats: boolean;
};

/**
 * A component to access the list of chats started with the assistance.
 * The icon has a badge if there are unread messages from the assistance
 */
class InstabugChatsComponent extends React.PureComponent<Props, State> {
  private handleIBChatPress = () => {
    this.setState({
      instabugReportType: some(BugReporting.reportType.question)
    });
    this.props.dispatchIBReportOpen(BugReporting.reportType.question);
    openInstabugChat(this.state.hasChats);
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      instabugReportType: none,
      hasChats: false
    };
  }
  public componentDidMount() {
    // Register to the instabug dismiss event. (https://docs.instabug.com/docs/react-native-bug-reporting-event-handlers#section-after-dismissing-instabug)
    // This event is fired when chat or bug screen is dismissed
    BugReporting.onSDKDismissedHandler(
      (dismiss: string, _: string): void => {
        // Due an Instabug library bug, we can't use the report parameter because it always has "bug" as value.
        // We need to differentiate the type of report then use instabugReportType
        if (this.state.instabugReportType.isSome()) {
          this.props.dispatchIBReportClosed(
            this.state.instabugReportType.value,
            dismiss
          );
          // when user dismisses instabug report (chat or bug) we update the unread messages counter.
          // This is because user could have read or reply to some messages
          this.props.dispatchUpdateInstabugUnreadMessagesCounter();
        }
      }
    );
    this.checkInstabugChats();
  }

  private checkInstabugChats = () => {
    Replies.hasChats(hasChats => {
      this.setState({ hasChats });
    });
  };

  public componentDidUpdate(_: Props) {
    // check if instabug has new chats
    this.checkInstabugChats();
  }

  private getUnreadMessagesDescription = () => {
    if (this.props.badge === 0) {
      return "";
    }
    return this.props.badge === 1
      ? I18n.t("global.accessibility.chat.unread_singular", {
          messages: this.props.badge
        })
      : I18n.t("global.accessibility.chat.unread_plural", {
          messages: this.props.badge
        });
  };

  public render() {
    // we render the chat icon if the user has previous or new chats with the support team
    const canRenderChatsIcon = this.state.hasChats || this.props.badge > 0;
    const accessibilityHint = this.getUnreadMessagesDescription();
    return (
      <React.Fragment>
        {canRenderChatsIcon && (
          <View>
            <ButtonDefaultOpacity
              onPress={this.handleIBChatPress}
              transparent={true}
              accessibilityLabel={I18n.t(
                "global.accessibility.chat.description"
              )}
              accessibilityHint={accessibilityHint}
              style={styles.buttonStyle}
            >
              <IconFont
                name="io-chat"
                color={this.props.color}
                style={styles.noPadRight}
              />
            </ButtonDefaultOpacity>
            <CustomBadge
              badgeStyle={styles.badgeStyle}
              textStyle={styles.textStyle}
              badgeValue={this.props.badge}
            />
          </View>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  badge: instabugMessageStateSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchIBReportOpen: (type: BugReporting.reportType) =>
    dispatch(instabugReportOpened({ type })),
  dispatchIBReportClosed: (type: BugReporting.reportType, how: string) =>
    dispatch(instabugReportClosed({ type, how })),
  dispatchUpdateInstabugUnreadMessagesCounter: () =>
    dispatch(updateInstabugUnreadMessages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstabugChatsComponent);
