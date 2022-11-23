import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
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
        navigation.navigate("CreateForm");
      });
  };


  return (
    <KeyboardAvoidingView //style={MeuEstilo.containerlistar} 
    behavior="padding">
      <View
            style={{
              flex: 3,
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
                navigation.navigate("CreateForm");
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />
        
      </View>
    </KeyboardAvoidingView>
  );
};
