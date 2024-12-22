import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
// import logo from "../../assets/Logo_processed.png"; // Adjust the path based on your project structure
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <img src= "https://img.freepik.com/free-photo/3d-cartoon-coffee-cup_23-2151751998.jpg?size=626&ext=jpg" alt="Logo" className="logo-image" />
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
        <NavLink to="/club" className="nav-link" onClick={toggleMenu}>
          Clubs
        </NavLink>
        <NavLink to="/events" className="nav-link" onClick={toggleMenu}>
          Events
        </NavLink>
        <NavLink to="/about" className="nav-link" onClick={toggleMenu}>
          About Us
        </NavLink>
      </div>
    </nav>
  );
};
export default Navbar;
