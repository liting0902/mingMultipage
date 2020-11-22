import React, { PureComponent } from 'react'
import {
    //BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Link,
    //IndexRoute,
    // IndexRedirect,
    //DefaultRoute,

    Redirect,

} from "react-router-dom";
import { createBrowserHistory, createHashHistory } from "history";
// import { HashLink as Link } from 'react-router-hash-link';
//import AddProduct from './AddProduct.jsx'
import style from './App.css'
//import { ThemeContext, themes } from './theme-context.js';
import AppContext, { themes } from './app-context.js'
import DataContext from '../DataContext.js'

//import BootstrapTable2 from './BootstrapTable2.jsx'
//import loadingSpinner from './loadingSpinner.css'
import ProductManagement from './ProductManagement/ProductManagement.jsx'
import OrderManagement from './OrderManagement/OrderManagement.jsx'

class A1 extends PureComponent{
    render() {
        return (<div>BBBBBB</div>)
    }
}
class A2 extends PureComponent {
    render() {
        return (<div>
            {/* <h1>Electronics</h1> */}

            <Router>
                <div className="flexContainer">
                    {/* ========= sidenav =========== */}
                    <div className="sidenav">
                        <Link to={`/OrderManagement`} >訂單管理</Link>
                        <Link to={`/ProductManagement`} >菜單管理</Link>
                        {/* <Link to="/ProductListSearch/#category-beef" className="categoryItem">Your link text</Link> */}
                        {/* <a href="#OrderManagement">Order Management</a>
                        <a href="#ProductManagement">Product Management</a>
                        <a href="#clients">Clients</a>
                        <a href="#contact">Contact</a> */}
                    </div>
                    {/* =============== Route Switch =================== */}
                    <Switch>
                        {/* The component will show here if the current URL matches the path */}
                        <Route path="/" exact component={OrderManagement} />
                        <Route path="/OrderManagement" component={OrderManagement} />
                        <Route path="/ProductManagement" component={ProductManagement} />
                    </Switch>
                </div>
            </Router>
        </div>)
    }
}
export default class App extends PureComponent {
    static contextType = DataContext; // 才可以使用 this.context

    constructor() {
        super()
        let history = createHashHistory(this.props)

    }

    render() {
        return (
            <A2></A2>

        )
    }
}
//ThemedButton.contextType = ThemeContext;