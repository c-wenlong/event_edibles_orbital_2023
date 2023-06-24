// REACT-NATIVE COMPONENTS
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
// CUSTOM COMPONENTS
import BuffetDescription from './BuffetDescription'

const BuffetDescriptionByLocation = ({ id, location, eventName, eventLocation, eventDate, eventTime, handleOpenBuffet }) => {
    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{location}</Text>
                <ArrowRightIcon color='#00CCBB' />
            </View>
            {/*<Text style={styles.description}>{description}</Text>*/}
            <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
                style={{ padding: 4 }}
            >
                <BuffetDescription
                    id='1'
                    imgUrl='../assets/images/buffet1.jpg'
                    eventName={eventName}
                    eventLocation={eventLocation}
                    eventDate={eventDate}
                    eventTime={eventTime}
                    handleOpenBuffet={handleOpenBuffet}
                />
                {/*<BuffetDescription
                    id='1'
                    imgUrl='../assets/images/buffet1.jpg'
                    eventName='welfare dinner @ SOC'
                    eventLocation='SOC'
                    eventDate='21 June'
                    eventTime='1400'
                    handleOpenBuffet={handleOpenBuffet}
                />
                <BuffetDescription
                    id='1'
                    imgUrl='../assets/images/buffet1.jpg'
                    eventName='welfare dinner @ SOC'
                    eventLocation='SOC'
                    eventDate='21 June'
                    eventTime='1400'
                    handleOpenBuffet={handleOpenBuffet}
                />*/}
            </ScrollView>
        </View>
    )
}

export default BuffetDescriptionByLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    headerText: {
        fontFamily: 'montserrat-bold',
        fontSize: 16,
    },
    description: {
        fontFamily: 'montserrat-regular',
        fontSize: '12',
        padding: 4,
        color: 'gray'
    },
})