// REACT-NATIVE COMPONENTS
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
// FIREBASE OBJECTS
import { auth, db } from "../firebase/firebase"
// CUSTOM COMPONENTS IN BODY
import BuffetDescription from '../components/BuffetDescription'
import BuffetDescriptionByLocation from '../components/BuffetDescriptionByLocation'
// Icons
import { UserCircleIcon } from 'react-native-heroicons/outline'

const HomePage = ({ navigation }) => {
    // Variable States
    const [userProfile, setUserProfile] = useState(null);
    const [buffetList, setBuffetList] = useState([]);
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
            .catch(error => alert(error.message))
        db.collection('Buffet Events')
            .get()
            .then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setBuffetList(data);
                console.log(data)
            })
            .catch(error => alert(error.message))
    }, [])
    // Handles the opening of the buffet informations
    const handleOpenBuffet = (id) => {
        navigation.navigate('BuffetDetails', { userProfile: userProfile, buffetProfile: id })
    }
    // Handles the opening of the userprofile page
    const handleUserProfile = () => {
        navigation.navigate('UserProfile', { userProfile: userProfile });
    }
    // App interface
    if (!buffetList.length) {
        return <ActivityIndicator />;
    } else {
        return (
            <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={{ opacity: 0.7 }}>
                {/* header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome to Event Edibles!</Text>
                    <TouchableOpacity onPress={handleUserProfile}>
                        <UserCircleIcon size={50} style={styles.profileIcon} color='rgba(100, 214, 255, 0.7)' />
                    </TouchableOpacity>
                </View>
                {/* SCROLLVIEW */}
                <ScrollView contentContainerStyle={styles.body}>
                    {/* Loading Each buffet */}
                    {buffetList.map((buffet) => {
                        try {
                            return (<BuffetDescription
                                key={buffet.id}
                                id={buffet.id}
                                imgUrl='../assets/images/buffet1.jpg'
                                eventName={buffet.data.eventName}
                                eventLocation={buffet.data.eventLocation}
                                eventDate={buffet.data.eventDate}
                                eventTime={buffet.data.eventTime}
                                userProfile={userProfile}
                            />
                            )
                        } catch (error) {
                            alert(error.message)
                        }
                    })}
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        width: '100%',
        borderRadius: 10,
    },
})
