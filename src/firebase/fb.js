import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";


export const app = firebase.initializeApp({
    "projectId": "imagenes-net-5460d",
    "appId": "1:1014393202177:web:7348c02d4922c2f34b4200",
    "storageBucket": "imagenes-net-5460d.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyCmdKXr0_UHROQRjQg4fSfj-RaqMDTJVZw",
    "authDomain": "imagenes-net-5460d.firebaseapp.com",
    "messagingSenderId": "1014393202177"
  });

export const auth = getAuth(app);