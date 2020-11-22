import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
//import overlayFactory from 'react-bootstrap-table2-overlay';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './react-bootstrap-table2.css'
//import style from 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');
import style2 from './BootstrapTable.css'
import listProducts from './data2.json'
import Spinner from './Spinner.js'
import DataContext from '../DataContext.js'


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
        text: '3', value: 3
    }, {
        text: '5', value: 5
    }, {
        text: '10', value: 10
    }, {
        text: 'All', value: listProducts.length
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
function imgFormatter(cell, row) {
    if (row.imgUrl) {
        return (
            <img src={row.imgUrl} className='img1' alt="XXXX" />
            // <span>
            //     <strong style={{ color: 'red' }}>$ {cell} NTD(Sales!!)</strong>
            // </span>
        );
    }

    return (
        <span>$ { cell} NTD</span>
    );
}






const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Product List</h3>;
const rowEvents = {
    onClick: (e, row, rowIndex) => {
        //console.log(`clicked on row with index: ${rowIndex}`);
        //console.log(row)
    },
    // onMouseEnter: (e, row, rowIndex) => {
    //     console.log(`enter on row with index: ${rowIndex}`);
    // }
};
function Hoc(WrappedComponent) {
    return class extends React.Component {
        static contextType = DataContext;
        constructor() {
            super()
            this.state = {
                listProducts: listProducts
            }
            this.Spinner = new Spinner();
            this.myTable = React.createRef();
        }
        btnClick = (cell, row, e) => {
            let productId = row.productId
            console.log(productId)

            this.setState((state, props) => {
                let newList = [...state.listProducts]
                let idx = newList.findIndex((item) => {
                    return item.productId === productId
                })
                //console.log(idx)
                //newList.pop();
                newList.splice(idx, 1)
                return Object.assign({}, state, { listProducts: newList })

            })

            //console.log(cell)
            //console.log(row)
            //console.log(e.target)

        }
        deleteBtnFormatter = (cell, row) => {
            return <input type="button" value="Delete" onClick={this.btnClick.bind(this, cell, row)}></input>
        }
        columns = [
            {
                dataField: 'autoNum',
                text: 'autoNum',
                align: 'center',
                headerAlign: 'center',
                editable: false,
            },
            {
                dataField: 'imgUrl',
                text: 'imgUrl',
                formatter: imgFormatter,
                align: 'center',
                headerAlign: 'center',
                editable: false,
            },
            {
                dataField: 'productId',
                text: 'Product ID',
                align: 'center',
                headerAlign: 'center',
            },
            {
                dataField: 'name',
                text: 'Product Name',
                align: 'center',
                headerAlign: 'center',
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
                //         console.log('onMouseEnter on Product ID field');
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
                dataField: 'deleteButton',
                text: 'Delete',
                align: 'center',
                headerAlign: 'center',
                editable: false,
                formatter: this.deleteBtnFormatter
            },
        ];
        // componentDidUpdate(prevProps) {
        //     console.log('Current props: ', this.props);
        //     console.log('Previous props: ', prevProps);
        // }
        componentDidMount = () => {
            //console.log(this.props)
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
        updatedCell = (oldValue, newValue, row, column, e) => {
            //console.log(e)
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
                //console.log('item--', item)
                //newList.pop();
                //newList.splice(0, 1)
                // console.log(newList)
                return Object.assign({}, state, { listProducts: newList })
            })

            //-------------------update firebase product
            let newObject = {}
            newObject[fieldName] = newValue;
            console.log('newObject-- ', newObject)
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



            FirebaseMJS._setProduct_db_merge(productId, newObject, options)
                .then((e) => {
                    //console.log('_setProduct_db_merge() done.' ,e)
                }
                )
                .catch((err) => {
                    console.log(err)
                }
                )

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
            // onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
            // beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
            afterSaveCell: this.updatedCell//(oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
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
            startSpin: function () {
                let Spinner = this.root.Spinner;
                setTimeout((params) => {
                    this.focused_td = this.findLastTD()
                    console.log(this.focused_td)
                    console.log(this)
                    Spinner.appendSpinner(this.focused_td)
                    //console.log(td)
                }, 50)
            },
            endSpin: function () {
                let Spinner = this.root.Spinner;
                Spinner.removeSpinner(this.focused_td)
                // setTimeout((params) => {
                //     //let td = this.findLastTD()

                //     //console.log(td)
                // },50)
            },

            // findLastTD:() => {
            //     //console.log(td_tabIndex)

            //     return this
            // }

        }
        rowEvents = {
            onClick: (e, row, rowIndex) => {
                // console.log(`clicked on row with index: ${rowIndex}`);
                // console.log(e.target)
                // console.log(row)
                //this.Spinner.appendSpinner(e.target)


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


                // this.spinnerTarget = e.target
                // if(this.spinnerTarget.tagName!=='TD')
                //     this.spinnerTarget = this.spinnerTarget.parentElement
                // if(this.spinnerTarget.tagName!=='TD')
                //     this.spinnerTarget = this.spinnerTarget.parentElement

                // if(this.spinnerTarget.tagName!=='TR')
                //     this.spinnerTarget = this.spinnerTarget.parentElement
                //console.log(this.spinnerTarget)
                // console.log(this.lastClickRow)
                // console.log(this.lastClickRow.td_tabIndex)
                //console.log(this.lastClickRow.findLastTD())
                //console.log(this.spinnerTarget.parentElement)
                //this.Spinner.appendSpinner(this.lastClickRow.td)

                //console.log(this.context)
                // e.target.classList.add('bars5Container')
                // e.target.appendChild(this.bars5)
            },
            // onMouseEnter: (e, row, rowIndex) => {
            //     console.log(`enter on row with index: ${rowIndex}`);
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
                    console.log('beginEvent')
                },
                endEvent: () => {
                    console.log('endEvent')
                },
            }
            //console.log(FirebaseMJS)
            let newObject = this.state.listProducts[0]
            let productId = newObject.productId
            console.log(newObject)
            FirebaseMJS._setProduct_db_merge(productId, newObject, options)
                .then((e) => {
                    //console.log('eee--' ,e)
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
            let newArray = this.state.listProducts//.slice(0,4)
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
                        console.log('done. -- ', item.productId)
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
        GetProducts=(e) => {
            let {FirebaseMJS} = this.context
            FirebaseMJS.getProducts();
        }
        

        render() {
            //console.log(this.state)
            //console.log(this.cellEdit_options)

            // Wraps the input component in a container, without mutating it. Good!
            // return <WrappedComponent {...this.props} />;
            //let that = this
            //console.log(this.state)
            return <div>
                {this.state.listProducts[0].price}
                <button onClick={this.delete}>delete</button>
                <button onClick={this.showState}>show state</button>
                <button onClick={this.setDB_Products}>setDB_Products</button>
                <button onClick={this.AddDBProducts}>add db products</button>
                <button onClick={this.GetProducts}>get products</button>
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
                <WrappedComponent bootstrap4 keyField='productId' ref={this.myTable} bordered={true} caption={<CaptionElement />} classes="foo" data={this.state.listProducts} columns={this.columns} selectRow={{ mode: 'checkbox' }} rowEvents={this.rowEvents} pagination={paginationFactory(options)} cellEdit={cellEditFactory(this.cellEdit_options)} tabIndexCell striped hover condensed />
                {/* <img src="./images/196643.jpg" alt="XXXX"/> */}

            </div>
        }
    }
}

export default Hoc(BootstrapTable);