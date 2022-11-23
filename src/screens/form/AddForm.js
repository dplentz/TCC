import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  FlatList,
  MeuEstiloheet,
  Text,
  StatusBar,
} from "react-native";
import { auth, firestore } from "../../navigation/firebase";
//import MeuEstilo from "./meuestilo";

const addForm = () => {
    const [nomeCampo, setNomeCampo] = useState("");
    const [value, setValue] = useState("");
    const ref = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form").doc(auth.currentUser.uid).collection("Dados")
    .doc();

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

};

const criarForm = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [forms, setForms] = useState([]); // Initial empty array of users

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
            key: documentSnapshot.nomeCampo,
          });
        });
        setForms(forms);
        setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Item = ({ nomeCampo }) => (
    <View //style={MeuEstilo.item}
    >
      <Text //style={MeuEstilo.title}
      >{nomeCampo}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item nomeCampo={item.nomeCampo} />;

  // const getCelulares= ()=>{
  //   setCasas([]);
  //   firestore
  //   .collection('Casa')
  //   .onSnapshot(querySnapshot=>{
  //     //querySnapshot.forEach(documentSnapshot=>{
  //     querySnapshot.docChanges().forEach(change=>{

  //       casas.push({...change.doc.data(),
  //         key: change.endereco,
  //       });
  //     });
  //     setCasas(casas);
  //     // setCarregando(false);
  //   });
  //   // return()=>subscriber();
  // };

  // // const observador = firestore.collection('Casa')
  // // .onSnapshot(querySnapshot => {
  // //   querySnapshot.docChanges().forEach(change => {
  // //     if (change.type === 'added') {
  // //       console.log('Novo Casa: ', change.doc.data());
  // //     }
  // //     if (change.type === 'modified') {
  // //       console.log('Casa modificado: ', change.doc.data());
  // //     }
  // //     if (change.type === 'removed') {
  // //       console.log('Casa removido: ', change.doc.data());
  // //     }
  // //   });
  // // });

  return (
    <SafeAreaView //style={MeuEstilo.containerlistar}
    >
    <FlatList
      data={usuarios}
      renderItem={renderItem}
      keyExtractor={(item) => item.nomeCampo}
      // refreshing={true}
      // onRefresh={() => {
      //   getCelulares();
      // }}
    />
  </SafeAreaView>
  );
};
export default addForm;
