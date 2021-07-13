import * as React from "react";
import { View } from "react-native";

import LinkRow from "./LinkRow";
import SectionHeader from "./SectionHeader";

type Props = {
  privacyUrl?: string;
  tosUrl?: string;
};

/**
 * Renders a dedicated section with TOS, Privacy urls, and the header.
 * It **doesn't render** if both links are not defined!
 */
const TosAndPrivacy: React.FC<Props> = ({ tosUrl, privacyUrl }) => {
  if (tosUrl === undefined && privacyUrl === undefined) {
    return null;
  }
  return (
    <View>
      <SectionHeader
        iconName={"io-lucchetto"}
        title={"services.tosAndPrivacy"}
      />
      {tosUrl && <LinkRow text="services.tosLink" href={tosUrl} />}
      {privacyUrl && <LinkRow text="services.privacyLink" href={privacyUrl} />}
    </View>
  );
};

export default TosAndPrivacy;
