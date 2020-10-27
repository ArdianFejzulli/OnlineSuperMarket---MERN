import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectProductsSelector } from '../../redux/shop/shop.selectors';
import { setProducts } from '../../redux/shop/shop.actions';

import { getProducts } from '../../api/api-labcourse';

import './collection.styles.scss';

const CollectionPage = (props) => {
  const [productsInside ,setProductsInside] = useState([])
  console.log('props', props)
  const { collection, setProducts } = props;
  console.log('collection', collection)
  // const { title, items } = collection;

  useEffect(() => {
    async function fetchProducts() {
      const res = await getProducts();
          setProducts(res.data.products)
      
          const categoryProducts = [];
          res.data.products.forEach((product) => {
            if (product.subCategory === props.match.params.categoryId) categoryProducts.push(product);
          })

          setProductsInside(categoryProducts);
      }
      fetchProducts();
  }, [])

  return (
    <div className="collection-page">
      {/* <h2 className="title">{title}</h2> */}
      <div className="items">
        {
          productsInside.map(item => <CollectionItem key={item._id} item={item}></CollectionItem>)
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {collection: selectProductsSelector}
}

const mapDispatchToProps = dispatch => ({
  setProducts: products => dispatch(setProducts(products))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);