import React,{useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { auth, firestore } from '../navigation/firebase';
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



export default function ({ navigation })  
{
  const [dados, setDados]=useState([]);
  let listarObj=[]
 let listaObj=[]
  let listarCampo=[]
  let listarValor=[]
  let i=0  
  const [modalInfo, setModalInfo] = React.useState(undefined);
  
const renderItem = ({ item, index }) => (<View key={item.id}>
   
    <TouchableOpacity onPress={() => setModalInfo(listarCampo)}><Text>{item.data}</Text></TouchableOpacity>
    </View>
  );


  const setObjetos=()=>{
    listarObj = dados.map(campoInfo => {
      for(let val=0;val<dados.length-1;val++){
         
    listarCampo[val] = campoInfo.obj[val].campo 
    listarValor[val] = [{
      valor: campoInfo.obj[val].valor,
    }]
   //console.log()
    i++
    //console.log(listarValor[val], val)
   // console.log(listarValor)
  
  }

    //console.log(listarValor)
   
    })
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
        setObjetos()
        console.log(dados)
      });
        
      //  listaCampos = forms.nomeCampo
      //  lista= dados
        //console.log(dados)
       // setLoading(false);
      //});
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  
  
  
  return (
    
    <SafeAreaView style={styles.container}>
      <View> 
      <Modal visible={modalInfo !== undefined}>
            <View style={[{borderWidth: 1},styles.centeredView]}>
              <Text>{modalInfo}</Text>
              <TouchableOpacity onPress={() => setModalInfo(undefined)}><Text>Close</Text></TouchableOpacity>
            </View>
          </Modal>
      </View>
      <Section style={{ width: "90%", height: "90%"}}> 

      
      <FlatList
        data={listarCampo}
        renderItem={renderItem}
        keyExtractor={(item, index) => {return item.id}}
      />
        <Button
              text="Adicionar Dados"
              onPress={() => {
                navigation.navigate("AddForm");
                  }}
              color= {'#0bbc9f'}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc9f",
                marginBottom: 10,
              }}
            />
      </Section>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});


  
