import React, { useState, useEffect, useRef } from "react";
import {useNavigation} from "@react-navigation/core";
import { ActivityIndicator,View,  StyleSheet, Image, Pressable, AlertButton, Alert, KeyboardAvoidingView} from "react-native";
import { storage, auth, firestore } from "../navigation/firebase";
import { getStorage, uploadBytes } from "firebase/storage"; //access the storage databaSse
import * as ImagePicker from "expo-image-picker";
import { Modalize } from "react-native-modalize";
import { Usuario } from "../../model/Usuario";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  TextInput,
} from "react-native-rapi-ui";

export default function ({ navigation}) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [pickedImagePath, setPickedImagePath] = useState("");
  const modalizeRef = useRef(null)
  const [usuario, setUsuario] = useState<Partial<Usuario>>({})
   const [loading, setLoading] = useState(true);

    
    useEffect(() => {
      const subscriber = firestore
        .collection('Usuario')
        .doc(auth.currentUser.uid)
        .onSnapshot(documentSnapshot => {
          setUsuario(documentSnapshot.data());
          if (usuario.urlfoto==null){
            setPickedImagePath("")
          }else {
            setPickedImagePath(usuario.urlfoto)
          }
          setLoading(false)
        });
      return () => subscriber();
    }, [usuario]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const deletarUsuario = () =>{
    var user = auth.currentUser;
    var userDel = firestore
    .collection('Usuario')
    .doc(auth.currentUser.uid);
    user.delete().then(function() {
      navigation.navigate("Login"); 
  // User deleted.
})
   // user?.delete
    userDel.delete().then(function() {
      navigation.navigate("Login"); 
  // User deleted.
}).catch(function(error) {
  // An error happened.
});
   
  }


//Outra forma de opções de botão
  const escolhefoto2 = ()=>{
      const galeria: AlertButton ={text:"Abrir a galeria", onPress:()=> showImagePicker()}
      const camera: AlertButton ={text:"Abrir a câmera", onPress:()=> openCamera()}
      Alert.alert ('Local da foto','escolha', [galeria, camera])
  }
 

  const escolhefoto = ()=>{
  Alert.alert(
    "Alert Title",
    "My Alert Msg",
    [
      {
        text: "Camera",
        onPress: () => openCamera(),
        style: "default",
      },
    
      {
        text: "Abrir galeria",
        onPress: () => showImagePicker(),
        style: "cancel",
      },

    ],
    {
      cancelable: true,
      onDismiss: () => {}
    }
  );
  }
  
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      const uploadUri = result.assets[0].uri;
      
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      const extension = filename.split('.').pop(); 
      const name = filename.split('.').slice(0, -1).join('.');
      const ref = storage.ref(`imagens/profile/${auth.currentUser.uid}/${name}.${extension}`);
      
      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();
      const fbResult = await uploadBytes(ref, bytes);
      
      const paraDonwload= await storage.ref(fbResult.metadata.fullPath).getDownloadURL()
      
      const reference = firestore.collection("Usuario").doc(auth.currentUser.uid);
      //reference.update({ urlfoto: fbResult.metadata.fullPath, });
      reference.update({ urlfoto: paraDonwload, nomeFoto:name+'.'+extension});
     
    }
  };


  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      const ref = storage.ref(`imagens/profile/${auth.currentUser.uid}/${auth.currentUser.uid}.jpg`);
      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();
      const fbResult = await uploadBytes(ref, bytes);
      console.log(result.assets[0].uri);
      console.log("firebase url :", fbResult.metadata.fullPath);
      const reference = firestore.collection("Usuario").doc(auth.currentUser.uid);
      const paraDonwload= await storage.ref(fbResult.metadata.fullPath).getDownloadURL()
      //reference.update({ urlfoto: fbResult.metadata.fullPath, });
      reference.update({ urlfoto: paraDonwload });
    }
  };

  const abrirModalize =() =>{
    modalizeRef.current?.open();
 }


  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
      <TopNav
        middleContent={<Image
          resizeMode="contain"
          style={{
            height: 200,
            width: 200,
          }}
          source={require("../../assets/migraTopNav.png")}
        />}        
      />
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
      </View>
      <Pressable onPress={()=> escolhefoto()}>
      <View style={styles.imageContainer}>
          {pickedImagePath !== "" && (
              <Image source={{ uri: pickedImagePath }} style={styles.image} />
           )}
          {pickedImagePath === "" && (          
              <Image source={require("../../assets/camera.png")}
              style={styles.image} />
            )}
      </View>
      </Pressable>
     
     

<Section style={{width: '90%', height:'65%', }}><SectionContent> 
       <Text style={styles.itens}>Nome: {usuario.nome}</Text>
       <Text style={styles.itens}>E-mail: {usuario.email}</Text>
       <Text style={styles.itens}>Gênero: {usuario.genero}</Text>
       <Text style={styles.itens}>Data de nascimento: {usuario.dataString}</Text>
       
       <Button text="Escolher a foto" onPress={escolhefoto}  
      color={"#0bbc9f"}
       style={{ marginTop: 10, height: 45}}
      />
    
       <Button text="Configurações" onPress={() => {
       abrirModalize();
     }}  
      color={"#0bbc9f"}
      style={{ marginTop: 5, marginVertical: 5, height: 45}}
      />
      </SectionContent>
      </Section>
    
      <Modalize ref={modalizeRef} snapPoint={300}>
       
          <Section>
            <SectionContent>
                        
         <Button
              text={isDarkmode ? "Modo Claro" : "Modo Escuro"}
              status={isDarkmode ? "success" : "warning"}
              onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              color={"#f8bbd0"}
              style={{
                marginTop: 10,
              }}
            />
             <Button text="Alterar dados do perfil" onPress={() => {
              navigation.navigate("EditProfile");
              }}  
              color={"#f8bbd0"}
              style={{ marginTop: 10, marginVertical: 5, height: 45}}
                />
            <Button
              text="Sair"
              onPress={() => {
                signOut(auth);
              }}
              color={"#f8bbd0"}
              style={{
                marginTop: 10,
                
                backgroundColor: "#f8bbd0",
              }}
            />
              <Button
              status="danger"
              text="Excluir conta"
              onPress={() => {
                deletarUsuario();
              }}
              color={"#c48b9f"}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />
            </SectionContent></Section>
       
        
        </Modalize>   
    </View>
    </Layout>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    padding: 30,
  },
  itens:{
    marginTop: 8, padding:15, 
    textAlign: 'center',
    backgroundColor: "#9fffe0",
    width: "100%", height: 50, alignItems: "center" ,
    marginVertical: 10,
    borderRadius: 5,
    opacity: 0.7,
       
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 220 / 2,
    resizeMode: "cover",
  },
  buttonContainer: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  
});

//export default Profile;