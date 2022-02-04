import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AppEcommerce from './AppEcommerce';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
  <AppEcommerce />
  </Provider >
  </BrowserRouter>,
   document.getElementById('root')
);

