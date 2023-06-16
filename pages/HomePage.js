import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const HomePage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is the HomePage</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Log In")}>
                <Text>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('BuffetDetails')}>
                <Text>More Information</Text>
            </TouchableOpacity>
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
    title: {
        fontFamily: "montserrat-bold",
        fontSize: 50,
        textAlign: 'center',
    },
})
