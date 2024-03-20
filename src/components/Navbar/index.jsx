import React from "react";
import "./style.css";
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {

  return (
    <nav className="navbar">
      <h1>Jobb Tracker</h1>
      <div className="links">
        <NavLink className="nav-link" to="/">
          Tracker
        </NavLink>
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
        <NavLink className="nav-link" to="/">
          <button onClick={props.signout}>Sign out</button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;