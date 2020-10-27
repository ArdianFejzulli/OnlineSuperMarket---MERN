import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { images, price, title, quantity } }) => {
  const imageUrl = ('http://localhost:5000/' + images[0]).replace('\\', '/');
  return(
  <div className="cart-item">
    <img src={imageUrl} alt="item" />
    <div className="item-details">
      <span className="name">{title}</span>
      <span className="price">
        {quantity} x ${price}
      </span>
    </div>
  </div>
)}

export default CartItem;