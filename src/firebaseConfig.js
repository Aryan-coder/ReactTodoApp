import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDHqH4U2S4ahiz1leEfai4zbKNfX-nb-MM",
    authDomain: "todoapp-cf4be.firebaseapp.com",
    projectId: "todoapp-cf4be",
    storageBucket: "todoapp-cf4be.appspot.com",
    messagingSenderId: "715509723864",
    appId: "1:715509723864:web:15cfc3616c05f58a28ddad",
    measurementId: "G-L54KHP7EM5"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase