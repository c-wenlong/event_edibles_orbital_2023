// CUSTOM COMPONENTS
import MultipleChoiceSelector from '../components/SelectorButtons.js';
import QuestionAnswer from '../components/QuestionAnswer.js';
import SecureQuestionAnswer from '../components/SecureQuestionAnswer.js'
// FIREBASE OBJECTS
import { auth, db, firebase } from "../firebase/firebase.js";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// REACT-NATIVE COMPONENTS
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';
// CUSTOM HOOKS
import useAuth from '../hooks/useAuth.js';

const SignupPage = ({ navigation }) => {
    // States
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
        } else if (!accountType) {
            alert('Please indicate Student/Staff')
            // Handle Firebase Authentication
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    // adds Sign Up data to firestore
                    handleAddSignUpData(userCredential);
                    navigation.navigate('Home');
                    // code testing
                    console.log('Signed up with: ' + username + ' at ' + email);
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
            buffetAdded: [],
        };
        db.collection('Users')
            .doc(user.uid)
            .set(data)
            .catch(error => alert(error.message));
    };
    // Callback to MultipleChoiceSelector Component to update accountType
    const handleAccountType = (type) => {
        setAccountType(type);
        // app testing
        console.log('Selected: ' + type);
    };
    // App Interface
    return (
        <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    {/* HEADER */}
                    <MultipleChoiceSelector caption={"Are you a . . ?"} onSelectOptions={(type) => handleAccountType(type)} />
                    {/* BODY */}
                    <View style={styles.bodyContainer}>
                        {/* FULL NAME */}
                        <QuestionAnswer caption={"Full Name"} placeholder={'John Doe'} value={username} onChangeText={text => setUsername(text)} />
                        {/* EMAIL */}
                        <QuestionAnswer caption={"NUS Email"} placeholder={'exxxxxxx@u.nus.edu'} value={email} onChangeText={text => setEmail(text)} />
                        {/* PASSWORD */}
                        <SecureQuestionAnswer caption={"Password"} placeholder={'Password'} value={password} onChangeText={text => setPassword(text)} />
                        {/* CONFIRM PASSWORD */}
                        <SecureQuestionAnswer caption={"Confirm Password"} placeholder={'Confirm Password'} value={cpassword} onChangeText={text => setCPassword(text)} />
                        {/* BOTTOM */}
                        <TouchableOpacity style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>Let's Go!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
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
    bodyContainer: {
        flex: 9,
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