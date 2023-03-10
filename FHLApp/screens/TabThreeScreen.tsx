// Setting Tab

import { StyleSheet,ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import React from 'react';
import Slider from '@react-native-community/slider';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';


export default function TabThreeScreen() {
  const[sliderValue,setSliderValue]=React.useState(0);
  const[sliderValue1,setSliderValue1]=React.useState(0);
  const[sliderValue2,setSliderValue2]=React.useState(0);


  return (
    <View style={styles.container} >
      <ScrollView>
      <Text style={styles.redtext}>Red</Text>
      <Slider maximumValue={255} minimumValue={0}  style={styles.redslider} step={1} value={sliderValue} onValueChange={setSliderValue}/>
      <Text style={styles.redslidertitle}> {sliderValue && +sliderValue.toFixed(3)} </Text>
      <Text style={styles.greentext}>Green</Text>
      <Slider maximumValue={255} minimumValue={0} step={1}  style={styles.greenlider} value={sliderValue1} onValueChange={setSliderValue1}/>
      <Text style={styles.greenslidertitle}> {sliderValue1 && +sliderValue1.toFixed(3)} </Text> 
      <Text style={styles.bluetext}>Blue</Text>
      <Slider maximumValue={255} minimumValue={0} step={1}  style={styles.blueslider} value={sliderValue2} onValueChange={setSliderValue2}/>
      <Text style={styles.blueslidertitle}> {sliderValue2 && +sliderValue2.toFixed(3)} </Text>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems:"stretch",
    justifyContent:"space-evenly",
   
  },
  redslidertitle: {
    position:"absolute",
    fontSize: 12,
    fontWeight:'normal',
    top:340
    
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  redslider:{
    width:500,
    top:320

  },

  greenlider:{
    width:500,
    top:360,
  
  },

  blueslider:{
    width:500,
    justifyContent:'flex-start',
    top:400
  },

  redtext:{
    position:"absolute",
    top:300,
    fontSize:12,
    fontWeight:'500'

  },

  greentext:{
    position:"absolute",
    top:360,
    fontSize:12,
    fontWeight: '500'
  },

  bluetext:{
    position:"absolute",
    top:420,
    fontSize:12,
    fontWeight: '500'
  },

  greenslidertitle: {
    position:"absolute",
    fontSize: 12,
    fontWeight:'normal',
    top:400
  },

  blueslidertitle:{
    position:"absolute",
    fontSize: 12,
    fontWeight:'normal',
    top:460
  },

  textbox:{
    top:12
  }
  // text:{
  //   color:'#FFF',
  //   fontSize:50,
  // },
});


