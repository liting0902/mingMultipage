import firebaseConfig from '../../../src/lib/firebaseConfig.mjs'
// import firebase from 'https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js'
// import firestore from 'https://www.gstatic.com/firebasejs/7.14.5/firebase-firestore.js'
// import auth from 'https://www.gstatic.com/firebasejs/7.14.5/firebase-auth.js'

export default class {
    setup(inFirebase) {
        this.firebase = inFirebase
        this.firebase.initializeApp(firebaseConfig);
        this.db = this.firebase.firestore();
    }

    addProduct(name, price, imgPath) {
        //.add({...})
        //.set({...})
        //let newId = GetNewUID();
        this.db.collection("Products").doc("prod1").set({
                name: "番茄炒蛋",
                price: "2012",
                imgPath: "/fsdfa/fdafd.jpg"
            })
            .then(function () {
                //console.log("Document written with ID: ", docRef.id);

                //md(`set data successful`);
                console.log(`set data successful`)
            })
            .catch(function (error) {
                //console.error("Error adding document: ", error);
                //md(`Error adding document: ${error}`);
                console.log(`Error adding document: ${error}`)
            });
    }
    deleteProduct(query) {
        let docRef = this.db.collection("movies").doc("新世紀福爾摩斯");
        docRef.delete()
            .then(function () {
                //console.log("Document written with ID: ", docRef.id);

                console.log(`delete data successful`);
            })
            .catch(function (error) {
                //console.error("Error adding document: ", error);
                console.log(`Error adding document: ${error}`);
            });
    }
    uploadImage(){
        var storageRef = firebase.storage().ref();
    }
    GetList_Product(query) {
        //query--category
        //query--productId
    }
}