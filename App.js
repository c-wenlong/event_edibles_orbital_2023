import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import * as Font from 'expo-font';
import SignupPage from './SignupPage.js';
import LoginPage from './LoginPage.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForgotPassword from './ForgotPassword.js';

const Stack = createStackNavigator();

const App = () => {
  // import montserrat font
  const loadFonts = async () => {
    await Font.loadAsync({
      'montserrat-regular': require('./assets/Montserrat/static/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/Montserrat/static/Montserrat-Bold.ttf'),
      // Add other font styles if needed
    });
  };
  useEffect(() => {
    loadFonts();
  }, []);

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false}}>
          <Stack.Screen name="SignupPage" component={SignupPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop:0,
  },
  title1: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 65,
    fontFamily: 'montserrat-bold',
  },

  input: {
    width: '90%',
    height: 50,
    borderColor: 'rgba(211, 211, 211, 1)',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: 'rgba(140, 20, 252,0.7)',
  },
  button: {
    backgroundColor: 'rgba(140, 20, 252,1)',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: "100%"
  },
});


export default App;