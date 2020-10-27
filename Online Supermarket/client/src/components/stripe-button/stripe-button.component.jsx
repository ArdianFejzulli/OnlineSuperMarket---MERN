import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {

  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51H5xkvDV9k5j8lmRkxElQYmLwJ9QyRDVZ3Zw8k5STCTmxwL13VtUDCW3OdQ4ls2CmhtvirBLT5dxYaHI3uSA2s1700XNLsZUc6'

  const onToken = token => {
    console.log(token)
    alert("Payment Successful")
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;
