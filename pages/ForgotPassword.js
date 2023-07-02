import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';

const ForgotPassword = ({ navigation }) => {
    // UserInput State
    const [email, setEmail] = useState('');

    const handleForgetPassword = () => {
        // Handle login logic
        if (!email.endsWith("@u.nus.edu")) {
            alert("Invalid Email: email should end @u.nus.edu")
        } else {
            setEmail("");
        }
    }

    return (
        <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <View style={styles.bodyContainer}>
                        <Text style={styles.caption}> NUS Email </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="exxxxxxx@u.nus.edu"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleForgetPassword}>
                            <Text style={styles.buttonText}>Retrieve Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Log In')}>
                            <Text style={styles.nav}>Back to Log in</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}

export default ForgotPassword;

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
    text: {
        fontFamily: "montserrat-regular",
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
    nav: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: "black",
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 30,
    },
});
