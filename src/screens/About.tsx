import React, {useRef} from 'react';
import { View, Linking, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import { Layout, Text, Button, TopNav, Section } from 'react-native-rapi-ui';
import { Modalize } from "react-native-modalize";

export default function ({ navigation }) {
	

	const modalizeRef = useRef(null)
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
        />}     />
		<ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
			<Section style={{ flex: 1,width: "90%", alignSelf: "center",}}>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				   
      
				 <Image source={require("../../assets/automed.png")}
              style={styles.image} />
			   <Text style={styles.textFont}>
			  Sobre a automedicação: </Text>
				<Text style={styles.text}>
				A automedicação pode causar inúmeros problemas 
				de saúde, mas quando se trata das cefaléias, 
				a ingestão contínua de analgésicos,
				 antiinflamatórios e triptanos pode causar a 
				 dependência química dos mesmos, resultando no 
				 aumento progressivo das crises. Dessa forma, 
				 torna-se essencial a consulta com médicos 
				 especializados para avaliação dos melhores
				  métodos de redução de crises e de dores.
				</Text>
				<Image source={require("../../assets/ideia.png")}
              style={styles.image} />
			  <Text style={styles.textFont}>
			  Dicas para evitar crises de cefaleia: </Text>

<Text style={styles.textList}>- Evite o jejum;</Text> 
<Text style={styles.textList}>- Crie o hábito de dormir e acordar no mesmo horário, 
tanto o excesso como a escassez do sono podem iniciar sua crise;</Text>
<Text style={styles.textList}>- Analise seus potenciais gatilhos da sua crise.
Por meio deste diário, conseguirá entender os padrões de
comportamentos que provocam a sua crise, dessa forma, poderá evitá-los 
quando puder.</Text>

				<Pressable onLongPress={() => Linking.openURL("https://sbcefaleia.com.br/")}>
				<Image source={require("../../assets/tipos_cefaleia.png")}
              style={styles.image} />
			   
			  	</Pressable>
						

	
			</View>
			</Section>
			</ScrollView>
		</Layout>
		</KeyboardAvoidingView>
 
	);
}
const styles = StyleSheet.create({
image: {
    width: 220,
    height: 220,
    
    resizeMode: "cover",
  },
textFont:{
	fontSize: 20,
	textAlign: "center",
	paddingHorizontal: 15,

},
text:{
	fontSize: 18,
	textAlign: "justify",
	paddingHorizontal: 15,

},
textList:{
	fontSize: 18,
	textAlign: "justify",

	padding: 12,
}
});
