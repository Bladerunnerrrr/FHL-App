import React, { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { executeNativeBackPress } from 'react-native-screens';
import {Button, Card, TextInput} from 'react-native-paper';
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';
<<<<<<< HEAD
import axios from 'axios';

=======
>>>>>>> 6731c60c8ac44401b17d3ed2d0b014e4965a833d
/* Function to include navigation to the screen */
interface LoginScreenProps{
    navigation: any;
}
<<<<<<< HEAD

function LoginScreen(props: LoginScreenProps){
    /*functions to navigate to screens */
    const Reg_nav = () => props.navigation.navigate("Register")
    const ForgotPass_nav = () => props.navigation.navigate("ForgotPassword")
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://10.237.230.60:3000/login', {
                email,
                password
            });
            console.log(res.data);
            alert("Login successful");
        } catch (error) {
            console.error(error);
            alert("Password/Email does not match");
        }
    };

=======

function LoginScreen(props: LoginScreenProps){
    /*functions to navigate to screens */
    const Reg_nav = () => props.navigation.navigate("Register")
    const ForgotPass_nav = () => props.navigation.navigate("ForgotPassword")
>>>>>>> 6731c60c8ac44401b17d3ed2d0b014e4965a833d
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
<<<<<<< HEAD
                        <TextInput style={styles.inputText} label = "Email" keyboardType="email-address" onChangeText={text => setEmail(text)}></TextInput>
                        <TextInput style={styles.inputText} label = "Password" secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>
                        <Button onPress={ForgotPass_nav} >FORGOT PASSWORD</Button>
                        <Button mode='outlined' buttonColor='blue' textColor='white' onPress={handleLogin}>LOGIN</Button>
=======
                        <TextInput style={styles.inputText} label = "Email" keyboardType="email-address"></TextInput>
                        <TextInput style={styles.inputText} label = "Password" secureTextEntry={true}></TextInput>
                        <Button onPress={ForgotPass_nav} >FORGOT PASSWORD</Button>
                        <Button mode='outlined' buttonColor='blue' textColor='white'>LOGIN</Button>
>>>>>>> 6731c60c8ac44401b17d3ed2d0b014e4965a833d
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
