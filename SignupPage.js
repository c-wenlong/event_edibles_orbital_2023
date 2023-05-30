import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import MultipleChoiceSelector from './SelectorButtons.js';

const SignupPage = ({ navigation }) => {
    // import montserrat font
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
            'montserrat-regular': require('./assets/Montserrat/static/Montserrat-Regular.ttf'),
            'montserrat-bold': require('./assets/Montserrat/static/Montserrat-Bold.ttf'),
            // Add other font styles if needed
        });
        setFontsLoaded(true);
    };

    useEffect(() => {
        loadFonts();
    }, []);

    // handle state of the use input
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = () => {
        // Handle login logic
        setUsername("");
        setEmail("");
        setPassword("");
        setCPassword("");
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ImageBackground source={require('./assets/poster.png')} style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.header}> Register </Text>
                </View>
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
                            secureTextEntry={!showPassword}
                            value={cpassword}
                            onChangeText={text => setCPassword(text)}
                        />
                        <TouchableOpacity style={styles.eyecon} onPress={togglePasswordVisibility}>
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Let's Go!</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                    <Text style={styles.nav}>Existing user? Log in</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
    headerContainer: {
        flex: 1,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        fontFamily: 'montserrat-bold',
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
        fontFamily: "montserrat-regular",
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
        borderColor: 'rgba(211, 211, 211, 1)',
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
        marginBottom:20,
        textAlign:'center',
    },
});

export default SignupPage;