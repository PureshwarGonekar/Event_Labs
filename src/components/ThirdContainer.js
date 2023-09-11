import React, { useEffect, useState } from "react";
import "./ThirdContainer.css";
import EventCard from "./EventCard";

const ThirdContainer = () => {
  const userId = localStorage.getItem("userId");

  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    const response = await fetch(
      "http://localhost:5000/api/chat/fetchAllRooms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      const uniqueRoomNames = [];

      const uniqueRooms = data.filter((room) => {
        if (!uniqueRoomNames.includes(room._id)) {
          uniqueRoomNames.push(room._id);
          return true;
        }
        return false;
      });

      setRooms(uniqueRooms);
    } else {
      console.error("Failed to get chat room");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="third-container" style={{ color: "white" }}>
      <h1>
        <span className="your-events-title">Your Joined Events</span>
      </h1>

      <div className="event-cards">
        {rooms.map((room, index) => (
          <EventCard key={index} name={room.name} image={room.image} location={room.address} id={room._id}/>
        ))}
      </div>
    </div>
  );
};

export default ThirdContainer;
