// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtytr4jfuno9TO6DWWP30vhm3K7SoKpj4",
  authDomain: "ecommerceelectronics-9aee1.firebaseapp.com",
  projectId: "ecommerceelectronics-9aee1",
  storageBucket: "ecommerceelectronics-9aee1.appspot.com",
  messagingSenderId: "220648922242",
  appId: "1:220648922242:web:1c3df43c78ad0dce1ee89b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);