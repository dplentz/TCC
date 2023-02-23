import React,{useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { auth, firestore } from '../navigation/firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import {
  Layout,
  Text,
  TextInput,
  Button,
  TopNav,
  useTheme,
  themeColor,
  Section,
} from "react-native-rapi-ui";

import { Ionicons } from "@expo/vector-icons";





export default function ({ navigation })  {

  const [dados, setDados]=useState([]);
  const [chaves, setChaves] = useState([]);

  const [objNovo, setObjNovo]=useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { isDarkmode, setTheme } = useTheme();
  const [modalData, setModalData] = useState({});
  const [modalCampoData, setModalCampoData] = useState([]);
const [modalValorData, setModalValorData] = useState([]);




  

 









 
 
  const CamposEDados = (chave) =>
  {
      for(let tam=0;tam<dados.length;tam++){
       
      const dadosObj = firestore.collection("Usuario")
      .doc(auth.currentUser.uid)
      .collection("Form").doc(auth.currentUser.uid).collection("Dados").doc(chave)

     
    
    dadosObj.collection("obj").get().then((querySnapshot) => {
    
      if (!querySnapshot.empty) {
        const campoArray = [];
  const valorArray = [];
        querySnapshot.forEach((doc) => {
        
          const campo = doc.data().campo;
          const valor = doc.data().valor;
          campoArray.push(campo);
          valorArray.push(valor);
         
        });
        setModalCampoData(campoArray);
        setModalValorData(valorArray);
        setModalOpen(true); 
      } else {
        console.log("A subcoleção 'obj' está vazia.");
      }
    }).catch((error) => {
      console.log(`Erro ao recuperar dados: ${error}`);
    });
    
  }
  
  
  }
  


  useEffect(() => {
    const subscriber = firestore
      .collection("Usuario")
      .doc(auth.currentUser.uid)
      .collection("Form").doc(auth.currentUser.uid).collection("Dados")
      .onSnapshot((querySnapshot) => {
        const dados = [];
        querySnapshot.forEach((documentSnapshot) => {
          dados.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
     
        setDados(dados);
        setChaves(dados);
        for(let i=0;i<dados.length;i++){
       
      }
        //console.log(dados)
        //setObjetos()
        
      });
      return () => subscriber();
    }, [])
     
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
    <Layout>
    <SafeAreaView style={styles.container}>
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
          source={require("../../assets/migraTopNav.png")}
        />}        
      />
      <View
            style={{
              flex: 0.1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
         
            <Image
              resizeMode="contain"
              style={{
                height: 300,
                width: 300,
              }}
              source={require("../../assets/register.png")}
            />
          </View>
      <Section style={{ flex: 1,width: "90%", alignSelf: "center",}}> 

      
      <FlatList
        data={dados}
        renderItem={({ item }) => (
          <TouchableOpacity style={{alignItems: "center", padding: 10,}}onPress={() => CamposEDados(item.id)}>
            <Text style={styles.itens}>{item.data}</Text>
          </TouchableOpacity>
        )}
      />
    <Modal visible={modalOpen} animationType="slide"
        transparent={true} >
          
      
            <Section style={styles.centeredView}>
            
          <View style={styles.modalView}> 
    <View style={{width: "50%", alignItems:"center",}}>
   
    <FlatList
      data={modalCampoData}
      renderItem={({ item }) => <Text style={styles.modalText}
      >{item}:</Text>}
    />
      </View>
    <View style={{width: "50%", alignItems: "center",}}>
  
   
    <FlatList
      data={modalValorData}
      renderItem={({ item }) => <Text style={styles.modalText}
      >{item}</Text>}
    />
  </View>
  </View>
  <Button text="Fechar" color={"#0bbc9f"} onPress={() => setModalOpen(false)} />
 
  </Section>
  
</Modal>

      
   

      
       
      </Section>
      <Button
              text="Adicionar Registro"
              onPress={() => {
                navigation.navigate("AddForm");
                  }}
              color= {'#0bbc9f'}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc9f",
                marginBottom: 10,
                marginHorizontal: 20,
              }}
            />
            </ScrollView>
    </SafeAreaView>
    </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  modalText: {
    fontSize: 16,
    color:"",
    //backgroundColor: "grey",
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  centeredView: {
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
   
  },
  campo: {
    fontWeight: "bold",
    marginRight: 5,
  },
  modalView: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 15,
  },
  valor: {
    flex: 1,
  },
  itens:{
    fontSize: 25,
    marginTop: 5, padding:10, 
    textAlign: 'center',
    backgroundColor: "#9fffe0",
    width: "100%", height: 50, alignItems: "center" ,
    marginVertical: 5,
    borderRadius: 5,
    opacity: 0.7,
       
  },
});


  
