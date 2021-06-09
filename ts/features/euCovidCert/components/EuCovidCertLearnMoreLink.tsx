import * as React from "react";
import I18n from "../../../i18n";
import { Link } from "../../../components/core/typography/Link";
import { euCovidCertificateUrl } from "../../../urls";
import { openWebUrl } from "../../../utils/url";

const EuCovidCertLearnMoreLink = (): React.ReactElement => (
  <Link
    accessibilityRole={"link"}
    accessibilityHint={I18n.t("global.accessibility.linkHint")}
    onPress={() => openWebUrl(euCovidCertificateUrl)}
  >
    {I18n.t("features.euCovidCertificate.common.learnMore")}
  </Link>
);

export default EuCovidCertLearnMoreLink;
