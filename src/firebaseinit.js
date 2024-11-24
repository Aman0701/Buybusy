// Import the functions you need from the Firebase SDKs you need
import { initializeApp } from "firebase/app"; // Importing the function to initialize Firebase app
import { getFirestore } from 'firebase/firestore'; // Importing the function to access Firestore database

// TODO: Add SDKs for Firebase products that you want to use
// For example, authentication, storage, etc.
// Check the documentation for available libraries: https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdlRuDwj79iS4nW_jM_xSf4YU3x438ck8", // Your Firebase API key
  authDomain: "buybusy-3c8bf.firebaseapp.com", // Your Firebase Auth domain
  projectId: "buybusy-3c8bf", // Your Firebase project ID
  storageBucket: "buybusy-3c8bf.firebasestorage.app", // Your Firebase Storage bucket
  messagingSenderId: "434645314087", // Your Firebase messaging sender ID
  appId: "1:434645314087:web:88da3ceb00eea3d3663c02" // Your Firebase app ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initializing the Firebase app with the provided configuration

// Initialize Firestore and export it for use in other parts of your application
export const db = getFirestore(app); // Getting the Firestore database instance and exporting it