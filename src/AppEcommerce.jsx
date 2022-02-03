

import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';
import CreateUser from './components/CreateUser/CreateUser';


const AppEcommerce = () => {

 
  return (
    <div>
      <Routes>


      <Route exact path="/" element={<Navigation/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/register" element={<CreateUser/>} />

     
      </Routes>
    </div>
  );
}

export default AppEcommerce;
