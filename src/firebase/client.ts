// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTTAGjOVva-5bSTFRVfc9juqPV8kExiUU",
  authDomain: "optimale.firebaseapp.com",
  projectId: "optimale",
  storageBucket: "optimale.appspot.com",
  messagingSenderId: "1989095292",
  appId: "1:1989095292:web:1e0b23cac3f79f4fc73ef9",
  measurementId: "G-X39LV59KQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);