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

export default function SignupPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  console.log(redirect);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('passwords must match');
      return;
    }
    try {
      const { data } = await axios.post('api/v1/users/signup', {
        name,
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
        <title>Sing up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label>Name</Form.Label>
          <FormControl
            type="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Email</Form.Label>
          <FormControl
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account?
          <Link to={`/signin`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  );
}
