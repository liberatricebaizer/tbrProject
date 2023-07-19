import React, { useRef } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Rent1 from "../../../../../assets/rent1.jpg";
import Rent2 from "../../../../../assets/rent2.jpg";
import Rent3 from "../../../../../assets/rent3.jpg";
import Rent4 from "../../../../../assets/rent4.jpg";
import Rent5 from "../../../../../assets/rent2.jpg";
import Profile from "../../../../../assets/baizer.jpg";
import Footer from "../../../../footer/Footer";

import { FaStar, FaHeart, FaShare, FaPlus } from "react-icons/fa";
import "./HouseProfile.css";

const HouseProfile = () => {
  const sladeRef = useRef(null);
  const scroll = (direction) => {
    // const { current } = sladeRef;
    // if (direction === "left") {
    //   current.scrollLeft -= 230;
    // } else if (scroll === "right") {
    //   current.scrollLeft += 230;
    // }
  };

  const RentFilter = [
    {
      profile: `${Rent1}`,
      type: "New",
      ownName: "Toussaint",
      date: "Sun, Feb 19th",
      price: 500,
      current_date: "Sun, Feb 19th",
      houseuURL: "/HousesProfiles/House1",
    },
    {
      profile: `${Rent2}`,
      type: "New",
      ownName: "Toussaint",
      date: "Sun, Feb 19th",
      price: 500,
      current_date: "Sun, Feb 19th",
    },
    {
      profile: `${Rent3}`,
      type: "New",
      ownName: "Toussaint",
      date: "Sun, Feb 19th",
      price: 500,
      current_date: "Sun, Feb 19th",
    },
    {
      profile: `${Rent4}`,
      type: "New",
      ownName: "Toussaint",
      date: "Sun, Feb 19th",
      price: 500,
      current_date: "Sun, Feb 19th",
    },
    {
      profile: `${Rent5}`,
      type: "New",
      ownName: "Toussaint",
      date: "Sun, Feb 19th",
      price: 500,
      current_date: "Sun, Feb 19th",
    },
    {
      profile: `${Rent2}`,
      type: "New",
      ownName: "Toussaint",
      date: "Sun, Feb 19th",
      price: 500,
      current_date: "Sun, Feb 19th",
    },
    {
      profile: `${Rent3}`,
      type: "New",
      ownName: "Toussaint",
      date: "Sun, Feb 19th",
      price: 500,
      current_date: "Sun, Feb 19th",
    },
    {
      profile: `${Rent4}`,
      type: "New",
      ownName: "Toussaint",
      date: "Sun, Feb 19th",
      price: 500,
      current_date: "Sun, Feb 19th",
    },
  ];

  return (
    <Fragment>
      <div className="house-container">
        <div className="house-title">
          <h1 className="heading__secondary title">
            Use the entire accommodation space in privet house for a day
          </h1>
          <div className="flex-star">
            <div className="flex-star-list">
              <span className="star-item">
                <FaStar />
                4.96
              </span>
              <span>.</span>
              <span>45reviews</span>
              <span>.</span>
              <span>
                <u>Kigobe</u>,<u>bujumbura</u>,<u>burundi</u>
              </span>
            </div>
            <div className="flex-vote">
              <span>
                <FaShare />
                Share
              </span>
              <span>
                <FaHeart />
                Like
              </span>
            </div>
          </div>
        </div>
        <div className="grid-img">
          <div className="flex-img">
            <img src={Rent3} alt="" />
            <div className="profile">
              <img src={Profile} alt="" />
            </div>
            <button className="plus">
              More <FaPlus />
            </button>
          </div>
          <div className="flex-img">
            <div className="flex-img-box">
              <img src={Rent1} alt="" />
              <img src={Rent4} alt="" />
            </div>
            <div className="flex-img-box">
              <img src={Rent2} alt="" />
              <img src={Rent5} alt="" />
            </div>
          </div>
        </div>
        <div className="host-placement">
          <div className="host-list">
            <div className="host-info">
              <div className="hosted-title">
                <h1 className="heading_secondary">
                  Hosted by Toussaint Iradukunda
                </h1>
              </div>
              <div className="host-items">
                <ul className="items">
                  <li>
                    <FaStar className="icon" />
                    10 Bedrooms
                  </li>
                  <li>
                    <FaStar className="icon" />5 Bathrooms
                  </li>
                  <li>
                    <FaStar className="icon" />2 Kitchen
                  </li>
                  <li>
                    <FaStar className="icon" />
                    1Garden
                  </li>
                </ul>
              </div>
            </div>
            <div className="description">
              <div className="hosted-title">
                <h1 className="heading_secondary">Hoster description</h1>
              </div>
              <div className="host-descr">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione dolore dicta ipsum necessitatibus sapiente ea qui sed
                  similique explicabo tempore sequi reprehenderit excepturi,
                  repellendus, dolorum facere possimus dolor libero quia ullam
                  neque. Reprehenderit veritatis necessitatibus architecto a
                  veniam provident in quo tenetur, ab sapiente odio, rem eos
                  aliquam, consectetur ex dolorem quos commodi? Fuga cum non,
                  quis ad quia quaerat
                </p>
                <Link to="/RentForm">
                  <button className="btn_rent">Rent Now</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="available-slides">
            <div className="slider">
              {RentFilter.map((rentitems) => (
                <Fragment>
                  <div className="hotel" key={Math.random().toString()}>
                    <div className="hotel-img">
                      <img src={rentitems.profile} alt="Hotel 1" srcset="" />
                    </div>
                    <div className="hotel-info">
                      <div className="hotel-info__heading">
                        <h3 className="heading__tertiary">
                          {rentitems.ownName}'s house
                        </h3>
                        <span className="highlighted showNew">
                          {rentitems.type} <FaStar />
                        </span>
                      </div>
                      <div className="hotel-info__content">
                        <div className="hotel-info__text">
                          <div className="hotel-info__user">
                            <span>Rented by {rentitems.ownName}</span>
                            <span>{rentitems.date}</span>
                          </div>
                          <div className="hotel-info__price">
                            {rentitems.price}
                          </div>
                        </div>
                      </div>
                      <Link
                        to={rentitems.houseuURL}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div className="hotel-info__cta">Rent Now</div>
                      </Link>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default HouseProfile;
