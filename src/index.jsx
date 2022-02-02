import React from 'react';
import ReactDOM from 'react-dom';
import AppEcommerce from './AppEcommerce';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from 'react-redux';
import store from './Store/store';

ReactDOM.render(
  <Provider store={store}>
  <AppEcommerce />
  </Provider >,
  document.getElementById('root')
);
