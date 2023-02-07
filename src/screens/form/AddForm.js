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
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import  { Button, Layout, Section, SectionContent, TextInput,useTheme, themeColor,TopNav,} from "react-native-rapi-ui";
import {Modalize} from 'react-native-modalize';
import { auth, firestore } from "../../navigation/firebase";
//import MeuEstilo from "./meuestilo";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function (navigation)  
{ const modalizeRef = useRef(null)
  const { isDarkmode, setTheme } = useTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [bool, setBool] = useState("");
  const [date, setDate] = useState(""); 
   

  const [forms, setForms] = useState([]); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  let lista=forms
 

   
  //const [nomeCampo, setNomeCampo] = useState("");
  const listaDados= useState([]);
  const i = useState[1];
  const [dados, setDados] = useState([]);
  const [valor, setValor] = useState("");
  const [nomeCampo, setNomeCampo] = useState("");
  const [valorcampo, setValorcampo] = useState('');
  let valorDado= "";
  let listaCampos="";
 // const [open, setOpen] = useState(false);







 const showDatePicker = () => {
  setDatePickerVisibility(true);
};

const handleConfirm = (date) => {
  console.warn("A data foi selecionada: "+ date);
  const formattedDate=date.getDate().toString().padStart(2, "0") + "/" + ((date.getMonth()+1).toString().padStart(2, "0"))  + "/" + date.getFullYear();
  console.log(formattedDate)
  setDate(formattedDate)
  //setDate(date)
  hideDatePicker();
};

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const abrirModalize =() =>{
  modalizeRef.current?.open();
}

const reload=()=>window.location.reload();



  




  const refCampo = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form")
    .doc(auth.currentUser.uid).collection("Campos").doc();

     

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







    const ref = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form").doc(auth.currentUser.uid).collection("Dados")
    .doc();
    
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
               <TopNav
        middleContent="Preencher diário"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      /> 
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
                height: 250,
                width: 250,
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
  <Text style={{ marginTop: 15 }}>Data do registro: </Text>
          
          <Button title="Calendário" 
          style={{width: 25, }}
          text="Calendário"
          color={"#f8bbd0"}
          leftContent={
            <Ionicons name="calendar" size={20} color={'white'}> </Ionicons>
          }
          onPress={showDatePicker} />
          <DateTimePickerModal
                        
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                             />  
                   <Text> {date}</Text>
        
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
      








      <Modalize ref={modalizeRef} onClosed={reload} >
        <KeyboardAvoidingView>
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
              <Text style={styles.textStyle}>Botão de texto</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonModal, styles.buttonModalOpen]}
              onPress={() => {setValorcampo('Date'), setModalVisible2(!modalVisible2)}}>
              <Text style={styles.textStyle}>Botão de hora</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonModal, styles.buttonModalOpen]}
              onPress={() => {setValorcampo('Boolean'), setModalVisible2(!modalVisible2)}}>
              <Text style={styles.textStyle}>Botão sim/não</Text>
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
      </KeyboardAvoidingView>
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
//export default AddForm;
