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
const ConfirmBookingPage = ({ navigation }) => {
    //Handles the booking for the person -- updates database
    const handleBooking = () => {

    };
    // App interface
    return (
        <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
            <Image source={require('../assets/images/poster.png')} style={styles.imageContainer} />
            <View style={styles.bodyContainer}>
                <Text style={styles.header}>This Event is Booked for</Text>
                <Text style={styles.caption}> Name: <Text style={styles.captionBold}>The Deck</Text></Text>
                <Text style={styles.caption}> Location: <Text style={styles.captionBold}>School of Computing </Text></Text>
                <Text style={styles.caption}> Date & Time: <Text style={styles.captionBold}>13 June 2023</Text></Text>
                <Text style={styles.caption}> No. of People Already Booked: <Text style={styles.captionBold}>15</Text></Text >
                <TouchableOpacity style={styles.button} onPress={handleBooking}>
                    <Text style={styles.buttonText}>Confirm Booking</Text>
                </TouchableOpacity>
            </View >
        </ImageBackground >
    )
}

export default ConfirmBookingPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        },
    imageBackground: {
        opacity: 0.4,
    },
    imageContainer: {
        flex: 4,
        marginTop: 20,
        marginBottom: 30,
        width: '100%',
        height: '100%',
    },
    bodyContainer: {
        flex: 7,
    },
    header: {
        fontFamily: 'montserrat-bold',
        fontSize: 20,
        textAlign: 'center',
        paddingBottom:20,
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
        paddingVertical: 30,
        paddingHorizontal: 50,
        borderRadius: 50,
        justifyContent: "flex-end",
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        width: "100%"
    },
});