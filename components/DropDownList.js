import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DropDownList = ({ items, onChange, caption, placeholder, value }) => {
    // STATES
    const [isDropDownListVisible, setDropDownListVisible] = useState(false);
    // handles value change
    const handleValueChange = (location) => {
        onChange(location);
    }
    // App interface
    return (
        <View style={styles.container}>
            <Text style={styles.caption}> {caption} </Text>
            {/*<TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                editable={false}
                onTouchStart={() => setDropDownListVisible(true)}
            />*/}
            <RNPickerSelect
                style={customPickerStyles}
                onValueChange={handleValueChange}
                items={items}
                placeholder={{
                    label: placeholder,
                    value: null,
                }}
                isVisible={isDropDownListVisible}
                onClose={() => setDropDownListVisible(false)}
            />
        </View>
    );
};

const customPickerStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        paddingRight: 30, // to ensure the text is never behind the icon
        height: 50,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: 'rgba(100, 214, 255, 0.7)',
    },
    inputAndroid: {
        fontFamily: 'montserrat-regular',
        fontSize: 14,
        paddingRight: 30, // to ensure the text is never behind the icon
        height: 50,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: 'rgba(100, 214, 255, 0.7)',
    },
});

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
        height: 50,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: 'rgba(100, 214, 255, 0.7)',
    },
});

export default DropDownList;
