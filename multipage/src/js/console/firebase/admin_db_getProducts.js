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

var fs = require('fs')
var path = require('path')
let txtPath = path.join(__dirname, 'data2.json')
//fs.writeFileSync(txtPath,'BBB')
let newArray = []
let query = firestore.collection('Products')
query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(doc.id==="--AutoNum--"){
            return true;
            // console.log(doc.id)
        }
        newArray.push(doc.data())
        //console.log(doc.id)
        
    })
    let str = JSON.stringify(newArray, null,4)
    fs.writeFileSync(txtPath,str)
})
.catch((err) => {
    console.log(err)
})

