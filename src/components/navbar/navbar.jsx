import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => {
    navigate("/");
  };
  const handleUserButtonClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <nav className="navbar">
      <img src="../../../public/images/pokemon-23.svg" alt="Logo" />
      <div
        className={`user-button ${showLogout ? "active" : ""}`}
        onClick={handleUserButtonClick}
      >
        {user[0].name}
        <img src={user[0].profilePicture} alt="User" />
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
