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
            {imgUrl ? <Image
                source={{ uri: imgUrl }}
                style={styles.image}
            /> : <Image
                source={require("../assets/images/defaultbackground.png")}
                style={styles.image}
            />}
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
        flex: 1,
        padding: 8,
        marginTop: 2,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        paddingTop: 2,
        color: 'rgba(255,100,10,0.7)'
    },
    descriptionContainer: {
        marginTop: 4,
        justifyContent: 'flex-end',
    },
    description: {
        fontFamily: 'montserrat-regular',
        fontSize: 12,
    }
});