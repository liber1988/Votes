import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ logo, user }) => {
  const navigate = useNavigate();
  const [showBlock, setShowBlock] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => {
    navigate("/");
  };
  const handleUserButtonClick = () => {
    setShowLogout(!showLogout);
    setShowBlock(!showBlock);
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  if (user.status === "admin") {
    return (
      <nav className="navbar">
        <img src={logo} alt="Logo" />
        <div
          className={`user-button ${showLogout ? "active" : ""}`}
          onClick={handleUserButtonClick}
        >
          <img src={user.image} alt="User" />
          {user.name}
          {showBlock && (
            <div className="button-block">
              <button className="btn btn-admin" onClick={handleAdmin}>
                Admin
              </button>
              <button className="btn btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <img src={logo} alt="Logo" />
        <div
          className={`user-button ${showLogout ? "active" : ""}`}
          onClick={handleUserButtonClick}
        >
          <img src={user.image} alt="User" />
          {user.name}
          {showBlock && (
            <div className="button-block">
              <button className="btn btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }
};

export default Navbar;
