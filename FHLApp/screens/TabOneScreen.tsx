// Main menu

import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View, TouchableOpacity, Image } from '../components/Themed';
import { RootTabScreenProps } from '../types';
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [status, setStatus] = useState('green');
  const [selectedPattern, setSelectedPattern] = useState('Merry Xmas');

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
              <View style={styles.presetContainer} key={preset.id}>
                <Text style={styles.presetText}>{preset.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pre-saved animation patterns:</Text>
          <ScrollView style={styles.scrollContainer}>
            {presets.map((preset) => (
              <View style={styles.presetContainer} key={preset.id}>
                <Text style={styles.presetText}>{preset.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.runButton} onPress={() => console.log('RUN button pressed')}>
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
  });