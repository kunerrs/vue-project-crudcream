import firebase from 'firebase'
import firestore from 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyAdqP1tgrUyWUg9SR6ggFV8odBI48i4xkA",
    authDomain: "vue-project-crudcream.firebaseapp.com",
    databaseURL: "https://vue-project-crudcream.firebaseio.com",
    projectId: "vue-project-crudcream",
    storageBucket: "vue-project-crudcream.appspot.com",
    messagingSenderId: "868742647341",
    appId: "1:868742647341:web:ec06999f27f081dfec72a4"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()