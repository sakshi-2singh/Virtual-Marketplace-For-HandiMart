import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import backgroundImage from '../assets/images/light.webp';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pageNumber]);

  useEffect(() => {
    console.log('HomeScreen - products:', products);
    console.log('HomeScreen - loading:', loading);
    console.log('HomeScreen - error:', error);
  }, [products, loading, error]);

    const productsToDisplay = Array.isArray(products) ? products : [];

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Hero section: Carousel for top handicrafts */}
      <section className="products-slider section">
        <Meta title="HandiMart-Authentic Handicrafts" />
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Container>
            <Link to="/" className="btn btn-light">
              Go Back
            </Link>
          </Container>
        )}
      </section>

      {/* Featured handicrafts */}
      <div className="section featured-handicrafts" style={{ padding: '20px 0', backgroundColor: '#f9f9f9' }}>
        <Container>
          <h1 className="text-center mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Featured Handicrafts</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {Array.isArray(products) && (products ||productsToDisplay).map((product) => (
                  <Col
                    className="product_cards_container"
                    key={product.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    style={{ margin: '10px 0' }}
                  >
                    <Product product={product} imageStyle={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </>
          )}
        </Container>
      </div>

      {/* Info sections */}
      <Services />
      <About />
      <Contact />
    </div>
  );
};

export default HomeScreen;
