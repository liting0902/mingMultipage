import React from 'react'
import ReactDOM from 'react-dom'
//import app from 'firebase/app';
import App from './components/App.jsx'
import DataProvider from './DataProvider.js'
import firebaseConfig from '../../src/lib/firebaseConfig.mjs'
import Firebase_mjs from '../../src/firebase/Firebase.js'//'./firebase/Firebase.js'
// import firebase from 'firebase'
//import app from 'firebase/app';
//import tools from './firebase/tools.mjs'
//import tools from './firebase/tools.mjs'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-storage';
import 'firebase/firebase-firestore';
import 'firebase/firebase-analytics';
//let a = require('react-bootstrap-table-next')

//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
//require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');
//import styles from './react-bootstrap-table2.css';

firebase.initializeApp(firebaseConfig);
firebase.analytics();
let FirebaseMJS = new Firebase_mjs(firebase);
// FirebaseMJS.initDB();
// FirebaseMJS.initStorage();
//let FirebaseMJS = null




//let Firebase = new Firebase_mjs(app, firebaseConfig);


// var firebaseConfig = {
//     apiKey: "AIzaSyD4H_AArvgvLf7HEmFBdHS6iUQcG3CTUOM",
//     authDomain: "ming1-d8ff5.firebaseapp.com",
//     databaseURL: "https://ming1-d8ff5.firebaseio.com",
//     projectId: "ming1-d8ff5",
//     storageBucket: "ming1-d8ff5.appspot.com",
//     messagingSenderId: "504139528822",
//     appId: "1:504139528822:web:078db71d75c01af93bfd57",
//     measurementId: "G-ENYG95C00T"
// };

// Initialize Firebase
// app.initializeApp(firebaseConfig);
// console.log(app)

//app.analytics();



let divRoot = document.querySelector('#root');
//divRoot.innerHTML = 'SDSDSD'

//console.log(React)


// STEP 1: createContext(<defaultValue>)
const AppContext = React.createContext({
    theme: 'light',
    size: '2x',
});

//因為 value 內如果放物件的話，每次都算是全新的物件，因此為了避免經常重新渲染，
//可能的話將 Context.Provider 屬性 value 內的值放在 state 中，
//使用 value={this.state} 這種做法。
// var ReactApp = <AppContext.Provider
//     value={{
//         theme: 'dark',
//         size: '1x',
//     }}>
//     <App></App>
// </AppContext.Provider>



var ReactApp = <DataProvider FirebaseMJS={FirebaseMJS}>
    <App></App>
</DataProvider>

ReactDOM.render(ReactApp, divRoot);