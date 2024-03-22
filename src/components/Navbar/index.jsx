import React from "react";
import "./style.css";
import { NavLink } from 'react-router-dom';
import logo from "./logo.jpg";

const Navbar = (props) => {

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" /> 
      <div className="links">
        <NavLink className="nav-link" to="/">
          Tracker 
        </NavLink>
        <NavLink className="nav-link" to="/profile">
          Profile
       </NavLink>
        <NavLink className="nav-link" to="/resources">
          Resources 
        </NavLink>
        <NavLink className="nav-link" to="/" onClick={props.signout}>
          Sign out
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;