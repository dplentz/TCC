import React, { useState, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
  Text,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  ScrollView,
  
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import  { Button, Layout, Section, SectionContent, TextInput,useTheme, themeColor,TopNav,} from "react-native-rapi-ui";
import { auth, firestore } from "../../navigation/firebase";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function ({navigation})  
{ const { isDarkmode, setTheme } = useTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [date, setDate] = useState(""); 
   
  let nomeCampo = ""
  let tamanho = 0
  const [forms, setForms] = useState([]); // Initial empty array of users
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  let lista=forms
 
  let listaCampos = []
  let i = 0;
  let arrayValorDigitado=[]
  let arrayNomeCampo = [];
  //const i = useState[1];
  var obj = []
 


  const ref = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form").doc(auth.currentUser.uid).collection("Dados")
    .doc();
    
    const refRelatorio = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Relatorio");
 
const setValores=(valorDigitado: string, nomeCampo: any, posicao: number)=>
{ arrayNomeCampo[posicao]=nomeCampo;
  arrayValorDigitado[posicao]=valorDigitado;

  console.log(arrayNomeCampo[posicao], posicao);
  console.log(arrayValorDigitado[posicao], posicao);
}
  
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
          console.log("lista"+lista.length);
          setLoading(false);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);
  
    if (loading) {
      return <ActivityIndicator />;
    }

   const apagarCampo = (campo) => {
     const refApagar = firestore
     .collection("Usuario")
     .doc(auth.currentUser.uid)
     .collection("Form").doc(auth.currentUser.uid).collection("Campos")
     .doc(campo);

     refApagar.delete().then(() =>{
      console.log("Apagou o campo")}
     )
   }

   const apagarCampos = () => {
    for(let a=0;a<lista.length;a++){
    const refApagar = firestore
    .collection("Usuario")
    .doc(auth.currentUser.uid)
    .collection("Form").doc(auth.currentUser.uid).collection("Campos").doc(lista[a].id)

    refApagar.delete().then(() =>{
      console.log("Apagou o campo")}
     )
    }
  }


   
    

    const enviarDados = () => {

      
     
      
      const objRef = ref.collection("obj");
      
      for(let i=1;i<=lista.length;i++){
             
      objRef.doc().set({
        campo: arrayNomeCampo[i],
        valor: arrayValorDigitado[i]
      }) 
      console.log(obj);

     refRelatorio.doc().set({
      data: date,
      campo: arrayNomeCampo[i],
      valor: arrayValorDigitado[i],
      id: i,
     })
     }
     
    
     
     ref.set({
      id: ref.id,
      data: date,    
     }).then(() => {
      alert("Dados adicionados com sucesso");
      navigation.navigate("Home");
      
    } ).catch((error) => {
      console.log(`Erro ao adicionar dados: ${error}`);
    });
       setLoading(false);
     
      };





  return (
   
    <Layout>
               <TopNav
         middleContent={<Image
          resizeMode="contain"
          style={{
            height: 200,
            width: 200,
          }}
          source={require("../../../assets/migraTopNav.png")}
        />}    
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />
        <ScrollView>
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
              source={require("../../../assets/ler.png")}
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
        
     
    <SafeAreaView //style={MeuEstilo.containerlistar}
    >
  <Text style={{ marginTop: 15 }}>Data do registro: </Text>
          
          <Button 
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
  //i++
                
                        return ( 
                          <View style={{  flexDirection: "row", justifyContent: "space-between"}}>
                           
                        <TextInput containerStyle={{width: "80%", } }placeholder={campoInfo.nomeCampo} 
                        defaultValue="" 
                       onChangeText={valorDigitado => setValores(valorDigitado, campoInfo.nomeCampo, campoInfo.tam)}
                      ></TextInput>
                       
                       <Pressable style={{ borderRadius: 100, width: 40, height: 40, backgroundColor: "#0bbc9f", justifyContent: 'center', 
    alignItems: 'center',  }} onPress={() => apagarCampo(campoInfo.id) }>  
     <Text style={{color: 'write'  }}>X</Text>
    </Pressable> 
                       
                      
                        
                      </View> )
                                 
                        }  
                    )
                      
                    }
                    
          
        <Button
              text="Enviar dados"
              onPress={() => {
                    enviarDados();
                  }}
              color= {'#0bbc9f'}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc9f",
              }}
            />
         
           <Button
              text="Adicionar campos"
              onPress={() => {
                navigation.navigate("CreateForm");
                  }}
              color= {'#0bbc9f'}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc9f",
              }}
            />
            <Button
              text="Apagar campos"
              onPress={() => {
                apagarCampos();
                //navigation.navigate("CreateForm");
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
      </ScrollView>
    </Layout>

    
  );
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
