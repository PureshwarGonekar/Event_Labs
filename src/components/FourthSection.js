import React, { useEffect, useState } from 'react'
import EventCard from './EventCard';

const FourthSection = () => {

  const userId = localStorage.getItem('userId');
  const [events, setEvents] = useState([]);

  const fetchYourEvents = async () =>{
    const response = await fetch(
      "http://localhost:5000/api/chat/getYourEvents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if(response.ok){
      const data = await response.json();

      const uniqueRoomNames = [];

      const uniqueRooms = data.chatRooms.filter((room) => {
        if (!uniqueRoomNames.includes(room._id)) {
          uniqueRoomNames.push(room._id);
          return true;
        }
        return false;
      });

      setEvents(uniqueRooms);
    }
  }

  useEffect(()=>{
    fetchYourEvents();
  },[])

  return (
    <div className="third-container" style={{ color: "white" }}>
      <h1>
        <span className="your-events-title">Events Curated By You</span>
      </h1>

      <div className="event-cards">

      {events.map((room, index) => (
          <EventCard key={index} name={room.name} image={room.image} location={room.address} id={room._id}/>
        ))}
      </div>
    </div>
  )
}

export default FourthSection