import React from "react";
import './Member.css'

const Member = (props) => {

  return (
    <div className="member-box-container">
      <img
        src={`../images/${props.image}`}
        alt=""
      />

      <div className="content-member">
        <h1>{props.name}</h1>
        <p>{props.number}</p>
      </div>
    </div>
  );
};

export default Member;
