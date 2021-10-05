import firebase from 'firebase/compat/app'
import "firebase/compat/database"

var config = {
    apiKey: "AIzaSyDC3QEwBw2ZC8WOIAZmQiJnxOkx_VR9ogc",
    authDomain: "photoshare-63299.firebaseapp.com",
    databaseURL: "https://photoshare-63299-default-rtdb.firebaseio.com",
    projectId: "photoshare-63299",
    storageBucket: "photoshare-63299.appspot.com",
    messagingSenderId: "153676577623",
    appId: "1:153676577623:web:41991b0591c2a2627c1c12"
  }
  
  firebase.initializeApp(config)

  const database = firebase.database()

  export {database}