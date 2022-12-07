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
//import RNPickerSelect from "react-native-picker-select";
import { auth, firestore } from "../../navigation/firebase";

export default function ({ navigation })
{
  
  const [nomeCampo, setNomeCampo] = useState("");
  const [valor, setValor] = useState("");
  const ref = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form")
    .doc(auth.currentUser.uid).collection("Campos").doc();

  const enviarDados = () => {
    ref
      .set({
        nomeCampo: nomeCampo,
        valor: valor,
        id: ref.id,
      })
      .then(() => {
        alert("Campo " + nomeCampo + " Adicionado com Sucesso");
        navigation.navigate("AddForm");
      });
  };

  /*<RNPickerSelect
                 value={valor}
                 onValueChange={(valor) => setValor(valor)}
                 items={[
                     { label: "Texto", value: "text" },
                     { label: "Seleção", value: "select" },
                     { label: "Horário", value: "hour" },
                 ]}
                 style={{ inputAndroid: { color: "black" } }} useNativeAndroidPickerStyle={false}
             />*/


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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/register.png")}
            />
          </View>
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
