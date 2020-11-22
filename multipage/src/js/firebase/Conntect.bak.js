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
let serviceAccountJsonPath = adminKeyJsonPath
let serviceAccount = require(serviceAccountJsonPath);
describe('Connect.test.js', () => {
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
        let admin = require('firebase-admin');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });
        let db = admin.firestore()
        let query = db.collection('Products');
        return query.get().then((querySnapshot) => {
            //querySnapshot[0].delete()
            //querySnapshot.docs[0].delete();
            let batch = db.batch();

            let boolResult = false;
            querySnapshot.docs.forEach((doc) => {
                if (doc.id === '--AutoNum--')
                    boolResult = true;
                // if(doc.id!='--AutoNum--')
                //     batch.delete(doc.ref);

            })
            batch.commit()
            chai.expect(boolResult).to.be.equal(true);
        })
    })
    it('Prod.admin.Products.writeToLocalJson', () => {
        let admin = require('firebase-admin');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });
        let db = admin.firestore()
        var fs = require('fs')
        var path = require('path')
        let txtPath = path.join(__dirname, 'data2.json')
        //fs.writeFileSync(txtPath,'BBB')
        let newArray = []
        let query = db.collection('Products')
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
            //fs.writeFileSync(txtPath, str)
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
        }, serviceAccountJsonPath);
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
    it('Local.html.store.get', () => {
        let firebase = require("@firebase/testing");


        let app = null
        // app = admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount),
        //     databaseURL: "https://ming1-d8ff5.firebaseio.com"
        // });
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
        return db.collection('AA').get()
            .then((snap) => {
                console.log(snap.docs.length)
                chai.assert.isAbove(snap.docs.length, 0, 'snap.docs.length should > 0')
            })
    })
    it('Prod.html.store.get', () => {
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
        //var Firebase = new Firebase_MJS(firebase)
        let db = firebase.firestore()
        return db.collection('Products').get()
            .then((snap) => {
                console.log(snap.docs.length)
                chai.assert.isAbove(snap.docs.length, 0, 'snap.docs.length should > 0')
            })
    })
    it('Prod.html.store.Products.get', () => {
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
        //var Firebase = new Firebase_MJS(firebase)
        let db = firebase.firestore()
        let arrayData = []
        return db.collection('Products').get()
            .then((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                    if (doc.id === '--AutoNum--')
                        //boolResult = true;
                        return true
                    // if(doc.id!='--AutoNum--')
                    //     batch.delete(doc.ref);
                    //console.log(doc.data().productId)
                    arrayData.push(doc.data())
                })
                let newArrayData = arrayData.sort((a, b) => {
                    return a.autoNum - b.autoNum
                })
                newArrayData.forEach((eachItem) => {
                    console.log(eachItem.autoNum)
                })
                let json = JSON.stringify(newArrayData, null, 4)
                let txtPath = path.join(__dirname, 'Products.json')
                let fs = require('fs')
                //fs.writeFileSync(txtPath,json)

            })
    })
    it('Prod.html.storage.upload', () => {
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
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let storageRef = firebase.storage().ref();
        let fs = require('fs')
        let jpgPath = path.resolve(__dirname, "11.jpg")
        let cloudFilePath = `Nodejs/11.jpg`
        var childRef = storageRef.child(cloudFilePath);

        //Buffer.alloc(16384)
        //let blob -- HTML -- blob or File
        //let nodejs_Uint8Array -- nodejs
        //let nodejs_base64 -- base64, base64url, or data_url
        let buffer = fs.readFileSync(jpgPath);
        let data
        //data = buffer //buffer == Uint8Array
        data = buffer.toString('base64')
        //return childRef.put(buffer)
        return childRef.putString(data, 'base64')
            .then(function (snapshot) {
                console.log('snapshot.state--' + snapshot.state)
                return snapshot.ref.getDownloadURL()
            })
            .then((url) => {
                return url
            })
            .catch((e) => {
                console.log('error--', e)
            });

        //chai.expect(1).to.be.equal(2)


    })
    it('Prod.html.storage.upload @google-cloud/storage', () => {
        //https://www.sentinelstand.com/article/guide-to-firebase-storage-download-urls-tokens
        let {
            Storage
        } = require('@google-cloud/storage')
        let path = require('path')
        let pathServiceKey = path.resolve(__dirname, '../../adminKeys/ming1-d8ff5-firebase-adminsdk-tp6g4-c53a13e404.json');
        const storage = new Storage({
            keyFilename: pathServiceKey //<server-key-file-path>,
        });
        let bucketName = "ming1-d8ff5.appspot.com" //<bucket-name>

        let filename = path.resolve(__dirname, '11.jpg');

        let today = new Date();
        let sToday = getDateString(today, 1)
        let sTime = getTimeString(today, 1)
        //let uuid = getRandomId(4)
        let fileId = `${sToday}-${sTime}`
        //const uuid = require('uuid');
        const uuid = require('uuid-v4');
        //let uuidv4 = uuid.v4()
        // Uploads a local file to the bucket
        return storage.bucket(bucketName).upload(filename, {
                destination: `Nodejs/${fileId}.jpg`,
                // Support for HTTP requests made with `Accept-Encoding: gzip`
                gzip: true,
                // By setting the option `destination`, you can change the name of the
                // object you are uploading to a bucket.
                metadata: {
                    // Enable long-lived HTTP caching headers
                    // Use only if the contents of the file will never change
                    // (If the contents will change, use cacheControl: 'no-cache')
                    cacheControl: 'public, max-age=31536000',
                    contentType: 'image/jpeg',
                    // "custom" metadata:
                    metadata: {
                        firebaseStorageDownloadTokens: uuid(), // Can technically be anything you want
                    },
                },
            })
            .then((data) => {
                console.log(`${filename} uploaded to ${bucketName}.`);
                let file = data[0]
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-17-2025'
                }, function (err, url) {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    // handle url 
                    console.log('handle url -->', url)
                })

            })
            .catch((err) => {
                console.log('err-->', err)
            })
        
    })
    it('Prod.html.storage.update file download token', () => {
        const admin = require("firebase-admin");
        const bucket = admin.storage().bucket();
        const uuid = require("uuid-v4");

        // ... inside your function:

        const file = bucket.file("uploads/file.txt");

        // await file.setMetadata({
        //     metadata: {
        //         // Update the download token:
        //         firebaseStorageDownloadTokens: uuid(),
        //         // Or delete it:
        //         firebaseStorageDownloadTokens: null,
        //     },
        // })
    })
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
                console.log("LOG:: writeTime", writeTime)


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
                console.log("LOG:: writeTime", writeTime)
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
        //console.log('app=====>', firebase.apps()[0])
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
                console.log("LOG:: writeTime", writeTime)
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

function getRandomId(num) {
    let startIndex = 2 //ignore '0.'
    let endIndex = 2 + num
    //let uuid = Math.random().toString(36).substring(2, 10) // 36 carry bit, ignore '0.', get 8 char
    let uuid = Math.random().toString(36).substring(startIndex, endIndex) // 36 carry bit, ignore '0.', get 8 char
    return uuid
}
/**
 * @param {Date} inDate
 * @param {(1|2)} formatNo
 */
function getDateString(inDate, formatNo) {
    let yy = inDate.getFullYear();
    let mm = inDate.getMonth() + 1;
    let dd = inDate.getDate();
    let MM = String(mm).padStart(2, '0')
    let DD = String(dd).padStart(2, '0')
    switch (formatNo) {
        case 1:
            return `${yy}${MM}${DD}`;
        default:
            return ''
    }
}
/**
 * @param {Date} inDate
 * @param {(1|2)} formatNo
 */
function getTimeString(inDate, formatNo) {
    let HH = inDate.getHours();
    let MM = inDate.getMinutes();
    let SS = inDate.getSeconds();
    let hh = String(HH).padStart(2, '0')
    let mm = String(MM).padStart(2, '0')
    let ss = String(SS).padStart(2, '0')
    switch (formatNo) {
        case 1:
            return `${hh}${mm}${ss}`;
        default:
            return ''
    }
}