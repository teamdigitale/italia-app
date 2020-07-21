import color from "color";
import { none, Option, some } from "fp-ts/lib/Option";
import debounce from "lodash/debounce";
import { Input, Item } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import I18n from "../../i18n";
import {
  disableSearch,
  searchMessagesEnabled,
  searchServicesEnabled,
  updateSearchText
} from "../../store/actions/search";
import { Dispatch } from "../../store/actions/types";
import variables from "../../theme/variables";
import ButtonDefaultOpacity from "../ButtonDefaultOpacity";
import IconFont from "../ui/IconFont";

export const MIN_CHARACTER_SEARCH_TEXT = 3;

export type SearchType = "Messages" | "Services";

interface OwnProps {
  color?: string;
  searchType?: SearchType;
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>;

type State = {
  searchText: Option<string>;
  debouncedSearchText: Option<string>;
};

const styles = StyleSheet.create({
  rightButton: {
    paddingRight: 0,
    paddingLeft: 16
  },
  noPadRight: {
    paddingRight: 0
  }
});

class SearchButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: none,
      debouncedSearchText: none
    };
  }

  public render() {
    const { searchText } = this.state;
    return (
      <React.Fragment>
        {searchText.isSome() ? (
          <Item>
            <NavigationEvents onWillBlur={this.onSearchDisable} />
            <Input
              placeholder={I18n.t("global.actions.search")}
              value={searchText.value}
              onChangeText={this.onSearchTextChange}
              autoFocus={true}
              placeholderTextColor={color(variables.brandGray)
                .darken(0.2)
                .string()}
            />
            <ButtonDefaultOpacity
              style={styles.rightButton}
              onPress={this.onSearchDisable}
              transparent={true}
              accessibilityLabel={I18n.t("global.buttons.close")}
            >
              <IconFont name="io-close" color={this.props.color} />
            </ButtonDefaultOpacity>
          </Item>
        ) : (
          <ButtonDefaultOpacity
            onPress={this.handleSearchPress}
            style={styles.rightButton}
            transparent={true}
            accessibilityLabel={I18n.t("global.buttons.search")}
          >
            <IconFont
              name="io-search"
              color={this.props.color}
              style={styles.noPadRight}
            />
          </ButtonDefaultOpacity>
        )}
      </React.Fragment>
    );
  }

  private handleSearchPress = () => {
    const { searchText } = this.state;
    this.setState({
      searchText: some("")
    });
    this.props.dispatchSearchText(searchText);
    this.props.dispatchSearchEnabled(true);
  };

  private onSearchTextChange = (text: string) => {
    this.setState({
      searchText: some(text)
    });
    this.updateDebouncedSearchText(text);
  };

  private updateDebouncedSearchText = debounce((text: string) => {
    this.setState(
      {
        debouncedSearchText: some(text)
      },
      () => {
        this.props.dispatchSearchText(this.state.debouncedSearchText);
      }
    );
  }, 300);

  private onSearchDisable = () => {
    this.setState({
      searchText: none,
      debouncedSearchText: none
    });
    this.props.dispatchDisableSearch();
  };
}

const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps) => ({
  dispatchSearchText: (searchText: Option<string>) =>
    dispatch(updateSearchText(searchText)),
  dispatchDisableSearch: () => dispatch(disableSearch()),
  dispatchSearchEnabled: (isSearchEnabled: boolean) => {
    const searchType = props.searchType;
    switch (searchType) {
      case "Messages":
        dispatch(searchMessagesEnabled(isSearchEnabled));
        break;
      case "Services":
        dispatch(searchServicesEnabled(isSearchEnabled));
        break;
    }
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SearchButton);
