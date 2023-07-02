import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
// Pages
import SignupPage from './pages/SignupPage.js';
import LoginPage from './pages/LoginPage.js';
import ForgotPassword from './pages/ForgotPassword.js';
import HomePage from './pages/HomePage.js';
import BuffetDetailsPage from './pages/BuffetDetailsPage.js';
import ConfirmBookingPage from './pages/ConfirmBookingPage.js';
import UserProfilePage from './pages/UserProfilePage.js';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
// creates the Stack of pages
const Stack = createNativeStackNavigator();
// Loads the homepage is signed in, else login page
const StackNavigator = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <Stack.Navigator screenOptions={{
            headerShown: true
        }}>
            {user ? (
                <>
                    <Stack.Screen name="Home" component={HomePage} />
                    <Stack.Screen name="BuffetDetails" component={BuffetDetailsPage} />
                    <Stack.Screen name="Confirm Booking" component={ConfirmBookingPage} />
                    <Stack.Screen name="UserProfile" component={UserProfilePage} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Log In" component={LoginPage} />
                    <Stack.Screen name="Sign Up" component={SignupPage} />
                    <Stack.Screen name="Forgot Password" component={ForgotPassword} />

                </>
            )}
        </Stack.Navigator>
    )
}

export default StackNavigator;