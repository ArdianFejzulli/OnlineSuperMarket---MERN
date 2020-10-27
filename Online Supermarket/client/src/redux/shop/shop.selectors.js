import { createSelector } from 'reselect';

export const selectShop = state => state.shop

export const selectProductsSelector = createSelector(
  [selectShop],
  shop => shop
)

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectShop],
  collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam => {
  console.log(collectionUrlParam)
  return createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  )
}