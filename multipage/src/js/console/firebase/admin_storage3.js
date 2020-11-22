var admin = require('firebase-admin');
//Firebase 服務帳戶
//firebase-adminsdk-tp6g4@ming1-d8ff5.iam.gserviceaccount.com
const uuid = require('uuid');
//產生金鑰
//https://console.firebase.google.com/u/0/project/ming1-d8ff5/settings/serviceaccounts/adminsdk
//private key
//var serviceAccount = require("path/to/serviceAccountKey.json");
//key json
var serviceAccount = require("../../../adminKeys/ming1-d8ff5-firebase-adminsdk-tp6g4-c53a13e404.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ming1-d8ff5.firebaseio.com",
    storageBucket: "ming1-d8ff5.appspot.com"
});



let bucketName = 'ming1-d8ff5';
//var bucket = admin.storage().bucket();

var gcs = require('@google-cloud/storage')({
    keyFilename: '../../../adminKeys/ming1-d8ff5-firebase-adminsdk-tp6g4-c53a13e404.json'
});


// ...
const bucket = gcs.bucket(bucket);
// ...
const tempLocalFile = __dirname + '/11.jpg'
const destFilepath = '123.jpg'
bucket.upload(tempLocalFile, {
        destination: destFilepath,
        metadata: {
            contentType: 'image/jpeg'
        }
    })
    .then((data) => {
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
        })
    })