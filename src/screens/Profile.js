import { Layout, Text } from 'react-native-rapi-ui';
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import { auth, firestore } from "../navigation/firebase";
 
  const Profile = () => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [usuarios, setUsuarios] = useState([]); // Initial empty array of users
  
    useEffect(() => {
      const subscriber = firestore
        .collection("Usuario")
        .doc(auth.currentUser.uid)
        .onSnapshot((querySnapshot) => {
          const usuarios = [];
          querySnapshot.forEach((documentSnapshot) => {
            usuarios.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.nome,
            });
          });
          setUsuarios(usuarios);
          setLoading(false);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);
  
    if (loading) {
      return <ActivityIndicator />;
    }
  
    const Item = ({ nome }) => (
      <View style={{
        flex: 3,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
      }}>
          <Text style={{ alignSelf: "center",
                padding: 30,}}>{nome}</Text>
      </View>
    );
  
    const renderItem = ({ item }) => <Item nome={item.nome} />;
    return (
	 <Layout>
    <SafeAreaView>
      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={(item) => item.nome}
        // refreshing={true}
        // onRefresh={() => {
        //   getCelulares();
        // }}
      />
    </SafeAreaView>
		</Layout>
	);
    }	
    export default Profile;

