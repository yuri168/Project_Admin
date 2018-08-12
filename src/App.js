import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './komponen/login.js';
import Product from './komponen/product.js'
import AddProduk from './komponen/addproduct.js'
import editProduct from './komponen/edit.js'
import Invoice from './komponen/invoice.js'
import Detail from './komponen/detailinv.js'
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; //tambahan
import reducers from './reducers';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); // tambahan
    
    return (
      <Provider store ={store}>
      <div>
        <Route exact path="/" component={Login}/>
        <Route path="/Product" component={Product}/>
        <Route path="/Addproduct" component={AddProduk}/>
        <Route path="/editProduct" component={editProduct}/>
        <Route path="/Invoice" component={Invoice}/>
        <Route path="/detail" component={Detail}/>
      </div>
      </ Provider>
    );
  }
}

export default App;
