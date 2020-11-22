import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import { connect } from 'react-redux'
//import '../../containers/ProductListSearch/ProductListSearch.css'
//import '../../containers/ShopCart/ShopCart.css'
import * as shopCart_act from '../../actions/shopCart.js'
import { bindActionCreators } from 'redux'

export default class ShopItem extends Component {
    static propTypes = {
        // id:PropTypes.string,
        dispatch: PropTypes.func,
        shopItem: PropTypes.object,
        // amount: PropTypes.number,
        // productName: PropTypes.string,
        // price : PropTypes.number,

    }
    static defaultProps = {
        //amount: 0,
        // productName:'empty',
        // price:0,
        // id:'null',
    };
    constructor(props){
        super(props)
        const {dispatch} = this.props
        this.boundActionCreators = bindActionCreators(shopCart_act, dispatch);
        // console.log('actions-->', shopCart_act)
        // console.log('this.boundActionCreators --> ', this.boundActionCreators)
    }
    btnAdd_onClick=(e) => {
        const { shopItem } = this.props
        this.boundActionCreators.add_shopCart(1, shopItem.productInfo);
    }
    btnDecrease_onClick=(e) => {
        const { shopItem } = this.props
        this.boundActionCreators.decrease_shopCart(1, shopItem.productInfo);
    }
    
    render() {
        //console.log('this.shopItem-- ', this.shopItem)
        const { shopItem } = this.props
        //console.log('shopItem--> ', shopItem)
        //console.log('-----------------------')
        return (
            <tr className="bd2 trShopitem">
                <td className="tdProductName bd3">{shopItem.productInfo.name}</td>
                <td className="bd3 tdPriceAmount">
                    <div className="divPriceAmount">
                        <div className="bd2 divCellPrice">NT$ {shopItem.amount * shopItem.productInfo.price}</div>
                        <div className="bd4 divboxHorizontal">
                            <button className="btnAdd" onClick={this.btnDecrease_onClick}>
                                <div className="btnContent">-</div>
                            </button>
                            <div className="divCellAmount">{shopItem.amount}</div>
                            <button className="btnAdd" onClick={this.btnAdd_onClick}>
                                <div className="btnContent">+</div>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            // <tr>
            //     <td>
            //         {/* ======= amount button ======= */}
            //         <div className="block_button">
            //             <button onClick={this.btnDecrease_onClick}>-</button>
            //             <div>{shopItem.amount}</div>
            //             <button onClick={this.btnAdd_onClick}>+</button>
            //         </div>
            //     </td>
            //     <td>
            //         {/* ======= product description ======= */}
            //         <div className="block_productDesc">
            //             <div>
            //                 {shopItem.productInfo.name}
            //             </div>
            //         </div>
            //     </td>
            //     <td>
            //         {/* ======= count price ======= */}
            //         <div className="block_countPrice">
            //             <div>
            //                 NT$ {shopItem.amount * shopItem.productInfo.price}
            //             </div>
            //         </div>
            //     </td>

            // </tr>


        )
    }
}

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(ShopCard)
