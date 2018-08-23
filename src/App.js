import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './komponen/login.js';
import Product from './komponen/product.js'
import AddProduk from './komponen/addproduct.js'
import editProduct from './komponen/edit.js'
import Invoice from './komponen/invoice.js'
import Detail from './komponen/detailinv.js'
import Kategori from './komponen/kategori.js'
import Reporting from './komponen/reporting.js'
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; //tambahan
import reducers from './reducers';
import editkategori from './komponen/editkategori.js';

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
        <Route path="/kategori" component={Kategori}/>
        <Route path="/editkategori" component={editkategori}/>
        <Route path="/Reporting" component={Reporting}/>
      </div>
      </ Provider>
    );
  }
}

export default App;
