// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMxHwx2qGbqUeIW3lin6Lw6Gu7bjzDL_A",
  authDomain: "event-edibles.firebaseapp.com",
  projectId: "event-edibles",
  storageBucket: "event-edibles.appspot.com",
  messagingSenderId: "486314431756",
  appId: "1:486314431756:web:c66a4637367894e31a2529",
  databaseURL: 'https://event-edibles.firebaseio.com',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get Authentication Obj
const auth = firebase.auth();
// Get the firestore database obj
const db = firebase.firestore();
// Get storage for image and video storage
const storage = firebase.storage();

// Retrieve the list of users and their personal information
const getUserData = () => {
  return db.collection('Signup Data')
    .get()
    .then(results => results.docs)
    .then(docs => docs.map(doc => ({
      id: doc.id,
      accountType: doc.data().accountType,
      username: doc.data().username,
      email: doc.data().email,
      // password: doc.data().password,
    })))
}

// Retrieve the list of buffets from database
const getBuffetData = () => {
  return db.collection('Buffet Events')
    .get()
    .then(results => results.docs)
    .then(docs => docs.map(doc => ({
      id: doc.id,
      eventName: doc.data().eventName,
      eventLocation: doc.data().eventLocation,
      eventDate: doc.data().eventDate,
      eventTime: doc.data().eventTime,
      organiserName: doc.data().organiserName,
    })))
}

export { firebase, auth, db, storage, getUserData, getBuffetData };