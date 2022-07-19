import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import Header from "../components/Header";

const Stack = createStackNavigator();

export default function UserStack() {
	return (
		<NavigationContainer>
      <Stack.Navigator screenOptions={{
        header: (props) => <Header {...props}/>
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
		</NavigationContainer>
	);
}
