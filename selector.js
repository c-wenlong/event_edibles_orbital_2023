import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';



const MultipleChoiceSelector = () => {

    //import monserrat font.
    const loadFonts = async () => {
        await Font.loadAsync({
            'montserrat-regular': require('./assets/Montserrat/static/Montserrat-Regular.ttf'),
            'montserrat-bold': require('./assets/Montserrat/static/Montserrat-Bold.ttf'),
            // Add other font styles if needed
        });
    };
    useEffect(() => {
        loadFonts();
    }, []);

    // handling the button states
    const [selectedOption, setSelectedOption] = useState([]);

    const handleOptionPress = (option) => {
        if (selectedOption === option) {
          // Deselect the option
          setSelectedOption("");
        } else {
          // Select the option
          setSelectedOption(option);
        }
      };
      

    // handling UI
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.optionButton,
                    selectedOption.includes('Student') && styles.selectedOptionButton,
                ]}
                onPress={() => handleOptionPress('Student')}
            >
                <Text style={styles.optionButtonText}>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.optionButton,
                    selectedOption.includes('Staff') && styles.selectedOptionButton,
                ]}
                onPress={() => handleOptionPress('Staff')}
            >
                <Text style={styles.optionButtonText}>Staff</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginBottom: 40,
    },
    optionButton: {
        paddingVertical: 15,
        borderRadius: 50,
        backgroundColor: 'rgba(140, 20, 252,0.7)',
        marginStart: 10,
        width: 150,
    },
    selectedOptionButton: {
        backgroundColor: 'rgb(11,206,131)',
    },
    optionButtonText: {
        color: 'rgba(240,240,240,1)',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "montserrat-regular"
    },
});

export default MultipleChoiceSelector;
