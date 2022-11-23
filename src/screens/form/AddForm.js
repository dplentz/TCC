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
import { auth, firestore } from "../../navigation/firebase";
//import MeuEstilo from "./meuestilo";

const AddForm = (props) => {
  const [forms, setForms] = useState([]); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  let lista=forms
  const [nomeCampo, setNomeCampo] = useState("");

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
    ref
      .set({
        nomeCampo: nomeCampo,
        value: value,
        id: ref.id,
      })
      .then(() => {
        alert("Dados adicionado com Sucesso");
      });
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

  const exemplo =()=>{
    listaCampos = lista.map(campoInfo => (
      <TextInput placeholder={campoInfo.nomeCampo} value={Text}></TextInput>
    ))
  }

  return (
    <SafeAreaView //style={MeuEstilo.containerlistar}
    >
    <FlatList
      data={forms}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
  />
    {exemplo()}
    {listaCampos = lista.map(campoInfo => (
      <TextInput placeholder={campoInfo.nomeCampo} value={Text}></TextInput>
    ))}
        {listaCampos==="Hora" ?<Text>Aqui iria o TextInput {lista.length}</Text>:<Text>Este é o resultado {lista.length}</Text>}

  </SafeAreaView>
  );
}
export default AddForm;
