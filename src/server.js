import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Container from 'react-bootstrap/Container';
import CartPage from './pages/CartPage';
import NavBarComponent from './Components/NavBarComponent';
import Footer from './Components/Footer';
import NavBar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Nav } from 'react-bootstrap';
import CartIcon from './CartIcon';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { Helmet } from 'react-helmet-async';
import {
  Col,
  ListGroup,
  Row,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import MessageBox from '../Components/MessageBox';
import { useNavigate } from 'react-router-dom';
import Product from '../Components/Product';
import Loading from './Loading';
import { getError } from '../utils';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export {
  Rating,
  Button,
  useNavigate,
  useParams,
  Spinner,
  getError,
  Loading,
  Product,
  MessageBox,
  Helmet,
  useEffect,
  useReducer,
  useState,
  Col,
  ListGroup,
  Row,
  Form,
  FormControl,
  FormGroup,
  Card,
  Store,
  Link,
  Badge,
  useContext,
  React,
  axios,
  CartIcon,
  Nav,
  LinkContainer,
  NavBar,
  Footer,
  NavBarComponent,
  Routes,
  Route,
  BrowserRouter,
  HomePage,
  ProductPage,
  Container,
  CartPage,
};
