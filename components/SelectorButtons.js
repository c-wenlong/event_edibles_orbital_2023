import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MultipleChoiceSelector = ({ caption, onSelectOptions }) => {
    // Variable states
    const [selectedOption, setSelectedOption] = useState('');
    // Handling the button states
    const handleOptionPress = (option) => {
        if (option === "Student") {
            // Deselect the option
            setSelectedOption("Student");
        } else {
            // Select the option
            setSelectedOption("Staff");
        }
    };
    // Only update the selected option once the state has changed using useEffect Hook
    useEffect(() => {
        // saves the selected option
        onSelectOptions(selectedOption);
    }, [selectedOption])
    // App interface
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                {caption}
            </Text>
            <View style={styles.selectorContainer}>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        selectedOption === 'Student' && styles.selectedOptionButton,
                    ]}
                    onPress={() => {
                        handleOptionPress('Student');
                    }}
                >
                    <Text style={styles.optionButtonText}>Student</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        selectedOption === 'Staff' && styles.selectedOptionButton,
                    ]}
                    onPress={() => {
                        handleOptionPress('Staff');
                    }}
                >
                    <Text style={styles.optionButtonText}>Staff</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: "100%",
        padding: 16,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: 'transparent',
        opacity: 0.8,
    },
    headerText: {
        fontFamily: "montserrat-bold",
        fontSize: 24,
        textAlign: "left",
        width: 300,
        height: 60,
    },
    selectorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
    },
    optionButton: {
        paddingVertical: 15,
        borderRadius: 50,
        backgroundColor: 'rgba(100, 214, 255, 1)',
        marginStart: 10,
        width: 150,
    },
    selectedOptionButton: {
        backgroundColor: 'rgba(255, 179, 125, 1)',
    },
    optionButtonText: {
        color: 'rgba(202, 107, 39, 0.4)',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "montserrat-bold"
    },
});

export default MultipleChoiceSelector;
