import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';

export default function SigninPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('api/v1/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sing In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label>Email</Form.Label>
          <FormControl
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="password">
          <Form.Label>password</Form.Label>
          <FormControl
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <div className="mb-3">
          <Button type="submit"> Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
        <div className="mb-3">
          Forget password?
          <Link to={`/forget-password`}>Reset password</Link>
        </div>
      </Form>
    </Container>
  );
}
