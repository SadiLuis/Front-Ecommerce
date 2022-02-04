import { Routes, Route } from 'react-router-dom';
import DetailProduct from './components/details/DetailProduct'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import CreateUser from './components/CreateUser/CreateUser';
import Home from './pages/Home/Home';


const AppEcommerce = () => {

 
  return (
    <div>
      <Routes>
     
      <Route  path="/login" element={<Login/>} />
      <Route  path="/register" element={<CreateUser/>} />
      <Route  path='/home' element={< Home/>}/>
      <Route path ='/cart' element={<Cart />} />
      <Route  path='/home/:id' element={< DetailProduct />} />

     
      </Routes>
    </div>
  );
}

export default AppEcommerce;
