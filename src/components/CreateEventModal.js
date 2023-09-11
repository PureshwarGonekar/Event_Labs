import React, { useEffect, useState } from "react";
import "./CreateEventModal.css";
import { useNavigate } from "react-router-dom";

const CreateEventModal = ({ isOpen, onClose }) => {
  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [addressToggle, setAddressToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState();
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageSelectToggle, setImageSelectToggle] = useState(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const navigate = useNavigate();

  const [selectedInterests, setSelectedInterests] = useState([]);
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
  ]);

  const handleInterestSelect = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleInterestRemove = (interest) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest));
  };

  const filteredInterests = availableInterests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageSelectToggle(true);
    setImage(e.target.files[0]);
  };

  const handleCreateEvent = async () => {
    if (eventName.trim() === "") {
      alert("Please enter an event name.");
      return;
    }

    const newChatRoom = {
      name: eventName,
      description: description,
      location: location,
      address: address,
      seeking: selectedInterests,
    };

    try {
      const response = await fetch("http://localhost:5000/api/chat/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(newChatRoom),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("Chat room created successfully");
        localStorage.setItem("roomId", data._id);
        handleImageUploadResponse();
      } else {
        console.error("Failed to create chat room");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
    console.log(`Event created: ${eventName}`);

    onClose();
  };

  const handleImageUploadResponse = async () => {
    const roomId = localStorage.getItem("roomId");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("roomid", roomId);

    try {
      const imageResponse = await fetch(
        "http://localhost:5000/api/chat/uploadRoomImage",
        {
          method: "POST",
          headers: {},
          body: formData,
        }
      );

      if (imageResponse.ok) {
        const data = await imageResponse.json();
        console.log(data);
        console.log("Image uploaded successfully");
        navigate(`/chat/${roomId}`);
      } else {
        console.log("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    console.log(addressList);
  }, [addressList]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && address.trim() !== "") {
      setLoading(true);
      setAddressToggle(true);

      const params = {
        q: address,
        format: "json",
        addressdetails: 1,
        polygon_geojson: 0,
      };

      const queryString = new URLSearchParams(params).toString();
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(JSON.parse(result));
          setLoading(false);
          setAddressList(JSON.parse(result));
        })
        .catch((err) => console.log("error", err));
      setAddress("");
    }
  };

  const handleListItemClick = (lat, lon, displayName) => {
    setAddressToggle(false);
    setAddress(displayName);
    setLocation({ latitude: lat, longitude: lon });
    console.log(lat, lon);
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center z-50`}
    >
      <div className="modal-container">
        <div className="modal-content">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{
              marginTop: "2rem",
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Create an Event 🎉
          </h2>

          <div className="main-modal-container">
            <label className="image-picker" htmlFor="file-input">
              {imageSelectToggle ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <label>
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ fontSize: "2rem", color: "lightgreen" }}
                    ></i>
                  </label>
                  <label>Image selected</label>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <label>
                    <i
                      className="fa-solid fa-upload"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </label>
                  <label htmlFor="file-input">Choose an image</label>
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
            <div className="fill-room-details">
              <input
                type="text"
                placeholder="Event name"
                value={eventName}
                onChange={handleEventNameChange}
              ></input>
              <textarea
                type="text"
                className="description"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>

              <div className="mt-4">
                <h3>Looking for :</h3>
                <div
                  className="flex flex-wrap"
                  style={{ marginBottom: "1rem", gap: "10px" }}
                >
                  {selectedInterests.map((interest) => (
                    <div
                      key={interest}
                      className="seeking-tags"
                      style={{
                        border: "1px solid rgb(11, 196, 67)",
                        padding: "6px",
                        fontSize: "14px",
                        width: "30%",
                      }}
                      onClick={() => handleInterestRemove(interest)}
                    >
                      <i
                        className="fa-solid fa-xmark"
                        style={{
                          float: "left",
                          justifyContent: "center",
                          marginTop: ".2rem",
                          marginLeft: ".4rem",
                        }}
                      ></i>
                      {interest}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {filteredInterests.map((interest) => (
                    <div
                      key={interest}
                      className="seeking-tags"
                      onClick={() => handleInterestSelect(interest)}
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              </div>

              <div className="address-field">
                <input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Address (Press enter to load)"
                  value={address}
                  onChange={handleAddressChange}
                  onKeyDown={handleKeyDown}
                ></input>

                {addressToggle &&
                  (loading ? (
                    <h1>Address Loading...</h1>
                  ) : (
                    <div className="address-list">
                      <ul>
                        {addressList.map((item) => (
                          <li
                            key={item.osm_id}
                            onClick={() =>
                              handleListItemClick(
                                item.lat,
                                item.lon,
                                item.display_name
                              )
                            }
                          >
                            {item.display_name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
              <input
                type="number"
                placeholder="Notify in Radius (Variable upto 1-2 km)"
              ></input>
            </div>
          </div>

          <div
            className="mt-4 flex justify-end"
            style={{ marginRight: "2rem", marginTop: "1.4rem" }}
          >
            <button onClick={onClose} className="mr-4">
              Cancel
            </button>
            <button onClick={handleCreateEvent} className="create-button">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
