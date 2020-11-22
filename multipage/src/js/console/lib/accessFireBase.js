const firebaseConfig = import("../../../src/lib/firebaseConfig.mjs");
//import * as aaaa from '../../../src/lib/firebaseConfig.mjs'

//const firebase = require('firebase')
const admin = require('firebase-admin');
//import '../../../src/lib/firebaseConfig.mjs'
//console.log(firebaseConfig)
~async function aa() {
    var config;
    await firebaseConfig.then((e) => {
        //console.log('ok--->', e)
        config = e;
    }).catch((e) => {
        //console.log('err--->', e)
    })

    //await firebaseConfig

    //初始化 SDK，如下所示：
    // admin.initializeApp({
    //     credential: admin.credential.applicationDefault(),
    //     databaseURL: firebaseConfig.databaseURL,
    // });
    // console.log(firebaseConfig)
    // console.log(firebaseConfig.Module.default.projectId)

    var serviceAccount = require("../../../adminKeys/serviceAccount.json");
    //console.log(serviceAccount)
    var app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: config.default.databaseURL
    });

    let db = admin.firestore(); //firestore不需要databaseURL prop進行初始化
    //add data
    let docRef = db.collection('users').doc('alovelace');

    let setAda = docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });
    //read
    db.collection('users').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
            });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });

    // var email_KT = 'ice4kimo@yahoo.com.tw';
    // var user_id;
    // var bb = admin.auth().getUserByEmail(email_KT)
    // bb.then((e) => {
    //     console.log('ok-->', e)
    // }).catch((e) => {
    //     console.log('error-->', e)
    // })

    // let collectionRef = firestore.collection('col');

    // collectionRef.add({
    //     foo: 'bar'
    // }).then(documentReference => {
    //     let firestore = documentReference.firestore;
    //     console.log(`Root location for document is ${firestore.formattedName}`);
    // });


    // var db = admin.database();
    // var ref = db.ref("restricted_access/contacts");
    // ref.once("value", function (snapshot) {
    //     console.log(snapshot.val());
    // });

    // Promise.all([
    //     db.ref('/contacts/josh').set({
    //         name: 'Josh',
    //         city: 'San Francisco'
    //     }),
    //     db.ref('/contacts/tim').set({
    //         name: 'Tim',
    //         city: 'Paris'
    //     })
    // ]).then(function () {
    //     console.log("Contacts loaded to firebase");
    //     process.exit(0);
    // }).catch((function (error) {
    //     console.error("Error loading firebase", error);
    //     process.exit(-1);
    // }));

    // let aa1 = db.ref('/contacts').set({
    //     name: 'Josh',
    //     city: 'San Francisco'
    // }).then((e) => {
    //     console.log('ok-->', e)
    // }
    // ).catch((e) => {
    //     console.log('err-->', e)
    // }
    // )
    // console.log(aa1)


    // var ref = db.ref("restricted_access/secret_document");
    // ref.once("value", function (snapshot) {
    //     console.log(snapshot.val());
    // });

    // db.collection("movies").doc("新世紀福爾摩斯3").set({
    //         name: "新世紀福爾摩斯3",
    //         date: "2012",
    //         desctiption: "本劇改編自阿瑟·柯南·道爾爵士家喻戶曉的推理小說，一位脾氣古怪的大偵探在現代倫敦的街頭悄悄巡行，四處搜尋線索。",
    //         actors: ["班尼迪克·康柏拜區", "馬丁·費曼"]
    //     })
    //     .then(function () {
    //         //console.log("Document written with ID: ", docRef.id);

    //         //md(`set data successful`);
    //         console.log(`set data successful`)
    //     })
    //     .catch(function (error) {
    //         //console.error("Error adding document: ", error);
    //         //md(`Error adding document: ${error}`);
    //         console.log(`Error adding document: ${error}`)
    //     });

}();

// exports.readFromDb = async (query) => {
//   return await mjs_a
//   //await console.log(query)
// };