import "./SideBar.css"
import React from 'react';
import { AiFillHome } from "react-icons/ai";
import { MdAssignment } from "react-icons/md";
import {  BsFillCartFill } from "react-icons/bs";
import {ImUsers} from "react-icons/im"
import { NavLink } from 'react-router-dom';

export default function SideBarAdmin(){
    <div>
   
        <div className="menu__side" id="menu_side">

            <div className="name__page">
                <NavLink className="dash-home-icon" to="/"><AiFillHome size={30} /></NavLink>
            </div>

            <div className="options__menu">

                <div className="option">
                    <NavLink activeClassName="selected" to="/admin/products" ><MdAssignment /> Products</NavLink>
                </div>

                <div className="option">
                    <NavLink activeClassName="selected" to="/admin/sales"> <BsFillCartFill /> Sales</NavLink>
                </div>

                <div className="option">
                    <NavLink activeClassName="selected" to="/admin/users"> <ImUsers />Users </NavLink>
                </div>
            </div>    
        </div>          
    </div>
}