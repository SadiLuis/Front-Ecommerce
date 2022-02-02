//import { Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import LandingPage from "./components/LandingPage.jsx";


function AppEcommerce() {


  return (
    <BrowserRouter>
    <div className="App">
    <NavBar />
      
      <Routes>
        <Route  path= '/' element={<LandingPage/>}/> 
        <Route  path = '/home' element={<Home/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default AppEcommerce;


