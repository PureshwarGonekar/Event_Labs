import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateEventModal from "../components/CreateEventModal";
import "./MainPage.css";
import SecondSection from "../components/SecondSection";
import ThirdContainer from "../components/ThirdContainer";
import FourthSection from "../components/FourthSection";
import Navbar from "../components/Navbar";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const setLiveLocation = async (longitude, latitude) => {
    console.log(longitude, latitude);

    const response = await fetch(
      "http://localhost:5000/api/chat/setLiveLocation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userLocation: { longitude: longitude, latitude: latitude },
        }),
      }
    );

    if (response.ok) {
      console.log("User location updated successfully");
    } else {
      console.log("Error updating locationeee");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        setLiveLocation(longitude, latitude);
      });
    } else {
      console.log("Location sharing isn't possible due to network issue!");
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="main-container" style={{ backgroundColor: "black" }}>
        <div
          className="welcome-container"
          style={{ color: "white", padding: "2rem" }}
        >
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "2rem",
              }}
            >
              <span className="user-welcome">Hello, {username}!</span>
              <span className="wavy-emoji" role="img" aria-label="Wave">
                👋
              </span>
            </h1>
            <p style={{ marginTop: "1rem" }}>
              Create events and join with the nearby people who fits best on
              your interest.
            </p>

            <button onClick={openModal} className="create-event-button">
              <div>
                <h1>Create Event</h1>
                <i className="fa-solid fa-plus"></i>
              </div>
            </button>
            <CreateEventModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>

        <SecondSection />
        <ThirdContainer />
        <FourthSection />
      </div>
    </>
  );
};

export default MainPage;
