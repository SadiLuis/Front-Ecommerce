
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";


const AppEcommerce = () => {

 
  return (
    <div>
      <BrowserRouter>
      <Routes>


      <Route exact path="/dashboard" element={<Dashboard/>} />
          
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppEcommerce;