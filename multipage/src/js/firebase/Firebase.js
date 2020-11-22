//@ts-check

/**@typedef {object} EnumObj 
 * @prop {number} value
 * @prop {string} desc
 */
import {
    ProductInfo,
    OrderInfo,
    ENUM_ProductCategory,
    Map_ProductCategory,
} from "../dataDefine/index.js";

/**@enum {string} */
export const MIME_TYPE = {
    jpg: 'image/jpeg',
    png: 'image/png',
}
/**@enum {string} */
export const FIRESTORE_COLLECTION = {
    Products: "Products",
    ProductInfo: "ProductInfo",
    Users: "Users",
    OrderInfo: "OrderInfo"
}
/**@enum {string} */
export const FIRESTORAGE_FOLDERS = {
    Products: "Products"
}
/**@enum {string} */
export const ENUM_orderStatus = {
    all: 'all',
    completed: 'completed',
    waitForPay: 'waitForPay',
    waitForDelivery: 'waitForDelivery',
    canceled: 'canceled',
}

/**
 * @module
 * @class 
 * @description Firebase class
 */
export default class Firebase {
    /**
     * @param {firebase} firebase - from firebase
     */
    constructor(firebase, app) {
        this._firebase = firebase;
        this._app = (app) ? app : firebase.app()
        this._serverArea = 'asia-east2'
        //this._firebase.initializeApp(firebaseConfig);
        //this._firebase.analytics();
        /**
         * initial-- use this.initStorageRef()
         * @type {object} - this._firebase.storage().ref()
         */
        this._storageRef = null;
        /**
         * initial-- use this.initDb()
         * @type {object} - this._firebase.firestore()
         */
        this._db = null;
        /**
         * initial-- use this.initFunctions()
         * @type {object} - this._firebase.functions()
         */
        this._functions = null;
    }

    /**@type {import("../dataDefine/index.js").ProductInfo} */
    productInfo = {
        productId: "xxxxxxxx", //aaaaa-1
        name: "xxxxxx", //"白斬雞"
        price: 0, //140
        //imgFileName: "xxxxxx", //白斬雞.jpg
        addDateTime: null,
        isActived: false,

        category: "beef",
        tag: "#牛肉#青椒",

        imgUrl: "xxxxxx",
        imgFileName: "XXX",
        autoNum: null

    }
    /**@description initial this._firebase.storage().ref() */
    initStorage = () => {
        if (this._storageRef == null)
            // Create a root reference
            this._storageRef = this._firebase.storage().ref();
    }
    /**@description initial this._firebase.firestore()*/
    initDB = () => {
        if (this._db == null)
            this._db = this._firebase.firestore();
    }
    /**@description initial this._firebase.firestore()*/
    initFunctions = () => {
        // if (this._functions == null)
        //     this._functions = this._firebase.app().functions();
    }
    /**
     * add ProductInfo to firestore
     * @param  {string} name
     * @param  {number} price
     */
    _addProduct_db = (name, price) => {
        this.initDB();
        return this._db.collection(FIRESTORE_COLLECTION.Products).add({
            name: name,
            price: price,
            addDateTime: this._firebase.firestore.FieldValue.serverTimestamp(),
        }) //new promise
    }
    /**
     * merge image Info to firestore.Products
     * @param  {string} productid
     * @param  {string} imgUrl
     * @param  {string} imgFileName
     */
    _setProduct_db = (productid, imgUrl, imgFileName) => {
        this.initDB();
        return this._db.collection(FIRESTORE_COLLECTION.Products).doc(productid).set({
            imgUrl: imgUrl,
            imgFileName: imgFileName
        }, {
            merge: true
        }) //new promise
    }
    /**
     * merge data to firestore.Products
     * @param  {string} productid
     * @param  {ProductInfo} newObject
     * @param  {{beginEvent:function, endEvent:function}} options - callback events
     */
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
     * @param  {string} name
     * @param  {number} price
     * @param  {string} extension - image filename extension
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
                    /**@type {ProductInfo} */
                    let prodInfo = {
                        productId: uuid, //aaaaa-1
                        name: name, //"白斬雞"
                        price: price, //140
                        //imgFileName: "xxxxxx", //白斬雞.jpg
                        /**@type {(Date|object)} */
                        addDateTime: that._firebase.firestore.FieldValue.serverTimestamp(),


                        category: "beef",
                        tag: "#牛肉#青椒",

                        imgUrl: 'XXXXXXXXXXXXX',
                        imgFileName: 'XXXXXXXXXXXXXX',
                        autoNum: nowNum,
                        isActived: false,
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
    _setOrderInfo_And_autoNum() {
        //console.log(777)
        this.initDB();
        var that = this
        this._db.collection(FIRESTORE_COLLECTION.OrderInfo).doc("--AutoNum--")
            .get().then((docSnapshot) => {
                console.log(docSnapshot.readTime)
            })
        return
        var autoNum_DocRef = this._db.collection(FIRESTORE_COLLECTION.OrderInfo).doc("--AutoNum--");
        return this._db.runTransaction((transaction) => {
            return transaction.get(autoNum_DocRef)
                .then((autoNum_Doc) => {
                    if (!autoNum_Doc.exists) {
                        throw "autoNum_DocDocument does not exist!";
                    }

                    var autoNum_data = autoNum_Doc.data();
                    var nowNum = autoNum_data.autoNum //serial number
                    console.log(autoNum_Doc.id)
                    //transaction.update(cityRef, { population: population })

                    // let uuid = Math.random().toString(36).substring(2, 10) // 36 carry bit, ignore '0.', get 8 char
                    // let sNowNum = nowNum.toString().padStart(4, "0")
                    // uuid = `${uuid}-${sNowNum}`
                    // let newDoc = this._db.collection(FIRESTORE_COLLECTION.Products).doc(uuid)

                    // let prodInfo = {
                    //     productId: uuid, //aaaaa-1
                    //     name: name, //"白斬雞"
                    //     price: price, //140
                    //     //imgFileName: "xxxxxx", //白斬雞.jpg
                    //     addDateTime: that._firebase.firestore.FieldValue.serverTimestamp(),


                    //     category: "beef",
                    //     tag: "#牛肉#青椒",

                    //     imgUrl: 'XXXXXXXXXXXXX',
                    //     imgFileName: 'XXXXXXXXXXXXXX',
                    //     autoNum: nowNum
                    // }


                    // transaction.update(autoNum_DocRef, {
                    //     autoNum: nowNum + 1
                    // })

                    // transaction.set(newDoc, prodInfo)

                    // let imgFileName = `${uuid}${extension}`
                    // return {
                    //     imgFileName: imgFileName,
                    //     newDoc: newDoc
                    // }




                })
        })
    }


    /**
     * @function
     * @return {Promise<object>} - firestore.Users.data()
     */
    getUser = () => {
        if (!this._firebase.auth()) {
            throw new Error('this._firebase.auth() is --->' + this._firebase.auth())
        }
        if (this._firebase.auth()) {
            /**@ignore */
            let pp = this._firebase.auth()
            if (pp)
                pp.currentUser.uid
        }
        let uid = this._firebase.auth().currentUser.uid

        this.initDB();
        return this._db.collection(FIRESTORE_COLLECTION.Users).doc(uid).get()
            .then((doc) => {
                return doc.data()
            })
        // .then((query) => {
        //     console.log(query.docs)
        // }
        // )

    }
    getProducts = () => {
        this.initDB();
        let rtn_ProductInfo_List = []
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
        //let str = "";
        return this._db.collection(FIRESTORE_COLLECTION.Products) //.where("autoNum", "==", 7)
            .get()
            .then(function (querySnapshot) {
                // let {docs} = querySnapshot
                // console.log(docs[2].data())
                //console.log(querySnapshot.docs[1].data())
                querySnapshot.forEach(function (doc) {
                    //console.log(doc.id)
                    if (doc.id === '--AutoNum--')
                        return true
                    //console.log(111)
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id)
                    let data = doc.data()
                    rtn_ProductInfo_List.push(data)
                    // str += JSON.stringify(data)
                    // console.log(doc.id, " => ", doc.data());

                });
                //console.log(888)
                return rtn_ProductInfo_List
            })
        // .catch(function (error) {
        // });
    }
    /**
     * @param {string} name 
     * @param {number} price 
     * @param {Blob} blob - image blob
     * @param {{beginEvent:function, endEvent:function}} options - callback functions
     */
    addProduct4 = (name, price, blob, options) => {
        //console.log(87)
        if (options && options.beginEvent) {
            options.beginEvent()
        }
        // if(options.endEvent)
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
            .catch((err) => {})
    }
    /**
     * @param {string} name 
     * @param {number} price
     * @param {ENUM_ProductCategory} category - beef/chicken/soybean...etc
     * @param {{beginEvent:function, endEvent:function}} [options] - callback functions
     */
    addProduct5 = (name, price, category,imgUrl, options) => {
        function getRandomId(num) {
            let startIndex = 2 //ignore '0.'
            let endIndex = 2 + num
            //let uuid = Math.random().toString(36).substring(2, 10) // 36 carry bit, ignore '0.', get 8 char
            let uuid = Math.random().toString(36).substring(startIndex, endIndex) // 36 carry bit, ignore '0.', get 8 char
            return uuid
        }
        //console.log(87)
        if (options && options.beginEvent) {
            options.beginEvent()
        }
        // if(options.endEvent)
        this.initDB();
        var that = this

        let newNum = 0 //1
        let FIRESTORE_COLLECTION_ProductInfo = 'ProductInfo'
        var autoNum_DocRef = that._db.collection(FIRESTORE_COLLECTION_ProductInfo).doc("--AutoNum--");
        return that._db.runTransaction((transaction) => {
                return transaction.get(autoNum_DocRef)
                    .then((autoNum_Doc) => {
                        if (!autoNum_Doc.exists) {
                            //throw "autoNum_DocDocument does not exist!";
                            return autoNum_DocRef.set({
                                '--AutoNum--': newNum, //0
                                'autoNum': newNum, //0
                                updateDateTime: that._firebase.firestore.FieldValue.serverTimestamp()
                            })
                        }
                        //get autoNum data
                        let autoNum_data = autoNum_Doc.data();
                        let nowNum = autoNum_data.autoNum //serial number
                        nowNum++
                        let sNowNum = String(nowNum).padStart(4, '0')
                        // //add new doc
                        // let uuid = Math.random().toString(36).substring(2, 10) // 36 carry bit, ignore '0.', get 8 char
                        let newProdId = `${sNowNum}-${getRandomId(3)}`
                        //let price = 140
                        //let name = "白斬雞"
                        // let sNowNum = nowNum.toString().padStart(4, "0")
                        // uuid = `${uuid}-${sNowNum}`
                        let newDocRef = that._db.collection(FIRESTORE_COLLECTION_ProductInfo).doc(newProdId)
                        /**@type {import('../dataDefine/index.js').ProductInfo} */
                        let prodInfo = new ProductInfo();
                        prodInfo.productId = newProdId // 0001-tds
                        prodInfo.name = name //"白斬雞"
                        prodInfo.price = price //140
                        prodInfo.addDateTime = that._firebase.firestore.FieldValue.serverTimestamp()
                        prodInfo.category = category
                        if(imgUrl)
                            prodInfo.imgUrl = imgUrl
                        //prodInfo.tag = "#"
                        //prodInfo.imgUrl = 'null'
                        //prodInfo.imgFileName = 'null'
                        prodInfo.autoNum = nowNum
                        // convert to plain object
                        prodInfo = Object.assign({}, prodInfo)
                        // prodInfo = {
                        //     "name": "豬腱",
                        //     "price": 100,
                        //     "category": "pork"
                        // }

                        transaction.set(newDocRef, prodInfo)
                        transaction.update(autoNum_DocRef, {
                            autoNum: nowNum
                        })
                        return newDocRef //newProdId
                        //return Promise.resolve(newProdId)
                    })
            })
            .then((newDocRef) => {
                return newDocRef.get()
            })
            .then((docSnapShot) => {
                return docSnapShot.data()
            })

    }
    /**
     * get filename.Extension of image 
     * @param {Blob} blob - image blob
     * @returns {string} - file extension name(.jpg |.png)
     */
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
    /**
     * upload file blob to firebase cloud storage
     * @param {Blob} blob 
     * @param {string} cloudFilePath 
     */
    uploadFile = (blob, cloudFilePath) => {
        this.initStorage();
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
                //console.log(snapshot)
                return snapshot.ref.getDownloadURL()
                // snapshot.ref.getDownloadURL().then(url => {
                // })

                //return snapshot.ref.downloadURL()
            })
            .then((url) => {
                // console.log(url)
                return url
            })
            // .then((snapshot) => {
            //     console.log(snapshot)
            // })
            .catch((e) => {

            });
        return promise_UploadTask
        // uploadTask.on('state_changed',(snapshot) => {
        //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // });
    }
    /**
     * 
     * @param {string} productId 
     * @param {Blob} blob 
     * @param  {{beginEvent:function, endEvent:function}} [options] - callback events
     */
    updateCloudStorageFile(productId, blob, options) {
        if (options && options.beginEvent) {
            options.beginEvent()
        }

        this.initStorage();
        var self = this
        let extensionName = this.getBlobExtension(blob)
        let filename = `${productId}${extensionName}`
        let cloudFilePath = `ProductInfo/${filename}`
        var childRef = this._storageRef.child(cloudFilePath);
        return childRef.put(blob)
            .then((snapShot) => {
                // console.log(snapShot)
                return snapShot.ref.getDownloadURL()
            })
            .then((url) => {
                return self.updateProductInfo(productId, {
                    imgUrl: url,
                    imgFileName: filename
                })
                //return url
            })
            .finally(() => {
                if (options && options.endEvent) {
                    options.endEvent()
                }
            })
    }
    /**
     * test and deprecated
     */
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
    /**
     * test and deprecated
     */
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


    /**
     * download file from firestore cloud storage
     * @param {string} cloudFilePath - firestore cloud path
     * @param {function} fnApplyUrl - callback function after downloaded
     */
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
    /**test and deprecated */
    uploadFile_progress = (blob, cloudFilePath) => {
        this.initStorage();
        var uploadTask = this._storageRef.child(cloudFilePath).put(blob);
        var self = this
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(self._firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
                case self._firebase.storage.TaskState.PAUSED: // or 'paused'
                    break;
                case self._firebase.storage.TaskState.RUNNING: // or 'running'
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
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {});
        });
    }
    getUser2 = (data) => {
        this.initFunctions()
        //var addMessage = this._firebase.app().functions('asia-east2').httpsCallable('getUser');
        var addMessage = this._firebase.app().functions('asia-east2').httpsCallable('addOrderInfo');


        return addMessage(data)
        // .then(function (result) {
        //     chai.expect(10).to.be.equal(10);
        //     // Read result of the Cloud Function.
        //     //var sanitizedMessage = result.data.text;
        //     //console.log(result)
        // }).catch(function (error) {
        //     // Getting the Error details.
        //     var code = error.code;
        //     var message = error.message;
        //     var details = error.details;
        //     console.log(error)
        //     // ...
        // });

    }
    /**
     * add OrderInfo to firestore.OrderInfo
     * @param {string} funcName
     * @param {boolean} isProductSite
     * @param {any} data
     * @param {{beginEvent: function, endEvent: function}} [options] - callback functions
     */
    callFunctions(funcName, isProductSite, data, options) {
        //console.log(87)
        if (options && options.beginEvent) {
            options.beginEvent()
        }
        let callFunc = (isProductSite === true) ?
            this._app.functions('asia-east2').httpsCallable(funcName) :
            this._app.functions().httpsCallable(funcName)
        // if(isProductSite === true)
        //     callFunc = this._app.functions('asia-east2').httpsCallable(funcName)//('addOrderInfo');
        // else
        //     callFunc = this._app.functions().httpsCallable(funcName)//('addOrderInfo');
        return callFunc(data)
            .then((result) => {
                if (options && options.endEvent) {
                    options.endEvent()
                }
                return result
            })
    }
    /**
     * add OrderInfo to firestore.OrderInfo
     * @param  {import("../dataDefine/index.js").OrderInfo} data
     * @param  {{beginEvent: function, endEvent: function}} [options] - callback functions
     */
    addOrderInfo(data, isProductSite, options) {
        let order = Object.assign({}, data);
        //console.log("LOG:: Firebase -> addOrderInfo -> order", order)
        removeFuncProp(order); //remove getShopItems_Id 
        /**@function default=true */
        function get_isUseProdSite(isProductSite) {
            if (isProductSite === undefined || isProductSite === null)
                return true
            else
                return isProductSite
        }
        let isUseProdSite = get_isUseProdSite(isProductSite)
        order.createDateTime = null //this._firebase.firestore.FieldValue.serverTimestamp();
        return this.callFunctions('addOrderInfo', isUseProdSite, order, options)
        //console.log(87)
        if (options && options.beginEvent) {
            options.beginEvent()
        }
        this.initFunctions();
        var that = this
        order = Object.assign({}, data);
        //order = {totalPrice:555}
        order.createDateTime = null //this._firebase.firestore.FieldValue.serverTimestamp();
        //var addMessage = firebase.app().functions('asia-east2').httpsCallable('getUser');

        //let app = firebase.initializeTestApp({
        //app.functions().useFunctionsEmulator("http://localhost:5001");
        //const local_addOrderInfo = firebase.app().functions('asia-east2').httpsCallable('addOrderInfo');
        var call_addOrderInfo = this._app.functions('asia-east2').httpsCallable('addOrderInfo');
        //var call_addOrderInfo = this._firebase.app().functions('asia-east2').httpsCallable('addOrderInfo');

        return call_addOrderInfo(order)
            .then((result) => {
                if (options && options.endEvent) {
                    options.endEvent()
                }
                return result
            })
        // .then((res) => {
        //     return 11
        // })


        // this.initDB();
        // var that = this
        // let order = Object.assign({}, data);
        // order.createDateTime = this._firebase.firestore.FieldValue.serverTimestamp();
        // let docRef = this._db.collection(FIRESTORE_COLLECTION.OrderInfo).doc();
        // order.orderId = docRef.id;
        // console.log(order.orderId)
        // docRef.set(order)
        //     .then((e) => {
        //         if (options && options.endEvent) {
        //             options.endEvent()
        //         }
        //     })
        //     .catch((err) => {
        //     })

    }



    /**
     * 
     * @param {string} userId 
     * @param {ENUM_orderStatus} orderStatus 
     * @returns {Promise<OrderInfo[]>}
     */
    getOrderInfo = (userId, orderStatus) => {
        this.initDB();

        // if(userId)
        //     fakeUid = userId
        let rtnOrderInfo_list = []
        let list_productId = []
        let self = this

        /**@param {ENUM_orderStatus} inOrderStatus */
        function getQuery(inOrderStatus) {
            switch (inOrderStatus) {
                case ENUM_orderStatus.all:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId)
                case ENUM_orderStatus.completed:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isCompleted', '==', true)
                case ENUM_orderStatus.waitForPay:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isPaid', '==', false).where('orderStatus.isCanceled', '==', false)
                case ENUM_orderStatus.waitForDelivery:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isPaid', '==', true).where('orderStatus.isDelivery', '==', false)
                case ENUM_orderStatus.canceled:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isCanceled', '==', true)
                default:
                    break;
            }
        }
        //return this._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isPaid', '==', true).get()
        return getQuery(orderStatus).get() //.orderBy("createDateTime","desc").get()
            .then((snapshot) => {
                snapshot.forEach(element => {
                    //let data = snapshot.docs[0].data()
                    let orderInfo = new OrderInfo();
                    orderInfo = Object.assign(orderInfo, element.data());
                    orderInfo.createDateTime = (orderInfo.createDateTime == null) ? null : orderInfo.createDateTime.toDate()
                    //orderInfo.createDateTime = 
                    //console.log(orderInfo)
                    rtnOrderInfo_list.push(orderInfo)
                    let arr = orderInfo.getShopItems_Id()
                    list_productId.push(...arr);
                });
                //list_productId.push('AAA','AAA');
                //distinct
                list_productId = [...new Set(list_productId)]
                rtnOrderInfo_list.sort((a, b) => {
                    return b.createDateTime - a.createDateTime
                })
                //console.log(list_productId)
                //console.log(rtnOrderInfo_list)
                return [rtnOrderInfo_list, list_productId]
                // let data = snapshot.docs[0].data()
                // let orderInfo = new OrderInfo();
                // orderInfo = Object.assign(orderInfo, data);
                // orderInfo.createDateTime = data.createDateTime.toDate()
                // console.log(orderInfo)


                // let temp = new Date(data.createDateTime)
                // console.log(data.createDateTime.toDate())
            })
            .then((array) => {
                let [orderInfo_list, list_productId] = array

                //------- group list_productId limit -- 10
                function getGroupedArray_ByTimes(TargetArray, eachGroupCount) {
                    let rtnGroupedArray = []
                    // loop times
                    let doTimes = Math.ceil(TargetArray.length / eachGroupCount) //4
                    for (let i = 0; i < doTimes; i++) {
                        let newGroup = TargetArray.splice(0, eachGroupCount)
                        rtnGroupedArray.push(newGroup)
                    }
                    return rtnGroupedArray
                }
                /**@type {Array} */
                let listGroupProductId = getGroupedArray_ByTimes(list_productId, 10)
                // get firestore - Products in Id
                let newPromise = (list_Limit_10_ProductIds) => {
                    return self._db.collection(FIRESTORE_COLLECTION.ProductInfo)
                        .where(self._firebase.firestore.FieldPath.documentId(), 'in', list_Limit_10_ProductIds) //['02d2bss3-0012','1c718och-0001'])
                        .get()
                }
                // console.log(newPromise)
                let PromistArray = []
                //console.log(listGroupProductId[0])
                PromistArray.push(orderInfo_list)
                //PromistArray.push(list_productId)
                listGroupProductId.forEach((item) => {
                    PromistArray.push(newPromise(item)) //listGroupProductId[0]))    
                })
                //PromistArray.push(newPromise(listGroupProductId[0]))
                // PromistArray.push(newPromise(listGroupProductId[1]))
                // for(let i=0;i<listGroupProductId.length;i++){
                //     let list_Limit_10_ProductIds = listGroupProductId[i]
                //     PromistArray.push(newPromise(list_Limit_10_ProductIds))
                // }
                return Promise.all(PromistArray) //[orderInfo_list, list_productId, newPromise()])
            })
            .then((array) => {

                let orderInfo_list = array.shift() // pop [0]
                //let list_productId = array.splice(0, 1)
                //let [orderInfo_list, list_productId, snapshot] = array
                let arraySnapshot = array
                let rtnOrderInfo_list = orderInfo_list
                /**
                 * @type {ProductInfo[]} - distinct productInfo list
                 */
                let arrayDistinctProducts = []
                //collect distinct productInfo array
                //arraySnapshot = arraySnapshot.flat(1)
                let arrayDocs = []
                arraySnapshot.forEach(snapshot => {
                    arrayDocs = arrayDocs.concat(snapshot.docs)
                });
                //arraySnapshot[0].docs, arraySnapshot[1].docs
                //arrayDocs = arrayDocs.flat(1)
                arrayDocs.forEach(element => {
                    /**@type {ProductInfo} */
                    let productInfo = element.data()
                    productInfo = Object.assign(new ProductInfo(), productInfo)
                    arrayDistinctProducts.push(productInfo)
                    //console.log(productInfo)
                });
                //fill ShopItems - _productInfo

                //console.log('-----',rtnOrderInfo_list)
                //rtnOrderInfo_list = rtnOrderInfo_list.flat(1)
                rtnOrderInfo_list.forEach(eachOrderInfo => {
                    //console.log('---------',eachOrderInfo[0])
                    eachOrderInfo.fillShopItems(arrayDistinctProducts)
                    //console.log(element.orderId)
                });
                /**@type {OrderInfo[]} */
                return rtnOrderInfo_list

            })
        // .then((array) => {
        //     let [orderInfo_list, list_productId] = array
        //     let rtnOrderInfo_list = orderInfo_list
        //     /**
        //      * @type {ProductInfo[]} - distinct productInfo list
        //      */
        //     let arrayDistinctProducts = []
        //     // console.log(rtnOrderInfo_list)
        //     // console.log(list_productId)
        //     //.where(self._db.FieldPath.documentId(), 'in', ['02d2bss3-0012'])
        //     //console.log(self._db.FieldPath)
        //     self._db.collection(FIRESTORE_COLLECTION.Products)
        //     .where(self._firebase.firestore.FieldPath.documentId(), 'in', list_productId)//['02d2bss3-0012','1c718och-0001'])
        //     .get()
        //     .then((snapshot) => {
        //         //collect distinct productInfo array
        //         snapshot.forEach(element => {
        //             /**@type {ProductInfo} */
        //             let productInfo = element.data()
        //             productInfo = Object.assign(new ProductInfo(),productInfo)
        //             arrayDistinctProducts.push(productInfo)
        //             //console.log(productInfo)
        //         });
        //         //fill ShopItems - _productInfo
        //         rtnOrderInfo_list.forEach(element => {
        //             element.fillShopItems(arrayDistinctProducts)
        //             //console.log(element.orderId)
        //         });
        //         //rtnOrderInfo_list[0].fillShopItems(arrayDistinctProducts)
        //         //console.log(rtnOrderInfo_list)
        //     })


        //     //console.log(arrayDistinctProducts)

        //     //console.log(rtnOrderInfo_list[0].shopItemList)
        //     return rtnOrderInfo_list

        // })

    }
    getProductInfo = () => {
        this.initDB();

        // if(userId)
        //     fakeUid = userId
        let rtnProductInfo_list = []
        let self = this
        return this._db.collection(FIRESTORE_COLLECTION.ProductInfo).get()
            .then((snapshot) => {
                snapshot.forEach(element => {
                    let data = element.data()
                    if (data.hasOwnProperty('--AutoNum--'))
                        return true

                    let prodInfo = new ProductInfo();
                    prodInfo = Object.assign(prodInfo, data);
                    //prodInfo.createDateTime = (prodInfo.createDateTime == null) ? null : prodInfo.createDateTime.toDate()
                    rtnProductInfo_list.push(prodInfo)
                });

                rtnProductInfo_list.sort((a, b) => {
                    return b.autoNum - a.autoNum
                })
                return rtnProductInfo_list;
            })
    }
    /**
     * @param {import('lodash')} _ 
     * @param {ProductInfo[]} listProductInfo 
     */
    getProductInfo_GroupedItems_ByCategory(_, listProductInfo) {
        let groupedData = _(listProductInfo).groupBy('category').map((arrayGroupedItems, category) => {
            // return ''
            // Object.
            return {
                category,
                categoryZhTW: Map_ProductCategory[category],
                arrayGroupedItems
            }
            // return {
            //     category,
            //     name: _.map(arrayGroupedItems, 'name')
            // }
        }).value()
        //console.log(d2)
        return groupedData
    }
    /**
     * merge data to firestore.Products
     * @param  {string} productid
     * @param  {Object} newObject -- ProductInfo
     * @param  {{beginEvent:function, endEvent:function}} [options] - callback events
     */
    updateProductInfo = (productid, newObject, options) => {
        if (options && options.beginEvent) {
            options.beginEvent()
        }
        this.initDB();
        return this._db.collection(FIRESTORE_COLLECTION.ProductInfo).doc(productid).set(
                newObject, {
                    merge: true
                }) //new promise
            .then(() => {
                return this._db.collection(FIRESTORE_COLLECTION.ProductInfo).doc(productid).get() //Promise.resolve('TTT');
            })
            .then((snapShot) => {
                if (snapShot.exists)
                    return snapShot.data()
                else
                    return null
            })
            .finally(() => {
                if (options && options.endEvent) {
                    options.endEvent()
                }
            })
    }
    /**
     * @param {string} productid 
     */
    deleteProductInfo = (productid) => {
        this.initDB();
        return this._db.collection(FIRESTORE_COLLECTION.ProductInfo).doc(productid).delete()
        // .then(() => {
        //     //return this._db.collection(FIRESTORE_COLLECTION.ProductInfo).doc(productid).get() //Promise.resolve('TTT');
        //     return 'ok'
        // })
    }

    // getProducts_ByIdArray = (arrayId, userId) => {

    //     this.initDB()
    //     this._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).get()
    //         .then((snapshot) => {})

    // }
    //--------------------- AUTH
    SignOut = () => {
        this._firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log('Sign-out successful')
        }).catch(function (error) {
            console.log('Sign out Error--> ', error)
            // An error happened.
        });
    }
    Google_Register_Login() {
        var self = this;
        var provider = new this._firebase.auth.GoogleAuthProvider();
        // this._firebase.auth().signInWithRedirect(provider);
        // return;

        //signInWithRedirect
        //firebase.auth().signInWithPopup(provider).then(function (result) {
        this._firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            //console.log('signInWithPopup')
            var token = result.credential
            console.log("LOG:: Firebase -> Google_Register_Login -> token", token)
            //console.log("LOG:: Firebase -> Google_Register_Login -> token", token)
            // The signed-in user info.
            var user = result.user;
            //console.log("LOG:: Firebase -> Google_Register_Login -> user", user)
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorMessage)
            // ...
        });
    }


    static isDate(value) {
        switch (typeof value) {
            case 'number':
                return true;
            case 'string':
                return !isNaN(Date.parse(value));
            case 'object':
                if (value instanceof Date) {
                    return !isNaN(value.getTime());
                }
                default:
                    return false;
        }
    }
    static getDate_From_Firestore_TimeStamp(timestamp) {
        let seconds = null
        if (timestamp.seconds)
            seconds = timestamp.seconds
        else if (timestamp._seconds) {
            seconds = timestamp._seconds
        }
        if (seconds === null)
            return null
        else
            return new Date(seconds * 1000)
    }

}

function removeFuncProp(obj) {
    for (let propName in obj) {
        if (typeof obj[propName] === 'function')
            delete obj[propName]
        //if(${typeof arry1[0][keyName]} == )
    }
}


export function Email_ResendPassword(emailAddress, inFirebase, swal, funcCloseModal) {
    var auth = inFirebase.auth();
    //var emailAddress = this.proxyUI.bindIptResentPwdEmail;
    return auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        swal.fire({
                title: '提醒',
                text: '密碼已寄出，請至信箱收信',
                icon: 'success',
            })
            .then(() => {
                //self.showModal(false)
                if(funcCloseModal)
                    funcCloseModal();
            })

    }).catch(function (error) {
        // An error happened.
        let errCode_ZhTW;
        console.log(error.code)
        switch (error.code) {
            case 'auth/invalid-email':
                errCode_ZhTW = '輸入錯誤'
                break;
            case 'auth/user-not-found':
                errCode_ZhTW = '此Email帳號不存在'
                break;
            default:
                errCode_ZhTW = error.code
                break;
        }
        swal.fire({
            title: 'Error',
            text: `${errCode_ZhTW},${error.message}`,
            icon: 'error',
            //confirmButtonText: 'Cool'
        })
    });


    //this.showModal(false)
}

// export function syncEmailVerified_ToDB(emailVerified_FromAuth, uid, firestore) {
//     return firestore.collection('Users').doc(uid).set({
//         emailVerified: emailVerified_FromAuth
//     }, {
//         merge: true
//     })
// }