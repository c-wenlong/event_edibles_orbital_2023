// REACT-NATIVE COMPONENTS
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React, { useState, useEffect } from 'react'
// ICONS
import { ArrowRightIcon } from 'react-native-heroicons/outline'
// CUSTOM COMPONENTS
import BuffetDescription from './BuffetDescription'

const BuffetDescriptionByLocation = ({ filterByLocation, id, buffetProfile, userProfile }) => {
    // STATES
    const [buffetList, setBuffetList] = useState([]);
    // FILTER DATA
    useEffect(() => {
        // filters all buffet events that have the location "School of Computing" (filterByLocation)
        filteredBuffetList = buffetProfile.filter(buffet => {
            return buffet.data.eventLocation == id
        })
        setBuffetList(filteredBuffetList);
    }, [buffetProfile])
    // App Interface
    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{filterByLocation}</Text>
                <ArrowRightIcon color='rgba(100, 214, 255, 1)' />
            </View>
            {/* ScrolLView */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
            >
                {/* Loading Each buffet */}
                {buffetList.map((buffet) => {
                    try {
                        return (<BuffetDescription
                            key={buffet.id}
                            id={buffet.id}
                            imgUrl={buffet.data.image}
                            eventName={buffet.data.eventName}
                            eventLocation={buffet.data.eventLocation}
                            eventDate={buffet.data.eventDate}
                            eventTime={buffet.data.eventTime}
                            userProfile={userProfile}
                        />
                        )
                    } catch (error) {
                        alert(error.message)
                    }
                })}
            </ScrollView>
        </View>
    )
}

export default BuffetDescriptionByLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    header: {
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        fontFamily: 'montserrat-bold',
        fontSize: 20,
        color: 'rgba(255,100,10,1)'
    },
    scrollView: {

    }
})