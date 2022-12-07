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
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Section>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              These UI components provided by Rapi UI
            </Text>
            <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
            <Button
              text="Criar Formulário"
              onPress={() => {
                navigation.navigate("CreateForm");
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />
              <Button
              text="Add Formulário"
              onPress={() => {
                navigation.navigate("AddForm");
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />
            <Button
              status="danger"
              text="Logout"
              onPress={() => {
                signOut(auth);
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#0bbc7d",
              }}
            />
            <Button
              text={isDarkmode ? "Light Mode" : "Dark Mode"}
              status={isDarkmode ? "success" : "warning"}
              onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  ); 
}
