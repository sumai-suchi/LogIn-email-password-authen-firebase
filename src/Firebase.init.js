// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//dont show the config in public
const firebaseConfig = {
  apiKey: "AIzaSyC1epDmFdERoYXZI-tvHjGb1ZGE4vGq00A",
  authDomain: "email-password-auth-933bc.firebaseapp.com",
  projectId: "email-password-auth-933bc",
  storageBucket: "email-password-auth-933bc.firebasestorage.app",
  messagingSenderId: "28583949777",
  appId: "1:28583949777:web:a52a6ebdeea5f428fb1cf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);