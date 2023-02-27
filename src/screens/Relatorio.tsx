// The following need to be installed
// expo install expo-print
// expo install expo-sharing

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { printToFileAsync } from 'expo-print';
import { auth, firestore } from '../navigation/firebase';
import { shareAsync } from 'expo-sharing';

export default function App() {
  let [name, setName] = useState("");
  const [relatorio, setRelatorio] = useState([]);
  let html = ``;

  useEffect(()=>{
    const relat = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Relatorio")
    .onSnapshot((querySnapshot) => {
      const relatorio = [];
      querySnapshot.forEach((documentSnapshot) => {
        relatorio.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
   
      setRelatorio(relatorio);
      console.log(relatorio)
      //setObjetos()
      
    });
    return () => relat();
  }, [])
  
  let createHTML = async () => {
    let htmlRelat
    let string = ``
   htmlRelat = relatorio.map((relat)=>{
    string +=` <p> ${relat.data}</p>
    <p>${relat.campo}: ${relat.valor}</p>`
    
   })
   htmlRelatorio(string)
    ;}

   const htmlRelatorio = (string) =>{
    html = `
    <html>
      <body>
        ${string}
      </body>
    </html>
  `;
   }
 ////

  let generatePdf = async () => {
    createHTML();
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <TextInput value={name} placeholder="Name" style={styles.textInput} onChangeText={(value) => setName(value)} />
      <Button title="Generate PDF" onPress={generatePdf} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    alignSelf: "stretch",
    padding: 8,
    margin: 8
  }
});