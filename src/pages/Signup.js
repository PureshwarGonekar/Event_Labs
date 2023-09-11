import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/mainpage");
    }
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    } else {
      console.log("Location sharing isn't possible due to network issue!");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        location,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userId", json.userId);
      localStorage.setItem("username", json.firstName);
      navigate("/interest-select");
      alert("Account Created Successfully");
    } else {
      alert("Invalid Details");
    }
  };

  return (
    <>
      <Navbar />

      <div className="signup-container">
        <div className="main-signup-form">
          <h1>Create account to continue</h1>

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

          <div
            className="names-container"
            style={{
              width: "100%",
              gap: "1rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <input
              type="text"
              placeholder="First name"
              style={{ minWidth: "45%" }}
              value={firstName}
              onChange={handleFirstNameChange}
            ></input>
            <input
              type="text"
              placeholder="Last name"
              style={{ minWidth: "45%" }}
              value={lastName}
              onChange={handleLastNameChange}
            ></input>
          </div>

          <div style={{ display: "flex", position: "relative" }}>
            <i
              className="fa-solid fa-phone"
              style={{
                position: "absolute",
                top: "30%",
                marginLeft: ".5rem",
                color: "white",
                fontSize: "1.3rem",
              }}
            ></i>

            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Phone number (along with country code ex : +917879278953)"
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

          <div style={{ display: "flex", position: "relative" }}>
            <i
              className="fa-regular fa-eye"
              style={{
                position: "absolute",
                top: "30%",
                marginLeft: ".5rem",
                color: "white",
                fontSize: "1.3rem",
              }}
            ></i>

            <input type="password" placeholder="Confirm password" style={{ paddingLeft: "2.5rem" }}></input>
          </div>

          <button className="signup-btn" onClick={handleSubmit}>
            Create Account
          </button>

          <p
            style={{
              marginTop: "0.7rem",
              marginBottom: "0.7rem",
              color: "white",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: "lightgreen" }}>
              Access account!
            </Link>
          </p>

          <div
            style={{ width: "100%", borderBottom: "0.2px solid white" }}
          ></div>

          <div className="additional-signups">
            <p>Or Signup with</p>
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

export default Signup;
