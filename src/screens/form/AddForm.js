import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
  MeuEstiloheet,
  Text,
  StatusBar,
  Image,
  Modal,
  StyleSheet,
  ScrollView
} from "react-native";
import  { Button, Layout, Section, SectionContent, TextInput} from "react-native-rapi-ui";
import {Modalize} from 'react-native-modalize';
//import DatePicker from 'react-native-datepicker';
import { auth, firestore } from "../../navigation/firebase";
//import MeuEstilo from "./meuestilo";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AddForm = (props) => 
{ const modalizeRef = useRef(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [forms, setForms] = useState([]); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  let lista=forms
  let listaCampos="";
  let valorDado= "";
  const listaDados= useState([]);
  const i = useState[1];
  //const [nomeCampo, setNomeCampo] = useState("");
  const [dados, setDados] = useState([]);
  const [bool, setBool] = useState("");
  let varauxiliar='';
  const [valor, setValor] = useState("");
  const [modalVisible2, setModalVisible2] = useState(false)
  const [nomeCampo, setNomeCampo] = useState("");
  const [valorcampo, setValorcampo] = useState('');
 // const [open, setOpen] = useState(false);
  
  const refCampo = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form")
    .doc(auth.currentUser.uid).collection("Campos").doc();

  const abrirModalize =() =>{
     modalizeRef.current?.open();
  }
   

  const enviarCampos = () => {
    refCampo
      .set({
        nomeCampo: nomeCampo,
        valor: valor,
        id: ref.id,
      })
      .then(() => {
        alert("Campo " + nomeCampo + " Adicionado com Sucesso");
        handleChange(nomeCampo);
      });
  };


    const ref = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form").doc(auth.currentUser.uid).collection("Dados")
    .doc();

    const handleChange = (e) =>{
        e.persist();
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
            //  listaCampos = forms.nomeCampo
              lista=forms
              setLoading(false);
            });
          // Unsubscribe from events when no longer in use
          return () => subscriber();
        }, []);
      
        if (loading) {
          return <ActivityIndicator />;
        }
      
    }
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
        //  listaCampos = forms.nomeCampo
          lista=forms
          setLoading(false);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);
  
    if (loading) {
      return <ActivityIndicator />;
    }
  
    
    const enviarDadosO = () => {
    ref.onSnapshot((querySnapshot) => {
      const dados = [];
      querySnapshot.forEach((documentSnapshot) => {
        dados.set({
       //  listaCampos[height]: listaDados[lista.height]  
        //listaDados[lista]: listaDados[lista], 
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



  return (
   
    <Layout>
            
          <View
            style={{
              flex: 0.5,
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
              source={require("../../../assets/login.png")}
            />
          </View>
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
      }}
    >
      <Section style={ {width: "90%", height:"100%"}}>
        <SectionContent>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Escolha uma Opção</Text>
            <Pressable
              style={[styles.buttonModal, styles.buttonModalOpen]}
              onPress={() => {setBool('Sim'), setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Sim</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonModal, styles.buttonModalOpen]}
              onPress={() => {setBool('Não'), setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Não</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView>
    <SafeAreaView //style={MeuEstilo.containerlistar}
    >
{listaCampos = lista.map(campoInfo => {
                     <Text>num {campoInfo.uid} </Text>
                                switch (campoInfo.valor) {
                    case "String":
                        listaDados[lista]=valorDado;
                      //  listaCampos[lista]= campoInfo.nomeCampo;
                        return ( 
                          
                        <TextInput style={{marginTop:20} }placeholder={campoInfo.nomeCampo} value={valorDado}></TextInput>
                          )
                    case "Boolean":
                      valorDado = bool;
                      listaDados[lista]=valorDado;
                      //listaCampos[lista]= campoInfo.nomeCampo;
                        return ( 
                        <Pressable
                         style={[styles.button, styles.buttonOpen]}
                         onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>{campoInfo.nomeCampo}: {bool}</Text>
                         </Pressable>   
                                                           
                              )
                    case "Date":
                      listaDados[lista]=valorDado;
                      //listaCampos[lista]= campoInfo.nomeCampo;
                        return(  <TextInput placeholder={campoInfo.nomeCampo} value={valorDado} keyboardType={'date'}></TextInput>
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
              text="Adicionar Campo"
              onPress={() => {
                abrirModalize();
              }}
              color= {'#0bbc9f'}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc9f",
              }}
            />
        
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
  </ScrollView>
  </SectionContent>
        </Section>
      </View>
      
      <Modalize ref={modalizeRef} snapPoint={500}>
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
        <Section  style={{ marginHorizontal: 20, width: '90%'}} ><SectionContent>
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
         <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible2);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Escolha uma Opção</Text>
            <Pressable
              style={[styles.buttonModal, styles.buttonModalOpen]}
              onPress={() => {setValorcampo('String'), setModalVisible2(!modalVisible2)}}>
              <Text style={styles.textStyle}>String</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonModal, styles.buttonModalOpen]}
              onPress={() => {setValorcampo('Date'), setModalVisible2(!modalVisible2)}}>
              <Text style={styles.textStyle}>Date</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonModal, styles.buttonModalOpen]}
              onPress={() => {setValorcampo('Boolean'), setModalVisible2(!modalVisible2)}}>
              <Text style={styles.textStyle}>Boolean</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible2(true)}>
        <Text style={styles.textStyle}>Tipo {valorcampo}</Text>
      </Pressable>
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
              text="Criar Formulário"
              onPress={() => {
                enviarCampos();
              }}
              color={"#0bbc9f"}
              style={{
                marginTop: 10,
                color: "#0bbc9f",
              }}
            />
        
      </View>
      </ScrollView>
</Modalize>
    </Layout>

    
  );
  //{listaCampos.value==="Hora" ?<Text>Aqui iria o TextInput {lista.length}</Text>:<Text>Este é o resultado {lista.length}</Text>}

}
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
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal:{
     color: "#0bbc9f",
     height:48,
     borderColor: 'black',
     borderRadius: 5,
     marginTop: 10,
     marginVertical: 10,
     padding: 10,
     elevation: 1,
  },
  buttonModalOpen:{
    backgroundColor: '#f8bbd0',
    borderColor: 'black',
  },
  button: {
    //color: "#0bbc9f",
    height:48,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 1,
  },
  buttonOpen: {
    //backgroundColor: '#f8bbd0',
    borderColor: 'black',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderColor: 'black',
  },
  textStyle: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default AddForm;
