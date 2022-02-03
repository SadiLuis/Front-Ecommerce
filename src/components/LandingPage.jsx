import React from 'react';
import {Link} from "react-router-dom";
import styles from "./LandingPage.css";


function LandingPage() {
  return (
  <div>
     
            <div className="image-landingpage"></div>
            <Link to='/home'>
                <button className="btn btn-primary">Let's go </button>
            </Link> 
  </div>
  )
}

export default LandingPage;
