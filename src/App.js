import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Container from 'react-bootstrap/Container';
import CartPage from './pages/CartPage';
import NavBarComponent from './Components/NavBarComponent';
import Footer from './Components/Footer';
import SigninPage from './pages/SigninPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddresPage from './pages/ShippingAddresPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import SubmitOrderPage from './pages/SubmitOrderPage';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';

function App() {
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
        <ToastContainer position="bottom-center" limit={1} />
        <NavBarComponent />
        <main>
          <Container className="padding-top">
            <Routes>
              <Route path="/product/:token" element={<ProductPage />}></Route>
              <Route path="/cart" element={<CartPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/shipping" element={<ShippingAddresPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/placeorder" element={<SubmitOrderPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/search" element={<SearchPage />} />

            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
