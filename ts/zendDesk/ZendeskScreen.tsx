import * as React from "react";
import { Content, Input, Item, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import ZendDesk from "react-native-zendesk-v2";
import { connect } from "react-redux";
import * as pot from "italia-ts-commons/lib/pot";
import BaseScreenComponent from "../components/screens/BaseScreenComponent";
import ButtonDefaultOpacity from "../components/ButtonDefaultOpacity";
import { makeFontStyleObject } from "../components/core/fonts";
import { Label } from "../components/core/typography/Label";
import { GlobalState } from "../store/reducers/types";
import { profileSelector } from "../store/reducers/profile";

/**
 * considerazioni
 * - alcuni metodi non sono nel file di types
 * - le operazioni sono tutte sync
 * - nella init non c'è una gestione dell'errore
 */

type Props = ReturnType<typeof mapStateToProps>;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "90%"
  }
});
const zendeskDefaultConfig = {
  appId: "8547479b47fdacd0e8f74a4fb076a41014dee620d1d890b3",
  clientId: "mobile_sdk_client_518ee6a8160220698f97",
  url: "https://pagopa.zendesk.com"
};
const IBANInputStyle = makeFontStyleObject("Regular", false, "RobotoMono");

const ZendeskScreen = (props: Props) => {
  const [zenddeskConfig, setZenneskConfig] = React.useState(
    zendeskDefaultConfig
  );

  const [nameAndEmail, setNameAndEmail] = React.useState({
    name: pot.getOrElse(
      pot.map(props.profile, p => p.name),
      ""
    ),
    email: pot.getOrElse(
      pot.map(props.profile, p => p.email as string),
      ""
    )
  });

  const initZenDesk = () => {
    ZendDesk.init({
      key: "6e2c01f7-cebc-4c77-b878-3ed3c749a835",
      appId: zenddeskConfig.appId,
      url: zenddeskConfig.url,
      clientId: zenddeskConfig.clientId
    });
  };

  const startChat = (name: string, email: string) => {
    ZendDesk.startChat({
      name,
      email,
      tags: ["tag1", "tag2"],
      department: "Your department"
    });
  };

  const showHelpCenter = () => {
    const zenDeskAny = ZendDesk as any;
    zenDeskAny.showHelpCenter({
      withChat: true, // add this if you want to use chat instead of ticket creation
      disableTicketCreation: true // add this if you want to just show help center and not add ticket creation
    });
  };

  const identifyWithNameAndEmail = (name: string, email: string) => {
    // some methods have not type definition
    const zenDeskAny = ZendDesk as any;
    zenDeskAny.setUserIdentity({
      name,
      email
    });
  };

  return (
    <BaseScreenComponent headerTitle={"ZenDesk - ⚠️ only for test purposes"}>
      <Content>
        <View style={{ flex: 1 }}>
          <Label weight={"Regular"}>{"App ID"}</Label>
          <Item error={false}>
            <Input
              multiline={true}
              value={zenddeskConfig.appId}
              style={IBANInputStyle}
              onChangeText={text => {}}
            />
          </Item>
          <View spacer={true} />

          <Label weight={"Regular"}>{"Client ID"}</Label>
          <Item error={false}>
            <Input
              multiline={true}
              value={zenddeskConfig.clientId}
              style={IBANInputStyle}
              onChangeText={text => {}}
            />
          </Item>
          <View spacer={true} />

          <Label weight={"Regular"}>{"Zendesk URL"}</Label>
          <Item error={false}>
            <Input
              multiline={true}
              value={zenddeskConfig.url}
              style={IBANInputStyle}
              onChangeText={text => {}}
            />
          </Item>
          <View spacer={true} />

          <ButtonDefaultOpacity
            style={styles.buttonStyle}
            bordered={false}
            onPress={initZenDesk}
          >
            <Text>{"init Zendesk"}</Text>
          </ButtonDefaultOpacity>

          <View spacer={true} />
          <View spacer={true} />

          <Label weight={"Regular"}>{"Name"}</Label>
          <Item error={false}>
            <Input
              multiline={true}
              value={nameAndEmail.name}
              style={IBANInputStyle}
              onChangeText={text => {}}
            />
          </Item>
          <View spacer={true} />

          <Label weight={"Regular"}>{"Email"}</Label>
          <Item error={false}>
            <Input
              multiline={true}
              value={nameAndEmail.email}
              style={IBANInputStyle}
              onChangeText={text => {}}
            />
          </Item>
          <View spacer={true} />
          <ButtonDefaultOpacity
            style={styles.buttonStyle}
            bordered={false}
            onPress={() =>
              identifyWithNameAndEmail(nameAndEmail.name, nameAndEmail.email)
            }
          >
            <Text>{"identify with email and name"}</Text>
          </ButtonDefaultOpacity>

          <View spacer={true} />
          <ButtonDefaultOpacity
            style={styles.buttonStyle}
            bordered={false}
            onPress={() => startChat(nameAndEmail.name, nameAndEmail.email)}
          >
            <Text>{"start chat"}</Text>
          </ButtonDefaultOpacity>

          <View spacer={true} />
          <ButtonDefaultOpacity
            style={styles.buttonStyle}
            bordered={false}
            onPress={() => showHelpCenter()}
          >
            <Text>{"showHelpCenter"}</Text>
          </ButtonDefaultOpacity>
        </View>
      </Content>
    </BaseScreenComponent>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  profile: profileSelector(state)
});

export default connect(mapStateToProps)(ZendeskScreen);
