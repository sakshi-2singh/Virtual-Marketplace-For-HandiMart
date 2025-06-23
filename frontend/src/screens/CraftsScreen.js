import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const CraftsScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts('', '', 'crafts')); // Fetch products with category 'crafts'
  }, [dispatch]);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Crafts</h1>
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

export default CraftsScreen;