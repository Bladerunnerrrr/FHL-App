import { StyleSheet, ImageBackground } from 'react-native';
import { executeNativeBackPress } from 'react-native-screens';
function LoginScreen(){
    return (
        <ImageBackground 
        source={require("../assets/images/SignIn.jpg")}
        resizeMode='cover'
        style={styles.background}
        ></ImageBackground>
    );
}
const styles = StyleSheet.create({
    background:{
       flex: 1, 
    }
})
export default LoginScreen;