import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./InterestPage.css";

const InterestSelectionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [imageSelect, setImageSelect] = useState(false);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const [availableInterests, setAvailableInterests] = useState([
    "Hiking",
    "Cooking",
    "Photography",
    "Yoga",
    "Reading",
    "Sports",
    "Art",
    "Music",
    "Social",
    // Add more interests as needed
  ]);

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle interest selection
  const handleInterestSelect = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);
  };

  // Function to handle interest removal
  const handleInterestRemove = (interest) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest));
  };

  // Filter available interests based on the search term
  const filteredInterests = availableInterests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/auth/interest-selection",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          interests: selectedInterests,
        }),
      }
    );

    handleImageUpload();

    navigate("/mainpage");
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("image", image);

    try {
      const imageResponse = await fetch(
        "http://localhost:5000/api/auth/uploadUserImage",
        {
          method: "POST",
          headers: {},
          body: formData,
        }
      );

      if (imageResponse.ok) {
        console.log("Image uploaded successfully");
      } else {
        console.log("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageSelect(true);
    console.log(e.target.files[0]);
  };

  return (
    <>
      <Navbar />

      <div className="main-interest-container">
        <label className="file-input-container-interest" htmlFor="file-input">
          {!imageSelect ? (
            <div className="upload-texts">
              <i
                className="fa-solid fa-upload"
                style={{ fontSize: "2rem" }}
              ></i>
              <label>Click to profile picture upload</label>
            </div>
          ) : (
            <div className="upload-texts">
              <i
                className="fa-solid fa-circle-check"
                style={{ fontSize: "2rem", color: "lightgreen" }}
              ></i>
              <label>Profile picture uploaded successfully</label>
            </div>
          )}
        </label>

        <input
          type="file"
          id="file-input"
          name="image"
          onChange={handleImageChange}
          style={{ display: "none" }}
        ></input>

        <div className="interest-form">
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "2rem",
            }}
          >
            Select Your Interests
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for interests"
              className="w-full p-2 border rounded"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className="interest-tags-container">
            {filteredInterests.map((interest) => (
              <div
                key={interest}
                className="interest-tags"
                onClick={() => handleInterestSelect(interest)}
              >
                {interest}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Selected Interests</h3>
            <div
              className="flex flex-wrap"
              style={{ justifyContent: "center", gap: "0.5rem" }}
            >
              {selectedInterests.map((interest) => (
                <div
                  key={interest}
                  className="interest-tags"
                  onClick={() => handleInterestRemove(interest)}
                  style={{ border: "1px solid rgb(11, 196, 67)" }}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn continue-btn"
            onClick={handleClick}
            style={{ marginTop: "2rem" }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default InterestSelectionPage;
