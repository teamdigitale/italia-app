import * as pot from "italia-ts-commons/lib/pot";
import { View } from "native-base";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import image from "../../../../../../../img/pictograms/doubt.png";
import { Body } from "../../../../../../components/core/typography/Body";
import { H4 } from "../../../../../../components/core/typography/H4";
import { Monospace } from "../../../../../../components/core/typography/Monospace";
import { IOStyles } from "../../../../../../components/core/variables/IOStyles";
import { renderInfoRasterImage } from "../../../../../../components/infoScreen/imageRendering";
import { InfoScreenComponent } from "../../../../../../components/infoScreen/InfoScreenComponent";
import BaseScreenComponent from "../../../../../../components/screens/BaseScreenComponent";
import I18n from "../../../../../../i18n";
import { profileSelector } from "../../../../../../store/reducers/profile";
import { GlobalState } from "../../../../../../store/reducers/types";
import { FooterTwoButtons } from "../../../../bonusVacanze/components/markdown/FooterTwoButtons";
import {
  bpdIbanInsertionCancel,
  bpdIbanInsertionResetScreen
} from "../../../store/actions/iban";
import { emptyContextualHelp } from "../../../../../../utils/emptyContextualHelp";
import IbanKoBody from "./IbanKoBody";

export type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const loadLocales = () => ({
  headerTitle: I18n.t("bonus.bpd.title"),
  cancel: I18n.t("global.buttons.cancel"),
  verify: I18n.t("bonus.bpd.iban.verify"),
  title: I18n.t("bonus.bpd.iban.koNotOwned.title"),
  text1: I18n.t("bonus.bpd.iban.koNotOwned.text1"),
  text2: I18n.t("bonus.bpd.iban.koNotOwned.text2")
});

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    alignContent: "flex-end"
  },
  text: {
    textAlign: "center"
  }
});

/**
 * Render the profile information (name, surname, fiscal code)
 * @param props
 * @constructor
 */
const ProfileInformation = (props: Props) => {
  // undefined profile should never happens
  const profile = pot.getOrElse(props.profile, undefined);

  return (
    <View style={styles.profile}>
      <H4 style={styles.text}>
        {profile?.name} {profile?.family_name},
      </H4>
      <Body style={styles.text}>
        {I18n.t("profile.fiscalCode.fiscalCode")}{" "}
        <Monospace weight={"SemiBold"}>{profile?.fiscal_code}</Monospace>
      </Body>
    </View>
  );
};

/**
 * This screen warns the user that the provided iban does not belong to him.
 * This is just a warning, the user can continue and iban has been registered on the bpd remote system.
 * @constructor
 */
const IbanKoNotOwned: React.FunctionComponent<Props> = props => {
  const { headerTitle, verify, cancel, title, text1, text2 } = loadLocales();
  return (
    <BaseScreenComponent
      goBack={props.modifyIban}
      headerTitle={headerTitle}
      contextualHelp={emptyContextualHelp}
    >
      <SafeAreaView style={IOStyles.flex}>
        <InfoScreenComponent
          image={renderInfoRasterImage(image)}
          title={title}
          body={
            <View style={IOStyles.flex}>
              <IbanKoBody text1={text1} text2={text2} isFlex={false} />
              <ProfileInformation {...props} />
            </View>
          }
        />
        <FooterTwoButtons
          type={"TwoButtonsInlineThird"}
          onRight={props.modifyIban}
          onCancel={props.cancel}
          rightText={verify}
          leftText={cancel}
        />
      </SafeAreaView>
    </BaseScreenComponent>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  modifyIban: () => dispatch(bpdIbanInsertionResetScreen()),
  cancel: () => dispatch(bpdIbanInsertionCancel())
});

const mapStateToProps = (state: GlobalState) => ({
  profile: profileSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(IbanKoNotOwned);
