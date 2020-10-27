import React from 'react'
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
  const { title, price, images, description } = item;
  const imageUrl = ('url(http://localhost:5000/' + images[0] + ')').replace('\\', '/');
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `${(imageUrl)}` }}
      />
      <div className="collection-footer">
        <span className="name">{title}</span>
        <span className="price">{price}</span>
      </div>
      <span className="description">{description}</span>
      <CustomButton onClick={() => addItem(item)} inverted='true'>
        Add to cart
      </CustomButton>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);