import { View } from "native-base";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { GlobalState } from "../../../../../../store/reducers/types";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

/**
 * No Satispay account found for the user
 * @constructor
 */
const SatispayKoNotFound: React.FunctionComponent<Props> = () => <View />;

const mapDispatchToProps = (_: Dispatch) => ({});

const mapStateToProps = (_: GlobalState) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SatispayKoNotFound);
