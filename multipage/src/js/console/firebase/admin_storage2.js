var admin = require('firebase-admin');
//Firebase 服務帳戶
//firebase-adminsdk-tp6g4@ming1-d8ff5.iam.gserviceaccount.com
const uuid = require('uuid');
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



let bucketName = 'ming1-d8ff5';
var bucket = admin.storage().bucket();
//var storageRef = admin.storage()
let filename = __dirname + '/11.jpg'

// (1)
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
router.post('/', upload.single('image'), (req, res, next) => {
  // (2)
  const blob = firebase.bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();
  blobStream.on('error', err => {
    res.send({
      success: false,
      message: 'blobStream error',
    });
  });
  blobStream.on('finish', () => {
    // (3)
    const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${encodeURIComponent(blob.name)}?hl=zh-tw`;
    res.send({
      success: true,
      imageUrl: publicUrl,
    });
  });
  // (4)
  blobStream.end(req.file.buffer);
});


process.exit()



//console.log(uuid.v4())

async function uploadFile() {
  // Uploads a local file to the bucket
  await bucket.upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      contentType: 'image/jpeg',
      destination: 'object-name.jpg',
      public: true,
      predefinedAcl: 'publicRead',
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        //contentType: "image/jpeg",
        contentType: req.file.mimetype,
        //contentType: 'image/jpeg',
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
        firebaseStorageDownloadTokens: uuid.v4(),
      },
    })
    .then((results) => {
      // const metadata = results[0];
      // //console.log(results);
      // console.log(metadata)
    });

  console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile().catch(console.error);