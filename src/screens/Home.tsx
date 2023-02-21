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
import { query } from 'firebase/database';
//import * as functions from 'firebase-functions';





export default function ({ navigation })  {

  const [dados, setDados]=useState([]);
  const [objNovo, setObjNovo]=useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [modalData, setModalData] = useState({});
  const [modalCampoData, setModalCampoData] = useState([]);
const [modalValorData, setModalValorData] = useState([]);




  

 









  /*const setObjetos=()=>{
    listarObj = dados.map(campoInfo => {
      
      for(let y=0;y<dados.length;y++){
       // console.log(dados.length)
    listarCampo[y] = campoInfo.obj[y].campo
    //console.log(campoInfo.obj[y].campo, campoInfo.obj[y].valor)
    listarValor[y] = campoInfo.obj[y].valor
   
    objMostrar.push(
      {
        campo: campoInfo.obj[y].campo,
        valor: campoInfo.obj[y].valor
      }
    ) 
   
 
    //console.log(listarCampo[y], listarValor[y], x)
   // console.log(listarCampo[i])
  
  }
  //console.log(objMostrar)
    //console.log(listarCampo)
   
    })
  }*/
 
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
  
  /*db.collection("obj").get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const campo = doc.data().campo;
          const valor = doc.data().valor;  
          console.log(campo);
          console.log(valor); 
          setModalData({ campo, valor });
          setModalOpen(true);      
        });
      } else {
        console.log("A subcoleção 'obj' está vazia.");
      }
    }).catch((error) => {
      console.log(`Erro ao recuperar dados: ${error}`);
    }); */ 
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
        console.log(dados)
        //setObjetos()
        
      });
      return () => subscriber();
    }, [])
     /* const objNovo = [] 
      for(let tam=0;tam<dados.length;tam++){
        let keys = dados[tam].key

      const dadosObj = firestore.collection("Usuario")
      .doc(auth.currentUser.uid)
      .collection("Form").doc(auth.currentUser.uid).collection("Dados").doc(keys)

     
    
    dadosObj.collection("obj").get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const campo = doc.data().campo;
          const valor = doc.data().valor;
          objNovo.push({ "Campo": campo, "Valor": valor, "Registro": tam+1 }); 
          console.log(objNovo);
         
        });
      } else {
        console.log("A subcoleção 'obj' está vazia.");
      }
    }).catch((error) => {
      console.log(`Erro ao recuperar dados: ${error}`);
    });
    
  }
   setObjNovo(objNovo);
     
      //  listaCampos = forms.nomeCampo
      //  lista= dados
        //console.log(dados)
       // setLoading(false);
      //});
    // Unsubscribe from events when no longer in use
    return () => {subscriber()};
  }, []);
*/
  return (
    
    <SafeAreaView style={styles.container}>
      
      <Section style={{ width: "90%", height: "90%"}}> 

      
      <FlatList
        data={dados}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => CamposEDados(item.id)}>
            <Text style={{fontSize: 30,}}>{item.data}</Text>
          </TouchableOpacity>
        )}
      />
           <Modal visible={modalOpen} animationType="slide">
            <Section style={{justifyContent:"space-between",}}>
  <View style={{width: '40%',}}
  >
    
    <Text //style={styles.modalSubtitle}
    >Campos:</Text>
    <FlatList
      data={modalCampoData}
      renderItem={({ item }) => <Text //style={styles.modalText}
      >{item}</Text>}
    />
      </View>
    <View style={{width:'50%'}}>
  
    <Text // style={styles.modalSubtitle}
    >Valores:</Text>
    <FlatList
      data={modalValorData}
      renderItem={({ item }) => <Text //style={styles.modalText}
      >{item}</Text>}
    />
    <Button text="Fechar" onPress={() => setModalOpen(false)} />
  </View>
  </Section>
</Modal>

      
   

      
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
  campo: {
    fontWeight: "bold",
    marginRight: 5,
  },
  valor: {
    flex: 1,
  },
});


  
