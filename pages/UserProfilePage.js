import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/core';
import { UserCircleIcon, ArchiveBoxArrowDownIcon, ArrowRightIcon, BellIcon, ChatBubbleLeftRightIcon } from 'react-native-heroicons/outline';
import { signOut } from 'firebase/auth';
import { auth, db, firebase } from '../firebase/firebase'

const UserProfilePage = ({ navigation }) => {
    // Variable States
    const [userProfile, setUserProfile] = useState(null);
    // INITIALISE USERDATA
    const route = useRoute();
    const param = route.params;
    useEffect(() => {
        // userProfile is imported from Homepage
        setUserProfile(param.userProfile);
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
    // handles opening of booking history
    const handleBookingHistory = () => {
        navigation.navigate('BookingHistory', { userProfile: userProfile });
    }
    // handles opening of notif
    const handleNotificationSettings = () => {
        console.log('Notif setting To be Developed!')
    }
    // handles opening of Q&A
    const handleQNA = () => {
        console.log('Q&A still under dev')
    }
    // handles upload page
    const handleUploadEvent = () => {
        navigation.navigate('UploadEvents')
    }
    return (
        <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={{ opacity: 0.7 }}>
            {/* header */}
            <View style={styles.header}>
                <UserCircleIcon size={100} style={styles.profilePhoto} color={'rgba(100, 214, 255, 0.7)'} />
                <Text style={styles.username}>{userProfile?.data.username}</Text>
                <Text style={styles.email}>{userProfile?.data.email}</Text>
            </View>
            {/* body */}
            <View style={styles.body}>
                <View style={styles.contentsContainer}>
                    <Text style={styles.description}>Contents</Text>
                    <TouchableOpacity style={styles.contents} onPress={handleBookingHistory}>
                        <View style={styles.contents2}>
                            <ArchiveBoxArrowDownIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
                            <Text style={styles.contentText}>Booking History</Text>
                        </View>
                        <ArrowRightIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentsContainer}>
                    <Text style={styles.description}>Preferences</Text>
                    <TouchableOpacity style={styles.contents} onPress={handleNotificationSettings}>
                        <View style={styles.contents2}>
                            <BellIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
                            <Text style={styles.contentText}>Notification Setting</Text>
                        </View>
                        <ArrowRightIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentsContainer}>
                    <Text style={styles.description}>Help</Text>
                    <TouchableOpacity style={styles.contents} onPress={handleQNA}>
                        <View style={styles.contents2}>
                            <ChatBubbleLeftRightIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
                            <Text style={styles.contentText}>Q & A</Text>
                        </View>
                        <ArrowRightIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
                    </TouchableOpacity>
                </View><View style={styles.contentsContainer}>
                    <Text style={styles.description}></Text>
                    <TouchableOpacity style={styles.contents} onPress={handleUploadEvent}>
                        <View style={styles.contents2}>
                            <ChatBubbleLeftRightIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
                            <Text style={styles.contentText}>Upload Events</Text>
                        </View>
                        <ArrowRightIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default UserProfilePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 2,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    profilePhoto: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    username: {
        textAlign: 'center',
        fontFamily: 'montserrat-bold',
        fontSize: 36,
    },
    email: {
        textAlign: 'center',
        fontFamily: 'montserrat-regular',
        color: 'rgba(50,50,50,1)',
        fontSize: 28,
    },
    body: {
        flex: 4,
        width: '100%',
    },
    contentsContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    description: {
        fontFamily: 'montserrat-regular',
        fontSize: 18,
        color: 'rgba(100,100,100,1)',
    },
    contents: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contents2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentText: {
        fontFamily: "montserrat-regular",
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 6,
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(200,200,200,0.1)',
        width: '100%',
    },
    button: {
        backgroundColor: "blue",
        borderRadius: 20,
        width: 200,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: "white",
    },
})