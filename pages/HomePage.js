import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db, firebase } from "../firebase/firebase"
import { signOut } from '@firebase/auth'
const HomePage = ({ navigation }) => {
    // Variable States
    const [userProfile, setUserProfile] = useState('');
    // Initiase user profile on page
    useEffect(() => {
        // get the collection users
        const SignupData = db.collection('Signup Data');
        // Get the authenticated user
        const userId = firebase.auth().currentUser.uid;
        // Get the user document from Firestore
        SignupData
            .doc(userId)
            .get()
            .then((doc) => {
                setUserProfile(doc.data());
            })
    }, [])
    // Handles Sign Out
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate('Log In');
                console.log('Signed Out of: ' + auth.currentUser?.email)
            })
            .catch(error => alert(error.message))
    }
    // Handles the opening of the buffet informations
    const handleOpenBuffet = () => {
        navigation.navigate('BuffetDetails', { userProfile: userProfile })
    }
    // App interface
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Logged In with {userProfile?.email} as {userProfile?.username}</Text>
            </View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleOpenBuffet}>
                    <Text style={styles.buttonText}>More Information</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: "montserrat-bold",
        fontSize: 30,
        textAlign: 'center',
    },
    body: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 16,
        backgroundColor: "blue",
        borderRadius: 20,
        marginBottom: 100,
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: "white",
    }
})
