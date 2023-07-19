import React, { useState } from "react";
import { useReducer } from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import Chat from "../Chat/Chat";
import "./SectionCta.css";
const SectionCta = () => {
  const [openChat, setOpenChat] = useReducer((current_state) => {
    if (current_state === false) {
      return true;
    } else {
      return false;
    }
  }, false);
  const [poped, setPoped] = useState(false);
  const popHandler = () => {
    setPoped(true);
  };
  const closetabs = () => {
    setPoped(false);
  };
  const openChatHandler = () => {
    setOpenChat();
  };
  const closeChatHandler = () => {
    setOpenChat();
  };
  return (
    <section className="section__cta" id="workwithus">
      <div className="container">
        <div className="cta__box">
          <h1 className="heading__secondary">Start business with TBR Agency</h1>
          <p className="cta__text">
            Need to work with us. Such as be our driver, posting your hotel and
            house to rent. Click the button below to start a business with us
          </p>
          <Link className="btn btn__full cta__btn" onClick={popHandler}>
            Work with Us
          </Link>
        </div>
      </div>

      <div className={`popup-box container ${poped === true ? "poped" : ""}`}>
        <div className="popup-content">
          <button className="close" onClick={closetabs}>
            {/* <FaClosedCaptioning /> */}
            {/* GrClose */}
            <GrClose className="iconClose" />
          </button>
          <h2 className="heading__secondary">Work with us as a</h2>
          <div className="popup-jobs">
            <Link to="/Driver" style={{ textDecoration: "none" }}>
              <div className="btn btn__full">Driver</div>
            </Link>

            <Link to="/RentForm" style={{ textDecoration: "none" }}>
              <div className="btn btn__full">Renter</div>
            </Link>
          </div>
        </div>
      </div>
      <div
        onClick={closetabs}
        className={poped === true ? "pop-background" : ""}
      >
        <button className="start-chat" onClick={openChatHandler}>
          <FaFacebookMessenger className="msg-Icon" />
        </button>
      </div>
      <Chat
        className={`${!openChat ? "hidden" : ""}`}
        onCloseChat={closeChatHandler}
      />
    </section>
  );
};
export default SectionCta;
