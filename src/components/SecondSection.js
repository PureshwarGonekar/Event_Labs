import React, { useState } from "react";
import DropDown from "./DropDown";
import "./SecondSection.css";
import EventCard from "./EventCard";
import Loader from "./Loader";
import MyMap from "./Map";

const SecondSection = () => {
  const userId = localStorage.getItem("userId");
  const [selectedOption, setSelectedOption] = useState("Select Interest");
  const [radius, setRadius] = useState(5);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const options = [
    "Hiking",
    "Cooking",
    "Photography",
    "Yoga",
    "Reading",
    "Sports",
    "Art",
    "Music",
    "Social",
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSearch = async () => {
    console.log(userId);

    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/chat/getNearbyEvents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, interest: selectedOption, radius }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.nearbyChatRooms);
      setEvents(data.nearbyChatRooms);
      setLoading(false);
    } else {
      console.log("Error fetching nearyby events!");
    }
  };

  return (
    <div className="find-events-container" style={{ color: "white" }}>
      <h1>
        Events happening inside <span className="dist">{radius}km</span> of
        radius from you
      </h1>

      <div className="room-search">
        <DropDown
          options={options}
          onSelect={handleSelect}
          selectedOption={selectedOption}
        />

        <input
          type="number"
          onChange={(e) => {
            setRadius(e.target.value);
          }}
          className="radius-search-bar"
          placeholder="Enter radius (variable upto 1-2km)"
        ></input>
        <button className="search-button" type="submit" onClick={handleSearch}>
          {" "}
          Search
        </button>
      </div>

      <div className="event-cards">
        {loading ? (
          <Loader />
        ) : (
          events.map((room, index) => (
            <EventCard
              key={index}
              name={room.name}
              location={room.address}
              image={room.image}
              id={room._id}
            />
          ))
        )}
      </div>

      {events.length > 0 && (
        <MyMap events={events}/>
      )}
    </div>
  );
};

export default SecondSection;
