import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

/*For Testing Login and Register screen*/
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './components/AppTheme';
import AppNavigator from './navigation/AppNavigator';

export default function App() {

    return (
      <PaperProvider theme={theme}>
        {/* <Navigation colorScheme={colorScheme} /> comment out for testing */}
       
        <AppNavigator/>
     
      </PaperProvider>
    );
  }

