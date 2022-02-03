//import { Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Cart from "../src/components/Cart/Cart.jsx";
// import CreateUser from "../src/components/CreateUser/CreateUser.jsx";
// import Login from "../src/components/Login/Login.jsx";
// import LoginForm from "../src/components/Login/LoginForm.js";



function AppEcommerce() {


  return (
    <BrowserRouter>
    <div className="App">
    <NavBar />
      
      <Routes>
        <Route  path= '/' exact element={<LandingPage/>}/> 
        <Route  path = '/home' element={<Home/>}/>
         {/* <Route  path = '/cart' element={<Cart/>}/>
        <Route  path = '/register' element={<CreateUser/>}/>
        <Route  path = '/login' element={<Login/>}/>  */}
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default AppEcommerce;


