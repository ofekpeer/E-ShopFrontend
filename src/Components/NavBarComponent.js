import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Badge, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Store } from '../Store';
import axios from 'axios';
import SearchBox from './SearchBox';

export default function NavBarComponent() {
  const navigate = useNavigate();
  const search = useLocation();

  const dragEnter = (e) => {
    e.preventDefault();
    const a = e.dataTransfer.getData('product');
    console.log(a);
    addToCartHandler(a);
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${item}`);
    if (data.countInStock < quantity) {
      window.alert('sorry , product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'ADD TO CART',
      payload: { ...data, quantity },
    });
  };

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <header>
      <NavBar className="sticky" bg="dark" variant="dark">
        <Container>
          {search.pathname !== '/' && search.pathname !== '/shipping' ? (
            <div className="text-center pe-3 mb-2">
              <Link className="nav-link" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left text-white"></i>
              </Link>
            </div>
          ) : search.pathname === '/shipping' ? (
            <div className="text-center pe-3 mb-2">
              <Link className="nav-link" to="/">
                <i className="fa fa-home text-white"></i>
              </Link>
            </div>
          ) : null}
          <LinkContainer to="/">
            <NavBar.Brand>
              <img
                className="icon"
                src="https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png"
                alt="E-Shop"
              />
            </NavBar.Brand>
          </LinkContainer>
          <SearchBox/>
          <Nav className="ms-auto w-50 justify-content-end">
            <Link to="/cart" className="nav-link">
              <i
                className="fas fa-shopping-cart"
                onDragOver={(event) => allowDrop(event)}
                onDrop={(e) => dragEnter(e)}
              ></i>
              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
          </Nav>
          {userInfo ? (
            <NavDropdown
              className="text-white"
              title={userInfo.name}
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>User profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/orderhistory">
                <NavDropdown.Item>Order history</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <Link
                onClick={signoutHandler}
                to="#singout"
                className="dropdown-item"
              >
                Sign out
              </Link>
            </NavDropdown>
          ) : (
            <Link className="nav-link text-white" to="/signin">
              Sign In
            </Link>
          )}
        </Container>
      </NavBar>
    </header>
  );
}
