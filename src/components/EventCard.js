import React from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';

const EventCard = (props) => {

  const navigate = useNavigate();

  const handleClick = () =>{
    navigate(`/chat/${props.id}`);
  }

  return (
    <div className="card" onClick={handleClick}>
      <img src={`./images/${props.image}`} className="card-image" />
      <div className="card-content">
        <h2 className="card-name">{props.name}</h2>
        <p className="card-description">{props.location}</p>
      </div>
    </div>
  );
};

export default EventCard;
