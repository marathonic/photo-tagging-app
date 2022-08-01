// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4weBN7LPtDtyPQmePN6YlOa8YyJzCVxY",
  authDomain: "photo-tagging-app-c56d1.firebaseapp.com",
  projectId: "photo-tagging-app-c56d1",
  storageBucket: "photo-tagging-app-c56d1.appspot.com",
  messagingSenderId: "246127138038",
  appId: "1:246127138038:web:ec921be603e186036008d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore();
