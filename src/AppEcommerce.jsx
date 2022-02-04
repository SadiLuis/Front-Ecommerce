import { Routes, Route } from 'react-router-dom';
import DetailProduct from './components/details/DetailProduct'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage'
import CreateUser from './components/CreateUser/CreateUser';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar'

const AppEcommerce = () => {

 
  return (
    <div>
       <NavBar />
      <Routes>
      <Route  path= '/' exact element={<LandingPage/>}/> 
      <Route  path="/login" element={<Login/>} />
      <Route  path="/register" element={<CreateUser/>} />
      <Route  path='/home' element={< Home/>}/>
      <Route  path ='/cart' element={<Cart />} />
      <Route  path='/home/:id' element={< DetailProduct />} />

     
      </Routes>
    </div>
  );
}

export default AppEcommerce;
