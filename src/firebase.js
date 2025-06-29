
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAekwvAE6YjdNxNjo-lRpqKRaOzPifazvM",
  authDomain: "loan-c02d1.firebaseapp.com",
  projectId: "loan-c02d1",
  storageBucket: "loan-c02d1.appspot.com",
  messagingSenderId: "697775010361",
  appId: "1:697775010361:web:99465b42178fd26df053e8"
};
// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()