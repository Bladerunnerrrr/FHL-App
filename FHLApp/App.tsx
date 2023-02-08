import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

/*For Testing Login and Register screen*/
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
        {/* <Navigation colorScheme={colorScheme} /> comment out for testing */}
       
        <RegisterScreen/>
     
      </PaperProvider>
    );
  }
}
