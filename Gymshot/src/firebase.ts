// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB93TJLFYIO7emoXB_y304OJhjeuu-0XYw",
    authDomain: "gymshot-19ec1.firebaseapp.com",
    projectId: "gymshot-19ec1",
    storageBucket: "gymshot-19ec1.appspot.com",
    messagingSenderId: "947116898029",
    appId: "1:947116898029:web:64a836384669fb20adfee4",
    measurementId: "G-0SZ6PN231M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 가져온 app에 auth 기능을 사용하고 싶어요~
export const storage = getStorage(app); // 파베 스토리지 사용하기~
export const db = getFirestore(app); // 파베 스토리지 사용하기~


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);