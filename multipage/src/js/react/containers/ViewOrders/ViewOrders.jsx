//@ts-check
import React, { PureComponent } from 'react'
import ViewOrdersItem from '../ViewOrdersItem/ViewOrdersItem.jsx'
import { OrderInfo } from '../../../dataDefine/index.js'
import ViewOrders_css from './ViewOrders.css'
import Firebase, { ENUM_orderStatus } from '../../../firebase/Firebase.js'
import testData from '../../../../../test/testdata.js'
var window2 = /**@type {import('../../../dataDefine/index.js').ExtendedWindow}*/ (window);
export default class ViewOrders extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            /**@type {OrderInfo[]} */
            orderInfo_list: []
        }
    }


    // loadOrders = (inOrderStatus) => {
    //     // console.log("LOG:: ViewOrders -> loadOrders -> inOrderStatus", inOrderStatus)
    //     //window.Firebase._setOrderInfo_And_autoNum();
    //     console.log(testData.userId)
    //     window2.Firebase.getOrderInfo(testData.userId, 'canceled')
    //         .then((orderInfo_list) => {
    //             let sJson = JSON.stringify(orderInfo_list[0], null, 4)
    //             //console.log(sJson)
    //             this.setState({ orderInfo_list: orderInfo_list });
    //         })
    // }
    componentDidMount() {
        //console.log('AAA')
        //console.log($(".button"))
        let self = this
        $(".ulScrollButtons .btnCategory").click(function (e) {
            e.preventDefault()
            // $(".active").removeClass("active");
            // $(this).addClass("active");
            let element_orderStatus = e.currentTarget.getAttribute('orderstatus')
            if (ENUM_orderStatus.hasOwnProperty(element_orderStatus) === false)
                throw new Error('value of attribute[orderstatus] is not valid in ENUM_orderStatus.')
            //console.log(ENUM_orderStatus.hasOwnProperty(element_orderStatus))
            //window2.app
            
            let uid = testData.userId
            uid = window2.app.userData.doc.uid
            uid = window2.firebase.auth().currentUser.uid
            if(uid){
                window2.Firebase.getOrderInfo(uid, element_orderStatus)//'canceled'
                .then((orderInfo_list) => {
                    let sJson = JSON.stringify(orderInfo_list[0], null, 4)
                    //console.log(sJson)
                    self.setState({ orderInfo_list: orderInfo_list });
                })
            }
            
        });

    }
    // onInputChange = (bindarg1, e) => {

    //     e.preventDefault()
    //     // console.log(bindarg1)
    //     // console.log(e.currentTarget.getAttribute('orderstatus'))
    //     $(".active").removeClass("active");
    //     $(this).addClass("active");
    //     let orderstatus = e.currentTarget.getAttribute('orderstatus')
    //     console.log(orderstatus)
    //     //console.log(bindarg1)
    //     //console.log(e.target)
    //     //     let statePropName = e.target.getAttribute('bindstate')
    //     // console.log(statePropName)
    // }

    render() {
        return (
            <main className="boxViewOrders bd1">
                <article >
                    <section>
                        <ul className="b-flexCenter ulScrollButtons bd3">
                            <li className="btnCategory" orderstatus="all">所有訂單</li>
                            <li className="btnCategory" orderstatus="completed">已完成</li>
                            <li className="btnCategory" orderstatus="waitForPay">待付款</li>
                            <li className="btnCategory" orderstatus="waitForDelivery">待出貨</li>
                            <li className="btnCategory" orderstatus="canceled">已取消</li>
                        </ul>
                        <div >

                            {/* <a href="#" className="button active" orderstatus="all"><span>所有訂單</span></a>
                            <a href="#" className="button" orderstatus="completed"><span>已完成</span></a>
                            <a href="#" className="button" orderstatus="waitForPay"><span>待付款</span></a>
                            <a href="#" className="button" orderstatus="waitForDelivery"><span>待出貨</span></a>
                            <a href="#" className="button" orderstatus="canceled"><span>已取消</span></a> */}
                            {/* <a href="#" className="button" orderstatus="XXX" onClick={this.onInputChange.bind(this, "xx1")}><span>XXXXX</span></a> */}

                        </div>

                        <div className="boxTable bd1">
                            {/* <button onClick={this.loadOrders}>Load Orders</button> */}
                            <ViewOrdersItem data={this.state.orderInfo_list}></ViewOrdersItem>
                        </div>

                    </section>
                </article>
            </main>

        )
    }
}
