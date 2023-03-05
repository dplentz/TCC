import { useNavigation } from "@react-navigation/core";
import React, { useState, useCallback, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
} from "react-native";
import {
  Layout,
  Text,
  TextInput,
  Section,
  SectionContent,
  Button,
  useTheme,
  themeColor,
  TopNav,
  
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../navigation/firebase";


export default function ({ navigation })
{
  const { isDarkmode, setTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false)
  const [nomeCampo, setNomeCampo] = useState("");
  const [valor, setValor] = useState('');
  let i = 0;
  const [forms, setForms]=useState([])
  const ref = firestore
  .collection("Usuario")
  .doc(auth.currentUser.uid)
  .collection("Form")
  .doc(auth.currentUser.uid).collection("Campos").doc();
  const refId = firestore
  .collection("Usuario")
  .doc(auth.currentUser.uid)
  .collection("Form")
  .doc(auth.currentUser.uid).collection("Campos")
 
 // const [open, setOpen] = useState(false);
 useEffect(()=>{
  refId.onSnapshot((querySnapshot) => {
    const forms = [];
        querySnapshot.forEach((documentSnapshot) => {
          forms.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setForms(forms)}
       );
  if(forms.length==undefined||forms.length==0){
      i=1;
    } 
  else{
      let id= forms.length;
      i = id + 1;
  }
 })
 
 

  const enviarDados = () => {
    
    ref
      .set({
        nomeCampo: nomeCampo,
        id: ref.id,
        tam: i,
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
           <TopNav
        middleContent={<Image
          resizeMode="contain"
          style={{
            height: 200,
            width: 200,
          }}
          source={require("../../../assets/migraTopNav.png")}
        />}   
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.navigate("AddForm")}
      />
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
              source={require("../../../assets/ideia.png")}
            />
          </View>
        <Section  style={{ marginHorizontal: 20}} ><SectionContent>
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
     </SectionContent></Section>
      </ScrollView>
      <View>
    
          
       
         
      
     </View>
      <ScrollView>
      <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
              >
         <Button
              text="Adicionar campo"
              onPress={() => {
                enviarDados();
              }}
              color={"#0bbc9f"}
              style={{
                marginTop: 10,
                color: "#0bbc9f",
              }}
            />
        
      </View>
      </ScrollView>
      
      </Layout>
    </KeyboardAvoidingView>
  );};
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#f8bbd0',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      marginTop: 15,
      borderRadius: 5,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#f8bbd0',
    },
    buttonClose: {
      backgroundColor: '#f8bbd0',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

