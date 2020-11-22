//@ts-check
import Firebase_MJS from './Firebase.js'
import {
    OrderInfo,
    ProductInfo,
    ShopItemInfo
} from '../dataDefine/index.js'
import {
    resolve
} from 'path';
import {
    rejects
} from 'assert';
import {
    forEach
} from 'lodash';
import {
    getType
} from 'mime';
let _ = require('lodash');
const path = require('path')
let chai = require('chai')

/**
 * 
 * @param {ProductInfo[]} listProductInfo 
 */
function GetArrayOrderInfo(listProductInfo) {
    // pick random elements ----------------------
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Array.prototype.pickArrayRandomElements = function (elementCount) {
        let arryLength = this.length
        if (arryLength === 0) {
            return;
        } else if (arryLength <= elementCount) {
            return this;
        } else {
            //let elementCount = 3
            let arryThis = this //_.cloneDeep(this)//[1, 3, 6, 8, 9]
            let arrayPicked = []
            // 3 times
            for (let i = 0; i < elementCount; i++) {
                let idx = getRandom(0, arryThis.length - 1)
                let pickedItem = arryThis.splice(idx, 1);
                arrayPicked.push(pickedItem)
            }
            arrayPicked = arrayPicked.flat(1)
            return arrayPicked;
        }
    }
    //---------------------------------
    let arrayOrderInfo = []
    let newOrderInfo;
    //let jsonOrder = require('./OrderInfo.json');
    let testdata = require('../../../test/testdata.json')
    let userData = require('./userData.json')
    let _ = require('lodash')

    let getNewOrderInfo = () => {
        let rtnOrderInfo = new OrderInfo();
        let newJsonOrder = new OrderInfo(); //_.cloneDeep(jsonOrder);
        newJsonOrder.userId = testdata.userId;
        newJsonOrder.userData = userData;
        //pick random ShopItems
        //let sumPrice = 0
        let listRandomProducts = _.cloneDeep(listProductInfo)
        listRandomProducts = listRandomProducts.pickArrayRandomElements(3)
        let listShotItems = listRandomProducts.map((item) => {
            let newShopItem = new ShopItemInfo();
            newShopItem.productId = item.productId
            //newShopItem.productInfo = item; //setter productId + price
            newShopItem.amount = getRandom(1, 4)
            //sumPrice+=(newShopItem.amount * newShopItem.productInfo.price)
            return newShopItem
        })
        newJsonOrder.shopItemList = listShotItems;
        //newJsonOrder.fillShopItems(listRandomProducts)
        //newJsonOrder.totalPrice = sumPrice
        //---------------
        rtnOrderInfo = Object.assign(rtnOrderInfo, newJsonOrder)
        rtnOrderInfo.fillShopItems(listRandomProducts)
        console.log("LOG:: getNewOrderInfo -> rtnOrderInfo", rtnOrderInfo)
        
        delete rtnOrderInfo.getShopItems_Id
        return rtnOrderInfo;
    }

    //待付款
    newOrderInfo = getNewOrderInfo();
    arrayOrderInfo.push(newOrderInfo)
    //待出貨
    newOrderInfo = getNewOrderInfo();
    arrayOrderInfo.push(newOrderInfo)
    newOrderInfo.orderStatus.isPaid = true

    //已完成
    newOrderInfo = getNewOrderInfo();
    arrayOrderInfo.push(newOrderInfo)
    newOrderInfo.orderStatus.isPaid = true
    newOrderInfo.orderStatus.isDelivery = true
    newOrderInfo.orderStatus.isCompleted = true
    //已取消
    newOrderInfo = getNewOrderInfo();
    arrayOrderInfo.push(newOrderInfo)
    newOrderInfo.orderStatus.isCanceled = true
    // orderStatus": {
    //     "isCanceled": false,
    //     "isDelivery": false,
    //     "isCompleted": false,
    //     "isPaid": false
    // },
    return arrayOrderInfo;
}

function removeFuncProp(obj) {
    for (let propName in obj) {
        if (typeof obj[propName] === 'function')
            delete obj[propName]
        //if(${typeof arry1[0][keyName]} == )
    }
}

describe('Firebase.test.js', () => {


    it('remove func property of Object', () => {
        let arry1 = GetArrayOrderInfo();
        let obj = arry1[0]
        chai.assert.exists(obj['getShopItems_Id'], 'func getShopItems_Id should existed.');
        removeFuncProp(obj)
        chai.assert.notExists(obj['getShopItems_Id'], 'func getShopItems_Id should not existed.');
        // for(let propName in obj){
        // }    
    })
    // it('Get OrderInfo Array', () => {
    //     let arry1 = GetArrayOrderInfo();
    //     let arry2 = GetArrayOrderInfo();
    //     let arrayOrderInfo = arry1.concat(arry2)
    //     chai.expect(arrayOrderInfo.length).to.be.equal(8);
    // })
    it('Prod.html.Firebase_MJS.getArrayFakeOrderInfo[4]', () => {
        //chai.expect(1).to.be.equal(2, 'Firebase could not accept multi-request at one time.');
        //throw new Error('Firebase could not accept multi-request at one time.')
        let firebase = require('firebase/app');
        require('firebase/firestore')
        require('firebase/functions')
        require('firebase/storage')
        require('firebase/auth')
        let firebaseConfig = {
            apiKey: "AIzaSyD4H_AArvgvLf7HEmFBdHS6iUQcG3CTUOM",
            authDomain: "ming1-d8ff5.firebaseapp.com",
            databaseURL: "https://ming1-d8ff5.firebaseio.com",
            projectId: "ming1-d8ff5",
            storageBucket: "ming1-d8ff5.appspot.com",
            messagingSenderId: "504139528822",
            appId: "1:504139528822:web:078db71d75c01af93bfd57",
            measurementId: "G-ENYG95C00T"
        };
        let app = firebase.initializeApp(firebaseConfig);
        let Firebase = new Firebase_MJS(firebase, app)
        //let Firebase = new Firebase_MJS.default(firebase, app)
        return Firebase.getProductInfo()
            .then((listProductInfo) => {
                let arrayOrderInfo = GetArrayOrderInfo(listProductInfo);
                // console.log("LOG:: arrayOrderInfo", arrayOrderInfo)
                //console.log(arrayOrderInfo)
            })
    })
    it('Prod.html.Firebase_MJS.addOrderInfo_FakeData[4]', () => {
        //chai.expect(1).to.be.equal(2, 'Firebase could not accept multi-request at one time.');
        //throw new Error('Firebase could not accept multi-request at one time.')
        let firebase = require('firebase/app');
        require('firebase/firestore')
        require('firebase/functions')
        require('firebase/storage')
        require('firebase/auth')
        let firebaseConfig = {
            apiKey: "AIzaSyD4H_AArvgvLf7HEmFBdHS6iUQcG3CTUOM",
            authDomain: "ming1-d8ff5.firebaseapp.com",
            databaseURL: "https://ming1-d8ff5.firebaseio.com",
            projectId: "ming1-d8ff5",
            storageBucket: "ming1-d8ff5.appspot.com",
            messagingSenderId: "504139528822",
            appId: "1:504139528822:web:078db71d75c01af93bfd57",
            measurementId: "G-ENYG95C00T"
        };
        let app = firebase.initializeApp(firebaseConfig);
        let Firebase = new Firebase_MJS(firebase, app)
        //let Firebase = new Firebase_MJS.default(firebase, app)
        console.log('---------------')
        return Firebase.getProductInfo()
            .then((listProductInfo) => {
                let arrayOrderInfo = GetArrayOrderInfo(listProductInfo);
                // console.log("LOG:: arrayOrderInfo", arrayOrderInfo)
                //console.log(arrayOrderInfo)
                //let arrayOrderInfo = GetArrayOrderInfo();
                let arrayPromise_AddOrderInfo = arrayOrderInfo.map((item) => {
                    //must be BIND()!!!
                    let dd = Firebase.addOrderInfo.bind(Firebase, item, true)
                    return dd //Firebase.addOrderInfo(item, true)
                })
                return arrayPromise_AddOrderInfo
            })
            .then((arrayPromise_AddOrderInfo) => {
                return arrayPromise_AddOrderInfo.reduce(function (prePromise, arryFunc_promise, i) {
                    //return arryPromise
                    return prePromise.then(function () {
                        return arryFunc_promise() //saveInDatabase(item).then((myResult) => ... );
                    });
                }, Promise.resolve())
            })
    })
    it('loadash.pickBy() - toPlainObject()', () => {
        let _ = require('lodash')
        class person {
            name = "AAA"
            eat = () => {}
            go() {}
        }
        let p = new person

        let plainObject = _.pickBy(p, prop => {
            return (
                !prop ||
                _.isString(prop) ||
                _.isArray(prop) ||
                _.isNumber(prop) ||
                _.isPlainObject(prop)
            );
        });
        plainObject = _.pickBy(p, (prop) => {
            return (_.isFunction(prop) === false)
        })

    })
    it('Get ProductInfo GroupedItems', () => {
        let firebase = require('firebase/app');
        require('firebase/firestore')
        require('firebase/functions')
        require('firebase/storage')
        require('firebase/auth')
        let firebaseConfig = {
            apiKey: "AIzaSyD4H_AArvgvLf7HEmFBdHS6iUQcG3CTUOM",
            authDomain: "ming1-d8ff5.firebaseapp.com",
            databaseURL: "https://ming1-d8ff5.firebaseio.com",
            projectId: "ming1-d8ff5",
            storageBucket: "ming1-d8ff5.appspot.com",
            messagingSenderId: "504139528822",
            appId: "1:504139528822:web:078db71d75c01af93bfd57",
            measurementId: "G-ENYG95C00T"
        };
        let app = firebase.initializeApp(firebaseConfig);
        let Firebase = new Firebase_MJS(firebase, app)
        let data = require('./ProductInfo.json')
        let _ = require('lodash')
        let groupedList = Firebase.getProductInfo_GroupedItems_ByCategory(_, data)
        console.log(groupedList)
    })
    it('test16', () => {

    })
    it('test17', () => {

    })
    // it('Devp.useEmu.addOrderInfo', () => {
    //     const functions = require('firebase-functions');
    //     const myFunctions = require('../../functions/functions/index');
    //     const wrapped = test.wrap(myFunctions.addOrderInfo);
    //     let data = {
    //         name: "PP"
    //     }
    //     data = jsonOrderInfo
    //     let options = {
    //         auth: {
    //             eventId: 'abc',
    //             timestamp: '2018-03-23T17:27:17.099Z',
    //             params: {
    //                 pushId: '234234'
    //             },
    //             auth: {
    //                 uid: 'jckS2Q0' // only for real time database functions
    //             },
    //             authType: 'USER' // only for real time database functions
    //         }
    //     }

    //     return wrapped(data, options)
    //         .then((response) => {
    //             let res = response
    //             chai.expect(1).to.be.equal(1);
    //             //chai.expect(res).to.be.equal('order save ok!');
    //         })
    // })
    // //test case
    // it('Prod.addOrderInfo', () => {
    //     //console.log(jsonOrderInfo)
    //     return Firebase.addOrderInfo(jsonOrderInfo)
    //         .then(function (result) {
    //             let writeTime = Firebase_MJS.getDate_From_Firestore_TimeStamp(result.data._writeTime); //new Date(result.data._writeTime._seconds*1000)
    //             chai.expect(Firebase_MJS.isDate(writeTime)).to.be.equal(true);
    //         }).catch(function (error) {
    //             // Getting the Error details.
    //             // var code = error.code;
    //             // var message = error.message;
    //             // var details = error.details;
    //             // console.log(error)
    //             throw new Error(error)
    //             // ...
    //         });

    // });
    // it('should resolve', async (done) => {
    //     // await callAsync1();
    //     // let res = await callAsync2();
    //     // assert.equal(res, true);
    //     chai.expect(11).to.be.equal(11);
    //     done();
    // });



})

// const wrapped = test.wrap(myFunctions.addOrderInfo);
// wrapped(data, {
//     eventId: 'abc',
//     timestamp: '2018-03-23T17:27:17.099Z',
//     params: {
//         pushId: '234234'
//     },
//     auth: {
//         uid: 'jckS2Q0' // only for real time database functions
//     },
//     authType: 'USER' // only for real time database functions
// });

// // Make snapshot
// const snap = test.firestore.makeDocumentSnapshot({foo: 'bar'}, 'document/path');
// // Call wrapped function with the snapshot
// const wrapped = test.wrap(myFunctions.myFirestoreDeleteFunction);
// wrapped(snap);

//offline mode
//const test = require('firebase-functions-test')();
//Mocking config values

//const key = functions.config().stripe.key;
// console.log(key)
// test.mockConfig({
//     stripe: {
//         key: '23wr42ewr34'
//     }
// });