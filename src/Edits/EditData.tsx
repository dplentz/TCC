import React, { useState, useEffect, } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import {
  Layout,
  Text,
  TextInput,
  Button,
  TopNav,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { auth, firestore } from "../navigation/firebase";
import { Ionicons } from "@expo/vector-icons";
import { Usuario } from "../../model/Usuario";

export default function ({ navigation }) 
{ const [modalVisible, setModalVisible] = useState(false)
  const { isDarkmode, setTheme } = useTheme();
 // const auth = getAuth();
  
  const [dataNasc, setDataNasc] = useState(new Date());
 
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dataString, setDataString]=useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState<Partial<Usuario>>({});
 

  useEffect(() => {
    const subscriber = firestore
      .collection('Usuario')
      .doc(auth.currentUser.uid)
      .onSnapshot(documentSnapshot => {
        setUsuario(documentSnapshot.data());
        setLoading(false)
      });

    return () => subscriber();
  }, [usuario]);

  const handleUpdate = () => {
    console.log(usuario.email)

    const reference = firestore.collection("Usuario").doc(auth.currentUser.uid);
      //reference.update({ urlfoto: fbResult.metadata.fullPath, });
      
      reference.update(
        {
          dataNasc: dataNasc,
          dataString: dataString,
        });
      navigation.goBack();      
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

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

  
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <TopNav
        middleContent="Editar data de aniversário"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.navigate("Profile")}
      />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../assets/register.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              size="h3"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Editar data de aniversário
            </Text>
          
            <Text style={{ marginTop: 15 }}>Data de aniversário:  </Text>
          
            <Button
             //title="Calendário" 
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
                     <Text>{dataString}</Text>

            
              
              <Button
              text={loading ? "Loading" : "Continuar"}
              onPress={() => {
                handleUpdate();
              }}
              color={"#0bbc9f"}
              style={{
                marginTop: 20,
              }}
              disabled={loading}
            />

            
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ Tema claro" : "🌑 Tema escuro"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );};
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
    button: {
      borderRadius: 10,
      marginTop: 10,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#f8bbd0',
    },
    buttonClose: {
      backgroundColor: '#f8bbd0',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      color:"black",
      textAlign: 'center',
    },
  });



