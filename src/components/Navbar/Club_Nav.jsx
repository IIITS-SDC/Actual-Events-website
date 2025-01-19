import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Club_Nav.css";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
  
    // Redirect to login page
    navigate("/login");
  };
  
  return (
    <nav className="navbar">
      <motion.div
        className="logo"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NavLink to="/" className="nav-link">
          <img
            src="https://img.freepik.com/free-photo/3d-cartoon-coffee-cup_23-2151751998.jpg?size=626&ext=jpg"
            alt="Logo"
            className="logo-image"
          />
        </NavLink>
      </motion.div>

      <div
        className={`menu-icon ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`nav-items ${isMenuOpen ? "active" : ""}`}>
      <NavLink to="/protected/event_for_leads" className="nav-link" onClick={toggleMenu}>
         Show Events
        </NavLink>
        <NavLink to="/club" className="nav-link" onClick={toggleMenu}>
          Add Members 
        </NavLink>
        <NavLink to="/protected/event_sub" className="nav-link" onClick={toggleMenu}>
         Add Events
        </NavLink>
        <NavLink className="nav-link" onClick={handleLogout}>
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
