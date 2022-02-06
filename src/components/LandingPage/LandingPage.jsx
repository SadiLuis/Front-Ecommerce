import React from 'react';
import {Link} from "react-router-dom";
import './LandingPage.css'

function LandingPage() {
  return (
  <div className="image-landingpage">
         <Link to='/home'>
           <button className="btn btn-primary">Let's go </button>
         </Link> 
  </div>
  )
}

export default LandingPage;