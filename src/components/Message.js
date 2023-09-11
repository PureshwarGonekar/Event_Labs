import React, { useEffect, useRef, useState } from "react";
import Sound from "../sounds/message_sent.mp3";
import "./Message.css";

const Message = (props) => {
  const audioRef = useRef(null);
  const id = localStorage.getItem("userId");
  const [msgtime, setMsgTime] = useState("");

  useEffect(() => {
    const timestamp = props.time;
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setMsgTime(formattedTime);

    const audioElement = new Audio(Sound);
    audioRef.current = audioElement;

    audioElement.addEventListener("canplaythrough", () => {
      audioElement.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
    });
  }, []);

  return (
    <>
      {props.sender === id ? (
        <div className="message-box">
          <div className="texts">
            <div className="msg">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "3rem",
                }}
              >
                <p className="you-label">You</p>
                <p className="phone-label"> ~ {props.phonenumber}</p>
              </div>
              <p>{props.content}</p>
              <p className="msg-time">{msgtime}</p>
            </div>
          </div>
          <img src={`../images/${props.image}`} />
        </div>
      ) : (
        <div>
          <div className="receive-box">
            <img src={`../images/${props.image}`} />
            <div className="texts">
              <div className="msg">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "3rem",
                  }}
                >
                  <p className="user-label">{props.sendername}</p>
                  <p className="phone-label"> ~ {props.phonenumber}</p>
                </div>

                <p>{props.content}</p>
                <p className="msg-time">{msgtime}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
