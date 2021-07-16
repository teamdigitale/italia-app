import { fromNullable } from "fp-ts/lib/Option";
import { Body, Container, Content, Right, View } from "native-base";
import * as React from "react";
import { Alert, Image, StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import URLParse from "url-parse";
import {
  WebViewErrorEvent,
  WebViewHttpErrorEvent
} from "react-native-webview/lib/WebViewTypes";
import brokenLinkImage from "../../img/broken-link.png";
import I18n from "../i18n";
import customVariables from "../theme/variables";
import { WebviewMessage } from "../types/WebviewMessage";
import { showToast } from "../utils/showToast";
import {
  closeInjectedScript,
  AVOID_ZOOM_JS,
  APP_EVENT_HANDLER
} from "../utils/webview";
import { getRemoteLocale } from "../utils/messages";
import ButtonDefaultOpacity from "./ButtonDefaultOpacity";
import { Label } from "./core/typography/Label";
import { Body as BodyText } from "./core/typography/Body";
import { withLightModalContext } from "./helpers/withLightModalContext";
import LoadingSpinnerOverlay from "./LoadingSpinnerOverlay";
import AppHeader from "./ui/AppHeader";
import IconFont from "./ui/IconFont";
import { LightModalContextInterface } from "./ui/LightModal";

type Props = {
  onWebviewClose: () => void;
  uri: string;
  handleWebMessage?: (message: string) => void;
} & LightModalContextInterface;

const styles = StyleSheet.create({
  textInput: { padding: 1, borderWidth: 1, height: 30 },
  contentPadding: { paddingHorizontal: customVariables.contentPadding },
  itemsCenter: { alignItems: "center" },
  selfCenter: { alignSelf: "center" },
  flex1: { flex: 1 },
  webViewHeight: { height: heightPercentageToDP("100%") },
  errorContainer: {
    flex: 1,
    alignItems: "center"
  },
  errorTitle: {
    marginTop: 10
  },
  errorBody: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center"
  },
  errorButtonsContainer: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row"
  },
  cancelButtonStyle: {
    flex: 1,
    marginEnd: 10
  }
});

const injectedJavascript = closeInjectedScript(
  AVOID_ZOOM_JS + APP_EVENT_HANDLER
);

const RegionServiceWebView: React.FunctionComponent<Props> = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const ref = React.createRef<WebView>();

  const urlParsed = new URLParse(props.uri, true);

  const showSuccessContent = (text: string, close: () => void) => (
    <Container>
      <AppHeader noLeft={true}>
        <Body />
        <Right>
          <ButtonDefaultOpacity onPress={close} transparent={true}>
            <IconFont name={"io-close"} />
          </ButtonDefaultOpacity>
        </Right>
      </AppHeader>
      <Content style={styles.flex1}>
        <IconFont
          name={"io-complete"}
          size={120}
          color={customVariables.brandHighlight}
          style={styles.selfCenter}
        />
        <View spacer={true} large={true} />

        <View style={styles.itemsCenter}>
          <Label>{`${I18n.t("global.genericThanks")},`}</Label>
          <Label weight={"Bold"}>{text}</Label>
        </View>
      </Content>
    </Container>
  );

  const showErrorContent = (text: string, close: () => void) => (
    <Container>
      <AppHeader noLeft={true}>
        <Body />
        <Right>
          <ButtonDefaultOpacity onPress={close} transparent={true}>
            <IconFont name={"io-close"} />
          </ButtonDefaultOpacity>
        </Right>
      </AppHeader>
      <Content style={styles.flex1}>
        <IconFont
          name={"io-error"}
          size={120}
          color={customVariables.brandDanger}
          style={styles.selfCenter}
        />
        <View spacer={true} />

        <View style={styles.itemsCenter}>
          <Label weight={"Bold"}>{text}</Label>
        </View>
      </Content>
    </Container>
  );

  const onWebviewError = (_: WebViewErrorEvent) => {
    setHasError(true);
    setLoading(false);
  };

  const onWebviewHttpError = (_: WebViewHttpErrorEvent) => {
    setHasError(true);
    setLoading(false);
  };

  const renderErrorComponent = () => (
    <View style={styles.errorContainer}>
      <View spacer={true} extralarge={true} />
      <View spacer={true} extralarge={true} />
      <Image source={brokenLinkImage} resizeMode="contain" />
      <Label style={styles.errorTitle} weight={"Bold"}>
        {I18n.t("authentication.errors.network.title")}
      </Label>

      <View style={styles.errorButtonsContainer}>
        <ButtonDefaultOpacity
          onPress={props.onWebviewClose}
          style={styles.cancelButtonStyle}
          block={true}
          light={true}
          bordered={true}
        >
          <BodyText>{I18n.t("global.buttons.cancel")}</BodyText>
        </ButtonDefaultOpacity>
        <ButtonDefaultOpacity
          onPress={handleReload}
          style={{ flex: 2 }}
          block={true}
          primary={true}
        >
          <Label color={"white"}>{I18n.t("global.buttons.retry")}</Label>
        </ButtonDefaultOpacity>
      </View>
    </View>
  );

  const handleReload = () => {
    setHasError(false);
    setLoading(true);
    if (ref.current) {
      ref.current.reload();
    }
  };

  const handleWebviewMessage = (event: WebViewMessageEvent) => {
    if (!event.nativeEvent.url.startsWith(urlParsed.origin)) {
      return;
    }

    if (props.handleWebMessage) {
      props.handleWebMessage(event.nativeEvent.data);
    }

    const maybeData = WebviewMessage.decode(JSON.parse(event.nativeEvent.data));

    if (maybeData.isLeft()) {
      showToast(I18n.t("webView.error.convertMessage"));
      return;
    }

    const locale = getRemoteLocale();
    const message = maybeData.value;
    switch (message.type) {
      case "CLOSE_MODAL":
        props.onWebviewClose();
        return;
      case "START_LOAD":
        setLoading(true);
        return;
      case "END_LOAD":
        setLoading(false);
        return;
      case "SHOW_SUCCESS":
        props.showModal(
          showSuccessContent(
            fromNullable(message[locale]).getOrElse(message.en),
            () => {
              props.hideModal();
              props.onWebviewClose();
            }
          )
        );
        return;
      case "SHOW_ERROR":
        props.showModal(
          showErrorContent(
            fromNullable(message[locale]).getOrElse(message.en),
            props.hideModal
          )
        );
        return;
      case "SHOW_ALERT":
        const value = fromNullable(message[locale]).getOrElse(message.en);
        Alert.alert(value.title, value.description);
        return;
      default:
        return;
    }
  };

  const injectJS = () => {
    fromNullable(ref.current).map(wv =>
      wv.injectJavaScript(injectedJavascript)
    );
    setLoading(false);
  };

  return (
    <LoadingSpinnerOverlay isLoading={loading}>
      {!hasError && (
        <View style={{ flex: 1 }}>
          <WebView
            ref={ref}
            source={{ uri: props.uri }}
            textZoom={100}
            onLoadEnd={injectJS}
            onMessage={handleWebviewMessage}
            onError={onWebviewError}
            onHttpError={onWebviewHttpError}
            onLoadStart={() => setLoading(true)}
            sharedCookiesEnabled={true}
          />
        </View>
      )}
      {hasError && renderErrorComponent()}
    </LoadingSpinnerOverlay>
  );
};

export default withLightModalContext(RegionServiceWebView);
