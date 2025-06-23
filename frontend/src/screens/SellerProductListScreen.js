import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { listSellerProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { Route } from 'react-router-dom';

const SellerProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Update the useEffect to fetch products for the seller with isSeller=1
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isSeller) {
      history.push('/login');
      return;
    }

    if (successCreate) {
      history.push(`/seller/product/${createdProduct.id}/edit`);
    } else {
      dispatch(listSellerProducts('', pageNumber)); // Fetch products for the seller with isSeller=1
    }
  }, [
    dispatch,
    history,
    userInfo?.isSeller,
    successDelete,
    successCreate,
    createdProduct?.id,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  // Add a fallback for undefined products
  const productsToDisplay = products || []; // Ensure products is always an array

  // Add debugging logs to inspect the products and productsToDisplay arrays
  console.log('Products from Redux state:', products);
  console.log('Products to display:', productsToDisplay);

  return (
    <Container>
      <Row className="align-items-center mb-3">
        <Col>
          <h1>My Handicrafts</h1>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Add New Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : productsToDisplay.length === 0 ? (
        <Message variant="info">
          No products found.{' '}
          <a href="/" style={{ textDecoration: 'underline' }}>
            Browse marketplace
          </a>
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {productsToDisplay.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="d-flex gap-2">
                    <LinkContainer to={`/seller/product/${product.id}/edit`}>
                      <Button variant="outline-secondary" size="sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteHandler(product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Paginate pages={pages} page={page} isAdmin={userInfo?.isSeller} />
        </>
      )}
    </Container>
  );
};

export default SellerProductListScreen;

// Add a route for SellerProductListScreen in the routing configuration

