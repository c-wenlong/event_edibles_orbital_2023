// REACT NATIVE COMPONENTS
import { StyleSheet, Text, View, Switch, ImageBackground } from 'react-native'
import React, { useState } from 'react'
// ICONS
import { BellIcon } from 'react-native-heroicons/outline'
// CUSTOM COMPONENTS
import SlideOptions from '../components/SlideOptions'

const NotificationSettingsPage = () => {
  //STATES
  const [mainNotif, setMainNotif] = useState(false);
  const [newEventNotif, setNewEventNotif] = useState(false);
  const [bookedEventReminderNotif, setBookedEventReminderNotif] = useState(false);
  const [nearbyEventsNotif, setNearbyEventNotif] = useState(false);
  const [fullBookingNotif, setFullBookingNotif] = useState(false);
  // App Interface
  return (
    <ImageBackground style={styles.imageBackground} source={require('../assets/images/posterwithoutlogo.png')}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <BellIcon size={50} color={'rgba(100, 214, 255, 1)'} />
          <SlideOptions title="Push Notifications" isEnabled={mainNotif} setIsEnabled={setMainNotif} />
        </View>
        {/* OPTIONS */}
        {mainNotif
          ?
          <View style={styles.optionsContainer}>
            <Text style={{ fontFamily: 'montserrat-bold', fontSize: 20, marginBottom: 15, padding: 5, }}> For Students </Text>
            <SlideOptions title="New Event Alerts" isEnabled={newEventNotif} setIsEnabled={setNewEventNotif} />
            <SlideOptions title="Upcoming Events Alerts" isEnabled={bookedEventReminderNotif} setIsEnabled={setBookedEventReminderNotif} />
            <SlideOptions title="Nearby Event Alerts" isEnabled={nearbyEventsNotif} setIsEnabled={setNearbyEventNotif} />
            <Text style={{ fontFamily: 'montserrat-bold', fontSize: 20, marginVertical: 15, padding: 5, }}> For Organisers </Text>
            <SlideOptions title="Full Booking Alerts" isEnabled={fullBookingNotif} setIsEnabled={setFullBookingNotif} />
          </View>
          : null
        }
      </View>
    </ImageBackground>
  )
}

export default NotificationSettingsPage

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'gray',
    margin: 30,
    alignItems: 'center',
    backgroundColor:'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: 'gray',
  },
  caption: {
    fontFamily: 'montserrat-regular',
    fontSize: 20,
    padding: 10,
  },
  optionsContainer: {
    paddingTop: 10,
  }
})