import { isSome, Option } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { ITuple2 } from "italia-ts-commons/lib/tuples";
import startCase from "lodash/startCase";
import { Text, View } from "native-base";
import React, { ComponentProps } from "react";
import {
  ActivityIndicator,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  SectionListScrollParams,
  SectionListStatic,
  StyleSheet
} from "react-native";
import { ServicePublic } from "../../../definitions/backend/ServicePublic";
import I18n from "../../i18n";
import { PaymentByRptIdState } from "../../store/reducers/entities/payments";
import { ServicesByIdState } from "../../store/reducers/entities/services/servicesById";
import { makeFontStyleObject } from "../../theme/fonts";
import variables from "../../theme/variables";
import customVariables from "../../theme/variables";
import { CreatedMessageWithContentAndDueDate } from "../../types/CreatedMessageWithContentAndDueDate";
import { format } from "../../utils/dates";
import ButtonDefaultOpacity from "../ButtonDefaultOpacity";
import ItemSeparatorComponent from "../ItemSeparatorComponent";
import { EdgeBorderComponent } from "../screens/EdgeBorderComponent";
import { EmptyListComponent } from "./EmptyListComponent";
import { AnimatedProps } from "./MessageList";
import MessageListItem from "./MessageListItem";

// Used to calculate the cell item layouts.
const LIST_HEADER_HEIGHT = 70;
const SECTION_HEADER_HEIGHT = 48;
const ITEM_HEIGHT = 158;
const FAKE_ITEM_HEIGHT = 75;
const ITEM_SEPARATOR_HEIGHT = 1;

const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  // List
  emptyListWrapper: {
    padding: customVariables.contentPadding,
    alignItems: "center"
  },

  // ListHeader
  listHeaderWrapper: {
    height: LIST_HEADER_HEIGHT,
    paddingHorizontal: customVariables.contentPadding,
    paddingTop: 24,
    paddingBottom: 8
  },
  listHeaderButtonText: {
    ...makeFontStyleObject(Platform.select)
  },

  // SectionHeader
  sectionHeaderWrapper: {
    height: SECTION_HEADER_HEIGHT,
    paddingTop: 19,
    paddingHorizontal: customVariables.contentPadding,
    backgroundColor: customVariables.colorWhite
  },
  sectionHeaderContent: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: customVariables.brandLightGray
  },
  sectionHeaderText: {
    fontSize: 18,
    color: customVariables.brandDarkestGray,
    ...makeFontStyleObject(Platform.select, "600"),
    lineHeight: 20
  },
  sectionHeaderHighlightText: {
    fontSize: 18,
    color: customVariables.brandPrimary,
    ...makeFontStyleObject(Platform.select, "600"),
    lineHeight: 20
  },

  // Items
  itemEmptyWrapper: {
    height: FAKE_ITEM_HEIGHT,
    paddingHorizontal: customVariables.contentPadding,
    justifyContent: "center"
  },
  itemEmptyText: {
    color: customVariables.brandDarkestGray
  },
  itemSeparator: {
    height: ITEM_SEPARATOR_HEIGHT,
    backgroundColor: customVariables.brandLightGray
  },
  button: {
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: variables.contentPadding,
    width: screenWidth - variables.contentPadding * 2
  },
  padded: {
    paddingHorizontal: customVariables.contentPadding
  },

  // Animation progress
  contentProgress: {
    display: "flex",
    position: "absolute",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
    height: 50,
    width: screenWidth,
    zIndex: 999,
    backgroundColor: customVariables.colorWhite
  },
  progress: { alignSelf: "center" },
  messageNoOthers: {
    padding: 12,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center"
  }
});

export type FakeItem = {
  fake: true;
};

export type MessageAgendaItemMetadata = {
  isRead: boolean;
};

export type MessageAgendaItem = ITuple2<
  CreatedMessageWithContentAndDueDate,
  MessageAgendaItemMetadata
>;

export type MessageAgendaSection = SectionListData<
  MessageAgendaItem | FakeItem
>;

// eslint-disable-next-line
export type Sections = MessageAgendaSection[];

export type ItemLayout = {
  length: number;
  offset: number;
  index: number;
};

type SelectedSectionListProps = Pick<
  ComponentProps<SectionListStatic<MessageAgendaSection>>,
  "refreshing" | "onContentSizeChange"
>;

type OwnProps = {
  sections: Sections;
  servicesById: ServicesByIdState;
  paymentsByRptId: PaymentByRptIdState;
  onPressItem: (id: string) => void;
  onLongPressItem: (id: string) => void;
  onMoreDataRequest: () => void;
  selectedMessageIds: Option<Set<string>>;
  isContinuosScrollEnabled: boolean;
  lastDeadlineId: Option<string>;
  nextDeadlineId: Option<string>;
};

type Props = OwnProps & SelectedSectionListProps & AnimatedProps;

type State = {
  itemLayouts: ReadonlyArray<ItemLayout>;
  prevSections?: Sections;
  isLoadingProgress: boolean;
  isFirstLoading: boolean;
};

export const isFakeItem = (item: any): item is FakeItem => item.fake;

// Min number of items to activate continuos scroll
const minItemsToScroll = 4;

const keyExtractor = (_: MessageAgendaItem | FakeItem, index: number) =>
  isFakeItem(_) ? `item-${index}` : _.e1.id;

/**
 * Generate item layouts from sections.
 * The VirtualizedSectionList react-native component create cells for:
 * - SECTION_HEADER
 * - ITEM + ITEM_SEPARATOR (NOTE: A single cell for both)
 * - SECTION_FOOTER
 *
 * Here we calculate the ItemLayout for each cell.
 */
const generateItemLayouts = (sections: Sections) => {
  // eslint-disable-next-line
  let offset = LIST_HEADER_HEIGHT;
  // eslint-disable-next-line
  let index = 0;
  // eslint-disable-next-line
  const itemLayouts: ItemLayout[] = [];

  sections.forEach(section => {
    // Push the info about the SECTION_HEADER cell.
    // eslint-disable-next-line functional/immutable-data
    itemLayouts.push({
      length: SECTION_HEADER_HEIGHT,
      offset,
      index
    });

    offset += SECTION_HEADER_HEIGHT;
    index++;

    section.data.forEach((_, dataIndex, data) => {
      // Push the info about the ITEM + ITEM_SEPARATOR cell.
      const isFake = isFakeItem(_);
      const isLastItem = dataIndex === data.length - 1;

      const itemHeight = isFake ? FAKE_ITEM_HEIGHT : ITEM_HEIGHT;
      const cellHeight = isLastItem
        ? itemHeight
        : itemHeight + ITEM_SEPARATOR_HEIGHT;
      // eslint-disable-next-line functional/immutable-data
      itemLayouts.push({
        length: cellHeight,
        offset,
        index
      });

      offset += cellHeight;
      index++;
    });

    // Push the info about the SECTION_FOOTER cell.
    // NOTE: VirtualizedSectionList component creates a cell instance for
    // the SECTION_FOOTER even when not rendered.
    // eslint-disable-next-line functional/immutable-data
    itemLayouts.push({
      length: 0,
      offset,
      index
    });

    index++;
  });

  return itemLayouts;
};

const FakeItemComponent = (
  <View style={styles.itemEmptyWrapper}>
    <Text style={styles.itemEmptyText}>{I18n.t("reminders.emptyMonth")}</Text>
  </View>
);

/**
 * A component to render messages with due_date in a agenda like form.
 */
class MessageAgenda extends React.PureComponent<Props, State> {
  // Ref to section list
  private sectionListRef = React.createRef<any>();
  private idTimeoutProgress?: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      itemLayouts: [],
      isLoadingProgress: false,
      isFirstLoading: true
    };
    this.loadMoreData = this.loadMoreData.bind(this);
  }

  public componentWillUnmount() {
    if (this.idTimeoutProgress !== undefined) {
      clearTimeout(this.idTimeoutProgress);
    }
  }

  // eslint-disable-next-line
  public componentDidUpdate(prevProps: Props) {
    // Change status loading to show progress
    if (
      prevProps.refreshing !== this.props.refreshing &&
      this.props.refreshing === false
    ) {
      // On first loading doesn't move list
      if (
        this.state.isFirstLoading &&
        this.props.sections !== undefined &&
        this.props.sections.length > 0
      ) {
        this.loadMoreData();
        this.setState({ isFirstLoading: false });
      } else {
        // We leave half a second longer to show the progress even for faster requests
        // eslint-disable-next-line
        this.idTimeoutProgress = setTimeout(() => {
          this.setState({
            isLoadingProgress: false
          });
          // Set scroll position when the new elements have been loaded
          if (
            (this.sectionListRef !== undefined &&
              this.props.sections !== undefined &&
              this.props.sections.length >= minItemsToScroll &&
              this.props.isContinuosScrollEnabled) ||
            // Check if we made one last load before blocking the scroll
            (prevProps.sections.length !== this.props.sections.length &&
              !this.props.isContinuosScrollEnabled)
          ) {
            this.scrollToLocation({
              animated: false,
              itemIndex: 0,
              sectionIndex:
                Platform.OS === "ios"
                  ? minItemsToScroll - 1
                  : minItemsToScroll - 2
            });
          }
        }, 300);
      }
    }
  }

  public static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State
  ): Partial<State> | null {
    const { sections } = nextProps;
    const { prevSections } = prevState;
    if (sections !== prevSections) {
      return {
        prevSections: sections,
        itemLayouts: generateItemLayouts(sections)
      };
    }

    return null;
  }

  private loadMoreData() {
    // This state trigger progress bar
    this.setState({
      isLoadingProgress: true
    });
    // Check if necessary show other data
    if (this.props.isContinuosScrollEnabled) {
      this.props.onMoreDataRequest();
    }
  }

  private renderSectionHeader = (info: { section: MessageAgendaSection }) => {
    const isFake = info.section.fake;

    const nextDeadlineId = isSome(this.props.nextDeadlineId)
      ? this.props.nextDeadlineId.value
      : undefined;

    const item = info.section.data[0];
    const sectionId = !isFakeItem(item) ? item.e1.id : undefined;

    return (
      <View style={styles.sectionHeaderWrapper}>
        <View style={styles.sectionHeaderContent}>
          <Text
            style={
              !isFake && sectionId === nextDeadlineId
                ? styles.sectionHeaderHighlightText
                : styles.sectionHeaderText
            }
          >
            {startCase(
              format(
                info.section.title,
                I18n.t(
                  isFake
                    ? "global.dateFormats.monthYear"
                    : "global.dateFormats.weekdayDayMonthYear"
                )
              )
            )}
          </Text>
        </View>
      </View>
    );
  };

  private renderItem: SectionListRenderItem<
    MessageAgendaItem | FakeItem
  > = info => {
    if (isFakeItem(info.item)) {
      return FakeItemComponent;
    }

    const message = info.item.e1;
    const { isRead } = info.item.e2;
    const {
      paymentsByRptId,
      onPressItem,
      onLongPressItem,
      selectedMessageIds
    } = this.props;

    const potService = this.props.servicesById[message.sender_service_id];

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
      <View style={styles.padded}>
        <MessageListItem
          isRead={isRead}
          message={message}
          service={service}
          payment={payment}
          onPress={onPressItem}
          onLongPress={onLongPressItem}
          isSelectionModeEnabled={selectedMessageIds.isSome()}
          isSelected={selectedMessageIds
            .map(_ => _.has(message.id))
            .getOrElse(false)}
        />
      </View>
    );
  };

  private getItemLayout = (_: Sections | null, index: number) =>
    this.state.itemLayouts[index];

  // On scroll download more data
  private onScrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    if (
      scrollPosition < 50 &&
      !this.state.isLoadingProgress &&
      this.props.isContinuosScrollEnabled
    ) {
      // Before call other items check if the last section is showed
      this.loadMoreData();
    }
    if (this.props.animated) {
      this.props.animated.onScroll(e);
    }
  };

  public render() {
    const {
      sections,
      servicesById,
      paymentsByRptId,
      isContinuosScrollEnabled,
      lastDeadlineId,
      animated
    } = this.props;
    const { isLoadingProgress } = this.state;

    // Show this component when deadlines exists but not for the displayed interval
    const ListEmptyComponent = (
      <View>
        <View style={styles.emptyListWrapper}>
          <ButtonDefaultOpacity
            block={true}
            primary={true}
            small={true}
            bordered={true}
            style={styles.button}
            onPress={this.loadMoreData}
          >
            <Text numberOfLines={1}>{I18n.t("reminders.loadMoreData")}</Text>
          </ButtonDefaultOpacity>
        </View>
        <View spacer={true} />
        <EmptyListComponent
          image={require("../../../img/messages/empty-due-date-list-icon.png")}
          title={I18n.t("messages.deadlines.emptyMessage.title")}
          subtitle={I18n.t("messages.deadlines.emptyMessage.subtitle")}
        />
      </View>
    );

    // Show this component when the user has not deadlines at all
    const ListEmptySectionsComponent = (
      <EmptyListComponent
        image={require("../../../img/messages/empty-due-date-list-icon.png")}
        title={I18n.t("messages.deadlines.emptyMessage.title")}
      />
    );

    return (
      <View
        style={{
          flex: 1,
          width: screenWidth
        }}
      >
        <SectionList
          // If we not have a final deadline then we not have deadlines
          sections={sections}
          extraData={{ servicesById, paymentsByRptId }}
          inverted={false}
          bounces={false}
          stickySectionHeadersEnabled={true}
          keyExtractor={keyExtractor}
          ref={this.sectionListRef}
          onScroll={this.onScrollHandler}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ItemSeparatorComponent={ItemSeparatorComponent}
          getItemLayout={this.getItemLayout}
          ListHeaderComponent={
            !isContinuosScrollEnabled &&
            this.props.sections.length > minItemsToScroll &&
            this.noOtherDeadlines
          }
          ListFooterComponent={sections.length > 0 && <EdgeBorderComponent />}
          ListEmptyComponent={
            sections.length === 0 && lastDeadlineId.isNone()
              ? ListEmptySectionsComponent
              : ListEmptyComponent
          }
          scrollEventThrottle={
            animated ? animated.scrollEventThrottle : undefined
          }
        />
        {isLoadingProgress && isContinuosScrollEnabled && (
          <View style={styles.contentProgress}>
            <ActivityIndicator
              style={styles.progress}
              size={"small"}
              color={variables.brandDarkGray}
            />
          </View>
        )}
      </View>
    );
  }

  public noOtherDeadlines = () => (
    <View style={styles.messageNoOthers}>
      <Text bold={true}>{I18n.t("reminders.noOtherDeadlines")}</Text>
    </View>
  );

  public scrollToLocation = (params: SectionListScrollParams) => {
    if (
      this.sectionListRef !== undefined &&
      this.sectionListRef.current !== null
    ) {
      this.sectionListRef.current.scrollToLocation(params);
    }
  };
}

export default MessageAgenda;
