import React from 'react';
import {Link} from "react-router-dom";

function LandingPage() {
  return (
  <div>
     <h1>Welcome!</h1>
            <div className="image-landingpage"></div>
            <Link to='/home'>
                <button className="botonIngresar">Let's go</button>
            </Link> 
  </div>
  )
}

export default LandingPage;
