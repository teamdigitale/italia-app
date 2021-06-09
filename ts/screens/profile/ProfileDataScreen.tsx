import * as React from "react";
import { StyleSheet } from "react-native";
import { List, View } from "native-base";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import I18n from "../../i18n";
import { GlobalState } from "../../store/reducers/types";
import {
  profileEmailSelector,
  isProfileEmailValidatedSelector,
  hasProfileEmailSelector,
  profileSpidEmailSelector,
  profileNameSurnameSelector
} from "../../store/reducers/profile";
import TopScreenComponent from "../../components/screens/TopScreenComponent";
import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import ScreenContent from "../../components/screens/ScreenContent";
import ListItemComponent from "../../components/screens/ListItemComponent";
import { EdgeBorderComponent } from "../../components/screens/EdgeBorderComponent";
import {
  navigateToEmailInsertScreen,
  navigateToEmailReadScreen
} from "../../store/actions/navigation";
import { H3 } from "../../components/core/typography/H3";
import Markdown from "../../components/ui/Markdown";
import { useIOBottomSheet } from "../../utils/bottomSheet";

const styles = StyleSheet.create({
  headerSPID: {
    marginTop: 30,
    marginBottom: 7
  }
});

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "profile.preferences.contextualHelpTitle",
  body: "profile.preferences.contextualHelpContent"
};

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const ProfileDataScreen: React.FC<Props> = ({
  optionEmail,
  isEmailValidated,
  navigateToEmailReadScreen,
  navigateToEmailInsertScreen,
  hasProfileEmail,
  optionSpidEmail,
  nameSurname
}): JSX.Element => {
  const onPressEmail = () => {
    if (hasProfileEmail) {
      navigateToEmailReadScreen();
      return;
    }
    navigateToEmailInsertScreen();
  };

  const { present } = useIOBottomSheet(
    <>
      <View spacer />
      <Markdown>
        {I18n.t("profile.data.spid_email.contextualHelpContent")}
      </Markdown>
    </>,
    I18n.t("profile.data.spid_email.contextualHelpTitle"),
    300
  );

  return (
    <TopScreenComponent
      contextualHelpMarkdown={contextualHelpMarkdown}
      faqCategories={["profile", "privacy", "authentication_SPID"]}
      goBack
    >
      <ScreenContent
        title={I18n.t("profile.data.title")}
        subtitle={I18n.t("profile.data.subtitle")}
      >
        <List withContentLateralPadding>
          {/* Name and surname */}
          {nameSurname && (
            <ListItemComponent
              title={I18n.t("profile.data.list.nameSurname")}
              subTitle={nameSurname}
              hideIcon
            />
          )}
          {/* Edit email */}
          <ListItemComponent
            title={I18n.t("profile.data.list.email")}
            subTitle={optionEmail.getOrElse(
              I18n.t("global.remoteStates.notAvailable")
            )}
            titleBadge={
              !isEmailValidated
                ? I18n.t("profile.data.list.need_validate")
                : undefined
            }
            onPress={onPressEmail}
          />
          {/* Check if spid email exists */}
          {optionSpidEmail.isSome() && (
            <>
              <View style={styles.headerSPID}>
                <H3 color="bluegrey">
                  {I18n.t("profile.data.list.spid.headerTitle")}
                </H3>
              </View>
              <ListItemComponent
                title={I18n.t("profile.data.list.spid.email")}
                subTitle={optionSpidEmail.value}
                onPress={present}
                iconName="io-info"
                smallIconSize
                iconOnTop
              />
            </>
          )}
          <EdgeBorderComponent />
        </List>
      </ScreenContent>
    </TopScreenComponent>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  navigateToEmailReadScreen: () => dispatch(navigateToEmailReadScreen()),
  navigateToEmailInsertScreen: () => dispatch(navigateToEmailInsertScreen())
});

const mapStateToProps = (state: GlobalState) => ({
  optionEmail: profileEmailSelector(state),
  isEmailValidated: isProfileEmailValidatedSelector(state),
  hasProfileEmail: hasProfileEmailSelector(state),
  optionSpidEmail: profileSpidEmailSelector(state),
  nameSurname: profileNameSurnameSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDataScreen);
