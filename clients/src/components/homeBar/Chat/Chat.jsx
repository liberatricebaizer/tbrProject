import React, { Fragment } from "react";
import { useMemo, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import "./Chat.css";
import { useSelector } from "react-redux";
import { createChatLocal, getChatLocal } from "../../../utility/localDb";
const Chat = (props) => {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(getChatLocal());
  const senderName = useMemo(() => {
    if (user?.firstName) {
      return `${user.firstName} ${user.lastName || ""}`.trim();
    }
    return "Guest";
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    createChatLocal({ text: message.trim(), sender: senderName });
    setMessages(getChatLocal());
    setMessage("");
  };

  return (
    <Fragment>
      <div className={`chat-box ${props.className}`}>
        <div className="Psedo-chat">
          <h2 className="Psedo-Name">TBR Support</h2>
          <div>
            <GrClose className="Psedo-icon" onClick={props.onCloseChat} />
          </div>
        </div>
        <div className="msg-container">
          {messages.map((item) => (
            <p key={item._id}>
              <strong>{item.sender}:</strong> {item.text}
            </p>
          ))}
        </div>
        <div className="msg-bar-text">
          <form className="form" onSubmit={submitHandler}>
            <textarea
              name="msg-content"
              placeholder="Enter a question"
              className="input-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="sbt-btn" type="submit">
              <AiOutlineSend className="sendIcon" />
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Chat;
