// Aesthetics
import { Ionicons } from '@expo/vector-icons';
// Components
import MultipleChoiceSelector from '../components/SelectorButtons.js';
// FireBase
import { auth, firebase } from '../firebase/firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// React-Native Logic
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';

const LoginPage = ({ navigation }) => {
    // Firebase Authentication
    const auth = getAuth();
    // Variable States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // Handle Login logic
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            //console.log('Logged in with:', user.email);
            navigation.navigate('Home');
        } catch (error) {
            alert("User not found")
        }
    }
    // Used to set password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // App Interface
    return (
        <ImageBackground source={require('../assets/images/whiteposter.png')} style={styles.container} imageStyle={styles.imageBackground}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>
                            Are you a ...
                        </Text>
                        <MultipleChoiceSelector />
                    </View>
                    <View style={styles.bodyContainer}>
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
                        <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Let's Go!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
                            <Text style={styles.nav}>Back to Sign Up</Text>
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
        opacity: 0.4,
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
        flex: 5,
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
    forgotPassword: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: "black",
        marginBottom: 20,
        textAlign: 'right',
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

export default LoginPage;