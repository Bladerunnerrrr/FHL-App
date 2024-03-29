import React, { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { executeNativeBackPress } from 'react-native-screens';
import {Button, Card, TextInput} from 'react-native-paper';
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';
import axios from 'axios';
import { rootUrl } from "../assets/api";


/* Function to include navigation to the screen */
interface LoginScreenProps{
    navigation: any;
}

function LoginScreen(props: LoginScreenProps){
    /*functions to navigate to screens */
    const Reg_nav = () => props.navigation.navigate("Register")
    const ForgotPass_nav = () => props.navigation.navigate("ForgotPassword")
    const Root_nav = () => props.navigation.navigate("Root")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${rootUrl}/login`, {
                email,
                password
            });
            console.log(res.data);
            alert("Login successful");
            Root_nav();
        } catch (error) {
            console.error(error);
            alert("Password/Email does not match");
            //Root_nav();
           
        }
    };

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

                        <TextInput style={styles.inputText} label = "Email" keyboardType="email-address" onChangeText={text => setEmail(text)}></TextInput>
                        <TextInput style={styles.inputText} label = "Password" secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>
                        <Button onPress={ForgotPass_nav} >FORGOT PASSWORD</Button>
                        <Button mode='outlined' buttonColor='blue' textColor='white' onPress={handleLogin}>LOGIN</Button>
                        <Button onPress={Reg_nav}>REGISTER</Button>
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
        top: '-15%',
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
