import React, { useRef, useState } from "react";
import { View, Linking, Pressable } from "react-native";
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
import { AntDesign } from "@expo/vector-icons/build/Icons";
import { ScrollView } from "react-native";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
 /* const [textValue, setTextValue] = useState('');
  const [numInputs,setNumInputs] = useState(1);
  const refInputs = useRef<string[]>([textValue]);
  const { isDarkmode, setTheme } = useTheme();
  //const auth = getAuth();

  const setInputsValue=(index: number, value: string) =>{
      const inputs = refInputs.current;
      inputs[index] = value;
      setTextValue(value);
  }

  const addInputs = () =>
  {
    refInputs.current.push('');
    setNumInputs(value => value+1);
  }

  const removeInputs = (i: number)=>
  {
    refInputs.current.splice(i,1)[0];
    setNumInputs(value => value -1);
  }

  const inputs: JSX.Element[] = [];
  for(let i=0; i < numInputs;i++){
    inputs.push(
      <View key={i}>
        <Text>{i+1}.</Text>
        <TextInput 
          onChangeText={value=>setInputsValue(i,value)}
          value={refInputs.current[i]}
          placeholder="placeholder"
        > </TextInput>
        <Pressable onPress={()=> removeInputs(i)}>
          <AntDesign name="minuscircleo" size={20} color="red"></AntDesign>
        </Pressable>
      </View>
    )
  }
<ScrollView> 
  {inputs}
  <Pressable onPress={addInputs}/>
  <Text style={{color:'white',fontWeight:'bold'}}>Add a new input</Text>
  <View style={{marginTop:25}}>
     <Text>You have answered: </Text>
     {refInputs.current.map((value,i)=>{
       return<Text key={i}> {`${i+1}- ${value}`}</Text>
     })}
  </View>
</ScrollView>*/

  return (
    <Layout>
      <View
        style={{
          flex:1,
          padding:20,
          justifyContent: "center",
        }}
      >
        <Section>
          <SectionContent style={{width:"100%", height:"95%",}}>
            
              <Button
              text="Adicionar campos"
              color="#f8bbd0"
              onPress={() => {
                navigation.navigate("CreateForm");
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />
              <Button
              text="Adicionar dados"
              color="#f8bbd0"
              onPress={() => {
                navigation.navigate("AddForm");
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />
            <Button
              text="Gerar PDF do diario"
              color="#f8bbd0"
              onPress={() => {
                navigation.navigate("AddForm");
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />
            
          
          </SectionContent>
        </Section>
      </View>
    </Layout>
  ); 
}
