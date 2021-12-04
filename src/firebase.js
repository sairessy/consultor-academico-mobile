// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXbhRYP1IBB4hEomxadny8-hHORzoZ4aY",
  authDomain: "consultor-academico.firebaseapp.com",
  projectId: "consultor-academico",
  storageBucket: "consultor-academico.appspot.com",
  messagingSenderId: "565004956088",
  appId: "1:565004956088:web:4ea0117c4d53bc0b475f4d"
};

// Initialize Firebase
var firebase = initializeApp(firebaseConfig);

export default firebase;