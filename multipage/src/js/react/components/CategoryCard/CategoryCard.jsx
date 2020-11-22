import React, { PureComponent } from 'react'
import ProductCard from '../ProductCard/ProductCard.jsx'
// import CategoryCard_css from './CategoryCard.css'
import { UID } from '../../../../../../console/src/components/uniqueId.js'
import '../../containers/ProductListSearch/ProductListSearch.css'
import PropTypes from 'prop-types'
import {Map_ProductCategory} from '../../../dataDefine/index.js'
// import { connect } from 'react-redux'
// import { load_productListAsync as load_productListAsync_act } from '../../actions/productList.js'

class CategoryCard extends React.Component {
    // st
    static propTypes = {
        groupedProducts: PropTypes.object
    }
    constructor(props) {
        super(props)
        let {refShopcartBox} = this.props;
        this.refShopcartBox = refShopcartBox;
        this.UID = UID.bind(this);
        //this.props = props
    }
    componentDidMount() {
        window.scrollTo(0, 0);

    }
    render() {
        const { groupedProducts } = this.props
        
        const { arrayGroupedItems } = groupedProducts
        const { ref } = groupedProducts
        //console.log(this.props)
        //console.log(arrayGroupedItems)
        //const { productList } = this.props
        //let productList = this.props.productList
        //console.log(this.props)
        // console.log(this.props.data)
        // productList = productList = this.props.data.arrayGroupedItems
        //console.log(this.props.data.category)
        //console.log(this.props)

        //ref={this.props.forwardRef}
        return (
            <React.Fragment>
                
                <div className="b-flexCenter">
                    <div className="CategoryCard" id={`category-${this.props.groupedProducts.category}`} ref={ref}>
                        {/* <section class="bd4 sec1"> */}
                        <header className="headerTitle">{this.props.groupedProducts.categoryZhTW}</header>
                        {/* <header class="headerTitle">{this.props.groupedProducts.category}</header> */}
                        <div className="row">
                            {/* <div>{this.props.groupedProducts.category}</div><br></br> */}
                            {/* {arrayGroupedItems.map((product, index)=>(<div className="productCard" key={index}>{product.name}, {product.price}, {product.imgFileName} </div>))} */}
                            {/* {arrayGroupedItems.map((productInfo, index) => (<ProductCard className="productCard" id={`${this.UID('productCard')}-${index}`} productInfo={productInfo} key={index} dispatch={this.props.dispatch} />))} */}
                            <ul id="ulCards" className="bd2 b-ulStyleNone b-flexStart">
                                {/* <li id="foodCard" class="bd1 food">
                            <div>百頁豆腐</div>
                            <img class="imgFood" src="noodle1.png" alt="" />
                            <div>NT$ 20</div>
                            <hr class="hrDot" />
                        </li> */}
                                {arrayGroupedItems.map((productInfo, index) => (


                                    <ProductCard id={`${this.UID('productCard')}-${index}`} refShopcartBox={this.refShopcartBox} productInfo={productInfo} key={index} dispatch={this.props.dispatch} />
                                ))}
                            </ul>
                            {/* <section class="bd4 sec1">
                        <header class="headerTitle">牛肉</header>
                        <p class="textContent1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sapiente explicabo
                        commodi maiores iure deserunt, debitis necessitatibus minima! Impedit ipsam eius dolore cum excepturi
                            eos ipsa quia quisquam facere et?</p>
                        <ul id="ulCards" class="bd2 ulStyle flexStart">
                            <li id="foodCard" class="bd1 food">
                                <div>百頁豆腐</div>
                                <img class="imgFood" src="noodle1.png" alt="" />
                                <div>NT$ 20</div>
                                <hr class="hrDot" />
                            </li>
                        </ul>
                    </section> */}




                            {/* <div className="productCard">菜單卡片</div>
                    <div className="productCard">菜單卡片</div>
                    <div className="productCard">菜單卡片</div> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

// const CategoryCard = React.forwardRef((props,ref) => {

//     //return CategoryCard

//     return <CategoryCard />
// })
export default CategoryCard



// const mapStateToProps = (state) => {
//     return {
//         productList: state.productList,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         dispatch: dispatch,
//         act_loadProducts: () => {
//             dispatch(load_productListAsync_act())
//         }
//     }

// };

// export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);