// REACT-NATIVE COMPONENTS
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
//EXPO COMPONENTS
import * as ImagePicker from 'expo-image-picker'

const ImageUpload = ({ caption, setSelectedImage, selectedImage }) => {
    // handles upload of images to storage
    const handleImageSelect = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // if the user did not cancel the submission
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleImageSelect}>
                <Text style={styles.buttonText}>{caption}</Text>
            </TouchableOpacity>
            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            )}
        </View>
    )
}

export default ImageUpload

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    selectedImage: {
        marginTop: 5,
        width: 300,
        height: 200,
        borderRadius: 40,
    },
    button: {
        backgroundColor: "rgba(40,150,255,1)",
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