import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../Components/Rating';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import MessageBox from '../Components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, loading: true };
    case 'GET_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'GET_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductPage() {
  const params = useParams();
  const { token } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: [],
  });

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${product._id}`);
    console.log(data.countInStock ,quantity)
    if (data.countInStock < quantity) {
      window.alert('sorry , product is out of stock');
      return;
    } else {
      ctxDispatch({
        type: 'ADD TO CART',
        payload: { ...product, quantity  },
      });
      navigate('/cart')
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const res = await axios.get(`/api/v1/products/token/${token}`); //try catch
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'GET_FAIL', payload: getError(err) });
      }
    };

    getProduct();
  }, [token]);

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          <Col md={6}>
            <img
              src={product.image}
              alt={product.title}
              className="img-large"
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.title}</title>
                </Helmet>
                <h1>{product.title}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating.rate}
                  numOfReviews={product.rating.count}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Pirce : ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductPage;
