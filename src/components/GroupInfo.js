import React, { useEffect, useState } from "react";
import "./GroupInfo.css";
import Member from "./Member";

const GroupInfo = (props) => {
  const [users, setUsers] = useState([]);
  const [length, setLength] = useState(0);
  const [admin, setAdmin] = useState([]);
  const [description, setDescription] = useState("");
  const roomId = props.roomId;

  const fetchParticipants = async () => {
    const response = await fetch(
      "http://localhost:5000/api/chat/getChatRoomData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      setDescription(data.chatRoom.description);
      const uniqueUserIds = [];

      const uniqueUsers = data.users.filter((user) => {
        if (!uniqueUserIds.includes(user._id)) {
          uniqueUserIds.push(user._id);
          return true;
        }
        return false;
      });

      setUsers(uniqueUsers);
      setAdmin(data.admin);
      setLength(uniqueUsers.length);
    } else {
      console.error("Failed to add user to chat room");
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="group-info-container">
      <h1>Event Details</h1>

      <div className="desc-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: ".5rem",
            color: "rgb(99, 99, 99)",
            fontWeight: "bold",
          }}
        >
          <i className="fa-solid fa-volume-high"></i>
          <h1>Description</h1>
        </div>
        <p>{description}</p>
      </div>

      <div className="admin-info">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "2rem",
            gap: ".5rem",
          }}
        >
          <i className="fa-solid fa-user-secret"></i>
          <h1>Admin</h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
            gap: ".6rem",
          }}
        >
          <img
            src={`../images/${admin.image}`}
            style={{ borderRadius: "60px", height:'50px', width:'50px' }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <h1>{admin.firstName}</h1>
            <p
              style={{
                fontSize: "13px",
                color: "rgb(109, 109, 109)",
                fontStyle: "italic",
              }}
            >
              {admin.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="member-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "2rem",
            gap: ".5rem",
          }}
        >
          <i className="fa-solid fa-users"></i>
          <h1>Members ({length})</h1>
        </div>

        <div className="member-list">

        {users.map((member, index) => (
          <Member
            key={index}
            name={member.firstName}
            number={member.phoneNumber}
            image={member.image}
          />
        ))}
        </div>

      </div>
    </div>
  );
};

export default GroupInfo;
