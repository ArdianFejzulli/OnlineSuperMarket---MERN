import { ProductsActionTypes } from './shop.types'

export const setProducts = products => ({
    type: ProductsActionTypes.SET_PRODUCTS,
    payload: products
});