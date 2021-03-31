import firebase from 'firebase'
require('@firebase/firestore')
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBlcDUisfhnL5LxZhW7RhOyz4D-CatF5Mw",
    authDomain: "rhythmbartersystem.firebaseapp.com",
    projectId: "rhythmbartersystem",
    storageBucket: "rhythmbartersystem.appspot.com",
    messagingSenderId: "910127847441",
    appId: "1:910127847441:web:e39b3dad511bd3a21139b0"
  };
   // Initialize Firebase
   if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
    export default firebase.firestore() 