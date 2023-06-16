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
import BuffetDetailsPage from './pages/BuffetDetailsPage.js';
import ConfirmBookingPage from './pages/ConfirmBookingPage.js';
// Other Packages that can be used
// tailwindcss - replaces styles by using classnames
// heroicons - small icons that can used as widgets 
// redux - state management system

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: true
      }}>
        <Stack.Screen name="Sign Up" component={SignupPage} />
        <Stack.Screen name="Log In" component={LoginPage} />
        <Stack.Screen name="Forgot Password" component={ForgotPassword} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="BuffetDetails" component={BuffetDetailsPage}/>
        <Stack.Screen name="ConfirmBooking" component={ConfirmBookingPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({});


export default App;