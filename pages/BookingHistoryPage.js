import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import BuffetDescription from '../components/BuffetDescription'
import { ActivityIndicator } from 'react-native'

const BookingHistoryPage = () => {
    // Variable States
    const [userProfile, setUserProfile] = useState(null);
    // INITIALISE USERDATA
    const route = useRoute();
    const param = route.params;
    useEffect(() => {
        // userProfile is imported from Homepage
        setUserProfile(param.userProfile);
    }, [])
    // Handles opening of buffet event
    const handleOpenBuffet = () => {
        return null;
    }
    if (!userProfile) {
        return <ActivityIndicator />;
    } else {
        return (
            <ScrollView style={styles.container}>
                {/* Loading Each buffet */}
                {userProfile?.data.buffetAdded.map((buffet, index) => {
                    try {
                        return (<BuffetDescription
                            key={buffet.id}
                            imgUrl='../assets/images/buffet1.jpg'
                            eventName={buffet.data.eventName}
                            eventLocation={buffet.data.eventLocation}
                            eventDate={buffet.data.eventDate}
                            eventTime={buffet.data.eventTime}
                            organiserEmail={buffet.data.organiserEmail}
                            handleOpenBuffet={handleOpenBuffet}
                        />
                        )
                    } catch (error) {
                        console.log(error.message)
                    }
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