// Aesthetics
import { Ionicons } from '@expo/vector-icons';
// FireBase
import { auth, firebase, db } from '../firebase/firebase.js';
import { arrayUnion } from 'firebase/firestore'
// React-Native Logic
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ConfirmBookingPage = ({ navigation }) => {
    // Variable States
    const [userProfile, setUserProfile] = useState('');
    const [buffetProfile, setBuffetProfile] = useState('');
    // INITIALISE USER AND BUFFET DATA
    const route = useRoute()
    useEffect(() => {
        const param = route.params;
        setBuffetProfile(param.buffetProfile);
        setUserProfile(param.userProfile);
    }, []);
    //Handles the booking for the person -- updates database
    // appends the name of user to database of buffets and appends buffet to user database
    const handleConfirmBooking = () => {
        // Firestore Database
        const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            user: userProfile,
            buffetProfile: buffetProfile,
            createdAt: timeStamp,
        };
        // Appends userProfile to Buffet Details
        db.collection('Buffet Events')
            .doc(buffetProfile.id)
            .update({ userAdded: arrayUnion(userProfile) })
            .catch(error => alert(error.message));
        // Appends buffetProfile to Users
        db.collection("Users")
            .doc(userProfile.id)
            .update({ buffetAdded: arrayUnion(buffetProfile) })
            .catch(error => alert(error.message))
        // Navigates to nice interface
        
        // code testing
        console.log(data.buffetProfile.data.eventName + ' has been successfully booked!');
    };
    // App interface
    if (!userProfile || !buffetProfile) {
        return <ActivityIndicator />
    } else {
        return (
            <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
                <Image source={require('../assets/images/buffet1.jpg')} style={styles.imageContainer} />
                <View style={styles.bodyContainer}>
                    <Text style={styles.header}>This Event is Booked for {userProfile?.data.username}</Text>
                    <Text style={styles.caption}>Name: <Text style={styles.captionBold}>{buffetProfile?.data.eventName}</Text></Text>
                    <Text style={styles.caption}>Location: <Text style={styles.captionBold}>{buffetProfile?.data.eventLocation}</Text></Text>
                    <Text style={styles.caption}>Date: <Text style={styles.captionBold}>{buffetProfile?.data.eventDate}</Text></Text>
                    <Text style={styles.caption}>Time: <Text style={styles.captionBold}>{buffetProfile?.data.eventTime}</Text></Text>
                    <Text style={styles.caption}><Text style={styles.captionBold}>Note: Please Bring Your Own Container!</Text></Text>
                    <TouchableOpacity style={styles.button} onPress={handleConfirmBooking}>
                        <Text style={styles.buttonText}>Confirm Booking</Text>
                    </TouchableOpacity>
                </View >
            </ImageBackground >
        )
    }
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