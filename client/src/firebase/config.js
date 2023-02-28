//Import the required methods
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

//The config we copied from firebase(Replace with your config)
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

//initialize the firebase app
initializeApp(firebaseConfig)

// //initialize firebase auth
const auth = getAuth()

// //export the auth object
export { auth }