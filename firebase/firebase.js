// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
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
// Initialize Firebase app
const app = initializeApp(firebaseConfig);