import { ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import BuffetDescription from '../components/BuffetDescription'
import { ActivityIndicator } from 'react-native'
import { db } from '../firebase/firebase'

const BookingHistoryPage = () => {
    // Variable States
    const [userProfile, setUserProfile] = useState(null);
    const [buffetData, setBuffetData] = useState([]);
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
    if (!userProfile) {
        return <ActivityIndicator />;
    } else {
        return (
            <ScrollView style={styles.container}>
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
        )
    }
}

export default BookingHistoryPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30
    }
})