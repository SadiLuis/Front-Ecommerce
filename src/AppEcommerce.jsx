
import { BrowserRouter, Routes, Route}  from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
// import { Navigator } from "./Navigator";



function AppEcommerce() {


  return (
    <BrowserRouter>
    <div className="App">
    <NavBar />
      
      <Routes>
        <Route exact path= '/' element={<LandingPage/>}/> 
        <Route  path = '/home' element={<Home/>}/>
        {/* <Route  path = '/card' element={<Card/>}/> */}
        <Route  path = '/createvideogame' element={<CreateGame/>}/>
        <Route  path = '/videogame/:id' element={<Detail/>}/>
        <Route  path = '/about' element={<About/>}/>
        
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default AppEcommerce;
