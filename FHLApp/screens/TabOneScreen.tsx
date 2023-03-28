// Main menu

import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View, TouchableOpacity, Image } from "../components/Themed";
import { useIsFocused } from "@react-navigation/native";
import { RootTabScreenProps } from "../types";
import * as Paho from "paho-mqtt";
import axios from "axios";
import { rootUrl } from "../assets/api";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [status, setStatus] = useState("red");
  interface Preset {
    name: string;
    message: string;
    _id: string;
    // Add any other properties as needed
  }
  // Used for myPresets
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  // const [myPresets, setMyPresets] = useState<Array<object> | null>(null);
  const [myPresets, setMyPresets] = useState<Array<Preset> | []>();

  // Used for pre-animated presets
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // MQTT Broker
  const client = new Paho.Client(
    "broker.hivemq.com",
    8000,
    "client_" + Math.random()
  );

  // Debugging
  // console.log(selectedPreset);
  // console.log(selectedPattern);

  const presets = [
    { name: "Merry Xmas", id: "1" },
    { name: "Hello", id: "2" },
    { name: "CME", id: "3" },
    { name: "Happy New Year!", id: "4" },
    { name: "FHL", id: "5" },
  ];

  // const myPresets = [
  //   { name: "Preset 1", id: 1 },
  //   { name: "Preset 2", id: 2 },
  //   { name: "Preset 3", id: 3 },
  //   { name: "Preset 4", id: 4 },
  //   { name: "Preset 5", id: 5 },
  // ];
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log("refreshed");
      // setRefresh(!refresh);
    }
  }, [isFocused]);
  useEffect(() => {
    fetch(`${rootUrl}/patterns`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.length);
        setMyPresets(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isFocused]);
  client.connect({ onSuccess: onConnect });

  function onConnect() {
    console.log("Connected to MQTT broker");
    setStatus("green");
  }

  function publishMessage(message: string, status: boolean = false) {
    const topic = "festive-holiday-lights";
    // const payload = message;
    const payload = status ? "1" + "255" + "3" + message : message;
    const messageObj = new Paho.Message(payload);
    messageObj.destinationName = topic;
    client.send(messageObj);
    console.log("Message sent: ", messageObj);
  }

  function getPresetNameById(type: string, id: string) {
    const presetss = type === "myPresets" ? myPresets : presets;
    const preset = presetss?.find((preset) => preset.id === id);
    return preset ? preset.name : "";
  }

  const runHandler = () => {
    if (selectedPattern !== null && selectedPreset !== null) {
      alert("Please select only one preset");
    } else if (selectedPattern === null && selectedPreset === null) {
      alert("Please select one preset");
    } else if (selectedPreset !== null && selectedPattern === null) {
      const currentPrest = myPresets?.find(
        (preset) => preset._id == selectedPreset
      );
      // client.send(currentPrest);
      // console.log("Message sent=>: ", currentPrest);
      publishMessage(currentPrest?.payloadString);
    } else {
      // console.log("getPresetNameByIdpresets selectedPattern =>",getPresetNameById("presets", selectedPattern + ""));
      publishMessage(getPresetNameById("presets", selectedPattern + ""), true);
    }

    // if (selectedPattern !== null && selectedPreset !== null) {
    //   alert("Please select only one preset");
    // } else if (selectedPreset && !selectedPattern) {
    //   const currentPrest = myPresets?.find(
    //     (preset) => preset._id == selectedPreset
    //   );
    //   client.send(currentPrest);
    //   console.log("Message sent=>: ", currentPrest);
    // } else {
    //   // const presetType = selectedPattern !== null ? "myPresets" : "presets";
    //   publishMessage(getPresetNameById("presets", selectedPattern));
    // }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Festive Holiday Lights!</Text>
      <View style={styles.statusContainer}>
        <Image
          source={
            status === "green"
              ? require("../assets/green-circle.png")
              : require("../assets/red-circle.png")
          }
          style={styles.statusIcon}
        />
        <Text style={styles.statusText}>
          {status === "green" ? "Connected" : "Disconnected"}
        </Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
          My Presets: {myPresets?.length}
          </Text>
          <ScrollView style={styles.scrollContainer}>
            {myPresets?.map((preset: Preset) => (
              <TouchableOpacity
                style={[
                  styles.presetContainer,
                  preset._id === selectedPreset &&
                    styles.selectedPresetContainer,
                ]}
                key={preset._id}
                onPress={() =>
                  setSelectedPreset(
                    preset._id !== selectedPreset ? preset._id : null
                  )
                }
              >
                <Text
                  style={[
                    styles.presetText,
                    preset._id === selectedPattern && styles.selectedPresetText,
                  ]}
                >
                  {preset.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pre-saved animation patterns:</Text>
          <ScrollView style={styles.scrollContainer}>
            {presets.map((preset) => (
              <TouchableOpacity
                style={[
                  styles.presetContainer,
                  preset.id === selectedPattern &&
                    styles.selectedPresetContainer,
                ]}
                key={preset.id}
                onPress={() =>
                  setSelectedPattern(
                    preset.id !== selectedPattern ? preset.id : null
                  )
                }
              >
                <Text
                  style={[
                    styles.presetText,
                    preset.id === selectedPattern && styles.selectedPresetText,
                  ]}
                >
                  {preset.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* run */}
        <TouchableOpacity
          style={styles.runButton}
          onPress={() => runHandler()}
          // onPress={() => {
          //   if (selectedPattern !== null && selectedPreset !== null) {
          //     alert("Please select only one preset");
          //   } else {
          //     const presetId =
          //       selectedPattern !== null
          //         ? selectedPattern
          //         : selectedPreset !== null
          //         ? selectedPreset
          //         : 0;
          //     const presetType =
          //       selectedPattern !== null ? "myPresets" : "presets";
          //     publishMessage(getPresetNameById(presetType, presetId));
          //   }
          // }}
        >
          <Text style={styles.runButtonText}>RUN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  statusIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    padding: 10,
  },
  statusText: {
    fontSize: 16,
    marginLeft: 5,
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    height: 200,
    padding: 10,
  },
  presetContainer: {
    backgroundColor: "#333",
    padding: 10,
    marginVertical: 10,
  },
  presetText: {
    fontSize: 14,
    color: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  runButton: {
    backgroundColor: "#0000FF",
    padding: 15,
    alignItems: "center",
    marginVertical: 15,
  },
  runButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  selectedPresetContainer: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedPresetText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});