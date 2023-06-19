import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import {useNavigate } from 'react-router-dom';


function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex me-auto w-50">
      <InputGroup>
        <FormControl
          aria-describedby="button-search"
          placeholder="search for products"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBox;
