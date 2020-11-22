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
filename = 'object-name.jpg'
const file = bucket.file(filename);
file.delete()
.then((snapshot) => {
    console.log(snapshot.state)
})
.catch((err) => {
    console.log(err)
})
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

// console.log(uuidv4)
// process.exit()
// async function uploadFile() {
//     // Uploads a local file to the bucket
//     await bucket.refFromURL(/* ... */).delete()
//     .then(function() {
//         console.log("deleted successfully!");
//     })
//     .catch(function() {
//         console.log("unable to delete");
//     });

//     console.log(`${filename} uploaded to ${bucketName}.`);
// }

// uploadFile().catch(console.error);
