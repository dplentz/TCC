import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  FlatList,
  MeuEstiloheet,
  Text,
  StatusBar,
  TextInput,
} from "react-native";
import  { Button,} from "react-native-rapi-ui";
import { auth, firestore } from "../../navigation/firebase";
//import MeuEstilo from "./meuestilo";

const AddForm = (props) => {
  const [forms, setForms] = useState([]); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  let lista=forms
  let listaCampos='';
  //const [nomeCampo, setNomeCampo] = useState("");
  const [dados, setDados] = useState([]);
  let varauxiliar='';
  const [value, setValue] = useState("");
    const ref = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form").doc(auth.currentUser.uid).collection("Dados")
    .doc();

  
    useEffect(() => {
      const subscriber = firestore
        .collection("Usuario")
        .doc(auth.currentUser.uid)
        .collection("Form").doc(auth.currentUser.uid).collection("Campos")
        .onSnapshot((querySnapshot) => {
          const forms = [];
          querySnapshot.forEach((documentSnapshot) => {
            forms.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setForms(forms);
          lista=forms
          setLoading(false);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);
  
    if (loading) {
      return <ActivityIndicator />;
    }
  
 
  const enviarDados = () => {
    ref.onSnapshot((querySnapshot) => {
      const dados = [];
      querySnapshot.forEach((documentSnapshot) => {
        dados.set({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      })
    })
      .then(() => {
        alert("Dados adicionado com Sucesso");
      } );  setDados(dados);
            setLoading(false);
  };



//const criarForm = () => {
  const Item = ({ nomeCampo }) => (
    <View //style={MeuEstilo.item}
    >
      <Text //style={MeuEstilo.title}
      >{nomeCampo}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item nomeCampo={item.nomeCampo} />;

  /*const exemplo =()=>{
    listaCampos = lista.map(campoInfo => (
      <TextInput placeholder={campoInfo.nomeCampo} value={Text}></TextInput>
    ))
  }*/

  return (
    <SafeAreaView //style={MeuEstilo.containerlistar}
    >
{listaCampos = lista.map(campoInfo => {
                switch (campoInfo.value) {
                    case "texto":
                        return ( 
                        <TextInput placeholder={campoInfo.nomeCampo} value={""}></TextInput>
                          )
                    case "Hora":
                        return ( 
                        <Text>Tipo data {campoInfo.nomeCampo} </Text>
                              )
                        }
                      })
                    }
                    

   {/* 
      FUNCIONAVA A IMPRESSÃO NA VIEW    
   (      <TextInput placeholder={campoInfo.nomeCampo} value={nomeCampo}
      onChangeText={(text) => setNomeCampo(text)}></TextInput>
    ))}}





   {/* listaCampos = lista.map(campoInfo => (
         if(campoInfo.valueCampo == "text") {
          <TextInput placeholder={campoInfo.nomeCampo} value={Text} onChangeText={(text) => setDados(text)}></TextInput>    
         }
         else if(campoInfo.valueCampo == "date")
          {
           <DatePicker
           value={dataNasc}
           selected={dataNasc}
           onChange={(date) => setDataNasc(date)}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      alignItems: 'flex-start'
                    },
                    dateText: {
                      color: '#C0C0C0',
                    }
                  }}
                />  
         } else{
          <RNPickerSelect
                 value={dados}
                 onValueChange={(dados) => setDados(dados)}
                 items={[
                     { label: "Feminino", value: "Feminino" },
                     { label: "Masculino", value: "Masculino" },
                     { label: "Não binário", value: "N/B" },
                 ]}
                 style={{ inputAndroid: { color: "black" } }} useNativeAndroidPickerStyle={false}
             />
         }  
      )
     )
        */}
        
        <Button
              text="Enviar Formulário"
              onPress={() => {
                enviarDados();
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />

  </SafeAreaView>
  );
  //{listaCampos.value==="Hora" ?<Text>Aqui iria o TextInput {lista.length}</Text>:<Text>Este é o resultado {lista.length}</Text>}

}
export default AddForm;
