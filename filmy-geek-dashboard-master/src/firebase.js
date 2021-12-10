// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUGh9mvJJEOeVgJ4BnrEzxwPAgoJ-B5JQ",
  authDomain: "filmy-geek.firebaseapp.com",
  projectId: "filmy-geek",
  storageBucket: "filmy-geek.appspot.com",
  messagingSenderId: "47964555997",
  appId: "1:47964555997:web:70fc3b4439566b8c39a934"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app);
const db=getFirestore(app);

export {storage,db};

