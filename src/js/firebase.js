// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDy9CiJ_YmDxEDI1qbAgDIO2c8zh3Z4xSE',
  authDomain: 'noteballs-b1cd1.firebaseapp.com',
  projectId: 'noteballs-b1cd1',
  storageBucket: 'noteballs-b1cd1.appspot.com',
  messagingSenderId: '279964879061',
  appId: '1:279964879061:web:47f61c93fc6706b18a3a5c'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app);

const auth = getAuth(app)

export {
    db,
    auth
}