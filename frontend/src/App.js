import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import BlogScreen from './screens/BlogScreen';
import SingleBlogScreen from './screens/SingleBlogScreen';
import CraftsScreen from './screens/CraftsScreen';
import DecorScreen from './screens/DecorScreen';
import EmbroideryScreen from './screens/EmbroideryScreen';
import ClayScreen from './screens/ClayScreen';



const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Route path="/order/:id" component={OrderScreen} exact/>
        <Route path="/shipping" component={ShippingScreen} exact/>
        <Route path="/payment" component={PaymentScreen}exact />
        <Route path="/placeorder" component={PlaceOrderScreen} exact/>
        <Route path="/login" component={LoginScreen} exact/>
        <Route path="/register" component={RegisterScreen} exact/>
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/blog" exact component={BlogScreen} />
        <Route path="/blog/:slug" exact component={SingleBlogScreen} />
        <Route path="/product/:id" component={ProductScreen} exact/>
        <Route path="/cart/:id?" component={CartScreen} exact/>
        <Route path="/admin/userlist" component={UserListScreen} exact/>
        <Route path="/admin/user/:id/edit" component={UserEditScreen} exact/>
        <Route path="/admin/productlist" component={ProductListScreen} exact />
        <Route path="/crafts" component={CraftsScreen} exact />
        <Route path="/decor" component={DecorScreen} exact />
        <Route path="/embroidery" component={EmbroideryScreen} exact />
        <Route path="/clay" component={ClayScreen} exact />
        <Route path="/seller/productlist" component={ProductListScreen} exact />
        <Route path="/seller/orderlist" component={OrderListScreen} exact />

        <Route
          path="/admin/productlist/:pageNumber"
          component={ProductListScreen}
          exact
        />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        <Route path="/admin/orderlist" component={OrderListScreen} />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pageNumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
        <Route path="/" component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
