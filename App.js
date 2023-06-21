// Stack Navigator
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator.js';
// React-Native Logic
import React, { useState, useEffect } from 'react';
// Authentication
import { AuthProvider } from './hooks/useAuth.js';
import { auth } from './firebase/firebase.js';
// Other Packages that can be used
// tailwindcss - replaces styles by using classnames
// heroicons - small icons that can used as widgets 
// redux - state management system

const App = () => {
  console.log('current user: ' + auth.currentUser?.email)
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;