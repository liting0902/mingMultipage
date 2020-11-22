import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import * as App_redux from "../../App_redux.js";
import * as shopCart_actions from '../../actions/shopCart.js'
//import ProductCard_css from './ProductCard.css'
//import '../CategoryCard/CategoryCard.css'
import '../../containers/ProductListSearch/ProductListSearch.css'

export default class ProductCard extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        dispatch: PropTypes.func,
        productInfo: PropTypes.object,
        //ref
        refShopcartBox:PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        //PropTypes.instanceOf(Element)
        
        // productId:PropTypes.string,
        // name:PropTypes.string,
        // price:PropTypes.number,
        // imgFileName:PropTypes.string,

    }
    constructor(props) {
        super(props);
        //this.data = props.data;
        const { dispatch, refShopcartBox } = props
        this.boundActionCreators = bindActionCreators(shopCart_actions, dispatch)
        //notify parent add click happened.  need to scroll to shopcart bottom.
        
        this.refShopcartBox = refShopcartBox;
        // this.btnRemove = React.createRef();

        //console.log('props--> ', props)
        //console.log('props==> ',props)
        //console.log('props--------->',props)
        // this.data = {
        //     "productId":"kssf"
        //     "name":"白斬雞",
        //     "price":140,
        //     "imgFileName":"白斬雞.jpg"
        // }

    }
    btnAddToCart = (e) => {
        const { productInfo, dispatch } = this.props
        //console.log(this.props)
        //console.log('productInfo---> ', productInfo)
        this.boundActionCreators.add_shopCart(1, productInfo);
        setTimeout(() => {
            this.refShopcartBox.current.scroll(0,this.refShopcartBox.current.scrollHeight)
        }, 500);
        
        //let aa = shopCart_actions.add_shopCart(1, productInfo)
        //dispatch(aa)
        //console.log(aa)
        //console.log('btnAddToCart')
        //let a = e.target.getAttribute('rid');
        //let b = e.currentTarget.getAttribute('rid');
        //console.log(a)
        // console.log(a)
        // console.log(b)
        //console.log(this.props)
        //this.props.add_shopCart();
    }
    render() {
        const { productInfo } = this.props
        return (
            <React.Fragment>
                <li className="bd1 productCard">
                    <figure>
                        <figcaption className="b-textCenter">
                            {/* <div cardid="autoNum">{productInfo.autoNum}</div>
                                        <div cardid="productId">{productInfo.productId}</div> */}
                            <div >{productInfo.name}</div>
                        </figcaption>
                        <div className="imgContainer bd2">
                            <img className="imgFood"
                                src={productInfo.imgUrl}
                                // src={imgProduct.default}
                                alt="image not found"
                            />
                        </div>
                        

                    </figure>
                    <div className="priceBottom bd3">
                        <div >NT$ {productInfo.price}</div>
                        <button className="addButton" onClick={this.btnAddToCart}>
                            <div>+</div>
                        </button>
                    </div>
                    <hr className="hrDot" />
                    {/* <div>{productInfo.}</div>
                                <img class="imgFood" src="noodle1.png" alt="" />
                                <div>NT$ 20</div>
                                <hr class="hrDot" /> */}
                </li>
                {/* <div id={this.props.id} className="productCard col-10 col-sm-10  col-md-5 col-lg-3" >
                    <figure>
                        <figcaption>
                            <div cardid="autoNum">{productInfo.autoNum}</div>
                            <div cardid="productId">{productInfo.productId}</div>
                            <div cardid="productName">{productInfo.name}</div>
                            <div cardid="productPrice">NT$ {productInfo.price}</div>
                        </figcaption>
                        <img
                            className="productFigure"
                            src={productInfo.imgUrl}
                            // src={imgProduct.default}
                            alt="image not found"
                        />

                    </figure>
                    <button rid="btnAddToCart" onClick={this.btnAddToCart}>+</button>
                </div> */}
            </React.Fragment>
        );
    }
}
