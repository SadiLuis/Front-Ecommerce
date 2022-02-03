import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AppEcommerce from './AppEcommerce';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
  <AppEcommerce />
  </BrowserRouter>,
  document.getElementById('root')
);

