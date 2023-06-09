// Aesthetics
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
// Components
import MultipleChoiceSelector from '../components/SelectorButtons.js';
import * as SplashScreen from 'expo-splash-screen';
// Firebase Authentication
import { auth } from "../firebase/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// React-Native Logic
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';

const SignupPage = ({ navigation }) => {
    // FireBase Authentication
    const auth = getAuth();
    // Variable States
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    // Test Cases for SignUp (Authentication)
    const handleSignup = async () => {
        // Handle invalid input case
        if (username.trim() === '' || password.trim() === '') {
            alert('Please enter a valid name and password');
            // Handle invalid name case
        } else if (username.length < 5 || username.length > 20) {
            alert('Name should be between 5 and 20 characters');
            // Handle invalid email case
        } else if (!email.endsWith("@u.nus.edu")) {
            alert("Invalid Email: email should end @u.nus.edu");
            // Handle invalid password case
        } else if (password.length < 8 || password.length > 16) {
            alert('Password should be between 8 and 16 characters');
            // Handle password mismatch
        } else if (password !== cpassword) {
            alert('Password should match with confirm passsword')
            // Handle Firebase Authentication
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                //console.log('Signed up with:', user.email);
                navigation.navigate('HomePage');
                // Handle Existing Account Fault
            } catch (ReferenceError) {
                alert("This is an existing account, please log in.");
            }
        }
    }
    // Used to set password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // Used to set confirmed password visibility
    const toggleCPasswordVisibility = () => {
        setShowCPassword(!showCPassword);
    };
    // Load Font Before Screen is shown
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    'montserrat-regular': require('../assets/Montserrat/static/Montserrat-Regular.ttf'),
                    'montserrat-bold': require('../assets/Montserrat/static/Montserrat-Bold.ttf'),
                });
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 2000));

            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);
    if (!appIsReady) {
        return null;
    }
    // App Interface
    return (
        <ImageBackground source={require('../assets/poster.png')} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.header2Container}>
                        <Text style={styles.text}>
                            Are you a ...
                        </Text>
                        <MultipleChoiceSelector />
                    </View>
                    <View style={styles.bodyContainer}>
                        <Text style={styles.caption}> Full Name </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />

                        <Text style={styles.caption}> NUS Email </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="exxxxxxx@u.nus.edu"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />

                        <Text style={styles.caption}> Password </Text>
                        <View style={styles.input}>
                            <TextInput
                                style={styles.incognito}
                                placeholder="Password"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />
                            <TouchableOpacity style={styles.eyecon} onPress={togglePasswordVisibility}>
                                <Ionicons
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={24}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.caption}> Confirm Password</Text>
                        <View style={styles.input}>
                            <TextInput
                                style={styles.incognito}
                                placeholder="Password"
                                secureTextEntry={!showCPassword}
                                value={cpassword}
                                onChangeText={text => setCPassword(text)}
                            />
                            <TouchableOpacity style={styles.eyecon} onPress={toggleCPasswordVisibility}>
                                <Ionicons
                                    name={showCPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={24}
                                    color="gray"
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>Let's Go!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Log In')}>
                            <Text style={styles.nav}>Existing user? Log in</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 0,
    },
    header2Container: {
        flex: 2,
        width: "100%",
        padding: 16,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: 'transparent',
        opacity: 0.8,
    },
    text: {
        fontFamily: "montserrat-bold",
        fontSize: 20,
        textAlign: "left",
        width: 300,
        height: 60,
    },
    bodyContainer: {
        flex: 7,
    },
    caption: {
        fontFamily: "montserrat-regular",
        fontSize: 14,
        textAlign: "left",
        width: 300,
        marginBottom: 10,
    },
    input: {
        width: 300,
        height: 50,
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: 'rgba(140, 20, 252,0.5)',
        flexDirection: "row",
    },
    incognito: {
        flex: 1,
        paddingHorizontal: 10,
    },
    eyecon: {
        paddingRight: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: 'rgb(11,206,131)',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 10,
        justifyContent: "flex-end",
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width: "100%"
    },
    nav: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: "black",
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 30,
    },
});

export default SignupPage;