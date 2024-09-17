import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ProductStore } from './redux/stores/productStore';
import './styles.css';

ReactDOM.render(
  <Provider store={ProductStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
