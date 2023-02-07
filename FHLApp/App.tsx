import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

/*For Testing Login and Register screen*/
import LoginScreen from './screens/LoginScreen';
import{ TailwindProvider } from "tailwindcss-react-native";


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <TailwindProvider>
        {/* <Navigation colorScheme={colorScheme} /> comment out for testing */}
        <StatusBar style='light'/>
        <LoginScreen/>
     
      </TailwindProvider>
    );
  }
}
