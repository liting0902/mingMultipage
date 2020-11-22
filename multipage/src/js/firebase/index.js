// require('https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js')
// //console.log(firebase)
// const url_app='https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js'
// const url_firestore='https://www.gstatic.com/firebasejs/7.14.5/firebase-firestore.js'
// const url_auth='https://www.gstatic.com/firebasejs/7.14.5/firebase-auth.js'

let firebase = require('firebase')
console.log(firebase)
process.exit()

var firebaseConfig = {
    apiKey: "AIzaSyD4H_AArvgvLf7HEmFBdHS6iUQcG3CTUOM",
    authDomain: "ming1-d8ff5.firebaseapp.com",
    databaseURL: "https://ming1-d8ff5.firebaseio.com/",
    projectId: "ming1-d8ff5" //,
    // storageBucket: "<BUCKET>.appspot.com",
    // messagingSenderId: "<SENDER_ID>"
};
firebase.initializeApp(firebaseConfig);


//check 1
if (firebase.auth().currentUser) {
    const currentUser = firebase.auth().currentUser;
    console.log("Signed in username" + currentUser.displayName);
    console.log(currentUser)
    //this.props.navigation.navigate('AppTab');
} else {
    console.log("no user signed in");
    //this.props.navigation.navigate('AuthTab');
}
//check 2
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('user is logged');
    }
})