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
import  { Button, Layout, Section, SectionContent} from "react-native-rapi-ui";
//import DatePicker from 'react-native-datepicker';
import { auth, firestore } from "../../navigation/firebase";
//import MeuEstilo from "./meuestilo";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddForm = (props) => 
{
  const [forms, setForms] = useState([]); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  let lista=forms
  let listaCampos='';
  const listaDados= useState([]);
  const i = useState[1];
  //const [nomeCampo, setNomeCampo] = useState("");
  const [dados, setDados] = useState([]);
  let varauxiliar='';
  const [valor, setValor] = useState("");
    const ref = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form").doc(auth.currentUser.uid).collection("Dados")
    .doc();

    const handleConfirm = (date) => {
      console.warn("A data foi selecionada: "+ date);
      const formattedDate=date.getDate().toString().padStart(2, "0") + "/" + ((date.getMonth()+1).toString().padStart(2, "0"))  + "/" + date.getFullYear();
      console.log(formattedDate)
      setDataString(formattedDate)
      setDataNasc(date)
      hideDatePicker();
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
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
          valor: valor,
          id: ref.id,
        })
        .then(() => {
          alert("Campo " + nomeCampo + " Adicionado com Sucesso");
          navigation.navigate("AddForm");
        });
    };
  const enviarDadosO = () => {
    ref.onSnapshot((querySnapshot) => {
      const dados = [];
      querySnapshot.forEach((documentSnapshot) => {
        dados.set({  
          //listaDados[i]: listaDados[], 
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
    <Layout>
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
      }}
    >
      <Section>
        <SectionContent>
    <SafeAreaView //style={MeuEstilo.containerlistar}
    >
{listaCampos = lista.map(campoInfo => {
                     <Text>num {campoInfo.uid} </Text>
                                switch (campoInfo.valor) {
                    case "String":
                      listaDados[lista]=listaDados[campoInfo.nomeCampo];
                        return ( 
                          
                        <TextInput placeholder={campoInfo.nomeCampo} value={''}></TextInput>
                          )
                    case "Boolean":
                      listaDados[lista]=listaDados[campoInfo.nomeCampo];
                        return ( 
                        <Text>Tipo Bool {campoInfo.nomeCampo} </Text>
                              )
                    case "Date":
                      listaDados[lista]=listaDados[campoInfo.nomeCampo];
                        return( <Text>Tipo Data {campoInfo.nomeCampo} </Text>
                          //<View></View>
                        
                          /*<Text>{campoInfo.nomeCampo}
                          <DatePicker
                          value={date}
                          selected={dados[i]}
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
                               /> </Text>*/
                              )
                    case "Select":
                      listaDados[lista]=listaDados[campoInfo.nomeCampo];
                        return( 
                          <Text>{campoInfo.nomeCampo}</Text>                 
                      
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
              color= {'#0bbc9f'}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc9f",
              }}
            />

  </SafeAreaView>
  </SectionContent>
        </Section>
      </View>
    </Layout>
  );
  //{listaCampos.value==="Hora" ?<Text>Aqui iria o TextInput {lista.length}</Text>:<Text>Este é o resultado {lista.length}</Text>}

}
export default AddForm;
