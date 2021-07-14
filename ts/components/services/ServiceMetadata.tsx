import React from "react";
import { View, StyleSheet } from "react-native";

import I18n from "../../i18n";
import { TranslationKeys } from "../../../locales/locales";
import { H4 } from "../core/typography/H4";
import TouchableDefaultOpacity from "../TouchableDefaultOpacity";
import { capitalize } from "../../utils/strings";
import customVariables from "../../theme/variables";
import { ItemAction } from "../../utils/url";

import ItemSeparatorComponent from "../ItemSeparatorComponent";

import SectionHeader from "./SectionHeader";
import LinkRow from "./LinkRow";

type Props = {
  address?: string;
  androidStoreUrl?: string;
  email?: string;
  fiscalCode?: string;
  getItemOnPress: (value: string, valueType?: ItemAction) => () => void;
  iosStoreUrl?: string;
  pec?: string;
  phone?: string;
  serviceId: string;
  supportUrl?: string;
  webUrl?: string;
};

const styles = StyleSheet.create({
  valueHeader: {
    marginTop: customVariables.spacerLargeHeight
  },
  valueRow: {
    flexDirection: "column"
  },
  valueItem: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 24
  },
  itemLabel: {
    flex: 1
  },
  itemValue: {
    flex: 1,
    marginRight: 8
  }
});

/**
 * Renders a dedicated section with a service's metadata and the header.
 */
const ServiceMetadata: React.FC<Props> = ({
  address,
  androidStoreUrl,
  email,
  fiscalCode,
  getItemOnPress,
  iosStoreUrl,
  pec,
  phone,
  serviceId,
  supportUrl,
  webUrl
}: Props) => (
  <>
    <SectionHeader iconName="io-phone" title={"services.contactsAndInfo"} />

    {/* links */}
    {webUrl && <LinkRow text={"services.visitWebsite"} href={webUrl} />}
    {supportUrl && (
      <LinkRow text={"services.askForAssistance"} href={supportUrl} />
    )}
    {iosStoreUrl && (
      <LinkRow text={"services.otherAppIos"} href={iosStoreUrl} />
    )}
    {androidStoreUrl && (
      <LinkRow text={"services.otherAppAndroid"} href={androidStoreUrl} />
    )}

    {/* touchable rows */}
    {fiscalCode &&
      renderInformationRow(
        fiscalCode,
        "profile.fiscalCode.fiscalCode",
        getItemOnPress(fiscalCode, "COPY"),
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
    {renderInformationRow(
      serviceId,
      "global.id",
      getItemOnPress(serviceId, "COPY"),
      "clipboard.copyText"
    )}
  </>
);

const renderInformationRow = (
  value: string,
  label: TranslationKeys,
  onPress: () => void,
  hint: TranslationKeys
) => (
  <View style={styles.valueRow}>
    <TouchableDefaultOpacity
      onPress={onPress}
      style={styles.valueItem}
      accessibilityRole={"button"}
      accessibilityHint={I18n.t(hint)}
    >
      <H4
        style={styles.itemValue}
        ellipsizeMode={"tail"}
        numberOfLines={1}
        color={"bluegrey"}
        weight={"Regular"}
      >
        {capitalize(I18n.t(label))}
      </H4>
      <H4
        style={styles.itemValue}
        ellipsizeMode={"tail"}
        numberOfLines={1}
        color={"blue"}
        weight={"SemiBold"}
      >
        {value}
      </H4>
    </TouchableDefaultOpacity>
    <ItemSeparatorComponent noPadded />
  </View>
);

export default ServiceMetadata;
