import React, { useState, useEffect } from "react";
import {useNavigation} from "@react-navigation/core";
import { ActivityIndicator,View, Text, StyleSheet, Image, Button, Pressable, AlertButton, Alert} from "react-native";
import { storage, auth, firestore } from "../navigation/firebase";
import { getStorage, uploadBytes } from "firebase/storage"; //access the storage databaSse
import * as ImagePicker from "expo-image-picker";
import { Usuario } from "../../model/Usuario";

const Profile=() =>{
  //const navigation =useNavigation();
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [usuario, setUsuario] = useState<Partial<Usuario>>({})
  // const [usuarios, setUsuarios] = useState<Partial<Usuario>[]>([{}])
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
      reference.update({ urlfoto: paraDonwload, });
    }
  };

  return (
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
      <Text style={{ marginTop: 10, }}>Nome:{usuario.nome}</Text>
      <Text style={{ marginTop: 10, }}>E-mail:{usuario.email}</Text>
      <Text style={{ marginTop: 10, }}>Genero:{usuario.genero}</Text>
      <Text style={{ marginTop: 10, }}>Data de nascimento:{usuario.dataString}</Text>
      <Button title= "Escolher a Foto" onPress={escolhefoto}
      color={"#0bbc9f"}
      style={{ marginTop: 10, }}
      />
    </View>
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    resizeMode: "cover",
  },
  buttonContainer: {
    width: 300,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  
});

export default Profile;