import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBx6E6jSVZ7wm7jLia5otXkmGwYTny-4ak",
    authDomain: "fir-task-6d788.firebaseapp.com",
    projectId: "fir-task-6d788",
    storageBucket: "fir-task-6d788.appspot.com",
    messagingSenderId: "1031722816054",
    appId: "1:1031722816054:web:d542a65551cbe499eabe97",
    measurementId: "G-GCYHLX5Z0J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db