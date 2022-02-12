import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

import Home from "./components/Home/Home"
import DetailProduct from './components/details/DetailProduct'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage'
//import CreateUser from './components/CreateUser/CreateUser';
import NavBar from './components/NavBar/NavBar';
import BuyProduct from './components/BuyProduct/BuyProduct'
import Register from "./components/Register/Register";
import AdminSales from './components/Dashboard/AdminSales/AdminSales';
import SideBarAdmin from './components/Dashboard/SideBar/SideBar';



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
      <Route exact path="/dashboard/admin" element={<Dashboard/>} />
      <Route exact path="/admin/sales" element={<AdminSales/>} />
      <Route path='/home/buy' element= {<BuyProduct />} />
      {/* <Route path='/admin' element={<SideBarAdmin/>} /> */}
          
      </Routes>
      
      </BrowserRouter>
    </div>
  );
};

export default AppEcommerce;
