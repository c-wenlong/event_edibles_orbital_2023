// Stack Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import SignupPage from './pages/SignupPage.js';
import LoginPage from './pages/LoginPage.js';
import ForgotPassword from './pages/ForgotPassword.js';
import HomePage from './pages/HomePage.js';
// React-Native Logic
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SignupPage" component={SignupPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({});


export default App;