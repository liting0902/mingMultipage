import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
//import overlayFactory from 'react-bootstrap-table2-overlay';
import 'bootstrap/dist/css/bootstrap.min.css';
//import style from '../react-bootstrap-table2.css'
//import style from 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');
//require('bootstrap/dist/css/bootstrap.min.css')
//import style2 from '../BootstrapTable2.css'
import TableOrder_css from './TableOrder.css'
import listProducts from './data3.json'
// import Spinner from './Spinner.js'
import DataContext from '../../DataContext.js'
import { ENUM_ProductCategory, ProductInfo } from '../../../dataDefine/index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faGift, faBan, faCheck } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import testData from '../../../../../test/testdata.js'
//import OrderContext from '../OrderManagement/OrderContext.js'
//console.log(style)
//console.log(style)
//console.log(listProducts)
// const products = [{
//     id: 'a1',
//     name: 'name1',
//     price: 50,
//     url: './images/196643.jpg',
// },
// {
//     id: 'a2',
//     name: 'name2',
//     price: 150,
//     onSale: true
// },
// {
//     id: 'a3',
//     name: 'name3',
//     price: 250,
// },
// ];

function dateFormatter1(cell, row, rowIndex, formatExtraData) {
    /**@type {Date} */
    let date1 = cell;
    let sDate = date1.toLocaleDateString()
    let sTime = date1.toLocaleTimeString()
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
        headerAlign: 'center',
        editable: false,
        formatter: dateFormatter1
    }, {
        dataField: 'orderId',
        text: 'Order ID',
        headerAlign: 'center',
        editable: false,
    }, {
        dataField: 'orderProductName',
        text: 'Product Name',
        headerAlign: 'center',
        editable: false,
    }, {
        dataField: 'totalPrice',
        text: 'Order Price',
        headerAlign: 'center',
        editable: false,
    }, {
        dataField: 'sOrderStatus',
        text: 'Order Status',
        headerAlign: 'center',
        editable: true,
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


//------------------------------------------------------------
const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
        Showing { from} to { to} of { size} Results
    </span>
);
const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
        text: '8', value: 8
    }, {
        text: '10', value: 10
    }, {
        text: 'All', value: 0//this.state.listProducts.length
    }] // A numeric array is also available. the purpose of above example is custom the text
};

function priceFormatter(cell, row) {
    if (row.onSale) {
        return (
            <span>
                <strong style={{ color: 'red' }}>$ {cell} NTD(Sales!!)</strong>
            </span>
        );
    }

    return (
        <span>$ { cell} NTD</span>
    );
}







const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Order List</h3>;
const rowEvents = {
    onClick: (e, row, rowIndex) => {
        //console.log(row)
    },
    // onMouseEnter: (e, row, rowIndex) => {
    // }
};
function Hoc(WrappedComponent) {
    return class extends React.Component {
        static contextType = DataContext;
        static propTypes = {
            select_Order_Info: PropTypes.func
        }

        constructor() {
            super()
            this.refInputSelectImage = createRef()
            this.state = {
                orderInfo_list: [],//[new ProductInfo()],
                /**@type {string}*/
                selectedRow: null,
                selected: [0, 1],
            }

            // this.state = {
            //     /**@type {OrderInfo[]} */
            //     orderInfo_list: []
            // }
            // this.Spinner = new Spinner();

            //fire event of FileInput (load file)
            this.evtSelectInputChange = null
            if ("createEvent" in document) {
                this.evtSelectInputChange = document.createEvent('HTMLEvents');
                //this.evtSelectInputChange.initEvent('change', false, true);// bubble preventDefault
                this.evtSelectInputChange.initEvent('change', true, false);// bubble preventDefault
            }

        }
        btnDelete_Click = (cell, row, e) => {
            let productId = row.productId
            console.log(productId)
            let { FirebaseMJS } = this.context
            FirebaseMJS.deleteProductInfo(productId)
                .then(() => {
                    this.setState((state, props) => {

                        let idx = state.listProducts.findIndex((item) => {
                            return (item.productId === productId)
                        })
                        //console.log(idx)
                        let removeItem = state.listProducts.splice(idx, 1)
                        return { listProducts: state.listProducts }
                    })
                })
                .catch((err) => {
                    alert(err)
                })

            // this.setState((state, props) => {
            //     let newList = [...state.listProducts]
            //     let idx = newList.findIndex((item) => {
            //         return item.productId === productId
            //     })
            //     //console.log(idx)
            //     //newList.pop();
            //     newList.splice(idx, 1)
            //     return Object.assign({}, state, { listProducts: newList })

            // })

            //console.log(cell)
            //console.log(row)
            //console.log(e.target)

        }

        iconIsActive_Click = (cell, row, e) => {
            let { FirebaseMJS } = this.context

            let options = {
                beginEvent: () => {
                    if (this.lastClickRow)
                        this.lastClickRow.startSpin();
                },
                endEvent: () => {
                    if (this.lastClickRow)
                        this.lastClickRow.endSpin();
                }
            }

            let productId = row.productId
            let listProducts = this.state.orderInfo_list
            // console.log(productId)
            let idx = listProducts.findIndex((item) => {
                return item.productId === productId
            })
            let preActiveStatus = listProducts[idx].isActived
            FirebaseMJS.updateProductInfo(productId, { isActived: !preActiveStatus })
                .then((data) => {
                    let newProdInfo = new ProductInfo()
                    newProdInfo = Object.assign(newProdInfo, data)
                    listProducts[idx] = newProdInfo
                    this.setState({ listProducts: listProducts })
                })
                .catch((err) => {
                    console.log(err)
                })


        }
        imgProduct_Click = (cell, row, e) => {
            //console.log(row.productId)
            // setTimeout(() => {
            // }, 1000);
            this.refInputSelectImage.current.click()
        }
        imgProduct_Dragover = (cell, row, e) => {
            //console.log(cell)
            //console.log(row)
            e.preventDefault()
            e.stopPropagation()
            e.dataTransfer.dropEffect = 'copy';
        }
        imgProduct_Drop = (cell, row, e) => {
            e.preventDefault()
            e.stopPropagation()
            // console.log(cell)
            // console.log(row)
            this.setState({ selectedRow: row })

            let dt = e.dataTransfer
            let files = dt.files

            //console.log(files)
            //iptSelectImage.value=files
            this.refInputSelectImage.current.files = files

            //iptSelectImage.files = files

            //https://juejin.im/post/6844903833227771917

            if (this.evtSelectInputChange) {
                // var evt = document.createEvent('HTMLEvents');
                // evt.initEvent('change', false, true);
                //console.log(this.refInputSelectImage)
                setTimeout(() => {
                    this.refInputSelectImage.current.dispatchEvent(this.evtSelectInputChange);
                }, 100);
                //console.table(this.evtSelectInputChange)
            }

        }
        isActivedFormatter = (cell, row, rowIndex, formatExtraData) => {
            //console.log(formatExtraData)
            let iconDef = (cell === true) ? faCheck : faBan
            let color = (cell === true) ? 'lime' : 'red'
            return <div onClick={this.iconIsActive_Click.bind(this, cell, row)}>
                <FontAwesomeIcon icon={iconDef} size="2x" color={color} />
                {/* <FontAwesomeIcon icon={faCheck} size="2x" color={color} /> */}
            </div>
            // <i className={formatExtraData[cell]} />
        }
        imgFormatter = (cell, row) => {
            // console.log(cell)
            let Img1
            if (row.imgUrl === 'null' || row.imgUrl==='./')
                Img1 = <img src={row.imgUrl} className='imgSrcNull' alt="無圖片，請拖曳新圖片至此" />
            else
                Img1 = <img src={row.imgUrl} className='img1' alt="imgUrl is invalid" />
            return (<div onClick={this.imgProduct_Click.bind(this, cell, row)} onDragOver={this.imgProduct_Dragover.bind(this, cell, row)} onDrop={this.imgProduct_Drop.bind(this, cell, row)}>
                {Img1}
            </div>)
            // onClick = { this.btnDelete_Click.bind(this, cell, row) }
            // if (cell === 'null')
            //     return (<div className="imgSrcNull">
            //         <img src={row.imgUrl} className='img1' alt="無圖片，請拖曳新圖片至此" />
            //     </div>)
            // else
            //     return <img src={row.imgUrl} className='img1' alt="imgUrl is invalid" />

            //if (row.imgUrl) {}

            return (
                <span>$ { cell} NTD</span>
            );
        }
        deleteBtnFormatter = (cell, row) => {
            return <input type="button" value="Delete" onClick={this.btnDelete_Click.bind(this, cell, row)}></input>
        }
        columns = [
            {
                dataField: 'isActived',
                text: 'isActived',
                align: 'center',
                headerAlign: 'center',
                editable: false,
                sort: true,
                formatter: this.isActivedFormatter,
                classes: 'tdCenterBox',
                // classes: (cell, row, rowIndex, colIndex) => {
                //     return 'containerVerticalCenter'
                //     // if (rowIndex % 2 === 0) return 'demo-row-even';
                //     // return 'demo-row-odd';
                // },
                // editCellClasses: (cell, row, rowIndex, colIndex) => ('verticalCenter'),
                //(cell > 2101 ? 'editing-price-bigger-than-2101' : 'editing-price-small-than-2101'),
                formatExtraData: {
                    true: 'fab github',
                    false: 'fab github'
                    // true: 'glyphicon glyphicon-chevron-up',
                    // false: 'glyphicon glyphicon-chevron-down'
                }
                // editor: {
                //     type: 'checkbox',
                //     value: 'Y:N',
                //     align: 'center',
                // }
            },
            {
                dataField: 'autoNum',
                text: 'autoNum',
                align: 'center',
                headerAlign: 'center',
                editable: false,
                sort: true,
            },
            {
                dataField: 'imgUrl',
                text: 'imgUrl',
                formatter: this.imgFormatter,
                align: 'center',
                headerAlign: 'center',
                editable: false,
            },
            {
                dataField: 'productId',
                text: 'Product ID',
                align: 'center',
                headerAlign: 'center',
                sort: true,
            },
            {
                dataField: 'name',
                text: 'Product Name',
                align: 'center',
                headerAlign: 'center',
                // classes: (cell, row, rowIndex, colIndex) => {
                //     if (rowIndex % 2 === 0) return 'demo-row-even';
                //     return 'demo-row-odd';
                // }
                // editCellClasses: (cell, row, rowIndex, colIndex) => ('colorRed'),
                // events: {
                //     onClick: (e, column, columnIndex, row, rowIndex) => {
                //         console.log(e);
                //         console.log(column);
                //         console.log(columnIndex);
                //         console.log(row);
                //         console.log(rowIndex);
                //         alert('Click on Product ID field');
                //     },
                //     onMouseEnter: (e, column, columnIndex, row, rowIndex) => {
                //         console.log(e);
                //         console.log(column);
                //         console.log(columnIndex);
                //         console.log(row);
                //         console.log(rowIndex);
                //     }
                // }
            },
            {
                dataField: 'price',
                text: 'Product Price',
                editor: {
                    type: 'number',
                    //value: 'true:false'
                },
                //type: 'number',
                align: 'center',
                headerAlign: 'center',
                sort: true,
                formatter: priceFormatter,
                headerStyle: (column, colIndex) => {
                    if (colIndex % 2 === 0) {
                        return {
                            backgroundColor: '#81c784'
                        };
                    }
                    return {
                        backgroundColor: '#c8e6c9'
                    };
                },
                validator: (newValue, row, column) => {
                    if (newValue != +newValue)
                        return {
                            valid: false,
                            message: 'Price should be numeric'
                        };
                    else
                        return true
                    // let blNumber = (typeof numValue === 'number' && !isNaN(numValue))
                    // return !isNaN(parseFloat(n)) && isFinite(n);
                    // return typeof obj === 'number' && isFinite(obj)
                    // return obj === +obj
                },
                editCellClasses: (cell, row, rowIndex, colIndex, e) => {
                    return 'edit1'//(cell > 2101 ? 'editing-price-bigger-than-2101' : 'editing-price-small-than-2101')
                }
            },
            {
                dataField: 'category',
                text: 'Category',
                align: 'center',
                headerAlign: 'center',
                editor: {
                    type: 'select',
                    options: [{
                        value: ENUM_ProductCategory.beef,
                        label: 'BEEF'
                    }, {
                        value: ENUM_ProductCategory.chicken,
                        label: 'CHICKEN'
                    }, {
                        value: ENUM_ProductCategory.duck,
                        label: 'DUCK'
                    }, {
                        value: ENUM_ProductCategory.pork,
                        label: 'PORK'
                    }, {
                        value: ENUM_ProductCategory.soybean,
                        label: 'SOYBEAN'
                    }, {
                        value: ENUM_ProductCategory.others,
                        label: 'OTHERS'
                    }]
                }
            },
            {
                dataField: 'deleteButton',
                text: 'Delete',
                align: 'center',
                headerAlign: 'center',
                editable: false,
                formatter: this.deleteBtnFormatter
            },
        ];
        // componentDidUpdate(prevProps) {
        // }
        componentDidMount = () => {
            //console.log(this.props)
            //this.setState({listProducts:listProducts})
            //this.LoadProductInfo();
        }
        componentDidUpdate(prevProps, prevState) {
            console.log('----- componentDidUpdate')
            if (prevState.orderInfo_list !== this.state.orderInfo_list) {
                console.log('------different--------')
                // this.setState(() => ({
                //     selected: [...this.state.selected, 2]
                // }));
                // this.setState({selectRow : {
                //     mode: 'radio',
                //     //mode: 'checkbox',
                //     selected:[0],
                //     clickToSelect: true
                //     //onSelect: this.handleOnRowSelect,
                // }})

            }

        }
        delete = (e) => {

            this.setState((state, props) => {
                let newList = [...state.listProducts]
                //newList.pop();
                newList.splice(0, 1)
                return Object.assign({}, state, { listProducts: newList })
                // newState.listProducts.splice(0,1)
                // return newState

                //console.log(newState)
                // console.log(props)
            })
        }



        onBlur_UpdatedCell = (oldValue, newValue, row, column, e) => {
            if (oldValue == newValue)
                return;
            // console.log(oldValue)
            // console.log(newValue)
            // console.log(row)
            // console.log(column)
            //this.setState({ listProducts: [...this.state.listProducts, newProduct]})
            let fieldName = column.dataField;
            let productId = row.productId
            this.setState((state, props) => {

                //console.log(productId)
                let newList = [...state.listProducts]//state.listProducts//
                let idx = newList.findIndex((element) => {
                    return element.productId === productId
                })
                newList[idx][fieldName] = newValue
                //newList.pop();
                //newList.splice(0, 1)
                // console.log(newList)
                return Object.assign({}, state, { listProducts: newList })
            })

            //-------------------update firebase product
            let newObject = {}
            newObject[fieldName] = newValue;
            let { FirebaseMJS } = this.context

            let options = {
                beginEvent: () => {
                    if (this.lastClickRow)
                        this.lastClickRow.startSpin();
                },
                endEvent: () => {
                    if (this.lastClickRow)
                        this.lastClickRow.endSpin();
                }
            }

            FirebaseMJS.updateProductInfo(productId, newObject, options)
                .then((data) => {
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })

            // FirebaseMJS._setProduct_db_merge(productId, newObject, options)
            //     .then((e) => {
            //     }
            //     )
            //     .catch((err) => {
            //         console.log(err)
            //     }
            //     )

            // FirebaseMJS._add(this.state.iptProdNameValue,
            //     this.state.iptProdPriceValue,
            //     this.state.imgBlob,
            //     options,
            // );
            //_setProduct_db_merge

        }

        cellEdit_options = {
            mode: 'click',
            blurToSave: true,
            autoSelectText: true,
            //nonEditableRows: () => [0,1, 2]
        }
        showState = () => {
            console.log(this.state)
        }
        //spinnerTarget=null;
        lastClickRow = {
            tr: null,
            td: null,
            td_tabIndex: null,
            root: this,
            table: null,
            focused_td: null,
            //Spinner:this.Spinner,
            findLastTD: function () {
                //document.querySelector();
                //let td_tabIndex = this.td_tabIndex-1
                let attr = `[tabindex="${this.td_tabIndex}"]`
                //attr = `[tabindex="5"]`
                //attr='td'
                //attr = this.table.querySelector(attr);
                //console.log(attr)
                let elem = this.table.querySelector(attr);
                return elem
            },


            // findLastTD:() => {
            //     //console.log(td_tabIndex)

            //     return this
            // }

        }
        rowEvents = {
            onClick: (e, row, rowIndex) => {
                // console.log(e.target)
                // console.log(row)
                //this.Spinner.appendSpinner(e.target)
                //let { select_Order_Info } = this.context
                // let { select_Order_Info } = this.state
                // select_Order_Info(row)
                let { click555 } = this.props
                click555(row)
                //select_Order_Info(row)


                this.setState({ selectedRow: row })

                this.lastClickRow.tr = e.target.parentElement
                if (this.lastClickRow.tr.tagName !== 'TR')
                    this.lastClickRow.tr = this.lastClickRow.tr.parentElement

                this.lastClickRow.td = e.target
                if (this.lastClickRow.td.tagName !== 'TD')
                    this.lastClickRow.td = this.lastClickRow.td.parentElement
                if (this.lastClickRow.td.tagName !== 'TD')
                    this.lastClickRow.td = this.lastClickRow.td.parentElement
                this.lastClickRow.td_tabIndex = this.lastClickRow.td.tabIndex

                this.lastClickRow.table = e.target.parentElement
                if (this.lastClickRow.table.tagName !== 'TABLE')
                    this.lastClickRow.table = this.lastClickRow.table.parentElement
                if (this.lastClickRow.table.tagName !== 'TABLE')
                    this.lastClickRow.table = this.lastClickRow.table.parentElement
                if (this.lastClickRow.table.tagName !== 'TABLE')
                    this.lastClickRow.table = this.lastClickRow.table.parentElement
                if (this.lastClickRow.table.tagName !== 'TABLE')
                    this.lastClickRow.table = this.lastClickRow.table.parentElement

                console.log(this.lastClickRow)

                //if(this.lastClickRow.tr.tagName!=='TR')

            },
            // onMouseEnter: (e, row, rowIndex) => {
            // }
        };

        // overlayOptions = {
        //     spinner: true,
        //     styles: {
        //         overlay: (base) => ({ ...base, background: 'rgba(255, 0, 0, 0.5)' })
        //     }
        // }
        setDB_Products = () => {
            //console.log(this.state.listProducts)

            let { FirebaseMJS } = this.context
            let options = {
                beginEvent: () => {
                },
                endEvent: () => {
                },
            }
            //console.log(FirebaseMJS)
            let newObject = this.state.orderInfo_list[0]
            let productId = newObject.productId
            console.log(newObject)
            FirebaseMJS._setProduct_db_merge(productId, newObject, options)
                .then((e) => {
                })
                .catch((err) => {
                    console.log(err)
                })


            // //let containerBars5 = document.querySelector('#containerBars5');            
            // this.bars5 = document.querySelector('#bars5')
            // let parent_bars5 = this.bars5.parentElement
            // //console.log(parent_bars5)

            // parent_bars5.removeChild(bars5);
            // console.log(this.bars5)
        }
        //bars5 = null
        AddDBProducts = (params) => {
            let { FirebaseMJS } = this.context
            // fetch(this.state.listProducts[0].imgUrl)
            //     .then((e) => {
            //         return e.blob()
            //     })
            //     .then((e) => {
            //         console.log(e)
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })
            let newArray = this.state.orderInfo_list//.slice(0,4)
            //console.log(newArray)

            newArray.forEach((item) => {
                //console.log(item)
                fetch(item.imgUrl)
                    .then((e) => {
                        return e.blob()
                    })
                    .then((e) => {
                        //console.log(e)
                        //item.blob = e;
                        return FirebaseMJS.addProduct4(item.name,
                            item.price,
                            e,
                        );
                    })
                    .then((e) => {
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                // FirebaseMJS.addProduct4(item.name,
                //     item.price,
                //     item.blob,
                // );
            })


        }
        GetProducts = (e) => {
            let { FirebaseMJS } = this.context
            FirebaseMJS.getProducts();
        }
        LoadOrderInfo = (inOrderStatus) => {
            //console.log(1111)
            let { FirebaseMJS } = this.context
            FirebaseMJS.getOrderInfo(testData.userId, 'all')
                .then((orderInfo_list) => {
                    let sJson = JSON.stringify(orderInfo_list[0], null, 4)
                    //console.log(sJson)

                    this.setState({ orderInfo_list: orderInfo_list });
                })


            // let { FirebaseMJS } = this.context
            // let listProdInfo
            // FirebaseMJS.getProductInfo()
            //     .then((data) => {
            //         listProdInfo = data.map((item) => {
            //             let prodInfo = new ProductInfo();
            //             prodInfo = Object.assign(prodInfo, item)
            //             return prodInfo
            //         })
            //         //console.table(data)
            //         this.setState({ listProducts: listProdInfo })

            //     })
        }

        AddProductInfo = (e) => {
            let sampleData = {
                "addDateTime": {
                    "seconds": 1600588020,
                    "nanoseconds": 603000000
                },
                "imgUrl": "https://firebasestorage.googleapis.com/v0/b/ming1-d8ff5.appspot.com/o/Products%2F1mmn9i3r-0008.jpg?alt=media&token=51eeae00-54aa-4382-9a35-c350de903ddf",
                "tag": "#",
                "autoNum": 18,
                "isActived": false,
                "price": 30,
                "imgFileName": "1mmn9i3r-0008.jpg",
                "productId": "00018-8vn",
                "name": "XXX",
                "category": ENUM_ProductCategory.others
            }
            let { FirebaseMJS } = this.context
            //console.log(FirebaseMJS.addProduct5)
            FirebaseMJS.addProduct5('', 0, 'beef')
                .then((data) => {
                    this.setState({ listProducts: [data, ...listProducts] })
                })
            //this.setState({ listProducts: [sampleData, ...listProducts] })

        }
        Test1 = (e) => {
            // let { select_Order_Info } = this.props
            // console.log(select_Order_Info)
            console.log('test1')
            this.setState({selected:[1,3]})
            // let newList = _.cloneDeep(this.state.listProducts)
            // newList[0].isActived = !newList[0].isActived
            // this.setState({ listProducts: newList })

            // let obj = this.state.listProducts[0]
            // obj.isActived = !obj.isActived
            // this.setState({listProducts:this.state.listProducts})
        }
        iptSelectImage_onChange = (e) => {
            let productId = this.state.selectedRow.productId
            const arrayFiles = e.target.files

            if (arrayFiles.length === 0)
                return
            let [file1] = arrayFiles

            let { FirebaseMJS } = this.context
            let options = {
                beginEvent: () => {
                },
                endEvent: () => {
                },
            }
            let self = this
            FirebaseMJS.updateCloudStorageFile(productId, file1, options)
                .then((data) => {
                    let prodInfo = new ProductInfo();
                    prodInfo = Object.assign(prodInfo, data)
                    let newList = [...self.state.orderInfo_list]//state.listProducts//
                    // let findProduct = newList.find((element) => {
                    //     return element.productId === productId
                    // })
                    //findProduct = prodInfo;
                    let idx = newList.findIndex((element) => {
                        return element.productId === productId
                    })
                    newList[idx] = prodInfo
                    self.setState({ listProducts: newList })
                })
        }

        handleOnRowSelect = (row, isSelect) => {
        }


        render() {
            //console.log(this.state)
            //console.log(this.cellEdit_options)

            // Wraps the input component in a container, without mutating it. Good!
            // return <WrappedComponent {...this.props} />;
            //let that = this
            //console.log(this.state)
            const selectRow = {
                //mode: 'radio',
                mode: 'checkbox',
                //selected: [0],//this.state.selected,
                selected: this.state.selected,
                clickToSelect: true,
                onSelect: this.handleOnRowSelect,
            };
            const divProductId = (this.state.selectedRow) ? <div>{this.state.selectedRow.productId}</div> : ''
            return (
                <div>
                    {divProductId}
                    {/* <FontAwesomeIcon icon={["fab", "coffee"]} /> */}
                    {/* { this.state.listProducts[0].price} */}
                    <button onClick={this.delete}>delete</button>
                    <button onClick={this.showState}>show state</button>
                    <button onClick={this.setDB_Products}>setDB_Products</button>
                    <button onClick={this.AddDBProducts}>add db products</button>
                    <button onClick={this.GetProducts}>get products</button>
                    <button className="myButton" onClick={this.AddProductInfo}>Add ProductInfo</button>
                    <button className="myButton" onClick={this.Test1}>Test1</button>
                    {/* <button className="myButton" onClick={this.select_Order_Info}>select Order</button> */}
                    <button className="myButton" onClick={this.LoadOrderInfo}>Load Order</button>
                    <input ref={this.refInputSelectImage} onChange={this.iptSelectImage_onChange} type="file" accept="image/png, image/jpeg" multiple="multiple" />
                    {/* <div id="containerBars5">
                    
                                </div> */}
                    {/* <div className="bars5" id="bars5">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div> */}

                    {/* overlay={overlayFactory(this.overlayOptions)} */}
                    <WrappedComponent id="mainTable" bootstrap4 keyField='orderId' bordered={true} caption={<CaptionElement />} classes="foo" data={this.state.orderInfo_list} columns={columns} selectRow={selectRow} rowEvents={this.rowEvents} pagination={paginationFactory(options)} cellEdit={cellEditFactory(this.cellEdit_options)} tabIndexCell striped hover condensed />
                    {/* <img src="./images/196643.jpg" alt="XXXX"/> */}

                </div>
            )
        }
    }
}

export default Hoc(BootstrapTable);