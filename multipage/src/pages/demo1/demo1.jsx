import React, { PureComponent, propTypes } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import arrayProductInfo from '../../js/firebase/ProductInfo.json'
//import overlayFactory from 'react-bootstrap-table2-overlay';
import 'bootstrap/dist/css/bootstrap.min.css';
const columns = [{
    dataField: 'productId',
    text: 'Product ID'
}, {
    dataField: 'name',
    text: 'Product Name'
}, {
    dataField: 'price',
    text: 'Product Price'
}];
console.log(arrayProductInfo)

let selectROW_2 = [1,5]
export default class demo1 extends PureComponent {
    // static propTypes={
    //     orderData:propTypes.number,
    //     listProductInfo:propTypes.number
    // }
    // static defaultProps={
    //     orderData:1,
    //     listProductInfo:2
    // }
    constructor() {
        super();
        this.state = {
            selected: [ '0001-mxd', '0003-q3t' ]
        }
    }
    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row.id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row.id)
            }));
        }
    }

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids
            }));
        } else {
            this.setState(() => ({
                selected: []
            }));
        }
    }
    test1 = (e) => {
        this.setState({ selected: [1, 3] })
        // if (!this.state.selected.includes(2)) {
        //     this.setState(() => ({
        //         selected: [...this.state.selected, 2]
        //     }));
        // } else {
        //     this.setState(() => ({
        //         selected: this.state.selected.filter(x => x !== 2)
        //     }));
        // }
    }

    render() {
        console.log(this.state.selected)
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            //selected: [1, 3],

            selected: this.state.selected,//[1, 3],
            // onSelect: this.handleOnSelect,
            // onSelectAll: this.handleOnSelectAll,
        };
        return (
            <div>
                <button onClick={this.test1}>test1</button>
                <button >test2</button>
                <BootstrapTable
                    keyField='productId'
                    data={arrayProductInfo}
                    columns={columns}
                    selectRow={selectRow}
                    selectedRowKeys={selectROW_2}
                />
            </div>
        )
    }
}
