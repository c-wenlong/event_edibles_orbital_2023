import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db, firebase } from "../firebase/firebase"
import { signOut } from '@firebase/auth'
const HomePage = ({ navigation }) => {
    // Variable States
    const [username, setUsername] = useState('');
    // Initiase States on page
    useEffect(() => {
        // get the collection users
        const signupDataCollection = db.collection('Signup Data');
        // Get the authenticated user
        const userId = firebase.auth().currentUser.uid;
        // Get the user document from Firestore
        signupDataCollection
            .doc(userId)
            .get()
            .then((doc) => {
                setUsername(doc.data().username);
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
    // App interface
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Logged In with {auth.currentUser?.email} as {username}</Text>
            </View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuffetDetails')}>
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
