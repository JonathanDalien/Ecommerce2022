// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyDwPcHIFsgwN9zILWiIc_6GzD9ONHUvqOQ",
  authDomain: "electronicsecommerce-1f2ad.firebaseapp.com",
  projectId: "electronicsecommerce-1f2ad",
  storageBucket: "electronicsecommerce-1f2ad.appspot.com",
  messagingSenderId: "351825350641",
  appId: "1:351825350641:web:36c69b27aafeec475f7e50"
};

// Initialize Firebase
if(getApps().length<1){
var app = initializeApp(firebaseConfig);
}
export const db = getFirestore(app);
export const auth = getAuth(app)

