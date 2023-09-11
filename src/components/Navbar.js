import React from "react";
import "./Navbar.css";
import Logo from "../images/Eventlabs__1_-removebg-preview.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roomId");
    localStorage.removeItem("longitude");
    localStorage.removeItem("latitude");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div style={{ height: "100px", width: "100px" }}>
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-right">
        {localStorage.getItem('token') ? (
          <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'5rem'}}>
            <i
              className="fa-regular fa-bell"
              style={{ fontSize: "1.3rem" }}
            ></i>
            <div
              className="button-container"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.7rem",
              }}
            >
              <i className="fa-solid fa-power-off"></i>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div
            className="button-container"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "0.7rem",
            }}
          >
            <i className="fa-solid fa-power-off"></i>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
