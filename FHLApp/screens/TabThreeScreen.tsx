import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert
} from "react-native";

import { Text, View } from "../components/Themed";
import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import * as Paho from "paho-mqtt";
import axios from "axios";
import { rootUrl } from "../assets/api";

export default function TabThreeScreen() {

  const client = new Paho.Client(
    "broker.hivemq.com",
    8000,
    "client_" + Math.random()
  );
  interface MessageObj {
    destinationName: string;
    duplicate: boolean;
    payloadBytes: Array<number>;
    payloadString: string;
    qos: number;
    retained: boolean;
    topic: string;
    // Add any other properties as needed
  }
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValue1, setSliderValue1] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(0);
  const [gridColors, setGridColors] = useState(Array(35).fill("gray"));
  const [messageObj, setMessageObj] = useState<any>({});

  client.connect({ onSuccess: onConnect });

  function onConnect() {
    console.log("Connected to MQTT broker");
  }

  function publishMessage(message: string) {
    const topic = "festive-holiday-lights";
    const payload = message;
    const messageObj = new Paho.Message(payload);
    messageObj.destinationName = topic;
    client.send(messageObj);
    // setMessageObj(messageObj);
    console.log("Message sent=>: ", messageObj);
    return messageObj;
  }

  const submitHandler = async (text: string) => {
    const message = await generateMessage();
    const newMessageObj = await publishMessage("0" + message);
    console.log(newMessageObj, "messageObj");

    const name = text.trim();
    if (name) {
      // Send the pattern name and message to the database here
      axios
        .post(`${rootUrl}/save-patterns`, {
          name: name,
          newMessageObj: newMessageObj,
        })
        .then((response) => {
          console.log("Pattern saved successfully:", response.data);
          alert("Pattern saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving pattern:", error);
        });
    } else {
      alert("Please enter a pattern name.");
    }
  };

  function generateMessage() {
    let message = "";
    gridColors.forEach((color) => {
      const [r, g, b] = color.slice(5, -1).split(",").map(Number); // extract RGB values from color string
      console.log("color:", color);
      console.log("r:", r, "g:", g, "b:", b);
      if (color == "gray") {
        message += "000000000";
      } else {
        message += `${r.toString().padStart(3, "0")}${g
          .toString()
          .padStart(3, "0")}${b.toString().padStart(3, "0")}`;
      }
    });
    return message;
  }

  const backgroundColor1 = `rgba(${sliderValue}, ${sliderValue1}, ${sliderValue2}, 1)`;
  const renderGridItem = ({ index }) => {
    const onGridItemPress = () => {
      const newGridColors = [...gridColors];
      newGridColors[
        index
      ] = `rgba(${sliderValue}, ${sliderValue1}, ${sliderValue2}, 1)`;
      setGridColors(newGridColors);
      console.log(
        index,
        `red: ${sliderValue},green: ${sliderValue1},blue: ${sliderValue2}`
      );
    };

    return (
      <TouchableOpacity
        style={[styles.gridItem, { backgroundColor: gridColors[index] }]}
        onPress={onGridItemPress}
      >
        <View
          style={[styles.square, { backgroundColor: gridColors[index] }]}
        ></View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <FlatList
          style={styles.gridContainer}
          data={Array(35).fill("")}
          numColumns={5}
          renderItem={renderGridItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.sampleContainer}>
        <Text style={styles.sampleText}>Sample Color:</Text>
        <View
          style={[styles.circle, { backgroundColor: backgroundColor1 }]}
        ></View>
        <TouchableOpacity
          style={styles.runButton}
          onPress={() => {
            setGridColors(Array(35).fill("gray"));
          }}
        >
          <Text style={styles.runButtonText}>RESET COLOR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.redtext}>Red</Text>
        <Slider
          maximumValue={255}
          minimumValue={0}
          style={styles.redslider}
          step={10}
          value={sliderValue}
          onValueChange={setSliderValue}
        />
        <Text style={styles.redslidertitle}>
          {" "}
          {sliderValue && +sliderValue.toFixed(3)}{" "}
        </Text>
        <Text style={styles.greentext}>Green</Text>
        <Slider
          maximumValue={255}
          minimumValue={0}
          step={10}
          style={styles.greenslider}
          value={sliderValue1}
          onValueChange={setSliderValue1}
        />
        <Text style={styles.greenslidertitle}>
          {" "}
          {sliderValue1 && +sliderValue1.toFixed(3)}{" "}
        </Text>
        <Text style={styles.bluetext}>Blue</Text>
        <Slider
          maximumValue={255}
          minimumValue={0}
          step={10}
          style={styles.blueslider}
          value={sliderValue2}
          onValueChange={setSliderValue2}
        />
        <Text style={styles.blueslidertitle}>
          {" "}
          {sliderValue2 && +sliderValue2.toFixed(3)}{" "}
        </Text>
      </View>

      <View style={styles.sampleContainer}>
        <TouchableOpacity
          style={styles.runButton}
          onPress={() => {
            const message = generateMessage();
            publishMessage("0" + message);
          }}
        >
          <Text style={styles.runButtonText}>RUN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.runButton}
          onPress={() => {
            Alert.prompt(
              "Save Pattern",
              "Enter pattern name:",
              (text) => {
                submitHandler(text);
              },
              undefined,
              "",
              "default"
            );
            }}
        >
          <Text style={styles.runButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
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
      left: 10,
   
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
      left: 10,
    },
    
    gridItem: {
      flex: 1,
      aspectRatio: 2,
      margin: 1,
    },
    square: {
      flex: 1,
      borderRadius: 5,
    },
  
    sampleContainer:{
      height: 65,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
      marginLeft: 25,
      
    },
  
    sampleText:{
      fontWeight: 'bold',
      fontSize: 14,
    },
  
    resetButton:{
      backgroundColor: '#0000FF',
      alignItems: 'center',
      marginVertical: 15,
      width: 150,
      marginLeft: 30
    },
  
    resetButtonText:{
      fontWeight: 'bold',
      fontSize: 16
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
      padding: 15,
      alignItems: 'center',
      marginVertical: 10,
      width: 150,
      marginLeft: 26,
      borderRadius: 20,
    },
    runButtonText: {
    color: '#fff',
    fontSize: 14,
    },
    saveButton: {
      backgroundColor: '#007AFF',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 10,
      alignSelf: 'center',
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 8,
      marginBottom: 14,
      marginTop: 14,
      color: 'white'
    },
    
});