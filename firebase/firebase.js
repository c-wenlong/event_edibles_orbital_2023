// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
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


export {firebase};