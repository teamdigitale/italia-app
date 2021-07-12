import * as pot from "italia-ts-commons/lib/pot";
import { Content, Grid, Text, View } from "native-base";
import * as React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";
import { ServicePublic } from "../../../definitions/backend/ServicePublic";
import iOSStoreBadge from "../../../img/badges/app-store-badge.png";
import playStoreBadge from "../../../img/badges/google-play-badge.png";
import ButtonDefaultOpacity from "../../components/ButtonDefaultOpacity";
import ExtractedCTABar from "../../components/cta/ExtractedCTABar";
import OrganizationHeader from "../../components/OrganizationHeader";
import BaseScreenComponent, {
  ContextualHelpPropsMarkdown
} from "../../components/screens/BaseScreenComponent";
import { EdgeBorderComponent } from "../../components/screens/EdgeBorderComponent";
import H4 from "../../components/ui/H4";
import IconFont from "../../components/ui/IconFont";
import Markdown from "../../components/ui/Markdown";
import I18n from "../../i18n";
import { Dispatch, ReduxProps } from "../../store/actions/types";
import {
  contentSelector,
  ServiceMetadataState
} from "../../store/reducers/content";
import { isDebugModeEnabledSelector } from "../../store/reducers/debug";
import { servicesSelector } from "../../store/reducers/entities/services";
import {
  isCustomEmailChannelEnabledSelector,
  wasServiceAlertDisplayedOnceSelector
} from "../../store/reducers/persistedPreferences";
import {
  isEmailEnabledSelector,
  isInboxEnabledSelector,
  isProfileEmailValidatedSelector,
  profileSelector
} from "../../store/reducers/profile";
import { GlobalState } from "../../store/reducers/types";
import customVariables from "../../theme/variables";
import { getServiceCTA } from "../../utils/messages";
import {
  EnabledChannels,
  getEnabledChannelsForService
} from "../../utils/profile";
import { showToast } from "../../utils/showToast";
import { handleItemOnPress, ItemAction } from "../../utils/url";
import ContactPreferencesToggles from "../../components/services/ContactPreferencesToggles";
import ServiceMetadata from "../../components/services/ServiceMetadata";
import { H3 } from "../../components/core/typography/H3";
import { IOStyles } from "../../components/core/variables/IOStyles";
import { IOColors } from "../../components/core/variables/IOColors";
import TosAndPrivacyBox from "../../components/services/TosAndPrivacyBox";
import { ServiceId } from "../../../definitions/backend/ServiceId";
import { currentSelectedService } from "../../store/actions/services";

type NavigationParams = Readonly<{
  service: ServicePublic;
}>;

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  ReduxProps &
  NavigationInjectedProps<NavigationParams>;

type State = {
  uiEnabledChannels: EnabledChannels;
  isMarkdownLoaded: boolean;
};

const styles = StyleSheet.create({
  infoHeader: {
    marginTop: customVariables.spacerLargeHeight
  },
  infoItem: {
    flexDirection: "column",
    marginTop: customVariables.spacerHeight
  },
  badgeLogo: {
    width: 150,
    height: 50,
    alignSelf: "flex-start"
  },
  switchRow: {
    justifyContent: "space-between",
    paddingVertical: 12
  },
  otherSwitchRow: {
    borderTopColor: customVariables.itemSeparator,
    borderTopWidth: 1 / 3
  },
  flexRow: {
    flexDirection: "row"
  },
  enabledColor: {
    color: customVariables.brandDarkestGray
  },
  disabledColor: {
    color: customVariables.lightGray
  },
  info: {
    marginTop: -5
  },
  imageHeight: {
    height: 60
  },
  imageWidth: {
    width: 60
  }
});

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "serviceDetail.headerTitle",
  body: "serviceDetail.contextualHelpContent"
};

// Renders a row in the service information panel as a primary block button
function renderInformationRow(
  label: string,
  info: string,
  value: string,
  valueType?: ItemAction
) {
  return (
    <View style={styles.infoItem}>
      <Text>{label}</Text>
      <ButtonDefaultOpacity
        primary={true}
        small={true}
        onPress={handleItemOnPress(value, valueType)}
      >
        <Text uppercase={false} ellipsizeMode={"tail"} numberOfLines={1}>
          {info}
        </Text>
      </ButtonDefaultOpacity>
    </View>
  );
}

// Renders a row in the service information panel as labelled image
function renderInformationImageRow(
  label: string,
  url: string,
  source: ImageSourcePropType
) {
  return (
    <View style={styles.infoItem}>
      <Text>{label}</Text>
      <TouchableOpacity onPress={handleItemOnPress(url, "LINK")}>
        <Image
          style={styles.badgeLogo}
          resizeMode={"contain"}
          source={source}
        />
      </TouchableOpacity>
    </View>
  );
}

/**
 * return true if markdown is loaded (description is rendered inside a markdown component)
 * return true if description doesn't exists but values are present
 * return false in others cases
 *
 * this behavior is due to markdown loading: it could happen some items overlapped while the
 * markdown content is loading. To avoid this, we wait the loading ends and then the items will
 * be displayed
 */
export const canRenderItems = (
  isMarkdownLoaded: boolean,
  potServiceMetadata: ServiceMetadataState
): boolean => {
  const isServiceMetadataLoaded = pot.getOrElse(
    pot.map(potServiceMetadata, sm => sm !== undefined),
    false
  );
  const hasServiceMetadataDescription = pot.getOrElse(
    pot.map(
      potServiceMetadata,
      sm => sm !== undefined && sm.description !== undefined
    ),
    false
  );
  // if service metadata is loaded
  // return isMarkdownLoaded if it has a defined description field
  // return true otherwise
  if (isServiceMetadataLoaded) {
    return hasServiceMetadataDescription ? isMarkdownLoaded : true;
  }
  return false;
};

/**
 * Screen displaying the details of a selected service. The user
 * can enable/disable the service and customize the notification settings.
 */
class ServiceDetailsScreen extends React.Component<Props, State> {
  get serviceId() {
    return this.props.navigation.getParam("service").service_id;
  }

  constructor(props: Props) {
    super(props);
    // We initialize the UI by making the states of the channels the same
    // as what is set in the profile. The user will be able to change the state
    // via the UI and the profile will be updated in the background accordingly
    this.state = {
      uiEnabledChannels: getEnabledChannelsForService(
        this.props.profile,
        this.serviceId
      ),
      isMarkdownLoaded: false
    };
  }

  public componentDidUpdate(prevProps: Props) {
    if (pot.isError(this.props.profile) && !pot.isError(prevProps.profile)) {
      // in case of new or resolved errors while updating the profile, we show a toast and
      // reset the UI to match the state of the profile preferences
      showToast(
        I18n.t("serviceDetail.onUpdateEnabledChannelsFailure"),
        "danger"
      );

      const uiEnabledChannels = getEnabledChannelsForService(
        this.props.profile,
        this.props.navigation.getParam("service").service_id
      );
      this.setState({
        uiEnabledChannels
      });
    }
  }
  // collect the service
  private service = this.props.navigation.getParam("service");

  private onMarkdownEnd = () => {
    this.setState({ isMarkdownLoaded: true });
  };

  private renderItems = (potServiceMetadata: ServiceMetadataState) => {
    if (pot.isSome(potServiceMetadata) && potServiceMetadata.value) {
      const metadata = potServiceMetadata.value;
      return (
        <React.Fragment>
          {metadata.description && (
            <Markdown
              animated={true}
              onLoadEnd={this.onMarkdownEnd}
              onError={this.onMarkdownEnd}
            >
              {metadata.description}
            </Markdown>
          )}
          {metadata.description && <View spacer={true} large={true} />}
          {canRenderItems(this.state.isMarkdownLoaded, potServiceMetadata) && (
            <View>
              <TosAndPrivacyBox
                tosUrl={metadata.tos_url}
                privacyUrl={metadata.privacy_url}
              />

              {(metadata.app_android ||
                metadata.app_ios ||
                metadata.web_url) && (
                <H4 style={styles.infoHeader}>
                  {I18n.t("services.otherAppsInfo")}
                </H4>
              )}
              {metadata.web_url &&
                renderInformationRow(
                  I18n.t("services.otherAppWeb"),
                  metadata.web_url,
                  metadata.web_url
                )}
              {metadata.app_ios &&
                renderInformationImageRow(
                  I18n.t("services.otherAppIos"),
                  metadata.app_ios,
                  iOSStoreBadge
                )}
              {metadata.app_android &&
                renderInformationImageRow(
                  I18n.t("services.otherAppAndroid"),
                  metadata.app_android,
                  playStoreBadge
                )}
            </View>
          )}
        </React.Fragment>
      );
    }
    return undefined;
  };

  private renderServiceMetaData(potServiceMetadata: ServiceMetadataState) {
    if (pot.isSome(potServiceMetadata) && potServiceMetadata.value) {
      const metadata = potServiceMetadata.value;
      const service = this.service;

      return (
        <ServiceMetadata
          address={metadata.address}
          email={metadata.email}
          fiscalCode={service.organization_fiscal_code}
          getItemOnPress={handleItemOnPress}
          pec={metadata.pec}
          phone={metadata.phone}
          serviceId={service.service_id}
          supportUrl={metadata.support_url}
          webUrl={metadata.web_url}
        />
      );
    }
    return null;
  }

  public render() {
    const { service, serviceId } = this;

    // collect the service metadata
    const potServiceMetadata =
      this.props.content.servicesMetadata.byId[serviceId] || pot.none;

    const maybeCTA = getServiceCTA(potServiceMetadata);
    return (
      <BaseScreenComponent
        goBack={this.props.navigation.goBack}
        headerTitle={I18n.t("serviceDetail.headerTitle")}
        contextualHelpMarkdown={contextualHelpMarkdown}
        faqCategories={["services_detail"]}
      >
        <Content>
          <Grid>
            <OrganizationHeader service={service} />
          </Grid>
          <View spacer={true} large={true} />
          <View style={[IOStyles.row, { alignItems: "center" }]}>
            <IconFont
              name={"io-envelope"}
              color={IOColors.bluegrey}
              size={18}
            />
            <View hspacer small />
            <H3 weight={"SemiBold"} color={"bluegrey"}>
              {I18n.t("serviceDetail.contacts.title")}
            </H3>
          </View>
          <View spacer={true} small />

          <ContactPreferencesToggles
            serviceId={this.serviceId}
            channels={this.service.available_notification_channels}
          />

          <View spacer={true} large={true} />
          {this.renderItems(potServiceMetadata)}

          {canRenderItems(this.state.isMarkdownLoaded, potServiceMetadata) &&
            this.renderServiceMetaData(potServiceMetadata)}

          {canRenderItems(this.state.isMarkdownLoaded, potServiceMetadata) && (
            <EdgeBorderComponent />
          )}
          <View spacer={true} extralarge={true} />
        </Content>
        {maybeCTA.isSome() && (
          <View footer={true} style={styles.flexRow}>
            <ExtractedCTABar
              ctas={maybeCTA.value}
              xsmall={false}
              dispatch={this.props.dispatch}
              serviceMetadata={potServiceMetadata}
              service={service}
            />
          </View>
        )}
      </BaseScreenComponent>
    );
  }
}

const mapStateToProps = (state: GlobalState) => {
  const potIsCustomEmailChannelEnabled = isCustomEmailChannelEnabledSelector(
    state
  );
  const isCustomEmailChannelEnabled = pot.getOrElse(
    potIsCustomEmailChannelEnabled,
    false
  );

  return {
    isInboxEnabled: isInboxEnabledSelector(state),
    isEmailEnabled: isEmailEnabledSelector(state),
    isEmailValidated: isProfileEmailValidatedSelector(state),
    services: servicesSelector(state),
    content: contentSelector(state),
    profile: profileSelector(state),
    isDebugModeEnabled: isDebugModeEnabledSelector(state),
    wasServiceAlertDisplayedOnce: wasServiceAlertDisplayedOnceSelector(state),
    isCustomEmailChannelEnabled
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentSelectedService: (id: ServiceId) =>
    dispatch(currentSelectedService(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceDetailsScreen);
