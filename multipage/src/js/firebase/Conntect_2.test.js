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

describe('Connect_2.test.js', () => {

    it('Local.html.firestore.get', () => {
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
    it('Prod.html.firestore.get', () => {
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
        //var credential = firebase.auth.PhoneAuthProvider.credential(email, password);
        //var Firebase = new Firebase_MJS(firebase)
        let db = firebase.firestore()
        return db.collection('Products').get()
            .then((snap) => {
                console.log(snap.docs.length)
                chai.assert.isAbove(snap.docs.length, 0, 'snap.docs.length should > 0')
            })
    })
    it('Prod.html.firestore.Products.get', () => {
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
        return db.collection('ProductInfo').get()
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
                let txtPath = path.join(__dirname, 'ProductInfo.json')
                let fs = require('fs')
                fs.writeFileSync(txtPath, json)

            })
    })
    it('Prod.html.firestore.ProductInfo addProduct()', () => {
        let firebase = require('firebase/app');
        require('firebase/firestore')
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

        let newNum = 0 //1
        let FIRESTORE_COLLECTION_ProductInfo = 'ProductInfo'
        var autoNum_DocRef = db.collection(FIRESTORE_COLLECTION_ProductInfo).doc("--AutoNum--");

        return db.runTransaction((transaction) => {
            return transaction.get(autoNum_DocRef)
                .then((autoNum_Doc) => {
                    if (!autoNum_Doc.exists) {
                        //throw "autoNum_DocDocument does not exist!";
                        return autoNum_DocRef.set({
                            '--AutoNum--': newNum, //0
                            'autoNum': newNum, //0
                            updateDateTime: firebase.firestore.FieldValue.serverTimestamp()
                        })
                    }
                    //get autoNum data
                    let autoNum_data = autoNum_Doc.data();
                    console.log("LOG:: autoNum_data", autoNum_data)
                    let nowNum = autoNum_data.autoNum //serial number
                    console.log("LOG:: nowNum", nowNum)
                    nowNum++
                    let sNowNum = String(nowNum).padStart(4, '0')
                    console.log("LOG:: sNowNum", sNowNum)
                    // //add new doc
                    // let uuid = Math.random().toString(36).substring(2, 10) // 36 carry bit, ignore '0.', get 8 char
                    let newProdId = `${sNowNum}-${getRandomId(3)}`
                    let price = 140
                    let name = "白斬雞"
                    // let sNowNum = nowNum.toString().padStart(4, "0")
                    // uuid = `${uuid}-${sNowNum}`
                    let newDoc = db.collection(FIRESTORE_COLLECTION_ProductInfo).doc(newProdId)
                    /**@type {import('../dataDefine/index.js').ProductInfo} */
                    let prodInfo = {
                        productId: newProdId, //aaaaa-1
                        name: name, //"白斬雞"
                        price: price, //140
                        //imgFileName: "xxxxxx", //白斬雞.jpg
                        /**@type {(Date|object)} */
                        addDateTime: firebase.firestore.FieldValue.serverTimestamp(),


                        category: "beef",
                        tag: "#牛肉#青椒",

                        imgUrl: 'XXXXXXXXXXXXX',
                        imgFileName: 'XXXXXXXXXXXXXX',
                        autoNum: nowNum
                    }

                    console.log('prodInfo---->', prodInfo)
                    //throw "Force stop!";
                    transaction.set(newDoc, prodInfo)
                    transaction.update(autoNum_DocRef, {
                        autoNum: nowNum
                    })
                    // let imgFileName = `${uuid}${extension}`
                    // return {
                    //     imgFileName: imgFileName,
                    //     newDoc: newDoc
                    // }


                    //var newPopulation = sfDoc.data().population + 1;

                })
                .then((e) => {
                    //docRef_AutoNum = db.collection('OrderInfo').doc('--AutoNum--')
                    return autoNum_DocRef.get()
                })
                .then((e) => {
                    console.log('----->', e.data())
                })
        })

    })
    it('Prod.admin.storage.upload shortURL', () => {
        const createPersistentDownloadUrl = (bucket, pathToFile, downloadToken) => {
            return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
                pathToFile
            )}?alt=media&token=${downloadToken}`;
        };
        //you can upload a file from a Firebase Function and set a custom download token
        const admin = require("firebase-admin");
        let pathServiceKey = path.resolve(__dirname, adminKeyJsonPath);
        admin.initializeApp({
            credential: admin.credential.cert(pathServiceKey),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });
        let bucketName = "ming1-d8ff5.appspot.com" //<bucket-name>
        const bucket = admin.storage().bucket(bucketName);
        const uuid = require("uuid-v4");
        let date = new Date()
        let newFileId = `${getDateString(date,1)}-${getTimeString(date,1)}`
        // ... inside your function:
        let srcJpgFilename
        srcJpgFilename = '11.jpg'

        //srcJpgFilename = '13.jpg'
        //newFileId = '111overwrite'

        let srcFilePath = path.resolve(__dirname, srcJpgFilename)
        let cloudPath = `Nodejs/${newFileId}.jpg`
        let downloadToken1 = uuid();
        return bucket.upload(srcFilePath, {
                destination: cloudPath,
                metadata: {
                    cacheControl: "max-age=31536000",
                    public: true, // Alias for predefinedAcl = 'publicRead'
                    // "custom" metadata:
                    metadata: {
                        firebaseStorageDownloadTokens: downloadToken1, // Can technically be anything you want
                    },
                },
            })
            .then(async (data) => {
                console.log(`12.jpg uploaded to ${bucketName}.`);
                let file = data[0]
                //-- get metadata
                let [metadata] = await file.getMetadata();
                console.log("LOG:: metadata", metadata)

                //const [metadata] = file.getMetadata();
                //Signed URLs
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-17-2025'
                }, function (err, url) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    //Signed URLs
                    // handle url 
                    console.log('handle url -->', url)
                    let shortURL = createPersistentDownloadUrl(bucketName, cloudPath, downloadToken1);
                    console.log('cretateURL(short) -->', shortURL)
                })

            })
            .catch((err) => {
                console.log('err-->', err)
            })


    })
    it('Prod.google.storage.upload @google-cloud/storage', () => {
        //https://www.sentinelstand.com/article/guide-to-firebase-storage-download-urls-tokens
        let {
            Storage
        } = require('@google-cloud/storage')
        let path = require('path')
        let pathServiceKey = path.resolve(__dirname, adminKeyJsonPath);
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
                public: true, // Alias for predefinedAcl = 'publicRead'
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
    it('Prod.admin.storage.update metadata', () => {
        const admin = require("firebase-admin");
        let pathServiceKey = path.resolve(__dirname, adminKeyJsonPath);
        admin.initializeApp({
            credential: admin.credential.cert(pathServiceKey),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });
        let bucketName = "ming1-d8ff5.appspot.com" //<bucket-name>
        const bucket = admin.storage().bucket(bucketName);
        const uuid = require("uuid-v4");
        // ... inside your function:
        const file = bucket.file("Nodejs/12.jpg");
        return file.setMetadata({
            metadata: {
                // Update the download token:
                //firebaseStorageDownloadTokens: uuid(),
                // Or delete it:
                firebaseStorageDownloadTokens: null,
            },
        })
    })
    it('Prod.admin.storage get Signed URLs', () => {
        const admin = require("firebase-admin");
        let pathServiceKey = path.resolve(__dirname, adminKeyJsonPath);
        admin.initializeApp({
            credential: admin.credential.cert(pathServiceKey),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });
        let bucketName = "ming1-d8ff5.appspot.com" //<bucket-name>
        const bucket = admin.storage().bucket(bucketName);
        const uuid = require("uuid-v4");
        let cloudPath = "Nodejs/12.jpg"
        // ... inside your function:
        const file = bucket.file(cloudPath);

        // ... inside your function:

        const urlOptions = {
            version: "v4",
            action: "read",
            //expires: '03-17-2025'
            expires: Date.now() + 1000 * 60 * 2, // 2 minutes
        }
        // export interface GetSignedUrlConfig {
        //     action: 'read' | 'write' | 'delete' | 'resumable';
        //     version?: 'v2' | 'v4';
        //     virtualHostedStyle?: boolean;
        //     cname?: string;
        //     contentMd5?: string;
        //     contentType?: string;
        //     expires: string | number | Date;
        //     extensionHeaders?: http.OutgoingHttpHeaders;
        //     promptSaveAs?: string;
        //     responseDisposition?: string;
        //     responseType?: string;
        //     queryParams?: Query;
        // }

        return bucket
            .file(cloudPath)
            .getSignedUrl(urlOptions)
            .then((url) => {
                console.log('url--->', url)
            })

        // Return `url` to the user.
        // It will look something like:
    })
    it('Prod.admin.storage makePublic & getMetadata', () => {
        const admin = require("firebase-admin");
        let pathServiceKey = path.resolve(__dirname, adminKeyJsonPath);
        admin.initializeApp({
            credential: admin.credential.cert(pathServiceKey),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });
        let bucketName = "ming1-d8ff5.appspot.com" //<bucket-name>
        const bucket = admin.storage().bucket(bucketName);
        const uuid = require("uuid-v4");
        let cloudPath = "Nodejs/12.jpg"
        // ... inside your function:
        return bucket.file(cloudPath).makePublic()
            .then((filesMetaData) => {
                console.log('1111-->', filesMetaData[0])
                // const [metadata] = file[0].getMetadata();
                // console.log("LOG:: metadata", metadata)
                // const url = metadata.mediaLink;
                // console.log("LOG:: url", url)
                return 1111
            })
            .then((e) => {
                return bucket.file(cloudPath).getMetadata()
            })
            .then((filesMetaData) => {
                let metadata = filesMetaData[0]
                console.log('2222-->', metadata)
                const url = metadata.mediaLink; //download link
                console.log("LOG:: url", url)
            })
    })
    it('Prod.admin.auth Delete User', () => {
        var admin = require('firebase-admin');
        //Firebase 服務帳戶
        //firebase-adminsdk-tp6g4@ming1-d8ff5.iam.gserviceaccount.com

        //產生金鑰
        //https://console.firebase.google.com/u/0/project/ming1-d8ff5/settings/serviceaccounts/adminsdk
        //private key
        //var serviceAccount = require("path/to/serviceAccountKey.json");
        //key json
        var serviceAccount = require(adminKeyJsonPath);

        admin.initializeApp({
            credential: admin.credential.cert(adminKeyJson),
            databaseURL: "https://ming1-d8ff5.firebaseio.com"
        });

        //var email_KT = 'tristan829@gmail.com';
        var email_KT = 'ice4kimo@yahoo.com.tw';
        var user_id;
        return admin.auth().getUserByEmail(email_KT)
            .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                //console.log('Successfully fetched user data:', userRecord.toJSON());
                console.log(`user id = ${userRecord.uid}`);
                //user_id = userRecord.uid;
                //console.log(userRecord.uid);
                return DeleteUser(userRecord.uid);

            })
            .catch(function (error) {
                console.log(`Error Code = ${error.code}`);
                process.exit(1); //To exit with a 'failure' code:
                //console.log('Error fetching user data:', error);
            });
        //console.log(bb)
        //-------------Delete a user
        // https://firebase.google.com/docs/auth/admin/manage-users
        function DeleteUser(in_uid) {
            return admin.auth().deleteUser(in_uid)
                .then(function () {
                    console.log('Successfully deleted user');
                    process.exit(0); //success and exit
                })
                .catch(function (error) {
                    console.log('Error deleting user:', error);
                });
        }
    })
    it('Prod.html.firestore.getUser Profile', () => {
        let pathTestData = '../../../test/testdata.json'
        let testdata = require(pathTestData)
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
        //var credential = firebase.auth.PhoneAuthProvider.credential(email, password);
        //var Firebase = new Firebase_MJS(firebase)
        let db = firebase.firestore()
        return db.collection('Users').doc(testdata.userId).get()
            .then((snap) => {
                let userData = snap.data()
                //console.log('1111',snap.data())
                let fs = require('fs')
                let pathOveride = path.join(__dirname, 'userData.json')
                fs.writeFileSync(pathOveride,JSON.stringify(userData,null,4))
                //chai.assert.isAbove(snap.docs.length, 0, 'snap.docs.length should > 0')
            })
    })
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