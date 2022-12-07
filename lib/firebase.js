// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const {NEXT_FIREBASE_API_KEY} = process.env

console.log(NEXT_FIREBASE_API_KEY)

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PROJECT_ID,
  storageBucket: process.env.NEXT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_APP_ID
};

// Initialize Firebase
if(getApps().length<1){
var app = initializeApp(firebaseConfig);
}
export const db = getFirestore(app);
export const auth = getAuth(app)

