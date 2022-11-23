import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { auth, firestore } from "../../navigation/firebase";

export default function ({ navigation }){
  
  const [nomeCampo, setNomeCampo] = useState("");
  const [value, setValue] = useState("");
  const ref = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form")
    .doc(auth.currentUser.uid).collection("Campos").doc();

  const enviarDados = () => {
    ref
      .set({
        nomeCampo: nomeCampo,
        value: value,
        id: ref.id,
      })
      .then(() => {
        alert("Campo " + nomeCampo + " Adicionado com Sucesso");
        navigation.navigate("AddForm");
      });
  };


  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingBottom: 20,
        
            }}
      >
        <TextInput
          placeholder="Nome do Campo"
          value={nomeCampo}
          onChangeText={(text) => setNomeCampo(text)}
          //style={MeuEstilo.input}
        />
        <TextInput
          placeholder="Tipo"
          value={value}
          onChangeText={(text) => setValue(text)}
          //style={MeuEstilo.input}
        />
      </View>

      <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
              >
         <Button
              text="Criar Formulário"
              onPress={() => {
                enviarDados();
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />
        
      </View>
      </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
};
