import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const EmbroideryScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts('', '', 'embroidery')); // Fetch products with category 'embroidery'
  }, [dispatch]);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Embroidery</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.map((product) => (
            <div key={product.id} style={{ margin: '10px', width: '200px' }}>
              <Product product={product} imageStyle={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EmbroideryScreen;