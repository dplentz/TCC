import React from 'react';
import { View, Linking, Image, Dimensions } from 'react-native';
import { Layout, Text, Button } from 'react-native-rapi-ui';
import Carousel from 'react-native-snap-carousel';

export default function ({ navigation }) {
	const carouselItens = 
	[
		{imgUrl: ""},
		{imgUrl: ""},
		{imgUrl: ""},
	]
	const slider_width = Dimensions.get('window').width
	const item_width = slider_width * 0.88; 

	/*type Props = {
		item: {
			imgUrl: string
		}
		index: number
	}

   function carouselCardItens({item, index}){
	return(
		<View key={index}> 
			<Image source={{uri: item.imgUrl}}/>
		</View>
	)
   }
   <Carousel
             // ref={(c) => { this._carousel = c; }}
              data={carouselItens}
              renderItem={//carouselCardItens
			}
              useScrollView={true}
              sliderWidth={slider_width}
              itemWidth={item_width}
            />
*/

	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				 <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
				<Text>This is the About tab</Text>
				
			</View>
		</Layout>
	);
}
