import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/mainpage");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log(response);

    const json = await response.json();
    console.log(json);

    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userId", json.userId);
      localStorage.setItem("username", json.firstName);
      navigate("/mainpage");
      alert("Logged in successfully");
    } else {
      alert("Invalid details");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Navbar />

      <div className="signup-container">
        <div className="main-signup-form">
          <h1>Login to continue</h1>

          <div style={{ display: "flex", position: "relative" }}>
            <i
              className="fa-regular fa-envelope"
              style={{
                position: "absolute",
                top: "30%",
                marginLeft: ".5rem",
                color: "white",
                fontSize: "1.3rem",
              }}
            ></i>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              style={{ paddingLeft: "2.5rem" }}
            ></input>
          </div>

          <div style={{ display: "flex", position: "relative" }}>
            <i
              className="fa-solid fa-lock"
              style={{
                position: "absolute",
                top: "30%",
                marginLeft: ".5rem",
                color: "white",
                fontSize: "1.3rem",
              }}
            ></i>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              style={{ paddingLeft: "2.5rem" }}
            ></input>
          </div>

          <button className="signup-btn" onClick={handleSubmit}>
            Login
          </button>

          <p
            style={{
              marginTop: "0.7rem",
              marginBottom: "0.7rem",
              color: "white",
            }}
          >
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "lightgreen" }}>
              Create one!
            </Link>
          </p>

          <div
            style={{ width: "100%", borderBottom: "0.2px solid white" }}
          ></div>

          <div className="additional-signups">
            <p>Or Login with</p>
            <div className="add-logos">
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-discord"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
