// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/compat/app";
//import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase';
import 'firebase/storage'

export const app1 = firebase.initializeApp({
  apiKey: "AIzaSyDpTEHt6_L0nMvNoefcNbosGzKUYGR1uyg",
  authDomain: "irekommend-ai-demo-instance.firebaseapp.com",
  projectId: "irekommend-ai-demo-instance",
  storageBucket: "irekommend-ai-demo-instance.appspot.com",
  messagingSenderId: "210301261220",
  appId: "1:210301261220:web:0dc712f703a0f894db1d31",
  measurementId: "G-M33K8H1ERQ"
})

export const firestore = firebase.firestore()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDpTEHt6_L0nMvNoefcNbosGzKUYGR1uyg",
//   authDomain: "irekommend-ai-demo-instance.firebaseapp.com",
//   projectId: "irekommend-ai-demo-instance",
//   storageBucket: "irekommend-ai-demo-instance.appspot.com",
//   messagingSenderId: "210301261220",
//   appId: "1:210301261220:web:0dc712f703a0f894db1d31",
//   measurementId: "G-M33K8H1ERQ"
// };

// Initialize Firebase
//export const  app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);