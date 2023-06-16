// Aesthetics
import { Ionicons } from '@expo/vector-icons';
// Components
import MultipleChoiceSelector from '../components/SelectorButtons.js';
// FireBase
import { auth } from '../firebase/firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// React-Native Logic
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
// App inteface
const BuffetDetailsPage = ({ navigation }) => {
    return (
        <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
            <Image source={require('../assets/images/poster.png')} style={styles.imageContainer} />
            <View style={styles.bodyContainer}>
                <Text style={styles.caption}> Name: <Text style={styles.captionBold}>Welfare Dinner for Staff @CLB</Text></Text>
                <Text style={styles.caption}> Location: <Text style={styles.captionBold}>Central Library </Text></Text>
                <Text style={styles.caption}> Date & Time: <Text style={styles.captionBold}>13 June 2023 1400Hrs</Text></Text>
                <Text style={styles.caption}> No. of People Already Booked: <Text style={styles.captionBold}>15</Text></Text >
                <Text style={styles.caption}> Hosted by: <Text style={styles.captionBold}>NUSSU</Text></Text >
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ConfirmBooking')}>
                    <Text style={styles.buttonText}>Add to Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.nav}>Back to HomePage</Text>
                </TouchableOpacity>
            </View >
        </ImageBackground >
    )
}

export default BuffetDetailsPage

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
    imageContainer: {
        flex: 4,
        marginTop: 20,
        marginBottom: 50,
        width: '100%',
        height: '100%',
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
    captionBold: {
        fontFamily: "montserrat-bold",
        fontSize: 14,
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