import React from "react";
import "./style.css";
import { NavLink } from 'react-router-dom';

const Navbar = () => {

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
              <NavLink className="nav-link" to="/resources">
                Resources
              </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;