import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { OrderInfo, ProductInfo, ShopItemInfo } from '../../../dataDefine/index.js'
import OrderInfo1_css from './OrderInfo1.css'
//import OrderContext from '../OrderManagement/OrderContext.js'
// import arrayOrderData from '../../../firebase/OrderInfo.json'

let defaultOrder = new OrderInfo()//Object.assign(new OrderInfo(), arrayOrderData[0])


export default class OrderInfo1 extends PureComponent {
    static propTypes = {
        orderData: PropTypes.instanceOf(OrderInfo),
        //listProductInfo: PropTypes.arrayOf(PropTypes.instanceOf(ProductInfo)),
    }
    static defaultProps = {
        orderData: defaultOrder,
        //listProductInfo : defaultListProducts
    }

    //static contextType = OrderContext; // 才可以使用 this.context
    constructor(props) {
        super()
        console.log('------constructor')

        //this.processOrderData = this.processOrderData.bind(this)
        //console.log(object)


        //console.log(props)

    }
    componentDidMount() {
        console.log('-----componentDidMount')
        // if(this.props.orderData && this.props.listProductInfo){
        //     this.loadOrderData(this.props.orderData, this.props.listProductInfo)
        // }
        console.log(this.context)
    }
    // click_c1 = (params) => {
    //     let { c1 } = this.props
    //     c1()
    // }

    componentWillUnmount() {
    }
    render() {

        let { orderData } = this.props

        return (
            <div className={OrderInfo1_css.box1}>
                {/* <button onClick={this.click_c1}>C1</button> */}
                {/* <div>{context.app2}</div> */}
                {/* <div>$  {selectedOrderInfo.totalPrice}</div> */}
                {/* <div>totalPrice = {orderData.totalPrice}</div> */}
                <div>sCreateDateTime = {orderData.sCreateDateTime}</div>
                <div>totalPrice = {orderData.totalPrice}</div>
                <div>orderId = {orderData.orderId}</div>
                <div>sOrderStatus = {orderData.sOrderStatus}</div>

                {/* <div>userId = {orderData.userId}</div> */}


                <table className={OrderInfo1_css.table1}>
                    <caption>shopItemList</caption>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>品名</td>
                            <td>數量</td>
                            <td>單價</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.shopItemList.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.productId}</td>
                                <td>{item.productName}</td>
                                <td>{item.amount}</td>
                                <td>{item.price}</td>

                            </tr>
                        })}
                    </tbody>
                </table>

                {/* <div>shopItemList = {orderData.shopItemList.length}</div> */}

                {/* <div>orderProductName = {orderData.orderProductName}</div> */}
                {/* <div>orderStatus = {JSON.stringify(orderData.orderStatus)}</div> */}
                {/* <div>userProfile = {JSON.stringify(orderData.userProfile)}</div> */}


            </div>

            // <OrderContext.Consumer>
            // {(context) => {
            //     let {selectedOrderInfo} = context
            //     if(!selectedOrderInfo)
            //         selectedOrderInfo = new OrderInfo();
            //     return (

            //     )
            // }
            // }
            // </OrderContext.Consumer>

        )
    }
}
