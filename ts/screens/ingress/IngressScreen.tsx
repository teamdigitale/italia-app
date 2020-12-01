/**
 * An ingress screen to choose the real first screen the user must navigate to.
 */
import * as pot from "italia-ts-commons/lib/pot";
import { Body, Container, List, ListItem, Spinner, Text } from "native-base";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import ConnectionBar from "../../components/ConnectionBar";
import I18n from "../../i18n";
import { startApplicationInitialization } from "../../store/actions/application";
import { ReduxProps } from "../../store/actions/types";
import {
  sessionInfoSelector,
  sessionTokenSelector
} from "../../store/reducers/authentication";
import { profileSelector } from "../../store/reducers/profile";
import { GlobalState } from "../../store/reducers/types";
import variables from "../../theme/variables";
import BaseScreenComponent from "../../components/screens/BaseScreenComponent";
import { IngressCheckBox } from "./CheckBox";

type Props = ReduxProps & ReturnType<typeof mapStateToProps>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: variables.contentPaddingLarge,
    backgroundColor: variables.brandPrimary
  }
});
class IngressScreen extends React.PureComponent<Props> {
  public componentDidMount() {
    // Dispatch START_APPLICATION_INITIALIZATION to initialize the app
    this.props.dispatch(startApplicationInitialization());
  }

  public render() {
    const items = [
      {
        enabled: this.props.hasSessionToken,
        label: I18n.t("startup.authentication")
      },
      {
        enabled: this.props.hasSessionInfo,
        label: I18n.t("startup.sessionInfo")
      },
      { enabled: this.props.hasProfile, label: I18n.t("startup.profileInfo") },
      {
        enabled: this.props.isProfileEnabled,
        label: I18n.t("startup.profileEnabled")
      }
    ];
    return (
      <BaseScreenComponent primary={true} headerBackgroundColor={"green"}>
        <Container style={styles.container}>
          <ConnectionBar />
          <Text white={true} alignCenter={true}>
            {I18n.t("startup.title")}
          </Text>
          <Spinner color="white" />
          <List withContentLateralPadding={true}>
            {items.map((item, index) => (
              <ListItem key={`item-${index}`}>
                <IngressCheckBox checked={item.enabled} />
                <Body>
                  <Text white={true} bold={item.enabled}>
                    {item.label}
                  </Text>
                </Body>
              </ListItem>
            ))}
          </List>
        </Container>
      </BaseScreenComponent>
    );
  }
}

function mapStateToProps(state: GlobalState) {
  const maybeSessionToken = sessionTokenSelector(state);
  const maybeSessionInfo = sessionInfoSelector(state);
  const potProfile = profileSelector(state);
  return {
    hasSessionToken: maybeSessionToken !== undefined,
    hasSessionInfo: maybeSessionInfo.isSome(),
    hasProfile: potProfile !== null,
    isProfileEnabled:
      pot.isSome(potProfile) &&
      potProfile.value.has_profile &&
      potProfile.value.is_inbox_enabled
  };
}

export default connect(mapStateToProps)(IngressScreen);
