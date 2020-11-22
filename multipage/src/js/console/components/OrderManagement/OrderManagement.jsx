import React, { PureComponent } from 'react'
//import AddProduct from './AddProduct.jsx'
import DataContext from '../../DataContext.js'
import style from './OrderManagement.css'
//import { ThemeContext, themes } from './theme-context.js';
import AppContext, { themes } from '../app-context.js'
//import OrderContext from './OrderContext.js'
import OrderInfo1 from '../OrderInfo1/OrderInfo1.jsx'
//import BootstrapTable2 from './BootstrapTable2.jsx'
import TableOrder from '../TableOrder/TableOrder.jsx'
//import loadingSpinner from './loadingSpinner.css'
import arrayOrderData from '../../../firebase/OrderInfo.json'
import arrayProdInfo from '../../../firebase/ProductInfo.json'
import { OrderInfo, ProductInfo } from '../../../dataDefine'
import OrderManagement_css from './OrderManagement.css'

let o1 = Object.assign(new OrderInfo(), arrayOrderData[0])
o1.createDateTime = new Date(o1.createDateTime)
let listProd = []
listProd = arrayProdInfo.map((item) => {
    let prod = Object.assign(new ProductInfo(), item)
    prod.createDateTime = new Date(prod.createDateTime)
    return prod
})
export default class App extends PureComponent {
    static contextType = DataContext; // 才可以使用 this.context

    constructor() {
        super()

        // this.toggleTheme = () => {
        //     this.setState(state => ({
        //         theme:
        //             state.theme === themes.dark
        //                 ? themes.light
        //                 : themes.dark,
        //     }));
        // };
        this.state = {
            theme: themes.light,
            toggleTheme: this.toggleTheme,
            app1: 555,
            app2: 666,
            selectedOrderInfo: undefined,
            select_Order_Info: this.select_Order_Info,
            //auth:this.context.auth,
        }
        this.click555 = (orderInfo) => {
            this.setState({ selectedOrderInfo: orderInfo });
        };
        // this.FirebaseContext = FirebaseContext;
        // console.log(FirebaseContext.displayName)

        //const user = useContext(UserContext)
    }
    // componentDidMount() {
    //     let value = this.context;
    //     console.log(value)
    //     /* perform a side-effect at mount using the value of MyContext */
    // }
    toggleTheme = (e) => {
        // let theme = this.context;
        // theme.foreground="#345678"
        this.setState(state => ({
            theme:
                state.theme === themes.dark
                    ? themes.light
                    : themes.dark,
        }));

        // this.setState((state, props) => {
        //     let newState = { ...state }
        //     newState.theme = {
        //         foreground: "666",
        //         background: "777"
        //     }
        //     return newState;
        // })
    }
    GetUser_onClick = (e) => {
        //console.log(this.context.auth.currentUser)
        console.log(this.context.auth)

    }
    getContext = (e) => {
        console.log(this.context)
    }
    componentDidMount = (e) => {
        //console.log(this.context)
    }
    c1 = (params) => {
        console.log(5252525)
    }
    clickTest = () => {
        this.select_Order_Info(o1)
    }
    select_Order_Info(orderInfo) {
        this.setState({ selectedOrderInfo: orderInfo })
    }
    render() {
        //console.log(this.context)
        //let theme = this.context;
        //FirebaseContext.displayName = 'AAAA'
        //console.log(theme)
        // let Firebase = useContext(FirebaseContext)
        // console.log(Firebase)
        const { selectedOrderInfo, listProductInfo } = this.state

        return (
            <AppContext.Provider value={this.state}>
                <DataContext.Consumer>

                    {context => {
                        return (

                            <div className={OrderManagement_css.bdPrimary}>
                                <div className="box1">
                                    {this.state.app1}
                                    <TableOrder click555={this.click555} />
                                </div>
                                <div className="box2">
                                    {/* <OrderInfo1 c1={this.c1}></OrderInfo1> */}
                                    <OrderInfo1 orderData={selectedOrderInfo}></OrderInfo1>
                                </div>
                                {/* <button onClick={this.clickTest}>test</button> */}
                            </div>

                        )
                    }}

                </DataContext.Consumer>
            </AppContext.Provider>

            // <div className="bd-primary">
            //     <AddProduct></AddProduct>
            // </div>
        )
    }
}
//ThemedButton.contextType = ThemeContext;