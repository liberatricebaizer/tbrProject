import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./RentList.css";
import { FaFilter, FaSearch, FaStar } from "react-icons/fa";
import Rent1 from "../../../assets/rent1.jpg";
import Rent2 from "../../../assets/rent2.jpg";
import Rent3 from "../../../assets/rent3.jpg";
import Rent4 from "../../../assets/rent4.jpg";
import Rent5 from "../../../assets/rent1.jpg";
import Rent6 from "../../../assets/rent2.jpg";
import Rent7 from "../../../assets/rent3.jpg";
import Rent8 from "../../../assets/rent4.jpg";
import Footer from "../../footer/Footer";
import { useSelector } from "react-redux";
import RentCard from "../../../components/RentCard";

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
    profile: `${Rent6}`,
    type: "New",
    ownName: "Toussaint",
    date: "Sun, Feb 19th",
    price: 500,
    current_date: "Sun, Feb 19th",
  },
  {
    profile: `${Rent7}`,
    type: "New",
    ownName: "Toussaint",
    date: "Sun, Feb 19th",
    price: 500,
    current_date: "Sun, Feb 19th",
  },
  {
    profile: `${Rent8}`,
    type: "New",
    ownName: "Toussaint",
    date: "Sun, Feb 19th",
    price: 500,
    current_date: "Sun, Feb 19th",
  },
];
const RentList = () => {
  const rentData = useSelector((state) => state.rent);

  // Check if rentData is an array before calling slice
  const rentcartList = Array.isArray(rentData) ? rentData.slice(0, 7) : [];

  // const rentData = useSelector((state) => state.rent);
  // console.log(rentData);
  // const rentcartList = rentData.slice(0, 7);
  return (
    <Fragment>
      <div className="booking">
        <div className="booking__search">
          <div className="booking__search--content">
            <input
              type="text"
              name="searchHotel"
              id="searchHotel"
              placeholder="search a house..."
            />
            <button>
              <FaSearch />
              {/* <span>Srch</span> */}
            </button>
          </div>

          <div className="filter">
            <button className="filter-btn">
              Filter <FaFilter />
            </button>
          </div>
        </div>
        <div className="booking__content">
          <div className="booking__hotels">
            {/* {RentFilter.map((rentitems) => ( */}
            {rentcartList[0] &&
              rentcartList.map((el) => {
                return (
                  <RentCard
                    name={el.name}
                    email={el.email}
                    price={el.price}
                    mobile={el.mobile}
                    location={el.location}
                    description={el.description}
                    image={el.emage}
                  />
                );
                // <Fragment>
                {
                  /* <div className="hotel" key={Math.random().toString()}>
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
                  </div> */
                }
                // </Fragment>;
                // ))}
              })}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
export default RentList;
