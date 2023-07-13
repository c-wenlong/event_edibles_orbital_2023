import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const UserProfileSection = ({title, onPress, content, iconComponent}) => {
    return (
        <View style={styles.contentsContainer}>
            <Text style={styles.description}>{title}</Text>
            <TouchableOpacity style={styles.contents} onPress={onPress}>
                <View style={styles.contents2}>
                    <ArchiveBoxArrowDownIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
                    <Text style={styles.contentText}>{content}</Text>
                </View>
                <ArrowRightIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
            </TouchableOpacity>
        </View>
    )
}

export default UserProfileSection

const styles = StyleSheet.create({
    contentsContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    description: {
        fontFamily: 'montserrat-regular',
        fontSize: 18,
        color: 'rgba(100,100,100,1)',
    },
    contents: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contents2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentText: {
        fontFamily: "montserrat-regular",
        fontSize: 20,
        textAlign: 'center',
        marginLeft: 6,
    },
})