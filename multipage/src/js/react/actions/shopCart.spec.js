import * as shopCart from './shopCart'
import * as dataDefine from '../dataDefine'
import {ADD_shopCart,DECREASE_shopCart} from '../actionTypes'


describe('shopCart actions', () => {
  var productInfo_1 = new dataDefine.ProductInfo();
  productInfo_1.name="soda"
  productInfo_1.price="15"
  productInfo_1.productId = 'fdsafe'
  productInfo_1.imgFileName = 'fdsafe.jpg'


  it('add_shopCart should create ADD_shopCart action', () => {
    expect(shopCart.add_shopCart('fdsafe',5,productInfo_1)).toEqual({
      type: ADD_shopCart,
      productId: 'fdsafe',
      amount: 5,
      productInfo:productInfo_1
    })
  })

  it('decrease_shopCart should create DECREASE_shopCart action', () => {
    expect(shopCart.decrease_shopCart('fdsafe',5,productInfo_1)).toEqual({
      type: DECREASE_shopCart,
      productId: 'fdsafe',
      amount: 5,
      productInfo:productInfo_1
    })
  })

  // it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
  //   expect(actions.setVisibilityFilter('active')).toEqual({
  //     type: 'SET_VISIBILITY_FILTER',
  //     filter: 'active'
  //   })
  // })

  // it('toggleTodo should create TOGGLE_TODO action', () => {
  //   expect(actions.toggleTodo(1)).toEqual({
  //     type: 'TOGGLE_TODO',
  //     id: 1
  //   })
  // })
})
