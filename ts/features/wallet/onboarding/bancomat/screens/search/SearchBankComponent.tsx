import { Content, Input, Item, Text, View } from "native-base";
import * as React from "react";
import {
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator
} from "react-native";
import { debounce } from "lodash";
import I18n from "../../../../../../i18n";
import { Body } from "../../../../../../components/core/typography/Body";
import { Link } from "../../../../../../components/core/typography/Link";
import { Label } from "../../../../../../components/core/typography/Label";
import IconFont from "../../../../../../components/ui/IconFont";
import FooterWithButtons from "../../../../../../components/ui/FooterWithButtons";
import { Abi } from "../../../../../../../definitions/pagopa/walletv2/Abi";
import { sortAbiByName } from "../../utils/abi";
import { BankPreviewItem } from "../../components/BankPreviewItem";
import {
  cancelButtonProps,
  confirmButtonProps
} from "../../../../../bonus/bonusVacanze/components/buttons/ButtonConfigurations";
import { IOColors } from "../../../../../../components/core/variables/IOColors";
import SectionStatusComponent from "../../../../../../components/SectionStatusComponent";

type Props = {
  bankList: ReadonlyArray<Abi>;
  isLoading: boolean;
  onItemPress: (abi: string) => void;
  openTosModal: () => void;
  onCancel: () => void;
  onContinue: () => void;
};

export const SearchBankComponent: React.FunctionComponent<Props> = (
  props: Props
) => {
  const [searchText, setSearchText] = React.useState("");
  const [filteredList, setFilteredList] = React.useState<ReadonlyArray<Abi>>(
    []
  );
  const [isSearchStarted, setIsSearchStarted] = React.useState(false);

  const performSearch = (text: string, bankList: ReadonlyArray<Abi>) => {
    if (text.length === 0) {
      setFilteredList([]);
      setIsSearchStarted(false);
      return;
    }
    setIsSearchStarted(true);
    const resultList = bankList.filter(
      bank =>
        (bank.abi && bank.abi.toLowerCase().indexOf(text.toLowerCase()) > -1) ||
        (bank.name && bank.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
    );
    setFilteredList(sortAbiByName(resultList));
  };
  const debounceRef = React.useRef(debounce(performSearch, 300));

  React.useEffect(() => {
    debounceRef.current(searchText, props.bankList);
  }, [searchText, props.bankList]);

  const handleFilter = (text: string) => {
    setSearchText(text);
  };

  const keyExtractor = (bank: Abi, index: number): string =>
    bank.abi ? bank.abi : `abi_item_${index}`;

  const renderListItem = (isList: boolean) => (
    info: ListRenderItemInfo<Abi>
  ) => (
    <BankPreviewItem
      bank={info.item}
      inList={isList}
      onPress={props.onItemPress}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content style={{ flex: 1 }}>
        {!isSearchStarted && (
          <>
            <View spacer={true} large={true} />
            <Body>
              <Text bold={true}>
                {I18n.t("wallet.searchAbi.description.text1")}
              </Text>
              {I18n.t("wallet.searchAbi.description.text2")}
              <Link onPress={props.openTosModal}>
                {I18n.t("wallet.searchAbi.description.text3")}
              </Link>
            </Body>
          </>
        )}
        <View spacer={true} />
        {!props.isLoading && (
          <Label color={"bluegrey"}>
            {I18n.t("wallet.searchAbi.bankName")}
          </Label>
        )}
        <Item>
          <Input
            value={searchText}
            onChangeText={handleFilter}
            disabled={props.isLoading}
            placeholderTextColor={IOColors.bluegreyLight}
            placeholder={
              props.isLoading ? I18n.t("wallet.searchAbi.loading") : undefined
            }
          />
          {!props.isLoading && <IconFont name="io-search" />}
        </Item>
        <View spacer={true} />
        {props.isLoading ? (
          <>
            <View spacer={true} large={true} />
            <ActivityIndicator
              color={"black"}
              size={"large"}
              accessible={false}
              importantForAccessibility={"no-hide-descendants"}
              accessibilityElementsHidden={true}
            />
          </>
        ) : (
          <FlatList
            data={filteredList}
            renderItem={renderListItem(true)}
            keyExtractor={keyExtractor}
          />
        )}
      </Content>
      <SectionStatusComponent sectionKey={"bancomat"} />
      <FooterWithButtons
        type={"TwoButtonsInlineThird"}
        leftButton={cancelButtonProps(
          props.onCancel,
          I18n.t("global.buttons.cancel")
        )}
        rightButton={confirmButtonProps(
          props.onContinue,
          I18n.t("global.buttons.continue")
        )}
      />
    </SafeAreaView>
  );
};
