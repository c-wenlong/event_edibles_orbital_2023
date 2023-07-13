// FIREBASE
import { db } from '../firebase/firebase.js';
// REACT NATIVE COMPONENTS
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
// NAVIGATION
import { useRoute } from '@react-navigation/core';

const BuffetDetailsPage = ({ navigation }) => {
    // Variable States
    const [userProfile, setUserProfile] = useState(null);
    const [buffetProfile, setBuffetProfile] = useState(null)
    // INITIALISE USERDATA & BUFFETDATA
    const route = useRoute();
    const param = route.params;
    useEffect(() => {
        // userProfile is imported from Homepage
        setUserProfile(param.userProfile);
    }, [])
    useEffect(() => {
        try {
            // buffetProfile is imported from Homepage
            const thisBuffet = param.buffetProfile;
            db.collection('Buffet Events')
                .doc(thisBuffet)
                .get()
                .then((doc) => {
                    const data = {
                        id: doc.id,
                        data: doc.data(),
                    }
                    setBuffetProfile(data)
                })
        } catch (error) {
            console.log(error.message);
        }
    }, []);
    // Handles Confirming Bookings
    const handleBooking = () => {
        navigation.navigate('ConfirmBooking', { userProfile: userProfile, buffetProfile: buffetProfile })
    }
    // App Interface
    if (!userProfile || !buffetProfile) {
        return <ActivityIndicator />;
    } else {
        return (
            <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={styles.imageBackground}>
                <Image source={require('../assets/images/buffet1.jpg')} style={styles.imageContainer} />
                <View style={styles.bodyContainer}>
                    <Text style={styles.caption}> Event Name: <Text style={styles.captionBold}>{buffetProfile.data.eventName}</Text></Text>
                    <Text style={styles.caption}> Location: <Text style={styles.captionBold}>{buffetProfile.data.eventLocation} </Text></Text>
                    <Text style={styles.caption}> Date: <Text style={styles.captionBold}>{buffetProfile.data.eventDate}</Text></Text>
                    <Text style={styles.caption}> Time: <Text style={styles.captionBold}>{buffetProfile.data.eventTime}</Text></Text >
                    <Text style={styles.caption}> Hosted by: <Text style={styles.captionBold}>{buffetProfile.data.organiserEmail}</Text></Text >
                    <TouchableOpacity style={styles.button} onPress={handleBooking}>
                        <Text style={styles.buttonText}>Add to Booking</Text>
                    </TouchableOpacity>
                </View >
            </ImageBackground >
        )
    }
}
export default BuffetDetailsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
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