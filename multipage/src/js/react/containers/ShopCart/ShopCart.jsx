import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import * as App_redux from '../../App_redux.js'
import * as shopCart_actions from '../../actions/shopCart'
import { countAllItems_Price } from '../../reducers/shopCart.js'
import { bindActionCreators } from 'redux'
import ShopItem from '../../components/ShopItem/ShopItem.jsx'
// import './ShopCart.css'
//import '../../containers/ProductListSearch/ProductListSearch.css'
import { OrderInfo, ShopItemInfo, UserData, UserProfile } from '../../../dataDefine/index.js'

class ShopCart extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }
    constructor(props) {
        super(props)
        const { dispatch } = props
        this.boundActionCreators = bindActionCreators(shopCart_actions, dispatch);
        //console.log('props.shopCart--> ',props.shopCart)
    }
    // shouldComponentUpdate = ()=>{
    //     return true
    // }
    /**
     * 
     * @param {ShopItem[]} shopItems 
     * @param {number} totalPrice 
     */
    _getOrderInfo_FromShopItems = (shopItems) => {
        let newOrderIfno = new OrderInfo();
        shopItems.forEach((item) => {
            let newItem = { ...item }
            newItem._productInfo = null
            newOrderIfno.shopItemList.push(newItem);
        })
        return newOrderIfno
    }
    _getOrderInfo = () => {
        let orderInfo = this._getOrderInfo_FromShopItems(this.props.shopItemList);
        orderInfo.totalPrice = this.props.AllItems_Price;

        return window.Firebase.getUser()
            .then((user) => {
                //console.log('wwwww---', user)
                orderInfo.userId = user.uid
                //orderInfo.userProfile = user.userProfile
                orderInfo.userData = user;
                //get order select address
                let userData = new UserData();
                userData = Object.assign(userData, orderInfo.userData)
                // let userProf = new UserProfile();
                // userProf = Object.assign(userProf, orderInfo.userProfile)


                //console.log(userProf.getSelectedAddress())
                //console.log(orderInfo)
                return orderInfo;
            })


    }

    CheckOutOrder = (e) => {
        console.log('CheckOutOrder')
        this._getOrderInfo()
            .then((orderInfo) => {
                //console.log(orderInfo)
                window.Firebase.addOrderInfo(orderInfo)
            }
            )
        //console.log(orderInfo)
        //console.log(this.props.shopItemList)
        // this.props.shopItemList.forEach((item) => {
        //     let newItem = Object.assign({},item)
        //     newItem._productInfo = null
        //     console.log(item)
        //     console.log(newItem)
        // }
        // )
        //console.log(this.props.AllItems_Price)
        //let newOrder = new OrderInfo();
        //console.log(newOrder)
    }

    render() {
        //console.log('---------- render ShopCart----------------')
        //const {getAllItem_PriceTotal} = this.props
        //console.log('getAllItem_PriceTotal--> ', getAllItem_PriceTotal)
        //getAllItem_PriceTotal();
        //console.log(getAllItem_PriceTotal)

        const { shopItemList, AllItems_Price, dispatch } = this.props
        //console.log('shopItemList-> ', shopItemList)
        return (
            <div>
                <div>
                    <div className="boxShopCard"><h1>購物車</h1></div>
                    <table id="tbShopcart" className="tableShopcart bd1">
                        <tbody>
                            
                            {shopItemList.map((item, index) => (<ShopItem key={index} shopItem={item} dispatch={dispatch}></ShopItem>))}
                            {/* <tr>
                                <td>總計 (包括稅項)</td>
                                <td>NT$0.00</td>
                            </tr> */}
                            <tr>
                                <td>小計</td>
                                <td>NT$  {AllItems_Price}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2">
                                    <button className="btn btn-block btn-success" onClick={this.CheckOutOrder}>結帳</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    {/* <br />
                    <br /> */}
                    {/* <table className="table_shotItemList">
                        <tbody>
                            <tr>
                                <td>小計</td>
                                <td>NT$  {AllItems_Price}</td>
                            </tr>
                            {shopItemList.map((item, index) => (<ShopItem key={index} shopItem={item} dispatch={dispatch}></ShopItem>))}

                            <tr>
                                <td>服務費</td>
                                <td>NT$0.00</td>
                            </tr>
                            <tr>
                                <td>總計 (包括稅項)</td>
                                <td>NT$0.00</td>
                            </tr>
                            <tr>
                                <td>
                                    <button className="btn btn-success" onClick={this.CheckOutOrder}>結帳</button>
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log('shopCart -- mapStateToProps==> ', state)
    let {sumPrice,totalItemCount} = countAllItems_Price(state.shopCart.shopItemList)
    return {
        shopItemList: state.shopCart.shopItemList,
        //getAllItem_PriceTotal: state.shopCart.getAllItem_PriceTotal,
        AllItems_Price: sumPrice,//countAllItems_Price(state.shopCart.shopItemList)
        totalItemCount:totalItemCount,
    }
}

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(App_redux, dispatch);
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart)
