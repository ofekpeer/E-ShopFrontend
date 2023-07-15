import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/Product';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/Loading';
import MessageBox from '../Components/MessageBox';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET REQUEST':
      return { ...state, loading: true };
    case 'GET SUCCSESS':
      return { ...state, products: action.payload, loading: false };
    case 'GET FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  const [img, setImg] = useState(
    'https://m.media-amazon.com/images/I/71AilmPhRbL._SX3000_.jpg'
  );

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'GET REQUEST' });
      try {
        const res = await axios.get('/api/v1/products');
        dispatch({ type: 'GET SUCCSESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'GET FAIL', payload: getError(error) });
      }
    };
    let interval = changeImage();
    getProducts();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const images = [
    'https://m.media-amazon.com/images/I/71AilmPhRbL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/810YZUC3WwL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/810YZUC3WwL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/810YZUC3WwL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/810YZUC3WwL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/8177qqPydXL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/61PRFOFwuRL._SX3000_.jpg',
  ];

  const changeImage = () => {
    let numOfImg = 0;
    const interval = setInterval(() => {
      if (numOfImg < images.length) {
        setImg(images[numOfImg]);
        numOfImg++;
      } else numOfImg = 0;
    }, 3000);
    return interval;
  };

  return (
    <div>
      <Helmet>
        <title>amazon</title>
      </Helmet>
      <div className="home-img">
        <img className="img-home-real" alt="img" src={img} />
      </div>
      <div className="products">
        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row className="center">
            {products.map((product) => (
              <Col
                key={product.token}
                xl={3}
                lg={3}
                md={4}
                sm={6}
                xs={6}
                className="mb-3 savesize"
              >
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomePage;
