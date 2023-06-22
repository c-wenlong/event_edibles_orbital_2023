// Aesthetics
import { Ionicons } from '@expo/vector-icons';
// Components
import MultipleChoiceSelector from '../components/SelectorButtons.js';
// FireBase
import { auth, firebase } from '../firebase/firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// React-Native Logic
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ConfirmBookingPage = ({ navigation }) => {
    // Firestore Database
    const BookingsData = firebase.firestore().collection('Bookings History');
    // Variable States
    const [userProfile, setUserProfile] = useState('');
    const [currentBuffet, setCurrentBuffet] = useState('');
    // Initialise data from previous page
    const route = useRoute()
    useEffect(() => {
        const param = route.params;
        setCurrentBuffet(param.currentBuffet);
        setUserProfile(param.userProfile);
    }, []);
    //Handles the booking for the person -- updates database
    // appends the name of user to database of buffets and appends buffet to user database
    const handleConfirmBooking = () => {
        // create fields of timestamp and name to store username data
        const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            email: auth.currentUser.email,
            event: {
                name: currentBuffet.eventName,
                location: currentBuffet.eventLocation,
                date: currentBuffet.eventDate,
                time: currentBuffet.eventTime,
            },
            createdAt: timeStamp,
        };
        BookingsData.add(data).catch(error => alert(error.message));
        // code testing
        console.log(data.event.name + ' has been successfully booked!');
    };
    // App interface
    return (
        <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
            <Image source={require('../assets/images/buffet1.jpg')} style={styles.imageContainer} />
            <View style={styles.bodyContainer}>
                <Text style={styles.header}>This Event is Booked for {userProfile.username}</Text>
                <Text style={styles.caption}>Name: <Text style={styles.captionBold}>{currentBuffet.eventName}</Text></Text>
                <Text style={styles.caption}>Location: <Text style={styles.captionBold}>{currentBuffet.eventLocation}</Text></Text>
                <Text style={styles.caption}>Date: <Text style={styles.captionBold}>{currentBuffet.eventDate}</Text></Text>
                <Text style={styles.caption}>Time: <Text style={styles.captionBold}>{currentBuffet.eventTime}</Text></Text>
                <Text style={styles.caption}><Text style={styles.captionBold}>Note: Please Bring Your Own Container!</Text></Text>
                <TouchableOpacity style={styles.button} onPress={handleConfirmBooking}>
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
        paddingBottom: 20,
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