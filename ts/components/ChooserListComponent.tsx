import color from "color";
import { none, Option, some } from "fp-ts/lib/Option";
import I18n from "i18n-js";
import { debounce } from "lodash";
import { Body, Button, Content, Input, Item, Right, View } from "native-base";
import * as React from "react";
import {
  ImageSourcePropType,
  KeyboardAvoidingView,
  ListRenderItem,
  StyleSheet
} from "react-native";
import customVariables from "../theme/variables";
import variables from "../theme/variables";
import ChooserList from "./ChooserList";
import ChooserListSearchComponent from "./ChooserListSearchComponent";
import AppHeader from "./ui/AppHeader";
import FooterWithButtons from "./ui/FooterWithButtons";
import IconFont from "./ui/IconFont";

type Props<T> = {
  items: ReadonlyArray<T>;
  keyExtractor: (item: T, index: number) => string;
  renderItem: ListRenderItem<T>;
  onCancel: () => void;
  isSearchEnabled: boolean;
  onSearchItemContainsText?: (item: T, searchText: string) => boolean;
  noSearchResultsSourceIcon?: ImageSourcePropType;
  noSearchResultsSubtitle?: string;
};

type State = {
  searchText: Option<string>;
  debouncedSearchText: Option<string>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  headerNoSearch: {
    height: customVariables.contentPadding / 2
  }
});

/**
 * A component for view, search and select a list of items
 * TODO select will be introduced with story https://www.pivotaltracker.com/story/show/167102335
 */
export class ChooserListComponent<T> extends React.PureComponent<
  Props<T>,
  State
> {
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      searchText: this.props.isSearchEnabled ? some("") : none,
      debouncedSearchText: none
    };
  }

  private onPressCancel = () => {
    this.props.onCancel();
  };

  private onPressSave = () => {
    this.onPressCancel();
  };

  /**
   * Header SearchBar
   */
  private renderSearchBar() {
    const { searchText } = this.state;
    return (
      <React.Fragment>
        <Body />
        <Right>
          {searchText.isSome() ? (
            <Item>
              <Input
                placeholder={I18n.t("global.actions.search")}
                value={searchText.value}
                onChangeText={this.onSearchTextChange}
                autoFocus={true}
                placeholderTextColor={color(variables.brandGray)
                  .darken(0.2)
                  .string()}
              />
              <Button onPress={this.onSearchDisable} transparent={true}>
                <IconFont
                  name="io-close"
                  accessible={true}
                  accessibilityLabel={I18n.t("global.buttons.close")}
                />
              </Button>
            </Item>
          ) : (
            <Button onPress={this.handleSearchPress} transparent={true}>
              <IconFont
                name="io-search"
                accessible={true}
                accessibilityLabel={I18n.t("global.actions.search")}
              />
            </Button>
          )}
        </Right>
      </React.Fragment>
    );
  }

  /**
   * Search
   */
  private handleSearchPress = () => {
    this.setState({
      searchText: some("")
    });
  };

  private onSearchTextChange = (text: string) => {
    this.setState({
      searchText: some(text)
    });
    this.updateDebouncedSearchText(text);
  };

  private updateDebouncedSearchText = debounce((text: string) => {
    this.setState({
      debouncedSearchText: some(text)
    });
  }, 300);

  private onSearchDisable = () => {
    this.setState({
      searchText: none,
      debouncedSearchText: none
    });
  };

  /**
   * Footer
   */
  private renderFooterButtons() {
    const cancelButtonProps = {
      block: true,
      light: true,
      bordered: true,
      onPress: this.onPressCancel,
      title: I18n.t("global.buttons.cancel")
    };
    const saveButtonProps = {
      block: true,
      primary: true,
      onPress: this.onPressSave,
      title: I18n.t("global.buttons.saveSelection")
    };

    return (
      <FooterWithButtons
        type="TwoButtonsInlineThird"
        leftButton={cancelButtonProps}
        rightButton={saveButtonProps}
      />
    );
  }

  /**
   * Render Search component.
   */
  private renderSearch = () => {
    const {
      items,
      onSearchItemContainsText,
      renderItem,
      keyExtractor,
      noSearchResultsSourceIcon,
      noSearchResultsSubtitle
    } = this.props;
    return (
      <ChooserListSearchComponent
        listState={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        searchText={
          this.state.searchText.isSome() ? this.state.searchText.value : ""
        }
        onSearchItemContainsText={onSearchItemContainsText}
        noSearchResultsSourceIcon={noSearchResultsSourceIcon}
        noSearchResultsSubtitle={noSearchResultsSubtitle}
      />
    );
  };

  public render() {
    const {
      isSearchEnabled,
      items,
      onSearchItemContainsText,
      keyExtractor,
      renderItem
    } = this.props;

    return (
      <View style={styles.container}>
        <AppHeader style={!isSearchEnabled ? styles.headerNoSearch : undefined}>
          {isSearchEnabled && this.renderSearchBar()}
        </AppHeader>
        <Content noPadded={true} style={styles.content}>
          <View>
            {isSearchEnabled && onSearchItemContainsText
              ? this.renderSearch()
              : items.length > 0 && (
                  <ChooserList
                    items={items}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    refreshing={false}
                  />
                )}
          </View>
        </Content>
        <KeyboardAvoidingView behavior="position">
          {this.renderFooterButtons()}
        </KeyboardAvoidingView>
      </View>
    );
  }
}
