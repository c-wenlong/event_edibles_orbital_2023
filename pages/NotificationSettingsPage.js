// REACT NATIVE COMPONENTS
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// ICONS
import { BellIcon } from 'react-native-heroicons/outline'

const NotificationSettingsPage = () => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      {/* OPTIONS */}
      <View style={styles.option}>
        <BellIcon size={40} color={'rgba(100, 214, 255, 0.7)'} />
        <Text></Text>
      </View>
    </View>
  )
}

export default NotificationSettingsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
  }

})