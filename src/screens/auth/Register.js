import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from "react-native-picker-select";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState(Date);
  const [genero, setGenero] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
       createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const reference = firestore
          .collection("Usuario")
          .doc(auth.currentUser.uid);
        reference.set({
          nome: nome,
          email: email,
          // password: password,
          genero: genero,
          dataNasc: dataNasc,
        });
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
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
              source={require("../../../assets/register.png")}
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
              Register
            </Text>
            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={{ marginTop: 15 }}>Nome</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your name"
              value={nome}
              autoCapitalize="sentences"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="text"
              onChangeText={(text) => setNome(text)}
            />
            <Text style={{ marginTop: 15 }}>Data de aniversário</Text>
            <DatePicker
               date={dataNasc}
               mode="date"
               placeholder="select date"
               format="MM/DD/YYYY"
               confirmBtnText="Confirm"
               cancelBtnText="Cancel"
               onDateChange={(text) => setDataNasc(dataNasc)}
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

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
              <Text style={{ marginTop: 15 }}>Gênero</Text> 
              
            <RNPickerSelect
                 onValueChange={(genero) => setGenero(genero)}
                 items={[
                     { label: "Feminino", value: "Feminino" },
                     { label: "Masculino", value: "Masculino" },
                     { label: "Não binário", value: "N/B" },
                 ]}
                 style={{ inputAndroid: { color: "black" } }} useNativeAndroidPickerStyle={false}
             />
            <Button
              text={loading ? "Loading" : "Create an account"}
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
              <Text size="md">Already have an account?</Text>
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
                  Login here
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
                  {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
