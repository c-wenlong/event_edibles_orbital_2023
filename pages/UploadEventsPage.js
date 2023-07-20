// REACT COMPONENTS
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
// FIREBASE
import { db, auth, storage } from '../firebase/firebase';
// ICONS
import { ArrowDownOnSquareStackIcon } from 'react-native-heroicons/outline';
// CUSTOM COMPONENTS
import DropDownList from '../components/DropDownList';
import DateTimeSelector from '../components/DateTimeSelector';
import QuestionAnswer from '../components/QuestionAnswer';
import ImageUpload from '../components/ImageUpload';

const UploadEventsPage = () => {
    // STATES
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [comments, setComments] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    // handles updating of form info onto database
    const handleSubmitForm = async () => {
        if (eventTime.trim() === '' || eventLocation.trim() === '' || eventDate.trim() === '' || eventTime.trim() === '') {
            alert("Please Fill In All Blanks Before Submitting!")
        } else {
            const downloadURL = await handleImageUpload(); // uploads the picture to firebase storage
            // adds buffet information into firestore
            db.collection('Buffet Events')
                .add({
                    eventName: eventName,
                    eventLocation: eventLocation,
                    eventDate: eventDate,
                    eventTime: eventTime,
                    organiserEmail: auth.currentUser.email,
                    image: downloadURL,
                    comments: comments,
                    userAdded: [],
                });
        }
        setIsSubmitted(true); // set submitted to be true to refresh a new page
    }
    // handles uploading to storage
    const handleImageUpload = async () => {
        // creates filename
        const eventname = eventName.replace(/[ /]/g, '_'); // Remove spaces and slashes from eventName
        const eventlocation = eventLocation.replace(/[ /]/g, '_'); // Remove spaces from eventLocation
        const eventdate = eventDate.replace(/[ /]/g, '_'); // Remove spaces from eventDate
        const filename = `${eventname}_${eventlocation}_${eventdate}`;
        // upload image onto storage
        const downloadURL = await uploadImage(selectedImage, filename);
        return downloadURL; // return downloadURL directly instead of changing state because there are 2 dependencies with differing formats occupying the same state
    };
    // handles uploading
    const uploadImage = async (assets, filename) => {
        try {
            console.log(assets)
            const response = await fetch(assets.assets[0].uri);
            const blob = await response.blob();
            // Create a reference to the image file in Firebase Storage
            const imageRef = storage.ref().child(`buffetImages/${filename}`);
            // Upload the image file to Firebase Storage
            await imageRef.put(blob);
            // Get the download URL of the uploaded image
            const downloadURL = await imageRef.getDownloadURL();
            return downloadURL;
        } catch (error) {
            console.log(error.message);
        }
    };
    // Refreshes the form
    const handleNewForm = () => {
        setIsSubmitted(false);
        setEventName('');
        setEventLocation('');
        setEventDate('');
        setEventTime('');
        setComments('');
        setSelectedImage(null);
    }
    // Dropdown List options
    const dropdownItems = [
        { label: 'University Town', value: 'UTOWN' },
        { label: 'School of Computing', value: 'SOC' },
        { label: 'Faculty of Arts & Social Sciences', value: 'FASS' },
        { label: 'Faculty of Science', value: 'FOS' },
        { label: 'School of Business', value: 'BIZ' },
        { label: 'College of Design & Engineering', value: 'CDE' },
        { label: 'Yale-NUS College', value: 'YNC' },
    ]
    // App interface
    if (isSubmitted) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'montserrat-bold', fontSize: 24, textAlign: 'center', marginBottom: 2 }}>Uploaded! Check your MyEvents to view update.</Text>
                <ArrowDownOnSquareStackIcon size={200} />
                <TouchableOpacity style={{ backgroundColor: 'blue', padding: 14, borderRadius: 14, marginTop: 40 }} onPress={handleNewForm}>
                    <Text style={{ color: 'white', fontFamily: 'montserrat-bold' }}>New Form</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={{ opacity: 0.5 }}>
                {/* Upload Questionaire */}
                <ScrollView>
                    <View style={styles.questionaire}>
                        <QuestionAnswer caption={"What is the event called?"} placeholder={'Event Name'} value={eventName} onChangeText={text => setEventName(text)} />
                        <DropDownList items={dropdownItems} onChange={text => setEventLocation(text)} caption={"Where is it held?"} placeholder={"Select Location"} value={eventLocation} />
                        <DateTimeSelector caption={"When is it taking place?"} placeholder={"Select Date"} value={eventDate} mode={'date'} onChange={setEventDate} />
                        <DateTimeSelector caption={"What time is it taking place?"} placeholder={"Select Time"} value={eventTime} mode={'time'} onChange={setEventTime} />
                        <QuestionAnswer caption={"Additional Comments?"} placeholder={'Exact Location...'} value={comments} onChangeText={text => setComments(text)} />
                        <ImageUpload content={"Image"} setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
                    </View>
                    {/* Submit Button */}
                    <View style={styles.bottom}>
                        <TouchableOpacity style={styles.submit} onPress={handleSubmitForm}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

export default UploadEventsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,

    },
    questionaire: {
        marginBottom: 40,
    },
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
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "blue",
        borderRadius: 20,
        width: 200,
        height: 50,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'montserrat-bold',
        fontSize: 16,
        color: "white",
    },
    submit: {
        backgroundColor: "blue",
        borderRadius: 20,
        width: "100%",
        height: 50,
        justifyContent: 'center',
    },
})