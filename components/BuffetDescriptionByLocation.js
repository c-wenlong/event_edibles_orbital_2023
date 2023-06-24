import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import BuffetDescription from './BuffetDescription'

const BuffetDescriptionByLocation = () => {
    return (
        <ScrollView style={styles.body}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <Text>THis is a test</Text>
            {/* buffet events */}
            {/*<BuffetDescription imgUrl='../assets/images/buffet1.jpg' />
            {/*<BuffetDescription imgUrl='../assets/images/buffet1.jpg' />
        <BuffetDescription imgUrl='../assets/images/buffet1.jpg' />*/}
        </ScrollView>

    )
}

export default BuffetDescriptionByLocation

const styles = StyleSheet.create({})