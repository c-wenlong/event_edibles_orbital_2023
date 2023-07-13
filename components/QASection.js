// REACT NATIVE COMPONENTS
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const QASection = ({ Q, A }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.question}>{Q}</Text>
            <Text style={styles.answer}>{A}</Text>
        </View>
    )
}

export default QASection

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    question: {
        fontFamily: 'montserrat-bold',
        fontSize: 20,
        textAlign: 'left',
        paddingHorizontal: 16,
    },
    answer: {
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        textAlign: 'left',
        paddingHorizontal: 16,
    }
})