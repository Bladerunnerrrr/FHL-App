import React, { useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Appbar, Button, TextInput, Card } from "react-native-paper";
import axios from 'axios';
import { rootUrl } from "../assets/api";

interface RegisterScreenProps{
    navigation: any;
}

function RegisterScreen(props: RegisterScreenProps){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const Log_nav = () => props.navigation.navigate("Login");

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post(`${rootUrl}/register`, {
                name,
                email,
                password
            });
            console.log(response.data);
            alert('User Registered Successfully!');
            Log_nav();
        } catch (err) {
            console.error(err);
            //alert('Error registering user, please try again later');
        }
    };

    return(
        <ImageBackground 
        style={styles.background}
        source={require("../assets/images/SignIn.jpg")}
        resizeMode='cover'
        >
            <Text style = {styles.titleFHL}>FHL-App</Text>
            <ScrollView style = {styles.RegContainer}>
            <Card >
                <Card.Title title="Register"/>
                <Card.Content >
                    <TextInput 
                        label={'Name'} 
                        value={name}
                        onChangeText={text => setName(text)} 
                    />
                    <TextInput 
                        label="Email" 
                        keyboardType="email-address" 
                        value={email}
                        onChangeText={text => setEmail(text)} 
                    />
                    <TextInput 
                        label='Password' 
                        secureTextEntry={true} 
                        value={password}
                        onChangeText={text => setPassword(text)} 
                    />
                    <TextInput 
                        label='Confirm Password' 
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)} 
                    />
                    <Button mode="contained" onPress={handleSubmit}>REGISTER</Button>
                    <Button onPress={Log_nav} mode="text">Back</Button>
                </Card.Content>
            </Card>
            </ScrollView> 
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  RegContainer: {
    top: "15%"
  },
  titleFHL: {
    top: "10%",
    color: "white",
    fontSize: 50,
    lineHeight: 100,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default RegisterScreen;
