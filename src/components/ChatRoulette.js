import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Message from "./Message";
import "./ChatRoulette.css";
import SideMessage from "./SideMessage";
import GroupInfo from "./GroupInfo";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:5000";

function ChatRoulette() {
  const { roomId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomAddress, setRoomAddress] = useState("");
  const scrollerRef = useRef();

  const fetchChatRoomData = async () => {
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
      setRoomName(data.chatRoom.name);
      setRoomAddress(data.chatRoom.address);
    } else {
      console.error("Failed to add user to chat room");
    }
  };

  useEffect(()=>{
    fetchChatRoomData();
  },[])

  useEffect(() => {
    fetch(`http://localhost:5000/api/messages/room/${roomId}/messages`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching chat room messages:", error);
      });
  }, []);

  const handleSend = async () => {
    let token = localStorage.getItem("token");
    await socket.emit("message", { roomId, newMessage, token });
    setNewMessage("");
  };


  const addUserToChatRoom = async () => {
    try {
      const userId = localStorage.getItem('userId');
  
      const requestBody = {
        roomId: roomId, 
        userId: userId 
      };
  
      const response = await fetch('http://localhost:5000/api/chat/addParticipant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Failed to add user to chat room');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("Socket Connected!");
    });

    addUserToChatRoom();
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  useEffect(() => {
  if (scrollerRef.current) {
    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }
}, [messages]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="main-chat-page">
      <div className="your-groups-container">
        <SideMessage roomId={roomId}/>
      </div>

      <div className="roulette" style={{ height: "100vh" }}>
  <div className="roulette-header">
    <h1>{roomName}</h1>
    <p>{roomAddress}</p>
  </div>

  <div className="chat-container scroller" ref={scrollerRef}>
      {messages.map((message, index) => (
        <Message
          key={index}
          sender={message.sender}
          sendername={message.senderName}
          content={message.content}
          phonenumber={message.senderNumber}
          image={message.image}
          time={message.createdAt}
        />
      ))}
  </div>

  <div className="input-bar">
    <input
      type="text"
      value={newMessage}
      onChange={handleInputChange}
      placeholder="Type your message..."
    />
    <button onClick={handleSend}>
      <i className="fa-solid fa-paper-plane" style={{ color: "lightgreen" }}></i>
    </button>
  </div>
</div>


      <div className="right-most-container">
        <GroupInfo roomId={roomId}/>
      </div>
    </div>
  );
}

export default ChatRoulette;
