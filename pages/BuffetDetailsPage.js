// Aesthetics
import { Ionicons } from '@expo/vector-icons';
// Components
import MultipleChoiceSelector from '../components/SelectorButtons.js';
// FireBase
import { auth, firebase, db } from '../firebase/firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// React-Native Logic
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
const BuffetDetailsPage = ({ navigation }) => {
    // Variable States
    const [username, setusername] = useState('');
    // stores the array of all buffets
    const [buffetList, setBuffetList] = useState('')
    // Initialise States for the Buffet Event
    const handleBooking = () => {
        navigation.navigate('Confirm Booking', { currentBuffet: buffetList })
    }
    // Import Database from Firestore
    useEffect(() => {
        db.collection('Buffet Events')
            .get()
            .then(results => results.docs)
            .then(docs => docs.map(doc => ({
                id: doc.id,
                eventName: doc.data().eventName,
                eventLocation: doc.data().eventLocation,
                eventDate: doc.data().eventDate,
                eventTime: doc.data().eventTime,
                organiserName: doc.data().organiserName,
            })))
            .then(data => {
                setBuffetList(data[0])
                //code testing
                console.log("Loaded Buffet: " + buffetList.eventName);
            })
            .catch(error => alert(error.message))
    }, [])
    console.log(buffetList)
    // App Interface
    return (
        <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
            <Image source={require('../assets/images/buffet1.jpg')} style={styles.imageContainer} />
            <View style={styles.bodyContainer}>
                <Text style={styles.caption}> Event Name: <Text style={styles.captionBold}>{buffetList.eventName}</Text></Text>
                <Text style={styles.caption}> Location: <Text style={styles.captionBold}>{buffetList.eventLocation} </Text></Text>
                <Text style={styles.caption}> Date & Time: <Text style={styles.captionBold}>{buffetList.eventDate}</Text></Text>
                <Text style={styles.caption}> No. of People Already Booked: <Text style={styles.captionBold}>{buffetList.eventTime}</Text></Text >
                <Text style={styles.caption}> Hosted by: <Text style={styles.captionBold}>{buffetList.organiserName}</Text></Text >
                <TouchableOpacity style={styles.button} onPress={handleBooking}>
                    <Text style={styles.buttonText}>Add to Booking</Text>
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