import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../Components/CheckoutSteps';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import { beautifulTitel, getError } from '../utils';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../Components/Loading';

const reduser = (state, action) => {
  switch (action.type) {
    case 'CREATE REQUEST':
      return { ...state, loading: true };
    case 'CREATE SECCEEDED':
      return { ...state, loading: false };
    case 'CREATE FAILED':
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default function SubmitOrderPage() {
  const [{ loading }, dispatch] = useReducer(reduser, {
    loading: false,
  });

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const sumbinOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE REQUEST' });
      console.log(cart);
      const { data } = await axios.post(
        '/api/v1/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: {
            ...cart.shippingAddress,
          },
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
          user: userInfo._id,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'CREATE SECCEEDED' });
      ctxDispatch({ type: 'CLEAR THE CART' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: 'CREATE FAILED' });
      toast.error(getError(error));
    }
  };

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );

  cart.taxPrice = round2(cart.itemsPrice * 0.17);

  cart.shippingPrice =
    cart.itemsPrice > 100
      ? round2(cart.itemsPrice * 0.1)
      : round2(cart.itemsPrice * 0.02);

  cart.totalPrice = round2(
    cart.itemsPrice + cart.taxPrice + cart.shippingPrice
  );

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, cart.paymentMethod]);

  return (
    <div>
      <Helmet>
        <title>Order Summary</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <h1 className="my-3">Order Summary</h1>
      <Row>
        <Col md={8}>
          <Card className="md-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name: </strong>
                {cart.shippingAddress.fullName}
                <br />
                <strong>Address: </strong>
                {cart.shippingAddress.address}
                <br />

                <strong>City: </strong>
                {cart.shippingAddress.city}
                <br />

                <strong>Country: </strong>
                {cart.shippingAddress.country}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="md-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="md-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded img-thumbnail"
                        />{' '}
                        <Link to={`/product/${item.token}`}>
                          {beautifulTitel(item.title)}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>
                          <strong>Quantity:</strong> {item.quantity}
                        </span>
                      </Col>
                      <Col md={3}>
                        <strong>Price:</strong> {item.price}$
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Summary:</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.itemsPrice.toFixed(2)}$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice.toFixed(2)}$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{cart.taxPrice.toFixed(2)}$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>
                      <strong>{cart.totalPrice.toFixed(2)}$</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={sumbinOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Submit
                    </Button>
                  </div>
                  {loading && <Loading />}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
