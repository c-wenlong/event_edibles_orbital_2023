import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BuffetDescription = ({ imgUrl }) => {
    console.log('loading description')
    return (
        <TouchableOpacity>
            <Image source={imgUrl} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Buffet Event</Text>
                <Text style={styles.subtitle}>Date & Time</Text>
                <Text style={styles.description}>July 15, 2023 | 7:00 PM</Text>
                <Text style={styles.subtitle}>Location</Text>
                <Text style={styles.description}>123 Main Street, City</Text>
            </View>
        </TouchableOpacity>
    )
}

export default BuffetDescription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: 20,
        margin: 10,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 30,
        flexDirection: 'row'
    },
    image: {
        width: '80%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 16,
        marginRight: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 10,
    },
});