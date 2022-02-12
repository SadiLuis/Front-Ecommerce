import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Cart from "./components/Cart/Cart";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import BuyProduct from "./components/BuyProduct/BuyProduct";
import Register from "./components/Register/Register";
import PedidosCompra from "./components/Pedidos-de-compra/PedidosCompra";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserDetail, updateCart } from "./actions";
import Profile from "./pages/Profile/Profile";

const AppEcommerce = () => {
  const token = useSelector((state) => state.loginReducer.token);
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  const userDetail = useSelector((state) => state.loginReducer.userDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    token && !isAuth && !userDetail && dispatch(getUserDetail());
  }, [token, dispatch, userDetail, isAuth]);

  useEffect(() => {
    !isAuth && dispatch(updateCart());
  }, [isAuth, dispatch]);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/edit" element={<Register edit={true} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home/:id" element={<DetailProduct />} />
          <Route exact path="/dashboard/admin" element={<Dashboard />} />
          {/* <Route exact path="/admin/sales" element={<AdminSales/>} /> */}
          <Route path="/home/buy" element={<BuyProduct />} />
          <Route path="/home/pedidos" element={<PedidosCompra />} />
          {/* <Route path="user" element={<Dashboard />} /> */}
          <Route path="/dashboard/admin" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppEcommerce;
