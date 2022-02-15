import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from '../../actions';
import styles from "./SearchBar.css"


function SearchBar() {
  const dispatch=useDispatch();
  const [name, setName]=useState("");

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
    //console.log("input search", name)
  }
  function handleSubmit(e){
    e.preventDefault();
    if(!name){
      alert("Escriba el producto que desea buscar")
    }
    dispatch(searchByName(name))
    setName("")
  }
  return (
  <div>
    <input
    className="form-control me-2"
    type="text"
    placeholder="Buscar..."
    onChange={handleInputChange}
    value= {name}/>
    
    <button type="submit"
    className="btn btn-outline-success"
    onClick={handleSubmit}>Buscar</button>
  </div>
  );
}


export default SearchBar;