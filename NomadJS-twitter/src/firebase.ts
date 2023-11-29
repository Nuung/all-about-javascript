// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwjr6NbiRqowchOhrD4582FO6p0dfrtGU",
    authDomain: "nomadjs-tweet.firebaseapp.com",
    projectId: "nomadjs-tweet",
    storageBucket: "nomadjs-tweet.appspot.com",
    messagingSenderId: "181081523117",
    appId: "1:181081523117:web:28295a128933eeb58dd724"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // 가져온 app에 auth 기능을 사용하고 싶어요~
export const storage = getStorage(app); // 파베 스토리지 사용하기~
export const db = getFirestore(app); // 파베 스토리지 사용하기~