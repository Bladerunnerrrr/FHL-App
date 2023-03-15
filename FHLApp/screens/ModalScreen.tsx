import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Festive holiday lights</Text>
        <Text style={styles.infoText}>
          Festive holiday lights is a fun and easy-to-use app for creating beautiful holiday light displays. With our app, you can choose from a wide range of colors and patterns to create the perfect holiday atmosphere for your home or office.
        </Text>
        <Text style={styles.infoTitle}>Contact us:</Text>
        <Text style={styles.infoText}>
          Email: support@festivelights.com
        </Text>
      </View>
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  infoContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
  },
});