import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import TabOneScreen from "../screens/TabOneScreen";
import RegisterScreen from "../screens/RegisterScreen";
import NewPassScreen from "../screens/NewPassScreen";
import ForgotPassScreen from "../screens/ForgotPassScreen";

const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Navigator  headerMode="false" initialRouteName='Login'>
            <Screen name ="Login" component={LoginScreen}></Screen>
            <Screen name="Register" component={RegisterScreen}></Screen>
            <Screen name="ResetPassword" component={NewPassScreen}></Screen>
            <Screen name="ForgotPassword" component={ForgotPassScreen}></Screen>
        </Navigator>
    </NavigationContainer>
)
export default AppNavigator