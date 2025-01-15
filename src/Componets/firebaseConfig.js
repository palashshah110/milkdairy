// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi2XrxeNcuddCygpE-XevR_-4NrKMWsd4",
  authDomain: "ecom-99277.firebaseapp.com",
  projectId: "ecom-99277",
  storageBucket: "ecom-99277.firebasestorage.app",
  messagingSenderId: "325487577797",
  appId: "1:325487577797:web:aad5b6dcb74c118023beac",
  measurementId: "G-VTL3MYY546"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);

export { auth };
