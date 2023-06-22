// Aesthetics
import { Ionicons } from '@expo/vector-icons';
// Components
import MultipleChoiceSelector from '../components/SelectorButtons.js';
import * as SplashScreen from 'expo-splash-screen';
// Firebase Authentication
import { auth, firebase, firestore } from "../firebase/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// React-Native Logic
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import useAuth from '../hooks/useAuth.js';

const SignupPage = ({ navigation }) => {
    //const { user } = useAuth();
    // FireBase Authentication
    const auth = getAuth();
    // Firestore Database
    const SignupData = firebase.firestore().collection('Signup Data');
    // User Variable States
    const [accountType, setAccountType] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    // Test Cases for SignUp (Authentication)
    const handleSignup = () => {
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
            // Handle no accountType
        }else if (!accountType) {
            alert('Please indicate Student/Staff')
            // Handle Firebase Authentication
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    navigation.navigate('Home');
                    // adds Sign Up data to firestore
                    handleAddSignUpData(userCredential);
                    // code testing
                    console.log('Signed up with: ' + username + 'at ' + email);
                })
                .catch(error => alert(error.messsage))
        }
    }
    // To Store Sign Up Data(Username)
    const handleAddSignUpData = (userCredential) => {
        // create fields of timestamp and name to store username data
        const user = userCredential.user;
        const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            accountType: accountType,
            username: username,
            email: email,
            password: password,
            createdAt: timeStamp,
        };
        SignupData.doc(user.uid).set(data).catch(error => alert(error.message));
    };
    // Callback to MultipleChoiceSelector Component to update accountType
    const handleAccountType = (type) => {
        setAccountType(type);
        // app testing
        console.log('Selected: ' + type);
    };
    // Used to set password visibility
    const togglePasswordVisibility = (num) => {
        num ? setShowCPassword(!showCPassword) : setShowPassword(!showPassword);
    };
    // App Interface
    return (
        <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>
                            Are you a ...
                        </Text>
                        <MultipleChoiceSelector onSelectOptions={(type) => handleAccountType(type)} />
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
                            <TouchableOpacity style={styles.eyecon} onPress={() => togglePasswordVisibility(0)}>
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
                            <TouchableOpacity style={styles.eyecon} onPress={() => togglePasswordVisibility(1)}>
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
                            <Text style={styles.nav}>Existing User? Log In</Text>
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
    imageBackground: {
        opacity: 0.5,
    },
    headerContainer: {
        flex: 2,
        width: "100%",
        padding: 16,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: 'transparent',
        opacity: 0.8,
    },
    headerText: {
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
        borderColor: 'rgba(255, 179, 125, 0.8)',
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
        backgroundColor: 'rgba(18, 155, 32, 0.8)',
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
        fontFamily: 'montserrat-bold',
        textAlign: 'center',
        width: "100%"
    },
    nav: {
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        textDecorationLine: 'underline',
        color: "black",
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 30,
    },
});

export default SignupPage;