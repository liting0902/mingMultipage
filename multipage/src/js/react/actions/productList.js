import {
    SET_productList,
    REFRESH_productList,
    ADD_shopCart,
    DECREASE_shopCart,
    ADD_uniqueId
} from '../actionTypes/index.js'
import * as dataDefine from '../../dataDefine/index.js'
import data2 from '../../../../../console/src/firebase/data2.json'

import Firebase from '../../firebase/Firebase.js';

export function load_productListAsync() {
    
    let db_data = dataDefine.fakeProductInfo1;
    
    //return Refresh_productList(db_data)   this line is replaced to as below...
    return (dispatch, getState)=>{
        
        window.Firebase.getProducts()
        .then((productList) => {
            //console.log('--- ',)
            dispatch(Refresh_productList(productList));
            //console.log(productList)
        })
        //dispatch(Refresh_productList(data2));

        //console.log('getState', getState())
        //dispatch(Refresh_productList(db_data));        
        // console.log(data2[0])
        // console.log(db_data)
    };
}
export function Refresh_productList(productList) {
    return {
        type: REFRESH_productList,
        //productId: productId,
        productList: productList,
        //productInfo: productInfo
    };
}