import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { description, images, price, quantity } = cartItem;
  const imageUrl = ('http://localhost:5000/' + images[0]).replace('\\', '/');
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt='item' />
      </div>
      <span className="name">{description}</span>
      <span className="quantity">
        <div className="arrow"
          onClick={() => removeItem(cartItem)}
        >&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow"
          onClick={() => addItem(cartItem)}
        >&#10095;</div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={
        () => clearItem(cartItem)
      }>&#10005;</div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);