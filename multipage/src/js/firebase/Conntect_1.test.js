import Firebase_MJS from './Firebase.js'
let chai = require('chai')


// [site].[admin/html].[store/collectionName/functions]
// prod site - firestore - html/admin
// prod site - functions - html/admin
//dev site- firestore
//dev site-functions
// local...
// firestore...functions...FIREBASE_MJS
const path = require('path');
let adminKeyJsonPath = '../../../../adminKeys/ming1-d8ff5-firebase-adminsdk-tp6g4-c53a13e404.json';
let adminKeyJson = require(adminKeyJsonPath)
let serviceAccountJsonPath = adminKeyJsonPath
let serviceAccount = adminKeyJson
describe('Connect_1.test.js', () => {
    /**@type {import('mocha')} */
    it('Prod.admin.auth.getUserByEmail', () => {
        let admin = require('firebase-admin');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });
        let email_KT = 'ice4kimo@yahoo.com.tw';
        return admin.auth().getUserByEmail(email_KT)
            .then(function (userRecord) {
                let boolResult = false;
                if (userRecord)
                    boolResult = true
                chai.expect(boolResult).to.be.equal(true);
            })

        function DeleteUser(in_uid) {
            admin.auth().deleteUser(in_uid)
                .then(function () {
                    process.exit(0); //success and exit
                })
                .catch(function (error) {});
        }
    })
    it('Prod.admin.Products.BatchDelete', () => {
        let collectionName
        collectionName = 'Products'
        collectionName = 'ProductInfo'
        collectionName = "OrderInfo"
        let admin = require('firebase-admin');
        admin.initializeApp({
            credential: admin.credential.cert(adminKeyJson),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });
        let db = admin.firestore()
        let query = db.collection(collectionName);
        
        return query.get().then((querySnapshot) => {
            console.log("LOG:: querySnapshot", querySnapshot)
            //querySnapshot[0].delete()
            //querySnapshot.docs[0].delete();
            let batch = db.batch();

            let boolResult = false;
            querySnapshot.docs.forEach((doc) => {
                // if (doc.id === '--AutoNum--')
                //     boolResult = true;
                // if(doc.id!='--AutoNum--')
                batch.delete(doc.ref);

            })
            batch.commit()
            //chai.expect(boolResult).to.be.equal(true);
        })
    })
    it('Prod.admin.ProductInfo.writeToLocalJson', () => {
        let admin = require('firebase-admin');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });
        let db = admin.firestore()
        var fs = require('fs')
        var path = require('path')
        let txtPath = path.join(__dirname, 'ProductInfo.json')
        //fs.writeFileSync(txtPath,'BBB')
        let newArray = []
        let query = db.collection('ProductInfo')
        return query.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.id === "--AutoNum--") {
                    return true;
                    // console.log(doc.id)
                }
                newArray.push(doc.data())
                //console.log(doc.id)

            })
            let str = JSON.stringify(newArray, null, 4)
            fs.writeFileSync(txtPath, str)
            console.log(newArray.length)
            //let boolResult = true;
            //chai.expect(newArray).to.be.equal(true);
            chai.assert.isAbove(newArray.length, 0, 'newArray.length should > 0')
        })
    })
    it('Local.html.wrapFunctions.getUser', () => {
        let test = require('firebase-functions-test')();
        let functions = require('firebase-functions');
        const myFunctions = require('../functions/functions/index.js');
        const wrapped = test.wrap(myFunctions.getUser);
        // let ss = wrapped({
        //     aaa: 555
        // })
        let data = {
            name: "PP"
        }
        let options = {
            auth: {
                eventId: 'abc',
                timestamp: '2018-03-23T17:27:17.099Z',
                params: {
                    pushId: '234234'
                },
                auth: {
                    uid: 'jckS2Q0' // only for real time database functions
                },
                authType: 'USER' // only for real time database functions
            }
        }

        let ss = wrapped(data, options)
        // .then((snap) => {
        //     console.log(snap)
        // })
        console.log(ss)

        let boolResult = true;
        chai.expect(boolResult).to.be.equal(true);
    })
    it('Prod.html.wrapFunctions.addOrderInfo', () => {
        let test = require('firebase-functions-test')({
            databaseURL: 'https://ming1-d8ff5.firebaseio.com',
            storageBucket: 'ming1-d8ff5.appspot.com',
            projectId: 'ming1-d8ff5',
        },  serviceAccountJsonPath);
        let myFunctions = require('../functions/functions/index.js');
        let wrapped = test.wrap(myFunctions.addOrderInfo);
        let data = {
            name: "PP"
        }
        //data = jsonOrderInfo
        // Mock functions config values
        //test.mockConfig({ stripe: { key: '23wr42ewr34' }});
        let options = {
            auth: {
                eventId: 'abc',
                timestamp: '2018-03-23T17:27:17.099Z',
                params: {
                    pushId: '234234'
                },
                auth: {
                    uid: 'jckS2Q0' // only for real time database functions
                },
                authType: 'USER' // only for real time database functions
            }
        }
        return wrapped(data, options)
            .then((response) => {
                let res = response
                chai.expect(res._writeTime).to.exist
            })
    })
    it('Prod.html.callFunctions.addOrderInfo', () => {
        //--------------firebase.app().functions('asia-east2')
        let orderInfoJson = require('./OrderInfo.json');
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
        //app.functions().useFunctionsEmulator("http://localhost:5001");
        const callFunc = firebase.app().functions('asia-east2').httpsCallable('addOrderInfo');
        return callFunc({
            aaaaa: 333333
        }).then(result => {
            console.log(result.data._writeTime);
            chai.expect(result.data._writeTime).to.exist
            // let boolResult = true;
            // chai.expect(boolResult).to.be.equal(true);
        })
    })
    it('Prod.html.callFunctions.clearOrderInfo', () => {
        //--------------firebase.app().functions('asia-east2')
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
        //app.functions().useFunctionsEmulator("http://localhost:5001");
        const callFunc = firebase.app().functions('asia-east2').httpsCallable('clearOrderInfo');

        return callFunc().then(result => {
            console.log('result.data--->', result.data.length);

            chai.expect(result.data.length).to.be.a('number', 'Failed, response should be array!');;
            //chai.expect(result.data.length).to.exist;
            // let boolResult = true;
            // chai.expect(boolResult).to.be.equal(true);
        })
    })
    it('Local.html.callFunctions.addOrderInfo', () => {
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
        let app = firebase.initializeApp(firebaseConfig);

        // let db = null
        // db = app.firestore();
        // db.settings({
        //     host: "localhost:5002",
        //     ssl: false
        // });
        //let app = firebase.initializeTestApp({
        app = firebase.app()
        app.functions().useFunctionsEmulator("http://localhost:5001");
        //const local_addOrderInfo = firebase.app().functions('asia-east2').httpsCallable('addOrderInfo');

        const local_addOrderInfo = app.functions().httpsCallable('addOrderInfo');

        local_addOrderInfo({
            aaaaa: 333333
        }).then(result => {
            console.log('result.data-->', result.data);
        })
    })
    it('Local.html.callFunctions.clearOrderInfo', () => {
        const firebase = require("@firebase/testing");
        let app = null
        let auth = null
        app = firebase.initializeTestApp({
            projectId: 'ming1-d8ff5',
            auth
        })
        let db = null
        db = app.firestore();
        db.settings({
            host: "localhost:5002",
            ssl: false
        });
        app.functions().useFunctionsEmulator("http://localhost:5001");

        const callFunc = app.functions().httpsCallable('clearOrderInfo');
        callFunc().then(result => {
            console.log('result.data--->', result.data.length);
            chai.expect(result.data.length).to.be.a('number', 'Failed, response should be array!');;
            //chai.expect(result.data.length).to.exist;
        })
    })
})
