import React, { Fragment } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import "./Chat.css";
const Chat = (props) => {
  return (
    <Fragment>
      <div className={`chat-box ${props.className}`}>
        <div className="Psedo-chat">
          <h2 className="Psedo-Name">TBR Support</h2>
          <div>
            <GrClose className="Psedo-icon" onClick={props.onCloseChat} />
          </div>
        </div>
        <div className="msg-container"></div>
        <div className="msg-bar-text">
          <form action="Proceed.php" method="post" className="form">
            <textarea
              name="msg-content"
              placeholder="Enter a question"
              className="input-msg"
            />
            <button className="sbt-btn">
              <AiOutlineSend className="sendIcon" />
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Chat;
