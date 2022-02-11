import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

import Home from "./components/Home/Home";
import DetailProduct from "./components/details/DetailProduct";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import BuyProduct from './components/BuyProduct/BuyProduct'

const AppEcommerce = () => {
  return (
    <div>
      <BrowserRouter>

      <NavBar />
      <Routes>
      <Route  path= '/' exact element={<LandingPage/>}/> 
      <Route  path="/login" element={<Login/>} />
     
      <Route  path='/home' element={< Home/>}/>
      <Route  path ='/cart' element={<Cart />} />
      <Route  path='/home/:id' element={< DetailProduct />} />
      <Route exact path="/dashboard" element={<Dashboard/>} />
      <Route path='/home/buy' element= {<BuyProduct />} />
          
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppEcommerce;
