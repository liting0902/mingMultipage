import {
    ENUM_ProductCategory
} from '../dataDefine/index.js';
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


describe('Connect_3.test.js', () => {
    it('Prod.html.Firebase_MJS.addOrderInfo', () => {
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
        let app = firebase.initializeApp(firebaseConfig);
        let Firebase = new Firebase_MJS(firebase, app)
        return Firebase.addOrderInfo(orderInfoJson, true) //({PPLL:5555})//orderInfoJson
            .then(function (result) {
                let writeTime = Firebase_MJS.getDate_From_Firestore_TimeStamp(result.data._writeTime); //new Date(result.data._writeTime._seconds*1000)
                chai.expect(Firebase_MJS.isDate(writeTime)).to.be.equal(true);
            }).catch(function (error) {
                // Getting the Error details.
                // var code = error.code;
                // var message = error.message;
                // var details = error.details;
                // console.log(error)
                throw new Error(error)
                // ...
            });
        //chai.assert.isAbove(1, 0, 'snap.docs.length should > 0')
    });
    it('Local.html.Firebase_MJS.addOrderInfo', () => {
        let firebase = require("@firebase/testing");
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
        //firebase.app().functions().useFunctionsEmulator("http://localhost:5001");
        app.functions().useFunctionsEmulator("http://localhost:5001");

        //let orderInfoJson = require('./OrderInfo.json');

        let Firebase = new Firebase_MJS(firebase, app)
        return Firebase.addOrderInfo({
                PPLL: 5555
            }, false) //({PPLL:5555})//orderInfoJson
            .then(function (result) {
                let writeTime = Firebase_MJS.getDate_From_Firestore_TimeStamp(result.data._writeTime); //new Date(result.data._writeTime._seconds*1000)


                chai.expect(Firebase_MJS.isDate(writeTime)).to.be.equal(true);
            }).catch(function (error) {
                // Getting the Error details.
                // var code = error.code;
                // var message = error.message;
                // var details = error.details;
                // console.log(error)
                throw new Error(error)
                // ...
            });
        //chai.assert.isAbove(1, 0, 'snap.docs.length should > 0')
    });
    it('Prod.html.Firebase_MJS.addProductInfo', () => {
        //let orderInfoJson = require('./OrderInfo.json');
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
        let Firebase = new Firebase_MJS(firebase, app)
        return Firebase.addProduct5("AAA", 550, ENUM_ProductCategory.beef) //({PPLL:5555})//orderInfoJson
            .then(function (result) {
                console.log(result)
                // let writeTime = Firebase_MJS.getDate_From_Firestore_TimeStamp(result.data._writeTime); //new Date(result.data._writeTime._seconds*1000)
                // chai.expect(Firebase_MJS.isDate(writeTime)).to.be.equal(true);
            }).catch(function (error) {
                // Getting the Error details.
                // var code = error.code;
                // var message = error.message;
                // var details = error.details;
                // console.log(error)
                throw new Error(error)
                // ...
            });
        //chai.assert.isAbove(1, 0, 'snap.docs.length should > 0')
    });
    it('Prod.html.Firebase_MJS.addProductInfo data[17]', () => {
        //let orderInfoJson = require('./OrderInfo.json');
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
        let Firebase = new Firebase_MJS(firebase, app)
        let arrayProductInfo = require('./NewProducts.json')
        //only test 3 items
        // let [a,b,c] = arrayProductInfo
        // arrayProductInfo = [a,b,c]

        let arrayPromise_ProductInfo = arrayProductInfo.map((item) => {
            //must be BIND()!!!
            return Firebase.addProduct5.bind(Firebase, item.name, item.price, item.category,item.imgUrl)
            // let dd = Firebase.addOrderInfo.bind(Firebase, item, true)
            // return dd 
        })
        return arrayPromise_ProductInfo.reduce(function (prePromise, arryFunc_promise, i) {
                console.log('reduce(i)--->', i)
                //return arryPromise
                return prePromise.then(function () {
                    return arryFunc_promise() //saveInDatabase(item).then((myResult) => ... );
                })
            }, Promise.resolve())
            .then((done) => {
                console.log("LOG:: done", done)

            })
            .catch((err) => {
                console.log("LOG:: err", err)
            })

    })
    it('Prod.html.Firebase_MJS.getOrderInfo()',() => {
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
        let Firebase = new Firebase_MJS(firebase, app)
        let testData = require('../../../test/testdata.json')
        return Firebase.getOrderInfo(testData.userId, 'all')//canceled all
            .then((data) => {
                //console.log("LOG:: extends -> LoadProductInfo -> data", data)
                //console.log(data)
                let json = JSON.stringify(data, null, 4)
                let txtPath = path.join(__dirname, 'OrderInfo.json')
                let fs = require('fs')
                fs.writeFileSync(txtPath,json)
                
            })
    })
    it('Prod.html.Firebase_MJS.getProductInfo()',() => {
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
        let Firebase = new Firebase_MJS(firebase, app)
        return Firebase.getProductInfo()
            .then((data) => {
                //console.log("LOG:: extends -> LoadProductInfo -> data", data)
                console.log(data)
                
            })
    })
    it('Prod.html.Firebase_MJS.updateProductInfo()',() => {
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
        let Firebase = new Firebase_MJS(firebase, app)
        return Firebase.updateProductInfo('0002-gy9', {price:40})
            .then((data) => {
                //console.log("LOG:: extends -> LoadProductInfo -> data", data)
                console.log(data)
                
            })
    })
    it('Prod.html.Firebase_MJS.deleteProductInfo()',() => {
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
        let Firebase = new Firebase_MJS(firebase, app)
        return Firebase.deleteProductInfo('0015-mks')
            .then((data) => {
                //console.log("LOG:: extends -> LoadProductInfo -> data", data)
                console.log(data)
                
            })
    })
    it('Prod.html.Firebase_MJS.callFunctions', () => {
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
        let Firebase = new Firebase_MJS(firebase, app)
        let isProdSite = true;

        let orderInfoJson = require('./OrderInfo.json')
        let order = Object.assign({}, orderInfoJson);
        //order = {totalPrice:555}
        order.createDateTime = null //this._firebase.firestore.FieldValue.serverTimestamp();

        return Firebase.callFunctions('addOrderInfo', isProdSite, {
                PPLL: 5555
            }) //({PPLL:5555})//orderInfoJson
            .then(function (result) {
                let writeTime = Firebase_MJS.getDate_From_Firestore_TimeStamp(result.data._writeTime); //new Date(result.data._writeTime._seconds*1000)
                chai.expect(Firebase_MJS.isDate(writeTime)).to.be.equal(true);
            }).catch(function (error) {
                // Getting the Error details.
                // var code = error.code;
                // var message = error.message;
                // var details = error.details;
                // console.log(error)
                throw new Error(error)
                // ...
            });
        //chai.assert.isAbove(1, 0, 'snap.docs.length should > 0')
    });
    it('Local.html.Firebase_MJS.callFunctions', () => {
        let firebase = require("@firebase/testing");
        let app = null
        let auth = null
        app = firebase.initializeTestApp({
            projectId: 'ming1-d8ff5',
            auth
        })
        app = firebase.apps()[0]
        let db = null
        db = app.firestore();
        db.settings({
            host: "localhost:5002",
            ssl: false
        });
        //firebase.app().functions().useFunctionsEmulator("http://localhost:5001");
        app.functions().useFunctionsEmulator("http://localhost:5001");

        //let orderInfoJson = require('./OrderInfo.json');

        let Firebase = new Firebase_MJS(firebase, app)
        let isProdSite = false;
        return Firebase.callFunctions('addOrderInfo', isProdSite, {
                PPLL: 5555
            }) //({PPLL:5555})//orderInfoJson
            .then(function (result) {
                let writeTime = Firebase_MJS.getDate_From_Firestore_TimeStamp(result.data._writeTime); //new Date(result.data._writeTime._seconds*1000)
                chai.expect(Firebase_MJS.isDate(writeTime)).to.be.equal(true);
            }).catch(function (error) {
                // Getting the Error details.
                // var code = error.code;
                // var message = error.message;
                // var details = error.details;
                // console.log(error)
                throw new Error(error)
                // ...
            });
        //chai.assert.isAbove(1, 0, 'snap.docs.length should > 0')
    });

})