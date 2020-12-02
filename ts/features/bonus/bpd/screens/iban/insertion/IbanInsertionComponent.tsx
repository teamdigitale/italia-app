import { Input, Item, View } from "native-base";
import * as React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Iban } from "../../../../../../../definitions/backend/Iban";
import { Body } from "../../../../../../components/core/typography/Body";
import { H1 } from "../../../../../../components/core/typography/H1";
import { H5 } from "../../../../../../components/core/typography/H5";
import { IOStyles } from "../../../../../../components/core/variables/IOStyles";
import BaseScreenComponent from "../../../../../../components/screens/BaseScreenComponent";
import I18n from "../../../../../../i18n";
import { FooterTwoButtons } from "../../../../bonusVacanze/components/markdown/FooterTwoButtons";
import { withKeyboard } from "../../../../../../utils/keyboard";
import { emptyContextualHelp } from "../../../../../../utils/emptyContextualHelp";

type Props = {
  onBack: () => void;
  onIbanConfirm: (iban: Iban) => void;
  onContinue: () => void;
  startIban?: string;
  cancelText: string;
};

// https://en.wikipedia.org/wiki/International_Bank_Account_Number
// Italian Iban max length: 27 (sample: IT60X0542811101000000123456)
const IbanMaxLength = 34;

const loadLocales = () => ({
  headerTitle: I18n.t("bonus.bpd.title"),
  title: I18n.t("bonus.bpd.iban.insertion.title"),
  body1: I18n.t("bonus.bpd.iban.insertion.body1"),
  body2: I18n.t("bonus.bpd.iban.insertion.body2"),
  ibanDescription: I18n.t("bonus.bpd.iban.iban")
});

export const IbanInsertionComponent: React.FunctionComponent<Props> = props => {
  const [iban, setIban] = useState(props.startIban ?? "");
  const isInvalidIban = iban.length > 0 && Iban.decode(iban).isLeft();
  const userCanContinue = !isInvalidIban && iban.length > 0;
  const { headerTitle, title, body1, body2, ibanDescription } = loadLocales();

  return (
    <BaseScreenComponent
      goBack={props.onBack}
      headerTitle={headerTitle}
      contextualHelp={emptyContextualHelp}
    >
      <SafeAreaView style={IOStyles.flex}>
        <View style={[IOStyles.horizontalContentPadding, IOStyles.flex]}>
          <View spacer={true} large={true} />
          <H1>{title}</H1>
          <View spacer={true} large={true} />
          <Body>{body1}</Body>
          <View spacer={true} large={true} />
          <H5>{ibanDescription}</H5>
          <Item error={isInvalidIban}>
            <Input
              value={iban}
              maxLength={IbanMaxLength}
              onChangeText={text => setIban(text.toUpperCase().trim())}
            />
          </Item>
          <View spacer={true} large={true} />
          <View spacer={true} small={true} />
          <Body>{body2}</Body>
        </View>

        {withKeyboard(
          <FooterTwoButtons
            rightDisabled={!userCanContinue}
            onRight={() => Iban.decode(iban).map(props.onIbanConfirm)}
            onCancel={props.onContinue}
            rightText={I18n.t("global.buttons.continue")}
            leftText={props.cancelText}
          />,
          true
        )}
      </SafeAreaView>
    </BaseScreenComponent>
  );
};
