import React from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/HomeView';
import Teams from '../screens/TeamView';
import Athlete from '../screens/AthleteView';
import Chat from '../screens/ChatView';
import WebView from '../screens/WebView';
const Stack = createStackNavigator();
const CustomStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Teams" component={Teams} />
      <Stack.Screen name="Athletes" component={Athlete} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="WebView" component={WebView} />
    </Stack.Navigator>
  );
}

const NavigationedStacks = () => {
  return (
    <NavigationContainer>
      <CustomStack />
    </NavigationContainer>
  )
}

export default NavigationedStacks