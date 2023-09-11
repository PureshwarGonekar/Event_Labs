import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import FirstImage from "../images/8217095.jpg";
import HomeImage2 from "../images/homeimage2.jpg";
import HomeImage3 from "../images/homeimage3.jpg";
import { useNavigate } from "react-router-dom";
import FelxiFooter from "../components/FelxiFooter";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <Navbar />

      <div className="main-home-container">
        <div className="first" style={{ position: "relative" }}>
          <img src={FirstImage} alt="Background" />
          <div
            style={{
              position: "absolute",
              top: "37%",
              left: "35%",
              transform: "translate(-50%, -50%)",
              padding: "1rem",
              textAlign: "left",
              color: "white",
            }}
          >
            <h1>Explore and participate in nearby events and activities.</h1>
            <p style={{ marginTop: "2rem" }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English.
            </p>
            <button onClick={handleClick}>Get Started</button>
          </div>
        </div>

        <div className="second">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "50%",
            }}
          >
            <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>
              Meet Communities
            </h1>
            <div
              style={{
                borderBottom: "1px solid rgb(11, 196, 67)",
                width: "50%",
              }}
            ></div>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </p>
          </div>

          <div
            className="home-image2"
            style={{ width: "30rem", display: "flex" }}
          >
            <img src={HomeImage2} alt="image"></img>
          </div>
        </div>

        <div className="third">
          <div
            className="home-image2"
            style={{ width: "30rem", display: "flex" }}
          >
            <img src={HomeImage3} alt="image"></img>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "50%",
            }}
          >
            <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>
              Build Your Network
            </h1>

            <div
              style={{
                borderBottom: "1px solid rgb(11, 196, 67)",
                width: "50%",
              }}
            ></div>

            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </p>
          </div>
        </div>
      </div>

      <FelxiFooter/>
    </>
  );
};

export default Home;
