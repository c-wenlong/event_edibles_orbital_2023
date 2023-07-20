// REACT-NATIVE COMPONENTS
import { StyleSheet, Text, View, Switch } from 'react-native'
import React from 'react'

const SlideOptions = ({ title, isEnabled, setIsEnabled }) => {
    // handles the toggling of switch
    const handleToggleSwitch = () => {
        setIsEnabled(!isEnabled);
    }
    // App Interface
    return (
        <View style={styles.header}>
            <Text style={styles.caption}>{title}</Text>
            <Switch
                trackColor={{ false: 'white', true: 'rgba(100, 214, 255, 0.6)' }}
                thumbColor={isEnabled ? 'rgba(100, 214, 255, 1)' : 'white'}
                ios_backgroundColor="black"
                onValueChange={handleToggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}

export default SlideOptions

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    caption: {
        fontFamily: 'montserrat-regular',
        fontSize: 20,
        padding: 10,
    },
})