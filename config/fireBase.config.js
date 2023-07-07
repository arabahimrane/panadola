// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqHeyNoRG3jnVL7OXXNl5o_779j6lgxT0",
    authDomain: "panadola-e825d.firebaseapp.com",
    projectId: "panadola",
    storageBucket: "panadola.appspot.com",
    messagingSenderId: "413814804250",
    appId: "1:413814804250:web:b7c07980b4dc1260c326a3",
    measurementId: "G-C1LE793CDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);