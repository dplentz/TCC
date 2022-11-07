import { Layout, Text } from 'react-native-rapi-ui';
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  MeuEstiloheet,
  StatusBar,
} from "react-native";
import user from "../navigation/AppNavigator";
import { render } from 'react-dom';
 
export default function ({ navigation }) {
    this.state = { 
      nome: user.nome,
	  email: user.email,
	  genero: user.genero,
      uid: user.uid,
	  dataNasc: user.dataNasc,
    }  
    return (
	 <Layout>
    <View>
        <Text>
          {this.state.nome} ,oi
		  {this.state.email},
		  {this.state.genero},
		  {this.state.dataNasc}
        </Text>
      </View>
		</Layout>
	);
	
};

