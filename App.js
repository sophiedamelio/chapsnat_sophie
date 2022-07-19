//import React from "react";
//import { StyleSheet } from "react-native";
//import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from "@react-navigation/stack";

//import ChatScreen from "./screens/ChatScreen";
//import HomeScreen from "./screens/HomeScreen";
//import LoginScreen from "./screens/LoginScreen";
//import SignupScreen from "./screens/SignupScreen"

import React from 'react';
import './firebase';
import RootNavigation from './navigation/Index';

export default function App() {
  return (
    <RootNavigation />
  );
}

//const Stack = createStackNavigator();

//export default function App() {
//  return (
//    <NavigationContainer>
//      <Stack.Navigator initialRouteName="Home">
//        <Stack.Screen name="Home" component={HomeScreen} />
//        <Stack.Screen name="Chat" component={ChatScreen} />
//        <Stack.Screen name="Login" component={LoginScreen} />
//        <Stack.Screen name="Signup" component={SignupScreen} />
//      </Stack.Navigator>
//    </NavigationContainer>
//  );
//}

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: "#fff",
//  },
//  item: {
//    padding: 10,
//    fontSize: 18,
//    height: 44,
//  },
//});

