import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../Components/CheckoutSteps';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
   'PayPal'
  );

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE PAYMENT METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodName));
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
