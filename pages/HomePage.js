// REACT-NATIVE COMPONENTS
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// FIREBASE OBJECTS
import { auth, db, firebase } from "../firebase/firebase"
import { signOut } from '@firebase/auth'
// CUSTOM COMPONENTS IN BODY
import BuffetDescriptionByLocation from '../components/BuffetDescriptionByLocation'
import BuffetDescription from '../components/BuffetDescription'

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
    // Handles Sign Out
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate('Log In');
                console.log('Signed Out of: ' + userProfile?.data.email)
            })
            .catch(error => alert(error.message))
    }
    // Handles the opening of the buffet informations
    const handleOpenBuffet = () => {
        navigation.navigate('BuffetDetails', { userProfile: userProfile, buffetProfile: 'NUSBuffet' })
    }
    // App interface
    if (!userProfile) {
        return <ActivityIndicator />;
    } else {
        return (
            <View style={styles.container}>
                {/* header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Logged In with {userProfile?.data.email} as {userProfile?.data.username}</Text>
                </View>
                {/* body */}
                <BuffetDescriptionByLocation />
                {/*<BuffetDescription/>*/}
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontFamily: "montserrat-bold",
        fontSize: 20,
        textAlign: 'center',
    },
    body: {
        flex: 6,
        width: '100%',
        height: '200%'
    },
    button: {
        padding: 16,
        backgroundColor: "blue",
        borderRadius: 20,
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: "white",
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
