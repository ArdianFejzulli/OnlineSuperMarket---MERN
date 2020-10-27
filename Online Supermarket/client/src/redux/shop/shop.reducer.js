import SHOP_DATA from './shop.data.js';
import { ProductsActionTypes } from './shop.types'

const INITIAL_STATE = {
  collections: []
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductsActionTypes.SET_PRODUCTS:
      return {
        ...state,
        collections: action.payload
      }
    default:
      return state;
  }
}

export default shopReducer;