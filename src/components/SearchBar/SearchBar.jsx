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
    console.log("input search", name)
  }
  function handleSubmit(e){
    e.preventDefault();
    if(!name){
      alert("type the item you are looking for")
    }
    dispatch(searchByName(name))
    setName("")
  }
  return (
  <div>
    <input
    type="text"
    placeholder="Search..."
    onChange={handleInputChange}>
    </input>
    <button type="submit"
    onClick={handleSubmit}>Search</button>
  </div>
  );
}

export default SearchBar;