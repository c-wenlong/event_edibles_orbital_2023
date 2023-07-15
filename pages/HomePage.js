// REACT-NATIVE COMPONENTS
import { RefreshControl, ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
// FIREBASE OBJECTS
import { auth, db } from "../firebase/firebase"
// CUSTOM COMPONENTS IN BODY
import BuffetDescriptionByLocation from '../components/BuffetDescriptionByLocation' // to be further implemented
// ICONS
import { UserCircleIcon, MagnifyingGlassCircleIcon } from 'react-native-heroicons/outline'

const HomePage = ({ navigation }) => {
    // STATES
    const [userProfile, setUserProfile] = useState(null);
    const [buffetList, setBuffetList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState('');
    // INITIALISE USER && BUFFET DATA
    useEffect(() => {
        // Get userID as the document code
        const userId = auth.currentUser.uid;
        // Get the user document from Firestore
        db.collection('Users')
            .doc(userId)
            .get()
            .then((doc) => {
                setUserProfile({
                    id: userId,
                    data: doc.data(),
                });
            })
            .catch(error => alert(error.message))
        db.collection('Buffet Events')
            .get()
            .then((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setBuffetList(data);
            })
            .catch(error => alert(error.message))
    }, [])
    // Handles the opening of the userprofile page
    const handleUserProfile = () => {
        navigation.navigate('UserProfile', { userProfile: userProfile });
    };
    // handles page refresh
    const handleRefresh = async () => {
        try {
            setRefresh(true);
            // Fetch the updated buffet data from Firestore
            const querySnapshot = await db.collection('Buffet Events').get();
            const updatedBuffetList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            // Update the buffetList state with the fetched data
            setBuffetList(updatedBuffetList);
            // Set the refreshing state to false
            setRefresh(false);
            console.log('refreshed')
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(() => {
    }, [buffetList])
    // List of all locations for buffets
    const buffetLocations = [
        { label: 'University Town', value: 'UTOWN' },
        { label: 'School of Computing', value: 'SOC' },
        { label: 'Faculty of Arts & Social Sciences', value: 'FASS' },
        { label: 'Faculty of Science', value: 'FOS' },
        { label: 'School of Business', value: 'BIZ' },
        { label: 'College of Design & Engineering', value: 'CDE' },
        { label: 'Yale-NUS College', value: 'YNC' },
    ] // use this list to nested map each location to each BuffetEventsByLocation
    // App interface
    if (!buffetList.length) {
        return <ActivityIndicator />;
    } else {
        return (
            <ImageBackground source={require('../assets/images/posterwithoutlogo.png')} style={styles.container} imageStyle={{ opacity: 0.7 }}>
                {/* header */}
                <View style={styles.header}>
                    <View style={{ marginLeft: 16, padding: 10 }}>
                        <Text style={styles.title}>Welcome to Event Edibles!</Text>
                        <View style={styles.searchBar}>
                            <MagnifyingGlassCircleIcon color="black" size={30} />
                            <TextInput style={styles.search} placeholder='Search' onChange={text => setSearch(text)} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleUserProfile}>
                        <UserCircleIcon size={60} style={styles.profileIcon} color='rgba(100, 214, 255, 1)' />
                    </TouchableOpacity>
                </View>
                {/* SCROLLVIEW */}
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={handleRefresh}
                            />
                        }>
                        {/* Map each buffet location with its corresponding horizontal ScrollView */}
                        {buffetLocations.map(location => {
                            return (<BuffetDescriptionByLocation key={location.value} filterByLocation={location.label} id={location.value} buffetProfile={buffetList} userProfile={userProfile} />)
                            {/* value is UTOWN, label is University Town */}
                        })}
                        {/* Loading Each buffet */}
                        {/*buffetList.map((buffet) => {
                            try {
                                return (<BuffetDescription
                                    key={buffet.id}
                                    id={buffet.id}
                                    imgUrl='../assets/images/buffet1.jpg'
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
                        })*/}
                    </ScrollView>
                </View>
            </ImageBackground >
        )
    }
}


/* <BuffetDescriptionByLocation
    FilterByLocation="School Of Computing"
    key="School Of Computing"
    id="School Of Computing"
    buffetProfile={buffetProfile}
    userProfile={userProfile}
    /> */
export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    title: {
        fontFamily: "montserrat-bold",
        fontSize: 20,
        textAlign: 'center',
        color: 'rgba(10,150,255,1)'
    },
    searchBar: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 40,
        borderColor: 'rgba(100, 214, 255, 1)',
        borderWidth: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    search: {
        fontFamily: 'montserrat-bold',
        fontSize: 14,
        color: 'black',
        marginLeft: 4,
    },
    profileIcon: {
        marginRight: 15,
    },
    scrollView: {
        padding: 20,
    },
})
