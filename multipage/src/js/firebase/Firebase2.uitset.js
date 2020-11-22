//import firebaseConfig from '../lib/firebaseConfig.mjs'
//import * as m2 from 'mocha'
//import mocha from '../../node_modules/mocha'
//import chai from '../../node_modules/chai'
// import 'mocha/mocha';
// import 'chai/chai'
import Firebase_mjs, {
    FIRESTORAGE_FOLDERS
} from './Firebase.js'
var firebaseConfig = {
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

//console.log(require)
//import moduleName from '../../node_modules/requirejs-plugins/lib/require.js'
//console.log(firebaseConfig)
//import * as firebase from '../../node_modules/@firebase/app';
//console.log(firebase)
// import '@firebase/auth';
// import '@firebase/datastore';
//console.log(firebase)
//initializeTestApp

//console.log(app)
//dark css
let darkcss = document.createElement('style');
document.querySelector('head').appendChild(darkcss);
darkcss.innerText = `html,body{
    background-color: black;
    color: white;
}`;
//dark
let btnAdd1 = document.querySelector('#btnAdd1');
//light
let btnAdd2 = document.querySelector('#btnAdd2');

//initial Mocha
mocha.setup({
    allowUncaught: true,
    asyncOnly: false,
    bail: true,
    checkLeaks: true,
    forbidOnly: false,
    forbidPending: false,
    global: ['MyLib'],
    retries: 3,
    slow: '100',
    timeout: '2000',
    ui: 'bdd',
    cleanReferencesAfterRun: false,
});
mocha.checkLeaks();
let bb = null;
//suite
let aa = describe('測試add函數', () => {

    //test case
    it.only('測試5+5預期10', () => {
        // let aa = 10
        // if (aa !== 10) {
        //     throw new Error("兩數相加結果不為兩數和");
        // }
        //var addMessage = firebase.functions().httpsCallable('getUser');
        //var addMessage = firebase.functions().httpsCallable('addOrderInfo');
        var addMessage = firebase.app().functions('asia-east2').httpsCallable('getUser');
        // firebase.firestore().collection('Products').get()
        // .then((snapShot) => {
        //     console.log(snapShot.docs)
        // })
        // firebase.functions



        addMessage({aa:5}).then(function (result) {
            // Read result of the Cloud Function.
            //var sanitizedMessage = result.data.text;
            console.log(result)
        }).catch(function (error) {
            // Getting the Error details.
            var code = error.code;
            var message = error.message;
            var details = error.details;
            console.log(error)
            // ...
        });
        console.log(22222)
        chai.expect(10).to.be.equal(10);
    });
    //test case
    it('測試6+6預期12', () => {
        let aa = 12
        if (aa !== 12) {
            throw new Error("兩數相加結果不為兩數和");
        }

        chai.expect(aa).to.be.equal(12);
    });
    //test case
    it('測試7+7預期14', () => {
        let aa = 14
        if (aa !== 14) {
            throw new Error("兩數相加結果不為兩數和");
        }

        chai.expect(aa).to.be.equal(14);
    });

    // it('-----', done => {
    //     let result = 1
    //     //result.should.be(1)
    //     done()
    // })
})
let timesRun = 0;
let btnRun = document.querySelector('#btnRun');
let title = aa.title
btnRun.addEventListener('click', (e) => {
    aa.title = `[${timesRun}]--${title}`
    mocha.run();
    timesRun++;
});
// //dark
// btnAdd1.addEventListener('click', (e) => {
//     darkcss.innerText = `html,body{
//         background-color: black;
//         color: white;
//     }`;
// });
// //light
// btnAdd2.addEventListener('click', (e) => {
//     darkcss.innerText = '';
// });

//mocha.run();