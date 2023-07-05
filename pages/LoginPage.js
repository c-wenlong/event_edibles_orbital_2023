// FONT
import * as Font from 'expo-font';
// CUSTOM COMPONENTS
import MultipleChoiceSelector from '../components/SelectorButtons.js';
import QuestionAnswer from '../components/QuestionAnswer.js';
import SecureQuestionAnswer from '../components/SecureQuestionAnswer.js'
// SPLASHSCREEN FOR FONTS TO LOAD
import * as SplashScreen from 'expo-splash-screen';
// FIREBASE OBJECTS
import { auth, firebase, db } from '../firebase/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
// REACT-NATIVE COMPONENTS
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';

const LoginPage = ({ navigation }) => {
    // States
    const [accountType, setAccountType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Handle Login logic
    const handleLogin = () => {
        if (!accountType) {
            alert("Please indicate Student/Staff")
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // adds Sign In info to firestore (Firestore fetch is async, so we have
                    // to specify await to wait for fetching to be completed before running the 2nd then block)
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
    // To Store Log In Data(Username) 
    const AddLogInData = (userCredential) => {
        // Get ID of the current user for doc finding
        const user = userCredential.user;
        // Update lastLogin time
        const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
        db.collection('Users').doc(user.uid).update({ lastLogin: timeStamp })
        // return username to control the flow of the program
        // so that the 2nd then block in handleLogin waits for
        // this variable before running.
        return db.collection('Users')
            .doc(user.uid)
            .get()
            .then(doc => {
                return doc.data().username;
            })
            .catch(error => alert(error.message));
    };
    // Callback to MultipleChoiceSelector Component
    const handleAccountType = (type) => {
        setAccountType(type);
        console.log('Selected: ' + type);
    };
    // LOAD FONTS
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    'montserrat-regular': require('../assets/Montserrat/static/Montserrat-Regular.ttf'),
                    'montserrat-bold': require('../assets/Montserrat/static/Montserrat-Bold.ttf'),
                    'montserrat-extrabold': require('../assets/Montserrat/static/Montserrat-ExtraBold.ttf')
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
    useCallback(async () => {
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
                    {/* header */}
                    <MultipleChoiceSelector caption={"Are you a . . ?"} opt1={'Student'} opt2={'Staff'} onSelectOptions={(type) => { handleAccountType(type) }} />
                    {/* body */}
                    <View style={styles.bodyContainer}>
                        {/* EMAIL */}
                        <QuestionAnswer caption={"NUS Email"} placeholder={'exxxxxxx@u.nus.edu'} value={email} onChangeText={text => setEmail(text)} />
                        {/* PASSWORD */}
                        <SecureQuestionAnswer caption={"Password"} placeholder={'Password'} value={password} onChangeText={text => setPassword(text)} />
                        {/* BOTTOM */}
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                            <Text style={styles.buttonText}>Let's Go!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
    bodyContainer: {
        flex: 6,
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