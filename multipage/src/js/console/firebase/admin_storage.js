var admin = require('firebase-admin');
//Firebase 服務帳戶
//firebase-adminsdk-tp6g4@ming1-d8ff5.iam.gserviceaccount.com

//產生金鑰
//https://console.firebase.google.com/u/0/project/ming1-d8ff5/settings/serviceaccounts/adminsdk
//private key
//var serviceAccount = require("path/to/serviceAccountKey.json");
//key json
var serviceAccount = require("../../../adminKeys/serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ming1-d8ff5.firebaseio.com",
    storageBucket: "ming1-d8ff5.appspot.com"
});

var mediaInfo = {
    "kind": "storage#object",
    "id": "ming1-d8ff5.appspot.com/object-name.jpg/1593254895644506",
    "selfLink": "https://www.googleapis.com/storage/v1/b/ming1-d8ff5.appspot.com/o/object-name.jpg",
    "mediaLink": "https://www.googleapis.com/download/storage/v1/b/ming1-d8ff5.appspot.com/o/object-name.jpg?generation=1593254895644506&alt=media",
    "name": "object-name.jpg",
    "bucket": "ming1-d8ff5.appspot.com",
    "generation": "1593254895644506",
    "metageneration": "1",
    "contentType": "image/jpeg",
    "storageClass": "STANDARD",
    "size": "108633",
    "md5Hash": "foY3WdOGJbDPuhraFjtkpg==",
    "cacheControl": "public, max-age=31536000",
    "crc32c": "zJSIng==",
    "etag": "CNre3YDpoeoCEAE=",
    "timeCreated": "2020-06-27T10:48:15.644Z",
    "updated": "2020-06-27T10:48:15.644Z",
    "timeStorageClassUpdated": "2020-06-27T10:48:15.644Z"
}

let bucketName = 'ming1-d8ff5.appspot.com';
var bucket = admin.storage().bucket();
//var storageRef = admin.storage()
let filename = __dirname + '/11.jpg'
//var mountainsRef = storageRef.child('Nodejs/77.jpg');

// Create a reference to 'images/mountains.jpg'
//var mountainImagesRef = storageRef.child('images/mountains.jpg');

// While the file names are the same, the references point to different files
// mountainsRef.name === mountainImagesRef.name // true
// mountainsRef.fullPath === mountainImagesRef.fullPath // false

// var file = ... // use the Blob or File API
// var uploadTask = mountainsRef.put('./11.jpg')
//     .then(function (snapshot) {
//         console.log('snapshot.state--' + snapshot.state)
//         console.log(snapshot.ref)
//         //return snapshot.ref.downloadURL()
//         //console.log('Uploaded a blob or file!--SUCCESS!!');
//     })
//     // .then((snapshot) => {
//     //     console.log(snapshot)
//     // })
//     .catch((e) => {
//         console.log('error--', e)

//     });
const uuid = require('uuid');
//console.log(uuid.v4())
let uuidv4 = uuid.v4()
// console.log(uuidv4)
// process.exit()
async function uploadFile() {
    // Uploads a local file to the bucket
    await bucket.upload(filename, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            contentType: 'image/jpeg',
            destination: 'Nodejs/object-name.jpg',
            public: true, //Public Download URLs using Object ACLs
            predefinedAcl: 'publicRead',
            uploadType: "media",
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                contentType: "image/jpeg",
                //contentType: 'image/jpeg',
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
                firebaseStorageDownloadTokens: uuidv4,
            },
        })
        .then((results) => {
            let file = results[0];
            console.log("https://firebasestorage.googleapis.com/v0/b/" + bucket.name      + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuidv4)
                       //https://firebasestorage.googleapis.com/v0/b/ming1-d8ff5.appspot.com/o/Nodejs%2FXXXX.jpg?alt=media&token=d6a17fea-7b46-41ce-ad4c-894700278214
            // const metadata = results[0];
            // //console.log(results);
            // console.log(metadata)
        });

    console.log(`${filename} uploaded to ${bucketName}.`);
}

//uploadFile().catch(console.error);


async function aa(){
    var options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };
    const [url] = await admin.storage().bucket()
        //.bucket(bucketName)
        .file('Nodejs/12.jpg').geturl
        .getSignedUrl(options);
    
    console.log('Generated GET signed URL:');
    console.log(url);
    console.log('--------------------')
    //https://firebasestorage.googleapis.com/v0/b/ming1-d8ff5.appspot.com/o/Nodejs%2FXXXX.jpg?alt=media&token=d6a17fea-7b46-41ce-ad4c-894700278214
}
aa()