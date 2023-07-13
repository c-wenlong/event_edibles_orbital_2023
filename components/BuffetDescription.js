// REACT NATIVE COMPONENTS
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
// NAVIGATION 
import { useNavigation } from '@react-navigation/native'

const BuffetDescription = ({ id, imgUrl, eventName, eventLocation, eventDate, eventTime, userProfile }) => {
    // Navigation
    const navigation = useNavigation();
    const handleOpenBuffet = () => {
        navigation.navigate('BuffetDetails', { buffetProfile: id, userProfile: userProfile });
    };
    return (
        <TouchableOpacity style={styles.container} onPress={handleOpenBuffet}>
            <Image
                source={require('../assets/images/buffet1.jpg')}
                style={styles.image}
            />
            {/* description */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{eventName}</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{eventLocation}</Text>
                    <Text style={styles.description}>{eventDate} • {eventTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default BuffetDescription

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 200,
        width: 250,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        padding: 3,
    },
    image: {
        width: '100%',
        height: '60%',
        borderRadius: 5,
    },
    titleContainer: {
        paddingHorizontal: 3,
        paddingBottom: 4,
        marginTop: 2,
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        paddingTop: 2,
    },
    descriptionContainer: {
        marginTop: 4,
    },
    description: {
        fontFamily: 'montserrat-regular',
        fontSize: 12,
    }
});