import React from "react";
import { Link } from "react-router-dom";

const RentCard = ({ name, email, price, mobile, location, description, image }) => {
  return (
    <div className="hotel">
      <div className="hotel-img">
        <img src={image} alt={`${name}'s house`} />
      </div>
      <div className="hotel-info">
        <div className="hotel-info__heading">
          <h3 className="heading__tertiary">{name}'s house</h3>
          <h2>{email}</h2>
          <span className="highlighted showNew">{/* {new} <FaStar /> */}</span>
        </div>
        <div className="hotel-info__content">
          <div className="hotel-info__text">
            <div className="hotel-info__user">
              <span>Rented by {name}</span>
              <span>{mobile}</span>
              <span>{location}</span>
              <span>{description}</span>
            </div>
            <div className="hotel-info__price">{price}</div>
          </div>
        </div>
        <Link to="/RentForm" style={{ textDecoration: "none", color: "black" }}>
          <div className="hotel-info__cta">Rent Now</div>
        </Link>
      </div>
    </div>
  );
};

export default RentCard;
