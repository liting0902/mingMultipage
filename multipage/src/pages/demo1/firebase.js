let firebase = require('firebase/app');
require('firebase/firestore')
require('firebase/functions')
require('firebase/storage')
require('firebase/auth')
let firebaseConfig = {
    apiKey: "AIzaSyD4H_AArvgvLf7HEmFBdHS6iUQcG3CTUOM",
    authDomain: "ming1-d8ff5.firebaseapp.com",
    databaseURL: "https://ming1-d8ff5.firebaseio.com",
    projectId: "ming1-d8ff5",
    storageBucket: "ming1-d8ff5.appspot.com",
    messagingSenderId: "504139528822",
    appId: "1:504139528822:web:078db71d75c01af93bfd57",
    measurementId: "G-ENYG95C00T"
};
firebase.initializeApp(firebaseConfig);
export default firebase