// REACT NATIVE COMPONENTS
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimeSelector = ({ caption, placeholder, value, mode, onChange }) => {
    // STATES
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    // confirms selection
    const handleConfirm = (date) => {
        if (mode == 'date') {
            onChange(date.toLocaleDateString());
            console.log(date);
        } else {
            onChange(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            console.log(date);
        }
        setDatePickerVisible(false);
    };
    // App interface
    return (
        <View style={styles.container}>
            <Text style={styles.caption}> {caption} </Text>
            <TextInput onPressIn={() => setDatePickerVisible(true)}
                style={styles.input}
                placeholder={placeholder}
                value={value}
                editable={false}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    caption: {
        fontFamily: "montserrat-regular",
        fontSize: 20,
        textAlign: "left",
        width: 300,
        marginBottom: 5,
        marginTop: 20,
    },
    input: {
        fontFamily: 'montserrat-regular',
        height: 50,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: 'rgba(100, 214, 255, 0.7)',
    },
});

export default DateTimeSelector;
