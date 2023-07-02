// REACT-NATIVE COMPONENTS
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
// Use after hiding top bar
import { SafeAreaView } from 'react-native-safe-area-context'
// FIREBASE OBJECTS
import { auth, db, firebase } from "../firebase/firebase"
import { signOut } from '@firebase/auth'
// CUSTOM COMPONENTS IN BODY
import BuffetDescriptionByLocation from '../components/BuffetDescriptionByLocation'
// Icons
import { UserIcon, UserCircleIcon } from 'react-native-heroicons/outline'

const HomePage = ({ navigation }) => {
    // Variable States
    const [userProfile, setUserProfile] = useState('');
    const [buffetList, setBuffetList] = useState('');
    // INITIALISE USER && BUFFET DATA
    useEffect(() => {
        // Get userID as the document code
        const userId = auth.currentUser.uid;
        // Get the user document from Firestore
        db.collection('Users')
            .doc(userId)
            .get()
            .then((doc) => {
                setUserProfile({
                    id: userId,
                    data: doc.data(),
                });
            })
        db.collection('Buffet Events')
            .doc()
            .get()
            .then(doc => {
                setBuffetList(doc);
            })
    }, [])
    // Handles the opening of the buffet informations
    const handleOpenBuffet = () => {
        navigation.navigate('BuffetDetails', { userProfile: userProfile, buffetProfile: 'NUSBuffet' })
    }
    // Handles the opening of the userprofile page
    const handleUserProfile = () => {
        navigation.navigate('UserProfile', { userProfile: userProfile });
    }
    // App interface
    if (!userProfile) {
        return <ActivityIndicator />;
    } else {
        return (
            <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={{opacity:0.7}}>
                {/* header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome to Event Edibles!</Text>
                    <TouchableOpacity onPress={handleUserProfile}>
                        <UserCircleIcon size={50} style={styles.profileIcon} color='rgba(100, 214, 255, 0.7)'/>
                    </TouchableOpacity>
                </View>
                {/* body */}
                <ScrollView style={styles.body}>
                    {/* Filtered by Location */}
                    <BuffetDescriptionByLocation
                        id='SOC'
                        location="School of Computing"
                        eventName='Welfare Lunch @ SOC'
                        eventLocation='SOC'
                        eventDate='21 June'
                        eventTime='1400'
                        handleOpenBuffet={handleOpenBuffet}
                    />
                    {/*<BuffetDescriptionByLocation
                        id='FASS'
                        location="Faculty of Arts & Social Sciences"
                        eventName='Welfare Lunch @ FASS'
                        eventLocation='FASS'
                        eventDate='22 June'
                        eventTime='1430'
                    />
                    <BuffetDescriptionByLocation
                        id='FOS'
                        location="Faculty of Science"
                        eventName='Welfare Lunch @ FOS'
                        eventLocation='FOS'
                        eventDate='23 June'
                        eventTime='1450'
                    />
                    <BuffetDescriptionByLocation
                        id='BIZ'
                        location="School of Business"
                        eventName='Welfare Lunch @ BIZ'
                        eventLocation='FOS'
                        eventDate='22 June'
                        eventTime='1430'
                    />
                    <BuffetDescriptionByLocation
                        id='CDE'
                        location="College of Design & Engineering"
                        eventName='Welfare Lunch @ CDE'
                        eventLocation='CDE'
                        eventDate='29 June'
                        eventTime='1600'
                    />*/}
                </ScrollView>
            </ImageBackground >
        )
    }
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontFamily: "montserrat-bold",
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 16,
    },
    profileIcon: {
        marginRight: 15,
    },
    body: {
        flex: 1,
        width: '100%',
        height: '200%',
    },
    buffetDescriptionContainer: {
        flex: 1,
        width: '100%',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buffetDescription: {

    }
})
