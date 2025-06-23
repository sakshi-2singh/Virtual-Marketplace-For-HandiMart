import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listProducts,
  listSellerProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { Link } from 'react-router-dom';

const ProductListScreen = ({ history, match }) => {
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

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || (!userInfo.isAdmin && !userInfo.isSeller)) {
      history.push('/login');
      return;
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct.id}/edit`);
    } else {
      if (userInfo.isSeller) {
        dispatch(listSellerProducts('', pageNumber));
      } else {
        dispatch(listProducts('', pageNumber));
      }
    }
  }, [
    dispatch,
    history,
    userInfo?.isAdmin,
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

  return (
    <Container>
      <Row className="align-items-center mb-3">
        <Col>
          <h1>{userInfo?.isSeller ? 'My Handicrafts' : 'All Products'}</h1>
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
      ) :(!Array.isArray(products) || products.length === 0 ? (
        <Message variant="info">
          No products found.{' '}
          <Link to="/" style={{ textDecoration: 'underline' }}>
            Browse marketplace
          </Link>
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="d-flex gap-2">
                    <LinkContainer to={`/admin/product/${product.id}/edit`}>
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

          <Paginate
            pages={pages}
            page={page}
            isAdmin={userInfo?.isAdmin || userInfo?.isSeller}
          />
        </>
      ))}
    </Container>
  );
};

export default ProductListScreen;
