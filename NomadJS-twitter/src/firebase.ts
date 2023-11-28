// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
// const analytics = getAnalytics(app);

export const auth = getAuth(app); // 가져온 app에 auth 기능을 사용하고 싶어요~
export const storage = getStorage(app); // 파베 스토리지 사용하기~
export const db = getFirestore(app); // 파베 스토리지 사용하기~