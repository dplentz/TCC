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
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Layout,
  Text,
  TextInput,
  Button,
  TopNav,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import { auth, firestore } from "../navigation/firebase";
import { Ionicons } from "@expo/vector-icons";
import { Usuario } from "../../model/Usuario";
import { set } from "firebase/database";

export default function ({ navigation }) 
{ const [modalVisible, setModalVisible] = useState(false)
  const { isDarkmode, setTheme } = useTheme();

  const [genero, setGenero] = useState("");
 
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

    const reference = firestore.collection("Usuario").doc(auth.currentUser.uid);
      //reference.update({ urlfoto: fbResult.metadata.fullPath, });
      
      reference.update(
        {
          
          genero: genero,

        });
      navigation.goBack();      
  }

 
  
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <TopNav
        middleContent="Editar gênero"
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
              Editar Gênero
            </Text>
          
              <Text style={{ marginTop: 15 }}>Gênero: </Text>
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
            <Text style={styles.modalText}>Escolha uma opção: </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setGenero('Masculino'), setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Masculino</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setGenero('Feminino'), setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Feminino</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setGenero('Outro'), setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Outro</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Gênero: {genero}</Text>
      </Pressable>
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



