// REACT COMPONENT
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// ICONS
import { Ionicons } from '@expo/vector-icons';


const SecureQuestionAnswer = ({ caption, placeholder, value, onChangeText }) => {
    //STATES
    const [showPassword, setShowPassword] = useState(false);
    // Used to set password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <View>
            <Text style={styles.caption}> {caption} </Text>
            <View style={styles.input}>
                <TextInput
                    style={styles.incognito}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity style={styles.eyecon} onPress={togglePasswordVisibility}>
                    <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
        </View >

    )
}

export default SecureQuestionAnswer

const styles = StyleSheet.create({
    caption: {
        fontFamily: "montserrat-regular",
        fontSize: 20,
        textAlign: "left",
        width: 300,
        marginBottom: 5,
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        width: 300,
        height: 50,
    },
    input: {
        fontFamily: "montserrat-regular",
        width: 300,
        height: 50,
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderWidth: 3,
        flexDirection: "row",
        borderColor: 'rgba(100, 214, 255, 0.7)',
    },
    incognito: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: 'montserrat-regular',
    },
    eyecon: {
        paddingRight: 10,
        marginTop: 10,
    },
})