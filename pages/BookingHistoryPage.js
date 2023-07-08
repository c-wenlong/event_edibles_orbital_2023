import { ImageBackground, ScrollView, StyleSheet, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import BuffetDescription from '../components/BuffetDescription'
import { ActivityIndicator } from 'react-native'
import { db } from '../firebase/firebase'

const BookingHistoryPage = () => {
    // Variable States
    const [userProfile, setUserProfile] = useState(null);
    const [buffetData, setBuffetData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    // INITIALISE USERDATA
    const route = useRoute();
    const param = route.params;
    useEffect(() => {
        // userProfile is imported from Homepage
        setUserProfile(param.userProfile);
        if (param.userProfile) {
            loadBuffetData(param.userProfile.data.buffetAdded);
        }
    }, [param.userProfile])
    // GIVEN BY CHATGPT 
    const loadBuffetData = async (buffetIds) => {
        try {
            const buffetPromises = buffetIds.map((buffetId) =>
                db.collection('Buffet Events')
                    .doc(buffetId)
                    .get()
            );
            const buffetSnapshots = await Promise.all(buffetPromises);
            const buffetData = buffetSnapshots.map((buffetSnapshot) => ({
                id: buffetSnapshot.id,
                data: buffetSnapshot.data()
            }));
            setBuffetData(buffetData);
        } catch (error) {
            console.log(error.message);
        }
    };
    // handles page refresh
    const handleRefresh = async () => {
        try {
            setRefresh(true);
            // retrieve new user data
            console.log(userProfile)
            const userDoc = await db.collection('Users').doc(userProfile.id).get();
            const updatedUserProfile = {
                id: userDoc.id,
                data: userDoc.data(),
            }
            // load new buffet
            loadBuffetData(updatedUserProfile.data.buffetAdded);
            // reset refresh status
            setRefresh(false);
        } catch (error) {
            alert(error.message)
        }
    }
    if (!userProfile) {
        return <ActivityIndicator />;
    } else {
        return (
            <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={{ flex: 1 }} imageStyle={styles.imageBackground}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={handleRefresh}
                        />
                    }
                >
                    {/* Loading Each buffet using their ID*/}
                    {buffetData.map((buffet) => {
                        return (
                            <BuffetDescription
                                key={buffet.id}
                                id={buffet.id}
                                imgUrl='../assets/images/buffet1.jpg'
                                eventName={buffet?.data.eventName}
                                eventLocation={buffet?.data.eventLocation}
                                eventDate={buffet?.data.eventDate}
                                eventTime={buffet?.data.eventTime}
                                organiserEmail={buffet?.data.organiserEmail}
                                userProfile={userProfile}
                            />
                        )
                    })}
                </ScrollView>
            </ImageBackground>
        )
    }
}

export default BookingHistoryPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30
    },
    imageBackground: {
        opacity: 0.7,
    },
    scrollView: {
        padding: 30,
    }
})