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
    storageBucket: "ming1-d8ff5.appspot.com",
    databaseAuthVariableOverride: null
});
var firestore = admin.firestore()
let query = firestore.collection('Products');
query.get().then((querySnapshot) => {
    //querySnapshot[0].delete()
    //querySnapshot.docs[0].delete();
    let batch = firestore.batch();
    
    querySnapshot.docs.forEach((doc) => {
        if(doc.id!='--AutoNum--')
            batch.delete(doc.ref);
    })
    batch.commit()
//process.exit()
    // querySnapshot.docs.forEach((doc) => {
    //     if(doc.ref.path === 'Products/prod1'){
    //         console.log(doc.ref.path)
    //         batch.delete(doc.ref);
    //         batch.commit()
    //     }
    // })

    // querySnapshot.forEach(documentSnapshot => {
    //     //console.log(documentSnapshot)
        
    //     console.log(`Found document at ${documentSnapshot.ref.path}`);
    //     // documentSnapshot.map((doc) => {
    //     //     //doc.delete()
    //     //     console.log(doc)
    //     // })
    // });
})
// query.orderBy('foo').endAt(42).get().then(querySnapshot => {
//     querySnapshot.forEach(documentSnapshot => {
//         console.log(`Found document at ${documentSnapshot.ref.path}`);
//     });
// });

// var db = admin.database();
// var ref = db.collection("/Products");

// ref.once("value", function (snapshot) {
//     //console.log(snapshot.val());
//     console.log('ddd')
//     console.log(snapshot)
// });

//     });
const uuid = require('uuid');
//console.log(uuid.v4())
let uuidv4 = uuid.v4()