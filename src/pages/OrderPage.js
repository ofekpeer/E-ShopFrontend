import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import MessageBox from '../Components/MessageBox';
import axios from 'axios';
import { Store } from '../Store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET REQUEST':
      console.log('req');
      return { ...state, loading: true, error: '' };
    case 'GET SUCCSESS':
      console.log('secss');
      return { ...state, order: action.payload, loading: false, error: '' };
    case 'GET FAIL':
      console.log("fail");
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderPage() {
  const navigate = useNavigate();

  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  const {
    state: { userInfo },
  } = useContext(Store);

  useEffect(() => {
    const getOrder = async () => {
      try {
        dispatch({ type: 'GET REQUEST' });
        const { data } = await axios.get('/api/v1/orders/' + orderId, {
          headers: { authorization: 'Baerer ' + userInfo.token , userId: userInfo._id},
        });
        dispatch({ type: 'GET SUCCSESS', payload: data });
      } catch (err) {
        dispatch({ type: 'GET FAIL', payload: err });
      }
    };
    if (!userInfo) {
      navigate('/signin');
      return;
    }
    if (!order._id || (order._id && orderId !== order._id)) {
      getOrder();
    }
  }, [navigate, order._id, orderId, userInfo]);

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <MessageBox variant="danger">{getError(error)}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <h1 className="my-3">Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong>
                {order.shippingAddress.fullName}
                <br />
                <strong>Address:</strong>
                {order.shippingAddress.Address},{order.shippingAddress.city},
                {order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="succsess">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method: </strong>
                {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="succsess">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />{' '}
                        <Link to={`/product/${item.token}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>{item.price}$</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{order.itemsPrice}$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{order.shippingPrice}$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{order.taxPrice}$</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total </strong>
                    </Col>
                    <Col>
                      <strong>{order.totalPrice}$</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderPage;
