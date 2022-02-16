import { Routes, Route, BrowserRouter,Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Cart from "./components/Cart/Cart";
import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import BuyProduct from "./components/BuyProduct/BuyProduct";
import Register from "./components/Register/Register";
import PedidoUnaCompra from "./components/Pedidos-de-compra/PedidosCompra";
import PedidosCompra from "./components/Pedidos-de-compra/PedidoDetail";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserDetail, updateCart } from "./actions";
import Profile from "./pages/Profile/Profile";
import AdminSales  from "./components/Dashboard/AdminSales/AdminSales";


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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/edit" element={<Register edit={true} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home/:id" element={<DetailProduct />} />
          <Route exact path="/dashboard/admin" element={<Dashboard />} />
          <Route exact path="/dashboard/sales" element={<AdminSales/>} /> 
          <Route path="/pedido/payment" element={<BuyProduct />} />
          <Route path="/pedido/detail/:id" element={<PedidoUnaCompra />} />
          <Route path="/pedido/detail" element={<PedidosCompra />} />
          {/* <Route path="user" element={<Dashboard />} /> */}
          <Route path="/dashboard/admin" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="*" element={<div>404 - not found</div>} /> */}
          <Route path="*" element={<Navigate replace to="/home"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppEcommerce;
