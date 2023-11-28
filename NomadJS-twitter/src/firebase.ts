// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcsYhp3LPYQ_qmuhM3UTEnOIEReFk8elA",
    authDomain: "twitter-clone-firebase-be1d6.firebaseapp.com",
    databaseURL: "https://twitter-clone-firebase-be1d6.firebaseio.com",
    projectId: "twitter-clone-firebase-be1d6",
    storageBucket: "twitter-clone-firebase-be1d6.appspot.com",
    messagingSenderId: "973021941098",
    appId: "1:973021941098:web:fc8364ef1073034a6a6913",
    measurementId: "G-PT6YMX9EW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);