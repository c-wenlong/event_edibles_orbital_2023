// Aesthetics
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
// Components
import MultipleChoiceSelector from '../components/SelectorButtons.js';
import * as SplashScreen from 'expo-splash-screen';
// FireBase
import { auth, firebase, db } from '../firebase/firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// React-Native Logic
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';

const LoginPage = ({ navigation }) => {
    // Firebase Authentication
    const auth = getAuth();
    // Firestore Database
    const LoginData = firebase.firestore().collection('Login Data');
    // Variable States
    const [accountType, setAccountType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // Handle Login logic
    const handleLogin = () => {
        if (!accountType) {
            alert("Please indicate Student/Staff")
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // adds Sign In info to firestore
                    return AddLogInData(userCredential);
                })
                // waits for username
                .then((username) => {
                    navigation.navigate('Home');
                    // code testing
                    console.log('Logged in with:', email + ' @ ' + username);
                })
                .catch(error => alert(error.message))

        }
    }
    // To Store Log In Data(Username) (Firestore fetch is async, so we have
    // to specify so that we can use the await to wait for fetching to be
    // completed before running the 2nd then block)
    const AddLogInData = async (userCredential) => {
        try {
            // Get the collection 'Signup Data'
            const signupDataCollection = db.collection('Signup Data');
            // Get the authenticated user
            const user = userCredential.user;
            // Get the user document from Firestore (waits for completion)
            const doc = await signupDataCollection.doc(user.uid).get();
            const username = doc.data().username;
            // Retrieve timestamp
            const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                accountType: accountType,
                username: username,
                email: email,
                password: password,
                createdAt: timeStamp,
            };
            await LoginData.doc(user.uid).set(data);
            // return username to control the flow of the program
            // so that the 2nd then block in handleLogin waits for
            // this variable before running.
            return username;
        } catch (error) {
            alert(error.message);
        }
    };
    // Used to set password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // Callback to MultipleChoiceSelector Component
    const handleAccountType = (type) => {
        setAccountType(type);
        console.log('Selected: ' + type);
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
        <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>
                            Are you a ...
                        </Text>
                        <MultipleChoiceSelector onSelectOptions={(type) => { handleAccountType(type) }} />
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
                            <Text style={styles.nav}>Sign Up as New User</Text>
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
        fontFamily: 'montserrat-bold',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        width: "100%"
    },
    forgotPassword: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: "black",
        marginBottom: 20,
        textAlign: 'right',
        fontFamily: 'montserrat-regular',
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

export default LoginPage;