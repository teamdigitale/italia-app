import { none, Option, some } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { View } from "native-base";
import React from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  StyleSheet,
  Vibration
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Placeholder from "rn-placeholder";
import { CreatedMessageWithContentAndAttachments } from "../../../definitions/backend/CreatedMessageWithContentAndAttachments";
import { ServicePublic } from "../../../definitions/backend/ServicePublic";
import I18n from "../../i18n";
import { MessagesStateAndStatus } from "../../store/reducers/entities/messages";
import { MessageState } from "../../store/reducers/entities/messages/messagesById";
import { PaymentByRptIdState } from "../../store/reducers/entities/payments";
import { ServicesByIdState } from "../../store/reducers/entities/services/servicesById";
import customVariables, {
  VIBRATION_LONG_PRESS_DURATION
} from "../../theme/variables";
import { messageNeedsCTABar } from "../../utils/messages";
import ItemSeparatorComponent from "../ItemSeparatorComponent";
import { EdgeBorderComponent } from "../screens/EdgeBorderComponent";
import MessageListItem from "./MessageListItem";

type ItemLayout = {
  length: number;
  offset: number;
  index: number;
};

export type AnimatedProps = {
  animated?: {
    onScroll: (_: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollEventThrottle?: number;
  };
};

type OwnProps = {
  messageStates: ReadonlyArray<MessageState>;
  servicesById: ServicesByIdState;
  paymentsByRptId: PaymentByRptIdState;
  refreshing: boolean;
  onRefresh: () => void;
  onPressItem: (id: string) => void;
  onLongPressItem: (id: string) => void;
  selectedMessageIds: Option<Set<string>>;
  ListEmptyComponent?: React.ComponentProps<
    typeof FlatList
  >["ListEmptyComponent"];
};

type Props = OwnProps & AnimatedProps;

type State = {
  prevMessageStates?: ReadonlyArray<MessageState>;
  itemLayouts: ReadonlyArray<ItemLayout>;
  longPressedItemIndex: Option<number>;
  isFirstLoad: boolean;
};

const ITEM_WITHOUT_CTABAR_HEIGHT = 114;
const ITEM_LOADING_HEIGHT = ITEM_WITHOUT_CTABAR_HEIGHT;
const ITEM_WITH_CTABAR_HEIGHT = 158;
const ITEM_SEPARATOR_HEIGHT = 1;

const styles = StyleSheet.create({
  itemLoadingContainer: {
    height: ITEM_LOADING_HEIGHT,
    paddingVertical: 16,
    paddingHorizontal: customVariables.contentPadding,
    flex: 1
  },
  itemLoadingHeaderWrapper: {
    flexDirection: "row",
    marginBottom: 4
  },
  itemLoadingHeaderCenter: {
    flex: 1,
    paddingRight: 55 // Includes right header space
  },
  itemLoadingContentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 42
  },
  itemLoadingContentCenter: {
    flex: 1,
    paddingRight: 32
  },
  padded: {
    paddingHorizontal: customVariables.contentPadding
  },
  activityIndicator: {
    padding: 12
  }
});

const keyExtractor = (_: MessageState) => _.meta.id;

const getItemHeight = (messageState: MessageState): number => {
  const message = messageState.message;

  if (pot.isLoading(message)) {
    return ITEM_LOADING_HEIGHT;
  }

  return pot.isSome(message) && messageNeedsCTABar(message.value)
    ? ITEM_WITH_CTABAR_HEIGHT
    : ITEM_WITHOUT_CTABAR_HEIGHT;
};

const generateItemLayouts = (messageStates: ReadonlyArray<MessageState>) => {
  // eslint-disable-next-line
  let offset = 0;
  // eslint-disable-next-line
  const itemLayouts: ItemLayout[] = [];

  messageStates.forEach((messageState, index) => {
    const itemHeight = getItemHeight(messageState);

    const itemHeightWithSeparator =
      index === messageStates.length - 1
        ? itemHeight
        : itemHeight + ITEM_SEPARATOR_HEIGHT;

    // eslint-disable-next-line functional/immutable-data
    itemLayouts.push({
      length: itemHeightWithSeparator,
      offset,
      index
    });

    offset += itemHeightWithSeparator;
  });

  return itemLayouts;
};

const MessageListItemPlaceholder = (
  <View style={[styles.itemLoadingContainer]}>
    <View style={styles.itemLoadingHeaderWrapper}>
      <View style={styles.itemLoadingHeaderCenter}>
        <Placeholder.Paragraph
          textSize={customVariables.fontSizeBase}
          color={customVariables.shineColor}
          lineNumber={2}
          lineSpacing={5}
          width="100%"
          firstLineWidth="100%"
          lastLineWidth="55%"
          animate="shine"
          onReady={false}
        />
      </View>
    </View>

    <View style={styles.itemLoadingContentWrapper}>
      <View style={styles.itemLoadingContentCenter}>
        <Placeholder.Line
          textSize={customVariables.fontSizeBase}
          color={customVariables.shineColor}
          width="75%"
          animate="shine"
        />
      </View>
    </View>
  </View>
);

const ItemSeparator = () => <ItemSeparatorComponent noPadded={true} />;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class MessageList extends React.Component<Props, State> {
  private flatListRef = React.createRef<FlatList>();

  private scrollTo = (index: number, animated: boolean = false) => {
    if (this.flatListRef.current && this.props.messageStates.length > 0) {
      this.flatListRef.current.scrollToIndex({ animated, index });
    }
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      itemLayouts: [],
      longPressedItemIndex: none,
      isFirstLoad: Platform.OS === "ios" // considering firstLoad only when running device is iOS
    };
  }

  public static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): Partial<State> | null {
    const { messageStates } = nextProps;
    const { prevMessageStates: prevMessages } = prevState;

    if (messageStates !== prevMessages) {
      return {
        prevMessageStates: messageStates,
        itemLayouts: generateItemLayouts(messageStates)
      };
    }

    return null;
  }

  private renderItem = (info: ListRenderItemInfo<MessagesStateAndStatus>) => {
    const { meta, message: potMessage, isRead } = info.item;
    const { paymentsByRptId, onPressItem } = this.props;
    const potService = this.props.servicesById[meta.sender_service_id];
    const isServiceLoading = potService
      ? pot.isNone(potService) && pot.isLoading(potService) // is none loading
      : false;
    if (isServiceLoading || pot.isLoading(potMessage)) {
      return MessageListItemPlaceholder;
    }

    // Error messages have the same charateristics of normal messages.
    // The idea is to fill data with error strings to have it printed as shown
    // in mockups.
    const message = pot.isNone(potMessage)
      ? ({
          ...meta,
          created_at: new Date(meta.created_at),
          content: { subject: I18n.t("messages.errorLoading.details") }
          // CreatedMessageWithContent cast is needed because of the lack of
          // "markdown" required property. It is not passed because it's not
          // needed for giving feedback in the messsage list
        } as CreatedMessageWithContentAndAttachments)
      : potMessage.value;

    const service =
      potService !== undefined
        ? pot.isNone(potService)
          ? ({
              organization_name: I18n.t("messages.errorLoading.senderInfo"),
              department_name: I18n.t("messages.errorLoading.serviceInfo")
            } as ServicePublic)
          : pot.toUndefined(potService)
        : undefined;

    const payment =
      message.content.payment_data !== undefined && service !== undefined
        ? paymentsByRptId[
            `${service.organization_fiscal_code}${message.content.payment_data.notice_number}`
          ]
        : undefined;

    return (
      <MessageListItem
        isRead={isRead}
        message={message}
        service={service}
        payment={payment}
        onPress={onPressItem}
        onLongPress={this.onLongPress}
        isSelectionModeEnabled={this.props.selectedMessageIds.isSome()}
        isSelected={this.props.selectedMessageIds
          .map(_ => _.has(info.item.meta.id))
          .getOrElse(false)}
      />
    );
  };

  private getItemLayout = (
    _: ReadonlyArray<MessageState> | null,
    index: number
  ) => this.state.itemLayouts[index];

  private onLongPress = (id: string) => {
    Vibration.vibrate(VIBRATION_LONG_PRESS_DURATION);
    const { messageStates, onLongPressItem } = this.props;
    onLongPressItem(id);
    const lastIndex = messageStates.length - 1;
    if (id === messageStates[lastIndex].meta.id) {
      this.setState({
        longPressedItemIndex: some(lastIndex)
      });
    }
  };

  private handleOnLayoutChange = () => {
    const { longPressedItemIndex } = this.state;
    if (longPressedItemIndex.isSome()) {
      this.scrollTo(longPressedItemIndex.value, true);
      this.setState({
        longPressedItemIndex: none
      });
    }
  };

  public render() {
    const {
      animated,
      messageStates,
      servicesById,
      refreshing,
      onRefresh,
      paymentsByRptId,
      ListEmptyComponent
    } = this.props;

    const refreshControl = (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => {
          if (this.state.isFirstLoad) {
            this.setState({ isFirstLoad: false });
          }
          onRefresh();
        }}
      />
    );
    return (
      <React.Fragment>
        <NavigationEvents onWillFocus={() => this.scrollTo(0)} />
        {/* in iOS refresh indicator is shown only when user does pull to refresh on list
          so only for iOS devices the ActivityIndicator is shown in place of RefreshControl
          see https://stackoverflow.com/questions/50307314/react-native-flatlist-refreshing-not-showing-when-its-true-during-first-load
          see https://github.com/facebook/react-native/issues/15892
        */}
        {refreshing && this.state.isFirstLoad && (
          <ActivityIndicator
            animating={true}
            style={styles.activityIndicator}
          />
        )}
        <AnimatedFlatList
          ref={this.flatListRef}
          style={styles.padded}
          scrollEnabled={true}
          data={messageStates}
          extraData={{ servicesById, paymentsByRptId, refreshing }}
          refreshing={refreshing}
          keyExtractor={keyExtractor}
          refreshControl={refreshControl}
          initialNumToRender={10}
          scrollEventThrottle={
            animated ? animated.scrollEventThrottle : undefined
          }
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={this.renderItem}
          getItemLayout={this.getItemLayout}
          onScroll={animated ? animated.onScroll : undefined}
          onLayout={this.handleOnLayoutChange}
          ListFooterComponent={
            messageStates.length > 0 && <EdgeBorderComponent />
          }
        />
      </React.Fragment>
    );
  }
}

export default MessageList;
