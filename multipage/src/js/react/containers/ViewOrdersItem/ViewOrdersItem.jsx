//@ts-check
import React, { PureComponent } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
//import OrderList_css from './OrderList.css'

import PropTypes from 'prop-types'
import { OrderInfo, UserProfile, UserData } from '../../../../js/dataDefine/index.js'
// import { times } from 'lodash';

function dateFormatter1(cell, row, rowIndex, formatExtraData) {
    /**@type {Date} */
    let date1 = cell;
    let sDate = date1.toLocaleDateString()
    let sTime = date1.toLocaleTimeString()
    //console.log('cell--->',date1)
    return (
        <div>
            <div>{sDate}</div>
            <div>{sTime}</div>
        </div>
    );
}
const columns = [
    {
        dataField: 'createDateTime',
        text: 'Create Date',
        formatter: dateFormatter1
    }, {
        dataField: 'orderId',
        text: 'Order ID'
    }, {
        dataField: 'orderProductName',
        text: 'Product Name'
    }, {
        dataField: 'totalPrice',
        text: 'Order Price'
    }, {
        dataField: 'sOrderStatus',
        text: 'Order Status'
    }];

const rowStyle = { backgroundColor: '#c8e6c9' };
// const products = [
//     {
//         id: 0,
//         name: 'name xxx 1',
//         price: 500
//     },
//     {
//         id: 1,
//         name: 'name xxx 2',
//         price: 250
//     }
// ]
const expandRow = {
    onlyOneExpanding: true,
    className: 'expandingRowBackground',
    renderer: (row) => {
        /**@type {import('../../../dataDefine/index.js').UserData} */
        let userData = new UserData();
        userData = Object.assign(userData, row.userData)
        let totalPrice = row.totalPrice;
        

        // /**@type {import('../../../dataDefine/index.js').UserProfile} */
        // let userInfo = new UserProfile();
        // userInfo = Object.assign(userInfo, row.userProfile)
        // let sendAddress = userInfo.address//.getSelectedAddress();
        return <div>
            <div>
                <label>姓名:</label>
                <span>{userData.userProfile.name}</span>
            </div>
            <div>
                <label>住址:</label>
                <span>{userData.userProfile.address}</span>
            </div>
            <div>
                <label>電話:</label>
                <span>{userData.phoneNumber}</span>
            </div>
            <div>
                <label>訂單金額總計:</label>
                <span>{totalPrice}</span>
            </div>
            <div className="titleProductList">
                商品明細
            </div>
            <div>
                {row.shopItemList.map(function (item, index) {
                    return <div key={index} className="productBox bd4">
                        <div>
                            <div className="imgContainer">
                                <img src={item._productInfo.imgUrl} alt="not found"></img>
                            </div>
                        </div>

                        <div className="boxProductName">
                            <span>{item._productInfo.name}</span>
                        </div>
                        <div className="boxProductUnitPrice">
                            <label>單價:</label>
                            <span>{item._productInfo.price}</span>
                        </div>
                        <div className="boxProductAmount">
                            <label>數量:</label>
                            <span>{item.amount}</span>
                        </div>
                        <div className="boxProductCountPrice">
                            <label>金額:</label>
                            <span>{item.amount * item._productInfo.price}</span>
                        </div>

                    </div>
                })}
            </div>
        </div>
    }
    ,
    parentClassName: (isExpanded, row, rowIndex) => {
        return 'parentExpandFoo'
        // if (rowIndex > 2) return 'parent-expand-foo';
        // return 'parent-expand-bar';
    },
    showExpandColumn: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
            return <b>-</b>;
        }
        return <b>+</b>;
    },
    expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
            return (
                <b>-</b>
            );
        }
        return (
            <b>...</b>
        );
    },

};

export default class ViewOrdersItem extends PureComponent {
    static propTypes = {
        /**@type {OrderInfo[]} */
        data: PropTypes.array
    }
    static defaultProps = {
        data: []
    }
    render() {

        return (
            <div>
                <BootstrapTable
                    keyField='orderId'
                    data={this.props.data}
                    columns={columns}
                    expandRow={expandRow}
                />
            </div>
        )
    }
}
