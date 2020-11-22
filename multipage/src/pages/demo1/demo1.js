import OrderInfo1 from '../../js/console/components/OrderInfo1/OrderInfo1.jsx'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {OrderInfo, ProductInfo, ShopItemInfo} from '../../js/dataDefine/index.js'
import arrayOrderData from '../../js/firebase/OrderInfo.json'
import Demo1 from './demo1.jsx'
let listProductData = require('../../js/firebase/ProductInfo.json');
let listProductInfo = []

listProductInfo = listProductData.map((item) => {
    return Object.assign(new ProductInfo(),item )
})
// import Firebase from '../../js/firebase/Firebase.js'
// import firebase from './firebase.js'

// let orderData = require('../../js/firebase/OrderInfo.json')
// let aa = new Date(orderData.createDateTime._seconds * 1000)
// console.log(aa)
// let FirebaseMJS = new Firebase(firebase)
// FirebaseMJS.getProductInfo().then((data) => {
//     console.log(data)
// })

let root = document.querySelector('#root');
let num0 = 6
/**@type {OrderInfo} */
let orderInfo = Object.assign(new OrderInfo(), arrayOrderData[0]);

orderInfo.shopItemList = orderInfo.shopItemList.map((shopItemInfo) => {
    return Object.assign(new ShopItemInfo(), shopItemInfo)
})
orderInfo.shopItemList.forEach(item => {
    item.fill_ProductInfo_ByProductArray(listProductInfo)
});
orderInfo.createDateTime = new Date(orderInfo.createDateTime)
// process timestamp

//orderInfo = Object.assign(orderInfo, orderData)
//console.log(orderInfo)




let app = <div>
    <Demo1 ></Demo1>
</div>

ReactDOM.render(app,root);
