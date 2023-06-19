import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="pt-3">
      <footer className="dark">
        <Container>
          <Row md={12} className="text-center">
            <Col md={4}>
              <Row>
                <h6>Information</h6>
              </Row>
              <Row>
                <Link to="/">About as</Link>
              </Row>
              <Row>
                <Link to="/">Blog</Link>
              </Row>
              <Row>
                <Link to="/">Countries</Link>
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <h6>Services</h6>
              </Row>
              <Row>
                <Link to="/">Trademark Research</Link>
              </Row>
              <Row>
                <Link to="/">Trademark Registration</Link>
              </Row>
              <Row>
                <Link to="/">Trademark Renewal</Link>
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <h6>Addresses</h6>
              </Row>
              <Row>
                85 Great Portland Street, First Floor, London, England, UK, W1W
                7LT x PO BOX 775, Cherrybrook, NSW, 2126, Australia
              </Row>
            </Col>
          </Row>
          <Row className="text-center pt-2" md={12}>
            all right reserved® 2023
          </Row>
        </Container>
      </footer>
    </div>
  );
}
