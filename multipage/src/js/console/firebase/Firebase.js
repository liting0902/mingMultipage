import { property } from "lodash";
import { ProductInfo } from "../../../src/dataDefine";

export const MIME_TYPE = {
    jpg: 'image/jpeg',
    png: 'image/png',
}

export const FIRESTORE_COLLECTION = {
    Products: "Products"
}
export const FIRESTORAGE_FOLDERS = {
    Products: "Products"
}

/**@class */
export default class {
    constructor(firebase) {
        this._firebase = firebase;
        //this._firebase.initializeApp(firebaseConfig);
        //this._firebase.analytics();
        this._storageRef = null;
        this._db = null;
    }
    /**@property {ProductInfo} */
    productInfo = {
        productId: "xxxxxxxx", //aaaaa-1
        name: "xxxxxx", //"白斬雞"
        price: 0, //140
        //imgFileName: "xxxxxx", //白斬雞.jpg
        addDateTime: null,


        category: "beef",
        tag: "#牛肉#青椒",

        imgUrl: "xxxxxx",
        imgFileName: "XXX",

    }
    initStorage = () => {
        if (this._storageRef == null)
            // Create a root reference
            this._storageRef = this._firebase.storage().ref();
    }
    initDB = () => {
        if (this._db == null)
            this._db = this._firebase.firestore();
    }
    _addProduct_db = (name, price) => {
        this.initDB();
        return this._db.collection(FIRESTORE_COLLECTION.Products).add({
            name: name,
            price: price,
            addDateTime: this._firebase.firestore.FieldValue.serverTimestamp(),
        }) //new promise
    }
    _setProduct_db = (productid, imgUrl, imgFileName) => {
        this.initDB();
        return this._db.collection(FIRESTORE_COLLECTION.Products).doc(productid).set({
            imgUrl: imgUrl,
            imgFileName: imgFileName
        }, {
            merge: true
        }) //new promise
    }
    _setProduct_db_merge = (productid, newObject, options) => {
        if (options && options.beginEvent) {
            options.beginEvent()
        }
        this.initDB();
        let newPromise = this._db.collection(FIRESTORE_COLLECTION.Products).doc(productid).set(
                newObject, {
                    merge: true
                }) //new promise
            .then(() => {
                //console.log('end---  _setProduct_db_merge')
                if (options && options.endEvent) {
                    options.endEvent()
                }
                return 'end' //Promise.resolve('TTT');
            })
            .catch((err) => {
                return err //Promise.reject(err)
            })
        return newPromise
    }
    /**
     * 
     * @param {string} name - product name
     * @param {number} price - product price
     * @param {string} extension - file extension, ex: .jpg
     */
    _setProducts_And_autoNum(name, price, extension) {
        //console.log(777)
        this.initDB();
        var that = this
        var autoNum_DocRef = this._db.collection(FIRESTORE_COLLECTION.Products).doc("--AutoNum--");
        return this._db.runTransaction((transaction) => {
            return transaction.get(autoNum_DocRef)
                .then((autoNum_Doc) => {
                    if (!autoNum_Doc.exists) {
                        throw "autoNum_DocDocument does not exist!";
                    }
                    //get autoNum data
                    var autoNum_data = autoNum_Doc.data();
                    var nowNum = autoNum_data.autoNum //serial number
                    //add new doc
                    let uuid = Math.random().toString(36).substring(2, 10) // 36 carry bit, ignore '0.', get 8 char
                    let sNowNum = nowNum.toString().padStart(4, "0")
                    uuid = `${uuid}-${sNowNum}`
                    let newDoc = this._db.collection(FIRESTORE_COLLECTION.Products).doc(uuid)

                    let prodInfo = {
                        productId: uuid, //aaaaa-1
                        name: name, //"白斬雞"
                        price: price, //140
                        //imgFileName: "xxxxxx", //白斬雞.jpg
                        addDateTime: that._firebase.firestore.FieldValue.serverTimestamp(),


                        category: "beef",
                        tag: "#牛肉#青椒",

                        imgUrl: 'XXXXXXXXXXXXX',
                        imgFileName: 'XXXXXXXXXXXXXX',
                        autoNum: nowNum
                    }


                    transaction.update(autoNum_DocRef, {
                        autoNum: nowNum + 1
                    })
                    //throw "Force stop!";
                    transaction.set(newDoc, prodInfo)

                    let imgFileName = `${uuid}${extension}`
                    return {
                        imgFileName: imgFileName,
                        newDoc: newDoc
                    }


                    //var newPopulation = sfDoc.data().population + 1;

                })
        })
    }
    getProducts = () => {
        this.initDB();
        //console.log(this._db)
        // this._db.collection(FIRESTORE_COLLECTION.Products)
        //     .where("autoNum", "==", 1)
        //     .get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((item) => {
        //             console.log(item.autoNum)
        //         })

        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        let str = "";
        this._db.collection("Products")//.where("autoNum", "==", 7)
            .get()
            .then(function (querySnapshot) {
                // let {docs} = querySnapshot
                // console.log(docs[2].data())
                //console.log(querySnapshot.docs[1].data())
                querySnapshot.forEach(function (doc) {
                    //console.log(111)
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id)
                    let data = doc.data()
                    str+=JSON.stringify(data)
                    console.log(doc.id, " => ", doc.data());
                    //return 5;
                });
                //console.log(888)
                return str
            })
            .then((e) => {
                console.log(str);
            }
            )
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    /**
     * @function
     * @param {string} name 
     * @param {number} price 
     * @param {Blob} blob 
     * @param {object} options 
     */
    addProduct4 = (name, price, blob, options) => {
        //console.log(87)
        if (options && options.beginEvent) {
            options.beginEvent()
        }
        // if(options.endEvent)
        //     console.log('endEvent')
        this.initDB();
        var that = this
        //get blob extension
        let extention = this.getBlobExtension(blob)
        //console.log(extention)
        return this._setProducts_And_autoNum(name, price, extention)
            .then(({
                imgFileName,
                newDoc
            }) => {
                //{imgFileName,newDoc}
                // console.log(e)
                // console.log(111)
                // debugger
                let promise1 = that.uploadFile(blob, `${FIRESTORAGE_FOLDERS.Products}/${imgFileName}`);

                return Promise.all([promise1, Promise.resolve(imgFileName), Promise.resolve(newDoc)])
            })
            .then((result) => {
                // console.log(222)
                // debugger
                let url = result[0]
                console.log(`addProduct4 url--  ${url}`)
                let imgFileName = result[1]
                let newDoc = result[2]
                //console.log(result[0])
                return newDoc.set({
                    imgUrl: url,
                    imgFileName: imgFileName
                }, {
                    merge: true
                })
            })
            .then(() => {
                if (options && options.endEvent) {
                    options.endEvent()
                }
            })
            .catch((err) => {
                console.log('ERROR: ', err)
            })
    }
    // addProduct3 = (name, price, blob) => {
    //     this.initDB();
    //     var that = this
    //     //get blob extension
    //     let extention = this.getBlobExtension(blob)
    //     //get random id
    //     //let uid = Math.random().toString(36).substring(2, 10)// 36 carry bit, ignore '0.', get 8 char
    //     //let prodDoc = this._db.collection(FIRESTORE_COLLECTION.Products).doc();
    //     //upload file
    //     let imgFileName = `${prodDoc.id}${extention}`
    //     that.uploadFile(blob, `${FIRESTORAGE_FOLDERS.Products}/${imgFileName}`)
    //         .then((url) => {
    //             console.log(url)
    //             //new product
    //             let prodInfo = {
    //                 productId: prodDoc.id, //aaaaa-1
    //                 name: name, //"白斬雞"
    //                 price: price, //140
    //                 //imgFileName: "xxxxxx", //白斬雞.jpg
    //                 addDateTime: that._firebase.firestore.FieldValue.serverTimestamp(),


    //                 category: "beef",
    //                 tag: "#牛肉#青椒",

    //                 imgUrl: url,
    //                 imgFileName: imgFileName,

    //             }
    //             prodDoc.set(prodInfo, {
    //                 merge: true
    //             }) //new promise
    //             console.log(prodDoc.id)

    //             const increment = this._firebase.firestore.FieldValue.increment(1)
    //             const refStat = this._db.collection(FIRESTORAGE_FOLDERS.Products).doc('--AutoNum--')
    //             refStat.set({
    //                     autoNum: increment
    //                 }, {
    //                     merge: true
    //                 })
    //                 .then((e) => {
    //                     console.log('ok, ', e)
    //                 })
    //                 .catch((e) => {
    //                     console.log('err', e)
    //                 })
    //             //const refRandom = this._db.collection('AutoIncrement').doc(`${Math.random()}`)
    //             //const batch = this._db.batch();
    //             // batch.set(refRandom, {
    //             //     title: 'New Story'
    //             // })
    //             // batch.set(refStat, {
    //             //     autoNum: increment
    //             // }, {
    //             //     merge: true
    //             // })
    //             // batch.commit();
    //         })
    //         .catch((err) => {
    //             console.log('ERROR: ', err)
    //         })

    // }
    // addProduct2 = (name, price, blob) => {
    //     this.initDB();
    //     var that = this
    //     //get blob extension
    //     let extention = this.getBlobExtension(blob)
    //     //get id
    //     let prodDoc = this._db.collection(FIRESTORE_COLLECTION.Products).doc();
    //     //upload file
    //     let imgFileName = `${prodDoc.id}${extention}`
    //     that.uploadFile(blob, `${FIRESTORAGE_FOLDERS.Products}/${imgFileName}`)
    //         .then((url) => {
    //             console.log(url)
    //             //new product
    //             let prodInfo = {
    //                 productId: prodDoc.id, //aaaaa-1
    //                 name: name, //"白斬雞"
    //                 price: price, //140
    //                 //imgFileName: "xxxxxx", //白斬雞.jpg
    //                 addDateTime: that._firebase.firestore.FieldValue.serverTimestamp(),


    //                 category: "beef",
    //                 tag: "#牛肉#青椒",

    //                 imgUrl: url,
    //                 imgFileName: imgFileName,

    //             }
    //             prodDoc.set(prodInfo, {
    //                 merge: true
    //             }) //new promise
    //             console.log(prodDoc.id)

    //             const increment = this._firebase.firestore.FieldValue.increment(1)
    //             const refStat = this._db.collection(FIRESTORAGE_FOLDERS.Products).doc('--AutoNum--')
    //             refStat.set({
    //                     autoNum: increment
    //                 }, {
    //                     merge: true
    //                 })
    //                 .then((e) => {
    //                     console.log('ok, ', e)
    //                 })
    //                 .catch((e) => {
    //                     console.log('err', e)
    //                 })
    //             //const refRandom = this._db.collection('AutoIncrement').doc(`${Math.random()}`)
    //             //const batch = this._db.batch();
    //             // batch.set(refRandom, {
    //             //     title: 'New Story'
    //             // })
    //             // batch.set(refStat, {
    //             //     autoNum: increment
    //             // }, {
    //             //     merge: true
    //             // })
    //             // batch.commit();
    //         })
    //         .catch((err) => {
    //             console.log('ERROR: ', err)
    //         })

    // }
    getBlobExtension(blob) {
        let extention = "";
        switch (blob.type) {
            case MIME_TYPE.jpg:
                extention = ".jpg"
                break;
            case MIME_TYPE.png:
                extention = ".png"
                break;
            default:
                break;
        }
        return extention;
    }
    // addProduct = (name, price, blob) => {
    //     this.initDB();
    //     var that = this
    //     this._addProduct_db(name, price)
    //         .then((docRef) => {
    //             let extention = "";
    //             switch (blob.type) {
    //                 case MIME_TYPE.jpg:
    //                     extention = ".jpg"
    //                     break;
    //                 case MIME_TYPE.png:
    //                     extention = ".png"
    //                     break;
    //                 default:
    //                     break;
    //             }
    //             console.log('ext----------' + extention)
    //             let promise1 = that.uploadFile(blob, `${FIRESTORAGE_FOLDERS.Products}/${docRef.id}${extention}`);
    //             let promise2 = new Promise((resolve) => {
    //                 resolve({
    //                     prodId: docRef.id,
    //                     extention: extention,
    //                 })
    //                 //(`${docRef.id}${extention}`);
    //                 //return `${docRef.id}${extention}`
    //             })

    //             // let rtnObj = {
    //             //     url:
    //             //     filename:`${docRef.id}${extention}`,
    //             //}
    //             return Promise.all([promise1, promise2]);
    //             //return 5
    //         })
    //         .then((result) => {
    //             let url = result[0]
    //             let {
    //                 prodId,
    //                 extention
    //             } = result[1]
    //             let filename = `${prodId}${extention}`
    //             // let rtnObj = {
    //             //     url:result[0],
    //             //     prodId:prodId,
    //             //     filename:filename,
    //             // }
    //             console.log(prodId)
    //             return this._setProduct_db(prodId, url, filename);
    //             //console.log(obj,obj2)
    //             //console.log(result)
    //         })
    //         .then((e) => {
    //             console.log('done', e)
    //         })
    //         .catch((err) => {
    //             console.error("Error adding document: ", err);
    //         })
    //     // Add a new document with a generated id.
    //     // this._db.collection(FIRESTORE_COLLECTION.Products).add({
    //     //         name: name,
    //     //         price: price
    //     //     })
    //     //     .then(function (docRef) {
    //     //         if (blob)
    //     //             that.uploadFile(blob, `${FIRESTORAGE_FOLDERS.Products}/${docRef.id}.jpg`);
    //     //         //console.log("Document written with ID: ", docRef.id);
    //     //         console.log('11111111111')
    //     //         return docRef;
    //     //     })
    //     //     .then((docRef) => {
    //     //         console.log('2222222222')
    //     //     })
    //     //     .catch(function (error) {
    //     //         console.error("Error adding document: ", error);
    //     //     });
    // }
    uploadFile = (blob, cloudFilePath) => {
        this.initStorage();
        //console.log('ready')
        // Create a root reference
        //var storageRef = firebase.storage().ref();

        // Create a reference to 'mountains.jpg'
        //var mountainsRef = storageRef.child('MenuImages/mountains.jpg');
        var childRef = this._storageRef.child(cloudFilePath);

        // Create a reference to 'images/mountains.jpg'
        //var mountainImagesRef = storageRef.child('images/mountains.jpg');

        // While the file names are the same, the references point to different files
        // mountainsRef.name === mountainImagesRef.name // true
        // mountainsRef.fullPath === mountainImagesRef.fullPath // false

        // var file = ... // use the Blob or File API
        var promise_UploadTask = childRef.put(blob)
            .then(function (snapshot) {
                console.log('snapshot.state--' + snapshot.state)
                //console.log(snapshot)
                return snapshot.ref.getDownloadURL()
                // snapshot.ref.getDownloadURL().then(url => {
                //     console.log(' * new url', url)
                // })

                //return snapshot.ref.downloadURL()
                //console.log('Uploaded a blob or file!--SUCCESS!!');
            })
            .then((url) => {
                // console.log('new url----------below')
                // console.log(url)
                return url
            })
            // .then((snapshot) => {
            //     console.log(snapshot)
            // })
            .catch((e) => {
                console.log('error--', e)

            });
        return promise_UploadTask
        // uploadTask.on('state_changed',(snapshot) => {
        //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        // });
    }
    autoIncrementNum() {
        this.initDB();
        var that = this
        const increment = this._firebase.firestore.FieldValue.increment(1)
        const decrement = this._firebase.firestore.FieldValue.increment(-1)
        const refStat = this._db.collection('AutoIncrement').doc('--AutoNum--')
        const refRandom = this._db.collection('AutoIncrement').doc(`${Math.random()}`)
        const batch = this._db.batch();
        batch.set(refRandom, {
            title: 'New Story'
        })
        batch.set(refStat, {
            autoNum: increment
        }, {
            merge: true
        })
        batch.commit();
    }
    batch_auto_get_id() {
        this.initDB();
        var that = this
        const batch = this._db.batch();
        const newDocRef = this._db.collection('Batch').doc();
        let id = newDocRef.id

        batch.set(newDocRef, {
            title: 'Hello Again, World',
            id: newDocRef.id
        });
        // const postsRef = this._db.collection('posts').doc(postKey);
        // batch.set(postsRef, {
        //     title: 'Hello Again, World'
        // });

        // const votesRef = this._db.collection('posts').doc(postKey)
        //     .collection('votes').doc();
        // batch.set(votesRef, {
        //     upvote: true
        // })



        batch.commit().then(function () {});
    }
    // setProduct=(name,price) => {
    //     this.initDB();

    //     this.db.collection("movies").doc("新世紀福爾摩斯2").set({
    //         name: "新世紀福爾摩斯2252",
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
    // }

    //--------------------
    downloadFile = (cloudFilePath, fnApplyUrl) => {
        //'images/stars.jpg'
        this.initStorage();
        // Create a reference to the file we want to download
        var starsRef = this._storageRef.child(cloudFilePath);

        // Get the download URL
        starsRef.getDownloadURL().then(function (url) {
            // Insert url into an <img> tag to "download"
            fnApplyUrl(url);
        }).catch(function (error) {
            console.log(error)
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;

                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                    //...

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });
    }
    //----------------------------------

    uploadFile_progress = (blob, cloudFilePath) => {
        this.initStorage();
        var uploadTask = this._storageRef.child(cloudFilePath).put(blob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            console.log(error)
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                    //...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);
            });
        });
    }




}