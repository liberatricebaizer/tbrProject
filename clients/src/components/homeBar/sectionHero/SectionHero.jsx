import React from "react";
import tbrHome from "../../../assets/tbr.svg";

import { FaLongArrowAltDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./SectionHero.css";

// let scrolltest = true;
// const scrollHandler = () => {
//   if (scrolltest === true) {
//     document.location = `${document.baseURI}#workwithus-section-bar`;
//     scrolltest = false;
//   } else if (scrolltest === false) {
//     document.location = ``;
//     scrolltest = true;
//   }
// };
const SectionHero = () => {
  return (
    <section className="section__hero">
      <div className="container grid grid__2__cols mobile">
        <div className="travel__text__box">
          <h1 className="heading__primary">
            Best platform for Traveling, Booking, Renting and moving your
            business fast
          </h1>
          <p className="text">
            Travel by taking a ride, Book a room from any hotel you desire and
            Rent a house from anywhere you want with TBR Agency the all-in-one
            platform.
          </p>
          <div className="cta-box">
            <Link to="/signup" className="btn btn__full">
              Get Started
            </Link>
            <a href="#workwithus" className="btn btn__outline">
              Work with Us <FaLongArrowAltDown className="down" />
            </a>
          </div>
        </div>
        <div className="travel__img__box">
          <img src={tbrHome} alt="transport traveling" />
        </div>
      </div>
    </section>
  );
};
export default SectionHero;
