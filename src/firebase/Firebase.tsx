// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // This firebase/auth will help us to registe our use to firebase.
import { getFirestore } from "firebase/firestore";
{
  /* So this is the code responsible for connecting firebase with our reactJs project .And  the firebaseConfig = this is the configuration  */
}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4bPPZwWzP-hZmQOOBl2UIYuEH_URu0Qs",
  authDomain: "authentication-900fd.firebaseapp.com",
  projectId: "authentication-900fd",
  storageBucket: "authentication-900fd.appspot.com",
  messagingSenderId: "386918250913",
  appId: "1:386918250913:web:eddc6281971c6f00b6b3e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
