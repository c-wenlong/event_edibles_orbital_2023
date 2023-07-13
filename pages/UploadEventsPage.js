// REACT COMPONENTS
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { ImagePicker } from 'react-native-image-picker';
// FIREBASE
import { db, auth, storage } from '../firebase/firebase';
// ICONS
import { ArrowDownOnSquareStackIcon } from 'react-native-heroicons/outline';
// CUSTOM COMPONENTS
import DropDownList from '../components/DropDownList';
import DateTimeSelector from '../components/DateTimeSelector';
import QuestionAnswer from '../components/QuestionAnswer';

const UploadEventsPage = () => {
    // STATES
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [comments, setComments] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [image, setImage] = useState(null);
    // handles updating of form info onto database
    const handleSubmitForm = () => {
        if (eventTime.trim() === '' || eventLocation.trim() === '' || eventDate.trim() === '' || eventTime.trim() === '') {
            alert("Please Fill In All Blanks Before Submitting!")
        } else {
            db.collection('Buffet Events')
                .add({
                    eventName: eventName,
                    eventLocation: eventLocation,
                    eventDate: eventDate,
                    eventTime: eventTime,
                    organiserEmail: auth.currentUser.email,
                    comments: comments,
                    userAdded: [],
                });
            setIsSubmitted(true);
        }
    }
    // Refreshes the form
    const handleNewForm = () => {
        setIsSubmitted(false);
        setEventName('');
        setEventLocation('');
        setEventDate('');
        setEventTime('');
        setComments('');
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
    // handles upload of images to storage
    const handleImageUpload = async () => {
        try {
            // Create a unique filename for the image
            const filename = Date.now().toString();
            // Get the reference to the image in Firebase Storage
            const storageRef = storage.ref().child(filename);
            // Upload the image file to Firebase Storage
            await storageRef.put(image);
            // Get the download URL of the uploaded image
            const downloadURL = await storageRef.getDownloadURL();
            // Store the download URL in the database or use it as needed
            // setImage(downloadURL)
            console.log("Image uploaded successfully:", downloadURL);
        } catch (error) {
            console.log("Error uploading image:", error.message);
        }
    };
    // handles choosing image file
    const handleChooseImage = () => {
        ImagePicker.showImagePicker((response) => {
            if (!response.didCancel && !response.error) {
                // Set the selected image file to the state variable
                setImage(response.uri);
            }
        });
    };
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
                <View style={styles.questionaire}>
                    <QuestionAnswer caption={"What is the event called?"} placeholder={'Event Name'} value={eventName} onChangeText={text => setEventName(text)} />
                    <DropDownList items={dropdownItems} onChange={text => setEventLocation(text)} caption={"Where is it held?"} placeholder={"Select Location"} value={eventLocation} />
                    <DateTimeSelector caption={"When is it taking place?"} placeholder={"Select Date"} value={eventDate} mode={'date'} onChange={setEventDate} />
                    <DateTimeSelector caption={"What time is it taking place?"} placeholder={"Select Time"} value={eventTime} mode={'time'} onChange={setEventTime} />
                    <QuestionAnswer caption={"Additional Comments?"} placeholder={'Exact Location...'} value={comments} onChangeText={text => setComments(text)} />
                    <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
                        <Text style={styles.buttonText}>Choose Image</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                {/* Submit Button */}
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmitForm}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
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
})