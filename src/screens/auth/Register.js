import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../../navigation/AppNavigator";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
//import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import  RNDateTimePicker from '@react-native-community/datetimepicker';
//import RNPickerSelect from "react-native-picker-select";
//import DropDownPicker from 'react-native-dropdown-picker'
import { auth, firestore } from "../../navigation/firebase";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) 
{ const [modalVisible, setModalVisible] = useState(false)
  const { isDarkmode, setTheme } = useTheme();
 // const auth = getAuth();
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState(new Date());
  const [genero, setGenero] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dataString, setDataString]=useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  const handleSignUp = () => {
       setLoading(true);
       auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
       const reference = firestore.collection("Usuario").doc(auth.currentUser.uid);
        reference.set({
          id: reference.id,
          nome: nome,
          email: email,
          // password: password,
          genero: genero,
          dataNasc: dataNasc,
          dataString: dataString,
        });
        console.log("Registered with:", user.email);
      })
      .catch(function(error) {
        alert(error.message); 
        setLoading(false);
      } );
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
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
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/registro.png")}
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
              Registro
            </Text>
            <Text>Email: </Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Insira seu email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={{ marginTop: 15 }}>Nome: </Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Insira seu nome"
              value={nome}
              autoCapitalize="sentences"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={(text) => setNome(text)}
            />
            <Text style={{ marginTop: 15 }}>Senha: </Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Insira sua senha"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Text style={{ marginTop: 15 }}>Data de aniversário: </Text>
          
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
                     <Text> {dataString}</Text>

            
              <Text style={{ marginTop: 15 }}>Gênero: </Text>
              <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
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
              onPress={() => {setGenero('Feminino transgênero'), setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Feminino transgêreno</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setGenero('Masculino transgênero'), setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Masculino transgênero</Text>
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
              text={loading ? "Loading" : "Criar conta"}
              onPress={() => {
                handleSignUp();
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
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Já possui uma conta?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Faça seu login aqui
                </Text>
              </TouchableOpacity>
            </View>
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



