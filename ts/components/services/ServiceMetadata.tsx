import React from "react";
import { View, StyleSheet } from "react-native";
import { OrganizationFiscalCode } from "italia-ts-commons/lib/strings";

import { isIos, isAndroid } from "../../utils/platform";
import { TranslationKeys } from "../../../locales/locales";
import { Service } from "../../../definitions/content/Service";
import { ServiceId } from "../../../definitions/backend/ServiceId";
import { capitalize } from "../../utils/strings";
import I18n from "../../i18n";
import { ItemAction } from "../../utils/url";
import { H4 } from "../core/typography/H4";
import TouchableDefaultOpacity from "../TouchableDefaultOpacity";
import ItemSeparatorComponent from "../ItemSeparatorComponent";
import SectionHeader from "./SectionHeader";
import LinkRow from "./LinkRow";

type Props = {
  getItemOnPress: (value: string, valueType?: ItemAction) => () => void;
  isDebugModeEnabled: boolean;
  organizationFiscalCode: OrganizationFiscalCode;
  serviceId: ServiceId;
  servicesMetadata: Service;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "column"
  },
  touchable: {
    flexDirection: "row",
    marginVertical: 24
  },
  label: {
    flex: 1,
    marginRight: 8
  }
});

/**
 * Renders a dedicated section with a service's metadata and the header.
 */
const ServiceMetadata: React.FC<Props> = ({
  organizationFiscalCode,
  getItemOnPress,
  serviceId,
  servicesMetadata,
  isDebugModeEnabled
}: Props) => {
  const {
    address,
    app_android,
    email,
    app_ios,
    pec,
    phone,
    support_url,
    web_url
  } = servicesMetadata;
  return (
    <>
      <SectionHeader iconName="io-phone" title={"services.contactsAndInfo"} />

      {/* links */}
      {web_url && <LinkRow text={"services.visitWebsite"} href={web_url} />}
      {support_url && (
        <LinkRow text={"services.askForAssistance"} href={support_url} />
      )}
      {isIos && app_ios && (
        <LinkRow text={"services.otherAppIos"} href={app_ios} />
      )}
      {isAndroid && app_android && (
        <LinkRow text={"services.otherAppAndroid"} href={app_android} />
      )}

      {/* touchable rows */}
      {renderInformationRow(
        organizationFiscalCode,
        "serviceDetail.fiscalCode",
        getItemOnPress(organizationFiscalCode, "COPY"),
        "clipboard.copyText"
      )}
      {address &&
        renderInformationRow(
          address,
          "services.contactAddress",
          getItemOnPress(address, "MAP"),
          "openMaps.openAddressOnMap"
        )}
      {phone &&
        renderInformationRow(
          phone,
          "global.media.phone",
          getItemOnPress(`tel:${phone}`),
          "messageDetails.call"
        )}
      {email &&
        renderInformationRow(
          email,
          "global.media.email",
          getItemOnPress(`mailto:${email}`),
          "messageDetails.sendEmail"
        )}
      {pec &&
        renderInformationRow(
          pec,
          "global.media.pec",
          getItemOnPress(`mailto:${pec}`),
          "messageDetails.sendEmail"
        )}
      {isDebugModeEnabled &&
        serviceId &&
        renderInformationRow(
          serviceId,
          "global.id",
          getItemOnPress(serviceId, "COPY"),
          "clipboard.copyText"
        )}
    </>
  );
};

const renderInformationRow = (
  value: string,
  label: TranslationKeys,
  onPress: () => void,
  hint: TranslationKeys
) => (
  <View style={styles.row}>
    <TouchableDefaultOpacity
      onPress={onPress}
      style={styles.touchable}
      accessibilityRole={"button"}
      accessibilityHint={I18n.t(hint)}
    >
      <H4
        style={styles.label}
        ellipsizeMode={"tail"}
        numberOfLines={1}
        color={"bluegrey"}
        weight={"Regular"}
      >
        {capitalize(I18n.t(label))}
      </H4>
      <View>
        <H4
          style={styles.label}
          ellipsizeMode={"tail"}
          numberOfLines={1}
          color={"blue"}
          weight={"SemiBold"}
        >
          {value}
        </H4>
      </View>
    </TouchableDefaultOpacity>
    <ItemSeparatorComponent noPadded />
  </View>
);

export default ServiceMetadata;
