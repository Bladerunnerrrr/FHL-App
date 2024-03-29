import {StyleSheet,ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
import React, { useState } from 'react';
import {Button,TextInput} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import * as Paho from 'paho-mqtt'; 




export default function TabTwoScreen(this: any) {

  const[text,setText]=React.useState(""); //comment
  const [color,setColorValue]=React.useState(0)
  const[sliderValue,setSliderValue]=React.useState(0);
  const[sliderValue1,setSliderValue1]=React.useState(0);

  const client= new Paho.Client('broker.hivemq.com',8000,'clientcreate_'+Math.random());

  client.connect({onSuccess:onConnect});


  function onConnect(){
    console.log("The broker is connected");
  }
  const click=()=>  //this function is to send the data entered by the user and the color chosen by the user. this function will also publish the data to the esp.
  {
    const topic="festive-holiday-lights"
    const userinput=text;
    const colorchose=color;
    let brightnessvalue: string;

    if ( sliderValue1 < 100 ){

      brightnessvalue=String(0)+String(sliderValue1);

    }
    else{
      brightnessvalue=String(sliderValue1);

    }
    const payload="1"+brightnessvalue+colorchose+userinput;
    const messageObj=new Paho.Message(payload);
    messageObj.destinationName=topic;
    client.send(messageObj);
    
    console.log("message sent: ", messageObj);

    alert("1"+" "+brightnessvalue+" "+colorchose+" "+userinput);

  }
  const colorchangered=()=>
  {
    setColorValue(color=>1)

  }
  const colorchangeblue=()=>
  {
    setColorValue(color=>3)
  }
  const colorchangegreen=()=>
  {
    setColorValue(color=>2)
  }
  return (
    <ScrollView>
    <View style={styles.container} >
      <TextInput label="Enter a Display Message ..." value={text} style={styles.textbox} onChangeText={(text) => setText(text.slice(0, 15))}
      maxLength={15} />
      <Button mode='contained' onPress={colorchangered} style={styles.button}>
        Red
      </Button>
      <Button mode='contained' onPress={colorchangegreen} style={styles.button3} >
        Green
      </Button>
      <Button mode='contained' onPress={colorchangeblue} style={styles.button2}>
        Blue
      </Button>
      {/* <Text style={styles.cyclespeedtext}>Cycle Speed</Text> */}
      {/* <Slider maximumValue={100} minimumValue={0}  style={styles.cyclespeedslider} step={1} value={sliderValue} onValueChange={setSliderValue}/>
      <Text style={styles.cyclespeedtitle}> {sliderValue && +sliderValue.toFixed(3)} </Text> */}
      <Text style={styles.brightnesstext}>Brightness</Text>
      <Slider maximumValue={255} minimumValue={0} step={1}  style={styles.brightnessslider} value={sliderValue1} onValueChange={setSliderValue1}/>
      <Text style={styles.brighterslidertitle}> {sliderValue1 && +sliderValue1.toFixed(3)} </Text>
      <Button mode="text" onPress={click} style={styles.sendbutton}>Send</Button>
      <Button mode='text' onPress={()=> console.log("pressed Settings")} style={styles.community} >
      {/* <Button mode='text' onPress={()=> console.log("pressed Settings")} style={styles.community} >
        Community
      </Button> */}
      </Button>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"stretch",
    justifyContent:"space-evenly",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  button:{
    justifyContent:'space-between',
    top:40,
    down:100,
    left:10,
    width:110,
    height:50,
    backgroundColor:'red'
   },
  button2:{
    justifyContent:'space-between',
    down:300,
    top:-60,
    left:270,
    width:110,
    height:50,
    backgroundColor:'blue'
  },
  button3:{
    justifyContent:'space-between',
    down:200,
    top:-10,
    left:140,
    width:110,
    height:50,
    backgroundColor:'green'
  },

  sendbutton:{
    justifyContent:'space-between',
    top:89,
    backgroundColor:"black"
    
  },

  brightnessslider:{
    justifyContent:'space-between',
    top:20,
    width:360,
    left:10
  },

  brightnesstext:{
    position:"absolute",
    justifyContent:'space-between',
    top:200,
    fontSize: 20,
    fontWeight: 'bold'

  },

  brighterslidertitle: {
    position:"absolute",
    fontSize: 12,
    fontWeight:'normal',
    top:260
  },

  textbox:{
    top:12
  }
});