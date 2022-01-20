// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAOBtA4gn8gH3UpXg65HYqcv6NQyq5GJ0",
  authDomain: "spotify-clone-e3983.firebaseapp.com",
  projectId: "spotify-clone-e3983",
  storageBucket: "spotify-clone-e3983.appspot.com",
  messagingSenderId: "489980489891",
  appId: "1:489980489891:web:46914367a59de8a73f0f16",
  measurementId: "G-1K9K4LH272"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);