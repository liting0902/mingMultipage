//@ts-check
import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import * as App_redux from "./App_redux.js";
//import ProductList2 from '../ProductList/ProductList2.jsx'
import ShopCart from '../ShopCart/ShopCart.jsx'
import { countAllItems_Price } from '../../reducers/shopCart.js'
import ProductListSearch from './ProductListSearch.css'
import { HashLink as Link } from 'react-router-hash-link';
import { load_productListAsync as load_productListAsync_act } from '../../actions/productList.js'
import arryProductInfo from '../../../../js/firebase/ProductInfo.json'
import CategoryCard from '../../components/CategoryCard/CategoryCard.jsx'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import { UID } from '../../../../../../console/src/components/uniqueId.js'
import { Map_ProductCategory } from '../../../../js/dataDefine/index.js'




/**@enum {string} */
let ENUM_screenSize = {
    phone: "phone",
    desktop: "desktop"
}
export class App extends Component {
    constructor(props) {
        super(props);
        this.refShopCart = React.createRef();
        this.refShopcartBox = React.createRef();
        this.refInsideShop = React.createRef();
        this.reStickyHeader = React.createRef();

        this.refBeef = React.createRef();
        this.state = {
            /**@type {?ENUM_screenSize} */
            screenSize: null,//ENUM_screenSize.desktop,
            /**@type {?boolean} */
            showbtnBottomCartButton: true,
            aa: null,
            groupedProducts:null
        }
        this.UID = UID.bind(this);
        let window2 = /**@type {import('../../../../js/dataDefine/index.js').ExtendedWindow}*/ (window);
        this.state.groupedProducts = window2.Firebase.getProductInfo_GroupedItems_ByCategory(_, arryProductInfo);
        //this.setState({groupedProducts:})
        // React.createRef() -- for scrollTo purpose
        this.state.groupedProducts = this.state.groupedProducts.map((item) => {
            item.ref = React.createRef();
            return item
        })
        let self = this

        //async methods
        window.firebase.firestore().collection('ProductInfo').get()
                .then((querySnapshot) => {
                    let arrayFilteredDbProducts = querySnapshot.docs.filter((item) => {
                        //console.log("LOG:: App -> constructor -> item", item)
                        return item.id !== "--AutoNum--"
                    })
                    return arrayFilteredDbProducts
                })
                .then((arrayFilteredDbProducts) => {
                    let arrayDbProductInfo = arrayFilteredDbProducts.map((item) => {
                        //console.log("LOG:: App -> constructor -> item", item)

                        if (item.id !== "--AutoNum--")
                            return item.data()
                    })
                    return arrayDbProductInfo
                })
                .then((arrayDbProducts) => {
                    console.log("LOG:: App -> componentDidMount -> arrayDbProducts", arrayDbProducts)
                    //let window2 = /**@type {import('../../../../js/dataDefine/index.js').ExtendedWindow}*/ (window);
                    self.state.groupedProducts = window.Firebase.getProductInfo_GroupedItems_ByCategory(_, arrayDbProducts);
                    console.log("LOG:: App -> componentDidMount -> self.groupedProducts", self.state.groupedProducts)
                    //console.log("LOG:: App -> componentDidMount -> self.groupedProducts", self.groupedProducts)
                    // React.createRef() -- for scrollTo purpose
                    let groupedProducts = self.state.groupedProducts.map((item) => {
                        item.ref = React.createRef();
                        return item
                    })
                    self.setState({groupedProducts:groupedProducts});
                })

        //console.log(this.groupedProducts)
    }
    // static propTypes = {
    //     prop: PropTypes.number
    // }

    initLoad = (e) => {
        function debounce(fun, delay) {
            return function (args) {
                let that = this
                let _args = args
                clearTimeout(fun.id)
                fun.id = setTimeout(function () {
                    fun.call(that, _args)
                }, delay)
            }
        }
        let inputb = document.getElementById('iptDebounce')
        let debounceAjax = debounce((e) => {
            //console.log(e)
        }, 500)
        inputb.addEventListener('keyup', function (e) {
            debounceAjax(e.target.value)
        })
        //----------------
        let debounceResize = debounce((e) => {
            displayWindowSize();
        }, 500)

        function displayWindowSize() {
            // Get width and height of the window excluding scrollbars
            var w = document.documentElement.clientWidth;
            var h = document.documentElement.clientHeight;

            // Display result inside a div element
            document.getElementById("result").innerHTML = "Width: " + w + ", " + "Height: " + h;
            let window2 = /** @type {import('../../../../js/dataDefine/index.js').ExtendedWindow} */ (window);
            //console.log(window2.app.viewSize())
        }
        window.addEventListener("resize", debounceResize);
        displayWindowSize();
    }
    test1 = () => {
        // let window2 = /** @type {import('../../dataDefine/index.js').ExtendedWindow} */ (window);
        // console.log(window2.app.viewSize())
        this.setState({ screenSize: ENUM_screenSize.phone })
        //let aa = document.querySelector('.navbar-expand-lg');
        //console.log(viewSize())
    }
    test2 = (params) => {
        //this.setState({ screenSize: ENUM_screenSize.desktop })
        //$('#exampleModal2').modal('hide')
        console.log(this.props)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.screenSize != this.state.screenSize) {
            switch (this.state.screenSize) {
                case ENUM_screenSize.desktop:
                    this.refShopcartBox.current.appendChild(this.refShopCart.current)
                    //this.setState({ showbtnBottomCartButton: false })
                    $('#modalShopcart').modal('hide')
                    break;
                case ENUM_screenSize.phone:
                    this.refInsideShop.current.appendChild(this.refShopCart.current)
                    //this.setState({ showbtnBottomCartButton: true })
                    break;
                default:
                    break;
            }
        }



        // if (snapshot.notifyRequired) {
        //     this.updateAndNotify();
        //   }
    }
    componentDidMount() {
        let self = this
        window.app.openModalShopCart = () => {
            $('#modalShopcart').modal('show')
        }


        //========detect screen size
        function debounce(fun, delay) {
            return function (args) {
                let that = this
                let _args = args
                clearTimeout(fun.id)
                fun.id = setTimeout(function () {
                    fun.call(that, _args)
                }, delay)
            }
        }
        let debounceResize = debounce((e) => {
            switchWindowSize();
        }, 500)

        function switchWindowSize() {
            let window2 = /** @type {import('../../../../js/dataDefine/index.js').ExtendedWindow} */ (window);
            let size = window2.app.viewSize()
            let arrayLarge = ['xl', 'lg']
            let arraySmall = ['xs', 'sm', 'md']

            if (arrayLarge.includes(size)) {
                self.setState({ screenSize: ENUM_screenSize.desktop })
                //console.log(self)
                //self.setState({ aa: 55 })
                //console.log(self.state.aa)
            }
            else {
                //console.log(self)
                self.setState({ screenSize: ENUM_screenSize.phone })
                //self.setState({ aa: 55 })
            }
            //console.log(window2.app.viewSize())
        }
        window.addEventListener("resize", debounceResize);
        switchWindowSize();


    }
    componentWillUnmount(e) {
        console.log('component will unmount--', e)
    }
    scrollToCategory = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        //console.log(e.currentTarget)
        let href = e.currentTarget.getAttribute('href')
        href = href.replace(/#/i, "");//.trimStart("#")
        let findCategory = this.state.groupedProducts.find((item) => {
            if (item.category === href)
                return item
        })
        let scrollTo_Ref = findCategory.ref

        //console.log(scrollTo_Ref)
        let scrollOffset_TopHeight = this.reStickyHeader.current.offsetHeight + window.navbar1.offsetHeight
        // let aa = document.querySelector('#beef');
        if (window.scroll) {
            e.preventDefault()

            //this.refBeef.current.scrollTop()
            let newTop = scrollTo_Ref.current.offsetTop - scrollOffset_TopHeight

            window.scroll({
                'behavior': 'smooth',
                'top': newTop
            })
        }

        //window.scrollTo(aa)
    }

    scrollToCategory2 = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        let scrollOffset_TopHeight = this.reStickyHeader.current.offsetHeight + window.navbar1.offsetHeight
        // let aa = document.querySelector('#beef');
        if (window.scrollTo) {
            e.preventDefault()
            //this.refBeef.current.scrollTop()
            window.scrollTo({
                'behavior': 'smooth',
                'top': this.refBeef.current.offsetTop - scrollOffset_TopHeight
            })
        }

        //window.scrollTo(aa)
    }

    loadProducts = (e) => {
        this.props.act_loadProducts();
    }


    render() {
        this.state.groupedProducts
        console.log("LOG:: App -> render -> this.groupedProducts5555", this.state.groupedProducts)
        const { productList } = this.props
        let userAddress = '';
        if (window.app.userData && window.app.userData.userProfile)
            userAddress = window.app.userData.userProfile.address

        let arrayMap_ProductCategory = Object.entries(Map_ProductCategory);
        // console.log(arrayMap_ProductCategory);

        return (
            <main>
                <article className="boxProductListSearch bd1">
                    <section>
                        {/* =============== HEADER ================== */}
                        <div className="boxDeliveryTimeAddress inputField1 bd4">
                            <span>地址</span>
                            <input type="text" placeholder="個人檔案中可以預設地址" defaultValue={userAddress}></input>
                        </div>
                        {/* <div className="boxDeliveryTimeAddress bd4">
                            地址 時間<br />
                            <div>
                                <label htmlFor="iptDebounce">防抖函數</label>
                                <input id="iptDebounce" type="text" />
                                <button onClick={() => {
                                    this.setState({ screenSize: ENUM_screenSize.desktop })
                                }}>ShopCart right</button>
                                <button onClick={() => {
                                    this.setState({ screenSize: ENUM_screenSize.phone })
                                }}>ShopCart inside</button>
                                <button onClick={this.initLoad}>initLoad</button>
                                <button onClick={this.test1}>test1</button>
                                <button onClick={this.test2}>test2</button>
                                <button onClick={this.loadProducts}>Load Products</button>
                                <div id="result" />
                            </div>
                        </div> */}


                        {/* <div className="menu" ref={this.reStickyHeader}>
                            <a href="#soybean" className="categoryItem" onClick={this.scrollToCategory}>豆類製品</a>
                            <a href="#duck" className="categoryItem" onClick={this.scrollToCategory}>鴨類</a>
                            <a href="#chicken" className="categoryItem" onClick={this.scrollToCategory}>雞肉</a>
                            <a href="#beef" className="categoryItem" onClick={this.scrollToCategory}>牛肉</a>
                            <a href="#pork" className="categoryItem" onClick={this.scrollToCategory}>豬肉</a>
                            <a href="#others" className="categoryItem" onClick={this.scrollToCategory}>其他</a>
                            
                            
                        </div> */}
                        {/* ============ Category Buttons ============== */}
                        <ul className="b-flexStart ulScrollButtons bd3" ref={this.reStickyHeader}>
                            {/* <li className="Category">
                                    <div>牛肉</div>
                                </li> */}
                            {/*中英對照 item[0] = Object.Key 英文, item[1] = Object.value 中文  */}
                            {arrayMap_ProductCategory.map((item, index) => {
                                return <li className="btnCategory" key={index}>
                                    <div href={`#${item[0]}`} onClick={this.scrollToCategory}>{item[1]}</div>
                                </li>
                            })}
                        </ul>
                        {/* ============ Category - Product Cards ============== */}
                        <div className="boxCategoryCard bd2">
                            {this.state.groupedProducts.map((item, index) => (
                                <CategoryCard className="listContainer row" forwardRef={this.refBeef} refShopcartBox={this.refShopcartBox} groupedProducts={item} key={index} dispatch={this.props.dispatch}></CategoryCard>
                            ))}
                        </div>
                        {/* ============== FOOTER ================ */}
                        <div className={`btn btn-primary d-lg-none bottomBuy ${this.state.showbtnBottomCartButton ? '' : 'displayNone'}`} data-toggle="modal" data-target="#modalShopcart">
                            {this.props.totalItemCount}項 --- 查看購物車 --- NT$ {this.props.AllItems_Price}
                        </div>
                        {/* Modal */}
                        <div className="modal fade " tabIndex="-1" id="modalShopcart">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        {/* <h5 className="modal-title">Modal title</h5> */}
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {/* <p>Modal body text goes here.</p> */}
                                        <div ref={this.refInsideShop}>
                                            
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* =============== XS HIDE SHOP MODAL ==================== */}
                        {/* <div className="modal fade " tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div className={` modal-dialog ` + ProductListSearch['modal-dialog']} role="document">
                                <div className={`modal-content ` + ProductListSearch['modal-content']}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        fdsafsadf
                                        
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={this.test1}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </section>


                </article>
                {/* ============= 2.Aside (RIGHT) ============= */}
                <aside ref={this.refShopcartBox} className="boxShopCart bd4">
                    <div ref={this.refShopCart}>
                        <ShopCart></ShopCart>
                    </div>
                </aside>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    let {sumPrice,totalItemCount} = countAllItems_Price(state.shopCart.shopItemList)
    //console.log('state-> ',state)
    return {
        App_redux: state.App_redux,
        productList: state.productList,
        AllItems_Price: sumPrice,//countAllItems_Price(state.shopCart.shopItemList),
        totalItemCount:totalItemCount,
    };
};

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(App_redux, dispatch);
    return {
        dispatch: dispatch,
        act_loadProducts: () => {
            dispatch(load_productListAsync_act())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
