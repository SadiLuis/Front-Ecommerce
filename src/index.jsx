import ReactDOM from 'react-dom';
import AppEcommerce from './AppEcommerce';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
  <AppEcommerce />
  </Provider >,
  document.getElementById('root')
);

