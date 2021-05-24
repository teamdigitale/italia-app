import * as React from "react";
import { List } from "native-base";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import I18n from "../../i18n";
import { GlobalState } from "../../store/reducers/types";
import {
  profileEmailSelector,
  isProfileEmailValidatedSelector,
  hasProfileEmailSelector
} from "../../store/reducers/profile";
import TopScreenComponent from "../../components/screens/TopScreenComponent";
import { ContextualHelpPropsMarkdown } from "../../components/screens/BaseScreenComponent";
import ScreenContent from "../../components/screens/ScreenContent";
import ListItemComponent from "../../components/screens/ListItemComponent";
import {
  navigateToEmailInsertScreen,
  navigateToEmailReadScreen
} from "../../store/actions/navigation";

// FIXME: ADD CORRECT FAQ TITLE AND DESCRIPTION
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
  hasProfileEmail
}): JSX.Element => {
  const textNotAvailable = I18n.t("global.remoteStates.notAvailable");

  const onPressEmail = () => {
    if (hasProfileEmail) {
      navigateToEmailReadScreen();
      return;
    }
    navigateToEmailInsertScreen();
  };

  return (
    <TopScreenComponent
      contextualHelpMarkdown={contextualHelpMarkdown}
      // FIXME: ADD FAQ CATEGORIES
      faqCategories={[]}
      goBack
    >
      <ScreenContent
        title={I18n.t("profile.data.title")}
        subtitle={I18n.t("profile.data.subtitle")}
      >
        <List withContentLateralPadding>
          <ListItemComponent
            title={I18n.t("profile.data.list.email")}
            subTitle={optionEmail.getOrElse(textNotAvailable)}
            titleBadge={
              !isEmailValidated
                ? I18n.t("profile.data.list.need_validate")
                : undefined
            }
            onPress={onPressEmail}
          />
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
  hasProfileEmail: hasProfileEmailSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDataScreen);
