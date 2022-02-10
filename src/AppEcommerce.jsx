import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import DetailProduct from "./components/details/DetailProduct";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";
import NavBar from "./components/NavBar/NavBar";

const AppEcommerce = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="home">
              <Route index element={<Home />} />
              <Route path=":id" element={<DetailProduct />} />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route path="dashboard">
              <Route path="user" element={<Dashboard />} />
              <Route path="admin" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppEcommerce;
