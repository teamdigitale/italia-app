import WebView from "react-native-webview";
import React from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import _ from "lodash";
import { fromNullable, Option } from "fp-ts/lib/Option";
import uuid from "uuid/v4";
import {
  WebViewNavigation,
  WebViewNavigationEvent
} from "react-native-webview/lib/WebViewTypes";
import URLParse from "url-parse";
import BaseScreenComponent from "../screens/BaseScreenComponent";
import { emptyContextualHelp } from "../../utils/emptyContextualHelp";
import { RefreshIndicator } from "../ui/RefreshIndicator";
import { useHardwareBackButton } from "../../features/bonus/bonusVacanze/components/hooks/useHardwareBackButton";
import { isTestEnv } from "../../utils/environment";
import { RTron } from "../../boot/configureStoreAndPersistor";
import { closeInjectedScript } from "../../utils/webview";

type Props = {
  // the uri to send the form data thought POST
  postUri: string;
  // data to include into the form to submit
  formData: Record<string, string | number>;
  /**
   * the path name that means the end of the process
   * ex: the process ends when this url will be load https://yourdomain.com/finish/path/name
   * finishPathName should be "/finish/path/name"
   */
  finishPathName: string;
  /**
   * the name of the query param used to include the outcome code
   * ex: https://yourdomain.com/finish/path/name?myoutcome=123
   * outcomeQueryparamName should be "myoutcome"
   */
  outcomeQueryparamName: string;
  onFinish: (outcomeCode: Option<string>) => void;
  onGoBack: () => void;
  modalHeaderTitle?: string;
};

const styles = StyleSheet.create({
  refreshIndicatorContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  }
});

// the ID used as form ID and to identify it to ensure the autosubmit
const formId = `io-form-id-${uuid()}`;
// the javascript submit command
const injectedJSPostForm: string = `<script type="application/javascript">document.getElementById("${formId}").submit();</script>`;

// create an html form giving a form data and an uri
const crateAutoPostForm = (
  form: Record<string, unknown>,
  uri: string
): string =>
  `<html><body><form action="${uri}" method="post" id="${formId}" enctype="application/x-www-form-urlencoded" style="display: none;">
    ${_.toPairs(form)
      .map(kv => `<input type="text" name="${kv[0]}" value="${kv[1]}">`)
      .join("<br/>")}
  </form></body></html>`;

/**
 * return a 2-tuple
 * 0 element: boolean. true if the given {@param url} contains the given {@param finishPathName} path name
 * 0 element: string | undefined. a string contains the value of {@param outcomeQueryparamName} in query string of {@param url}
 * @param url
 * @param finishPathName
 * @param outcomeQueryparamName
 */
const getFinishAndOutcome = (
  url: string,
  finishPathName: string,
  outcomeQueryparamName: string
): [isFinish: boolean, outComeCode: string | undefined] => {
  const urlParse = new URLParse(url, true);
  // find the object entry name in case insensitive
  const maybeEntry = _.toPairs(urlParse.query).find(
    kv => kv[0].toLowerCase() === outcomeQueryparamName.toLowerCase()
  );
  const outcome = maybeEntry ? maybeEntry[1] : undefined;
  // found exit path
  if (urlParse.pathname.toLowerCase().includes(finishPathName.toLowerCase())) {
    return [true, outcome];
  }
  return [false, outcome];
};

// a loading component rendered during the webview loading times
const renderLoading = () => (
  <View style={styles.refreshIndicatorContainer}>
    <RefreshIndicator />
  </View>
);

/**
 * A modal including a webview component.
 * It must be used to handle a payment.
 * A payment could start
 * - on credit card on-boarding
 * - on a regular payment
 * see https://docs.google.com/document/d/1FUkW7nwHlcmN2GrBWq1YnAzoNuvcvxa7WM0_VTkYV-I/edit#heading=h.v23dcgmq0ypp
 *
 * this is how this component works:
 * - at the start up, it creates a temporary html hidden form with all pre-set data (props.formFata)
 * - it appends, at the end of that html, a JS script to auto-submit the created form to the given url (props.postUri)
 * - it sets that html as starting page
 * - on each page load request it checks the url
 *    - if it is the exit url
 *    - if it contains the outcome code
 * - when the the exit url is found, it doesn't load it and call the handler props.onFinish passing the found (maybe not) outcome value
 */
export const PayWebViewModal = (props: Props) => {
  const [outcomeCode, setOutcomeCode] = React.useState<string | undefined>(
    undefined
  );
  const webView = React.createRef<WebView>();
  const [js, setJs] = React.useState<string | undefined>(
    closeInjectedScript(`alert(1);`)
  );
  useHardwareBackButton(() => {
    props.onGoBack();
    return true;
  });

  const handleOnShouldStartLoadWithRequest = (navState: WebViewNavigation) => {
    if (navState.url) {
      const [isFinish, maybeOutcome] = getFinishAndOutcome(
        navState.url,
        props.finishPathName,
        props.outcomeQueryparamName
      );
      const outcome = maybeOutcome ?? outcomeCode;
      if (outcome !== outcomeCode) {
        setOutcomeCode(outcome);
      }
      // found exit path
      if (isFinish) {
        props.onFinish(fromNullable(outcome));
        return false;
      }
    }
    RTron.log("start loading url", navState.url);
    return true;
  };
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={true}
      onRequestClose={props.onGoBack}
    >
      <BaseScreenComponent
        goBack={props.onGoBack}
        contextualHelp={emptyContextualHelp}
        headerTitle={props.modalHeaderTitle}
      >
        <WebView
          textZoom={100}
          ref={webView}
          source={{
            html:
              crateAutoPostForm(props.formData, props.postUri) +
              injectedJSPostForm
          }}
          javaScriptCanOpenWindowsAutomatically={true}
          onHttpError={e => RTron?.log("get an http error", e)}
          onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
          onMessage={m => RTron?.log("html page", m)}
          onLoadEnd={(e: any) => {
            if (e.nativeEvent.url && webView.current) {
              webView.current.injectJavaScript(
                closeInjectedScript(
                  `window.ReactNativeWebView.postMessage(document.documentElement.innerHTML);`
                )
              );
            }
          }}
          onError={e => RTron.log("onError", e)}
          startInLoadingState={true}
          renderLoading={renderLoading}
          javaScriptEnabled={true}
        />
      </BaseScreenComponent>
    </Modal>
  );
};

// keep encapsulation strong
export const testableGetFinishAndOutcome = isTestEnv
  ? getFinishAndOutcome
  : undefined;
