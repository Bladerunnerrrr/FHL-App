import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";


function RegisterScreen(){
    return(
        <SafeAreaView>
            <ScrollView>
                <Appbar>
                    <Appbar.BackAction/>
                    <Appbar.Content title ='Register'></Appbar.Content>
                    
                </Appbar> 
                <TextInput label={'Name'} />
                <TextInput label="Email" keyboardType="email-address" />
                <TextInput label='Password' secureTextEntry={true} />
                <TextInput label='Confirm Password' secureTextEntry={true}/>
                <Button mode="contained">REGISTER</Button>

            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen;