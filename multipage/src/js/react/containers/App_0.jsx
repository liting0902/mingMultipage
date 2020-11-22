import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import * as App_redux from "./App_redux.js";
import ProductList2 from './ProductList/ProductList2.jsx'
import ShopCart from './ShopCart/ShopCart.jsx'
import App_css from './App.css'

export class App extends Component {
    // static propTypes = {
    //     prop: PropTypes.number
    // }

    render() {
        //console.log(this.props);
        return (
            <div>
                {/* ======= 0.divMainContainer ======== */}
                <div id="divMainContainer">
                    {/* ============= 1.Header ============= */}
                    <header />
                    {/* ============= 1.NAV ============= */}
                    <nav id="navHeader">
                        <div>明記</div>
                        <div>中文</div>
                        <div>登入</div>
                        <div>購物清單數目</div>
                    </nav>
                    {/* ============= 1.MAIN ============= */}
                    <main id="container-main">
                        {/* ============= 2.Article (LEFT) ============= */}
                        <article id="container-article">
                            {/* == 3.section == */}
                            <section>
                                <div className="SearchBarContainer">搜尋 篩選</div>
                            </section>
                            {/* == 3.section  菜單列表 == */}
                            <section>
                                <ProductList2></ProductList2>
                            </section>

                            {/* == 3.section == */}
                            <section>
                                <div className="CategoryContainer">本月限時優惠</div>
                                <div className="CategoryContainer">店內人氣</div>
                                <div className="CategoryContainer">婚禮外燴</div>
                                <div className="CategoryContainer">公司聚餐</div>
                                <div className="CategoryContainer">家族聚會</div>
                            </section>
                        </article>
                        {/* ============= 2.Aside (RIGHT) ============= */}
                        <aside id="container-aside">
                            <ShopCart></ShopCart>
                        </aside>
                    </main>
                    {/* ============= 1.FOOTER ============= */}
                    <footer></footer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log('state-> ',state)
    return {
        App_redux: state.App_redux,
    };
};

const mapDispatchToProps = (dispatch) => {
    //return bindActionCreators(App_redux, dispatch);
    return{}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
