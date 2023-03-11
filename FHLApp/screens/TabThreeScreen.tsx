import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import React from 'react';
import Slider from '@react-native-community/slider';
import * as Paho from 'paho-mqtt';

export default function TabThreeScreen() {
  // MQTT Broker
  const client = new Paho.Client('broker.hivemq.com', 8000, 'client_' + Math.random());

  const [sliderValue, setSliderValue] = React.useState(0);
  const [sliderValue1, setSliderValue1] = React.useState(0);
  const [sliderValue2, setSliderValue2] = React.useState(0);
  const [gridColors, setGridColors] = React.useState(Array(77).fill("gray"));

  client.connect({ onSuccess: onConnect });

  function onConnect() {
    console.log('Connected to MQTT broker');
  }

  function publishMessage(message: string) {
    const topic = 'festive-holiday-lights';
    const payload = message;
    const messageObj = new Paho.Message(payload);
    messageObj.destinationName = topic;
    client.send(messageObj);
    console.log('Message sent: ', messageObj);
  }

  function generateMessage() {
    let message = '';
    gridColors.forEach(color => {
      const [r, g, b] = color.slice(5, -1).split(',').map(Number); // extract RGB values from color string
      console.log('color:', color);
      console.log('r:', r, 'g:', g, 'b:', b);
      if (color == "gray")
      {
        message += "000000000"
      }
      else
      {
        message += `${r.toString().padStart(3, '0')}${g.toString().padStart(3, '0')}${b.toString().padStart(3, '0')}`;
      }
    });
    return message;
  }

  const backgroundColor1 = `rgba(${sliderValue}, ${sliderValue1}, ${sliderValue2}, 1)`;
  const renderGridItem = ({ index }) => {
    const onGridItemPress = () => {
      const newGridColors = [...gridColors];
      newGridColors[index] = `rgba(${sliderValue}, ${sliderValue1}, ${sliderValue2}, 1)`;
      setGridColors(newGridColors);
      console.log(index, `red: ${sliderValue},green: ${sliderValue1},blue: ${sliderValue2}`);
    };

    return (
      <TouchableOpacity  style={[styles.gridItem, { backgroundColor: gridColors[index] }]}
      onPress={onGridItemPress}>
        <View style={[styles.square,{ backgroundColor: gridColors[index] }]}></View>
      </TouchableOpacity>
    );
  };
 
  return (
    <View style={styles.container}>
     
      <View style = {styles.gridContainer}>
        <FlatList
          style = {styles.gridContainer}
          data={Array(77).fill("")}
          numColumns={11}
          renderItem={renderGridItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style = {styles.sampleContainer} >
        <Text style = {styles.sampleText}>Sample Color:</Text>
        <View style={[styles.circle, {backgroundColor: backgroundColor1}]}></View>
        <TouchableOpacity style ={styles.resetButton}
        onPress={() => {
          setGridColors(Array(77).fill('gray'))}}>
          
          <Text style={styles.resetButtonText}>RESET COLOR</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.sliderContainer}>
        <Text style={styles.redtext}>Red</Text>
        <Slider maximumValue={255} minimumValue={0}  style={styles.redslider} step={10} value={sliderValue} onValueChange={setSliderValue}/>
        <Text style={styles.redslidertitle}> {sliderValue && +sliderValue.toFixed(3)} </Text>
        <Text style={styles.greentext}>Green</Text>
        <Slider maximumValue={255} minimumValue={0} step={10}  style={styles.greenslider} value={sliderValue1} onValueChange={setSliderValue1}/>
        <Text style={styles.greenslidertitle}> {sliderValue1 && +sliderValue1.toFixed(3)} </Text> 
        <Text style={styles.bluetext}>Blue</Text>
        <Slider maximumValue={255} minimumValue={0} step={10}  style={styles.blueslider} value={sliderValue2} onValueChange={setSliderValue2}/>
        <Text style={styles.blueslidertitle}> {sliderValue2 && +sliderValue2.toFixed(3)} </Text>
      </View>

      <TouchableOpacity
        style={styles.runButton}
        onPress={() => {
          const message = generateMessage();
          publishMessage(message);
        }}
      >
        <Text style={styles.runButtonText}>Run</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.runButton}
      >
        <Text style={styles.runButtonText}>Save</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create(
{
  container: {
    flex: 1,
  },
  gridContainer:{
    height: 300,
  },
  sliderContainer:{
    height: 220,
  },

  // Red
  redtext:{
    top: 10,
    position:"absolute",
    color: 'red',
    fontSize:12,
    fontWeight:'500'
  },
  redslider:{
    top: 20,
    position:"absolute",
    width:350,
    left: 20

  },
  redslidertitle: {
    top: 50,
    position:"absolute",
    fontSize: 12,
    fontWeight:'normal',
    left: 10,
    
  },

  // Green
  greentext:{
    top: 80,
    position:"absolute",
    color: "green",
    fontSize:12,
    fontWeight: '500'
  },
  greenslider:{
    top: 90,
    position:"absolute",
    width:350,
    left: 20
  },
  greenslidertitle: {
    top: 120,
    position:"absolute",
    fontSize: 12,
    fontWeight:'normal',
    left: 20,
 
  },

  //Blue
  bluetext:{
    top: 150,
    position:"absolute",
    color: "blue",
    fontSize:12,
    fontWeight: '500'
  },
  blueslider:{
    top: 160,
    position:"absolute",
    width:350,
    left: 20
  },
  blueslidertitle:{
    top: 200,
    position: "absolute",
    fontSize: 12,
    fontWeight: 'normal',
    left: 20,
  
 
  },
  
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 1,
  },
  square: {
  
    flex: 1,
    borderRadius: 5,
  },

  sampleContainer:{
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  sampleText:{
    fontWeight: 'bold',
    fontSize: 16,
  },

  resetButton:{
    marginLeft: 35,
    padding: 1,
    backgroundColor: '#0000FF',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 15,
    minWidth: 150,
  },

  resetButtonText:{
    fontWeight: 'bold',
    fontSize: 15
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    borderColor: 'white',
    borderWidth: 2
  },
  runButton: {
    backgroundColor: '#0000FF',
    padding: 12,
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 15,
    minWidth: 150,
  },
  runButtonText: {
  color: '#fff',
  fontSize: 15,
  },
});


