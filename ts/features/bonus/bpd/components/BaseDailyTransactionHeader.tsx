import { View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import TypedI18n from "../../../../i18n";
import { H3 } from "../../../../components/core/typography/H3";
import { H5 } from "../../../../components/core/typography/H5";
import IconFont from "../../../../components/ui/IconFont";
import { IOColors } from "../../../../components/core/variables/IOColors";

type Props = {
  date: string;
  transactionsNumber: number;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    justifyContent: "space-between"
  }
});

const BaseDailyTransactionHeader: React.FunctionComponent<Props> = (
  props: Props
) => (
  <>
    <H3 weight={"Bold"} color={"black"}>
      {props.date}
    </H3>
    <View style={[styles.row, styles.container]}>
      <View style={styles.row}>
        <IconFont
          name={"io-transactions"}
          size={12}
          color={IOColors.bluegrey}
        />
        <H5 color={"bluegrey"}>
          {` ${TypedI18n.t(
            "bonus.bpd.details.components.transactionsCountOverview.label",
            {
              defaultValue: I18n.t(
                "bonus.bpd.details.components.transactionsCountOverview.label.other",
                { count: props.transactionsNumber }
              ),
              count: props.transactionsNumber
            }
          )}`}
        </H5>
      </View>
      <H5 color={"bluegrey"}>{`${TypedI18n.t("bonus.bpd.name")} (€)`} </H5>
    </View>
  </>
);

export default BaseDailyTransactionHeader;
