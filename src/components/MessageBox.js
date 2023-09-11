import React from "react";
import "./MessageBox.css";
import { Link, useNavigate } from "react-router-dom";

const MessageBox = (props) => {
  const timestamp = props.time;
  const date = new Date(timestamp);
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Link to={`/chat/${props.id}`} target="_blank">
      <div className="message-box-container">
        <img
          src={`../images/${props.image}`}
          alt=""
        />

        <div className="content">
          <h1>{props.name}</h1>

          <p className="lastmsg">{props.lastmsg}</p>
        </div>

        <div className="timing">
          <h1>{formattedTime}</h1>
          <i
            className="fa-solid fa-check-double"
            style={{ color: "lightgreen" }}
          ></i>
        </div>
      </div>
    </Link>
  );
};

export default MessageBox;
