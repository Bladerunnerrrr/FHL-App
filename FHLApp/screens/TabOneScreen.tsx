// Main menu

import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View, TouchableOpacity, Image } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as Paho from 'paho-mqtt';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [status, setStatus] = useState('red');
  
  // Used for myPresets
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);

  // Used for pre-animated presets
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  // MQTT Broker
  const client = new Paho.Client('broker.hivemq.com', 8000, 'client_' + Math.random());

  // Debugging
  console.log(selectedPreset);
  console.log(selectedPattern);

  const presets = [
    { name: 'Merry Xmas', id: 1 },
    { name: 'Hello', id: 2 },
    { name: 'CME', id: 3 },
    { name: 'Happy New Year!', id: 4 },
    { name: 'FHL', id: 5 },
  ];

  const myPresets = [
    { name: 'Preset 1', id: 1 },
    { name: 'Preset 2', id: 2 },
    { name: 'Preset 3', id: 3 },
    { name: 'Preset 4', id: 4 },
    { name: 'Preset 5', id: 5 },
  ];

  client.connect({ onSuccess: onConnect });

  function onConnect() {
    console.log('Connected to MQTT broker');
    setStatus('green');
  }

  function publishMessage(message: string) {
    const topic = 'festive-holiday-lights';
    const payload = "1" + "255" + "3" + message;
    const messageObj = new Paho.Message(payload);
    messageObj.destinationName = topic;
    client.send(messageObj);
    console.log('Message sent: ', messageObj);
  }

  function getPresetNameById(type: string, id: number) {
    const presetss = type === 'myPresets' ? myPresets : presets;
    const preset = presetss.find((preset) => preset.id === id);
    return preset ? preset.name : '';
  }
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Festive Holiday Lights!</Text>
      <View style={styles.statusContainer}>
        <Image
          source={
            status === 'green'
              ? require('../assets/green-circle.png')
              : require('../assets/red-circle.png')
          }
          style={styles.statusIcon}
        />
        <Text style={styles.statusText}>{status === 'green' ? 'Connected' : 'Disconnected'}</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Presets:</Text>
          <ScrollView style={styles.scrollContainer}>
            {myPresets.map((preset) => (
              <TouchableOpacity
                style={[
                  styles.presetContainer,
                  preset.id === selectedPattern && styles.selectedPresetContainer,
                ]}
                key={preset.id}
                onPress={() =>
                  {
                    if (preset.id === selectedPattern) {
                      setSelectedPattern(null); // unselect the preset
                    } else {
                      setSelectedPattern(preset.id); // select the preset
                    }
                  }}
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

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pre-saved animation patterns:</Text>
          <ScrollView style={styles.scrollContainer}>
            {presets.map((preset) => (
              <TouchableOpacity
                style={[
                  styles.presetContainer,
                  preset.id === selectedPreset && styles.selectedPresetContainer,
                ]}
                key={preset.id}
                onPress={() => 
                  {
                    if (preset.id === selectedPreset) {
                      setSelectedPreset(null); // unselect the preset
                    } else {
                      setSelectedPreset(preset.id); // select the preset
                    }
                  }}
              >
                <Text
                  style={[
                    styles.presetText,
                    preset.id === selectedPreset && styles.selectedPresetText,
                  ]}
                >
                  {preset.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.runButton}
          onPress={() => {
            if (selectedPattern !== null && selectedPreset !== null) {
              alert('Please select only one preset');
            } else {
              const presetId = selectedPattern !== null ? selectedPattern : selectedPreset !== null ? selectedPreset : 0;
              const presetType = selectedPattern !== null ? 'myPresets' : 'presets';
              publishMessage(getPresetNameById(presetType, presetId));
            }
          }}
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
  fontWeight: 'bold',
  marginVertical: 20,
  textAlign: 'center',
  },
  statusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
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
  fontWeight: 'bold',
  marginBottom: 10,
  },
  scrollContainer: {
  height: 200,
  padding: 10,
  },
  presetContainer: {
  backgroundColor: '#333',
  padding: 10,
  marginVertical: 10,
  },
  presetText: {
  fontSize: 14,
  color: '#fff'
  },
  picker: {
  height: 50,
  width: '100%',
  },
  runButton: {
  backgroundColor: '#0000FF',
  padding: 15,
  alignItems: 'center',
  marginVertical: 15,
  },
  runButtonText: {
  color: '#fff',
  fontSize: 15,
  },
  selectedPresetContainer: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedPresetText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});