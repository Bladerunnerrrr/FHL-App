import { StyleSheet, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { executeNativeBackPress } from 'react-native-screens';
import {Button, Card, TextInput} from 'react-native-paper';
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';

function LoginScreen(){
    return (
        <ImageBackground 
        source={require("../assets/images/SignIn.jpg")}
        resizeMode='cover'
        style={styles.background}
        > 
            <Text style = {styles.titleFHL}>FHL-App</Text>
            <View style = {styles.LoginContainer}>

                <Card>
                    <Card.Content >
                        <TextInput style={styles.inputText} label = "Email" keyboardType="email-address"></TextInput>
                        <TextInput style={styles.inputText} label = "Password" secureTextEntry={true}></TextInput>
                        <Button >FORGOT EMAIL/PASSWORD</Button>
                        <Button mode='outlined' buttonColor='blue' textColor='white'>LOGIN</Button>
                        <Button >REGISTER</Button>
                    </Card.Content>
                </Card>
            </View>

        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background:{
       flex: 1, 
       alignContent: 'center',
       justifyContent: 'center',
     
    },
    LoginContainer:{
        top: '-10%'
      
    },
    titleFHL:{
        top: '-12%',
        color:'white',
        fontSize: 50,
        lineHeight:100,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputText:{
        backgroundColor:'transparent'
    }
})
export default LoginScreen;