// REACT-NATIVE COMPONENTS
import { RefreshControl, ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground } from 'react-native'
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
    const [refresh, setRefresh] = useState(false);
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
            })
            .catch(error => alert(error.message))
    }, [])
    // Handles the opening of the userprofile page
    const handleUserProfile = () => {
        navigation.navigate('UserProfile', { userProfile: userProfile });
    };
    // handles refresh
    const handleRefresh = async () => {
        try {
            setRefresh(true);
            // Fetch the updated buffet data from Firestore
            const querySnapshot = await db.collection('Buffet Events').get();
            const updatedBuffetList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            // Update the buffetList state with the fetched data
            setBuffetList(updatedBuffetList);
            // Set the refreshing state to false
            setRefresh(false);
        } catch (error) {
            alert(error.message)
        }
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
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={handleRefresh}
                            />
                        }>
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
                </View>
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
    scrollView: {
        padding: 30,
    },
})
