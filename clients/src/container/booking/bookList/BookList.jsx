import React, { Fragment, useRef } from "react";
import "./BookList.css";
import { FaFilter, FaSearch, FaStar } from "react-icons/fa";
import hotel1 from "../../../assets/img4.jpg";
import hotel2 from "../../../assets/img3.jpg";
import hotel3 from "../../../assets/img2.jpg";
import Filter from "./Filter/Filters";
import hotel4 from "../../../assets/img1.jpg";
import hotel5 from "../../../assets/rent1.jpg";
import { useState } from "react";
import addBtn from "../../../assets/add.svg";
import { FaCamera } from "react-icons/fa";
// import hotel6 from "../../../assets/rent2.jpg";
// import hotel7 from "../../../assets/rent3.jpg";
// import hotel8 from "../../../assets/rent4.jpg";
/**
 * 
Air condition
Parking
Wifi
TV
Gym
Washer
Kitchen
BreakFast
 */
const FilterItems = [
  {
    profile: `${hotel1}`,
    hotelName: "Club du Lac tanganyika",
    type: "New",
    ownName: "Toussaint",
    date: "Sun, Feb 19th",
    price: 646,
    fields: ["tv", "wifi", "gym"],
  },
  {
    profile: `${hotel2}`,
    hotelName: "Clob du Lac tanganyika",
    type: "New",
    ownName: "Toussaint",
    date: "Sun, Feb 19th",
    price: 589,
    fields: ["washer", "BreakFast", "Kitchen"],
  },
  {
    profile: `${hotel3}`,
    hotelName: "Geto",
    type: "New",
    ownName: "baizer",
    date: "Sun, Feb 19th",
    price: 127,
    fields: ["washer", "Parking", "Gym"],
  },
  {
    profile: `${hotel4}`,
    hotelName: "Club du Lac tanganyika",
    type: "New",
    ownName: "Toussaint",
    date: "Sun, Feb 19th",
    price: 500,
    fields: ["Air condition", "Washer", "Gym"],
  },
  {
    profile: `${hotel5}`,
    hotelName: "Club du Lac tanganyika",
    type: "New",
    ownName: "Toussaint",
    date: "Sun, Feb 19th",
    price: 100,
    fields: ["washer", "BreakFast", "Kitchen"],
  },
];

const BookList = (props) => {
  const [searchQuerry, setsearchQuerry] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [wifi, setWifi] = useState("");
  const [tv, setTv] = useState("");
  const [gym, setGym] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [washer, setWasher] = useState("");
  const [aircondition, setAircondition] = useState("");
  const [parking, setParking] = useState("");
  const FilterHiderHandler = useRef();

  const setFilter = () => {
    setOpenFilter(true);
  };
  const closeFilter = () => {
    setOpenFilter(false);
  };
  const setMinPriceHandler = (e) => {
    const settedMinPrice = e.target.value.trim();
    setMinPrice(settedMinPrice);
  };
  const setMaxPriceHandler = (e) => {
    const settedMaxPrice = e.target.value.trim();
    setMaxPrice(settedMaxPrice);
  };
  const searchHandler = (e) => {
    setsearchQuerry(e.target.value);
  };

  const getWifi = (e) => {
    setWifi(e.target.value);
  };
  const gettv = (e) => {
    setTv(e.target.value);
  };
  const getgym = (e) => {
    setGym(e.target.value);
  };
  const getkitchen = (e) => {
    setKitchen(e.target.value);
  };
  const getbreakfast = (e) => {
    setBreakfast(e.target.value);
  };
  const getwasher = (e) => {
    setWasher(e.target.value);
  };
  const getaircondition = (e) => {
    setAircondition(e.target.value);
  };
  const getparking = (e) => {
    setParking(e.target.value);
  };
  let fields = [
    wifi,
    tv,
    gym,
    kitchen,
    breakfast,
    washer,
    aircondition,
    parking,
  ];
  console.log(FilterItems[0].fields.includes(wifi));
  return (
    <Fragment>
      <Filter
        onCloseFilter={closeFilter}
        className={openFilter === true ? "open-filter" : "none"}
        onSetMinPrice={setMinPriceHandler}
        onsetMaxPrice={setMaxPriceHandler}
        ongetparking={getparking}
        ongetWifi={getWifi}
        ongetaircondition={getaircondition}
        ongetbreakfast={getbreakfast}
        ongetgym={getgym}
        ongetkitchen={getkitchen}
        ongettv={gettv}
        ongetwasher={getwasher}
      />
      <div className="booking">
        <div className="booking__search">
          <div className="booking__search--content">
            <input
              type="text"
              name="searchHotel"
              id="searchHotel"
              placeholder="search a place..."
              onChange={searchHandler}
            />
            <button>
              <FaSearch />
              {/* <span>Srch</span> */}
            </button>
          </div>
          <div className="filter">
            <button className="filter-btn" onClick={setFilter}>
              Filter <FaFilter />
            </button>
          </div>
        </div>
        <div className="booking__content">
          <div className="booking__hotels">
            {FilterItems.map((current_items) =>
              searchQuerry
                .toString()
                .slice(0, searchQuerry.toString().length)
                .toLocaleLowerCase() ===
                current_items.hotelName
                  .slice(0, searchQuerry.toString().length)
                  .toLocaleLowerCase() ||
              searchQuerry
                .toString()
                .slice(0, searchQuerry.toString().length) ===
                current_items.ownName
                  .slice(0, searchQuerry.toString().length)
                  .toLocaleLowerCase() ? (
                <Fragment>
                  <div
                    className={`hotel ${
                      (minPrice.length > 0 && maxPrice.length) > 0 ? "hide" : ""
                    }`}
                    key={Math.random().toString()}
                    ref={FilterHiderHandler}
                  >
                    <div className="hotel-img">
                      <img
                        src={current_items.profile}
                        alt="Hotel 1"
                        srcset=""
                      />
                    </div>
                    <div className="hotel-info">
                      <div className="hotel-info__heading">
                        <h3 className="heading__tertiary">
                          {current_items.hotelName}
                        </h3>
                        <span className="highlighted showNew">
                          {current_items.type}
                          <FaStar />
                        </span>
                      </div>
                      <div className="hotel-info__content">
                        <div className="hotel-info__text">
                          <div className="hotel-info__user">
                            <span>{current_items.ownName}</span>
                            <span>{current_items.date}</span>
                          </div>
                          <div className="hotel-info__price">
                            {current_items.price}k BIF
                          </div>
                        </div>
                      </div>
                      <div className="hotel-info__cta">Book Now</div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                ""
              )
            )}
            {FilterItems.map((bookItems) => (
              <Fragment>
                {(Number(minPrice) <= bookItems.price &&
                  Number(maxPrice) >= bookItems.price) ||
                bookItems.fields.includes(fields[0]) ||
                bookItems.fields.includes(fields[1]) ||
                bookItems.fields.includes(fields[2]) ||
                bookItems.fields.includes(fields[3]) ||
                bookItems.fields.includes(fields[4]) ||
                bookItems.fields.includes(fields[5]) ||
                bookItems.fields.includes(fields[6]) ||
                bookItems.fields.includes(fields[7]) ||
                bookItems.fields.includes(fields[8]) ? (
                  <div className="hotel" key={Math.random().toString()}>
                    <div className="hotel-img">
                      <img src={bookItems.profile} alt="Hotel 1" srcset="" />
                    </div>
                    <div className="hotel-info">
                      <div className="hotel-info__heading">
                        <h3 className="heading__tertiary">
                          {bookItems.hotelName}
                        </h3>
                        <span className="highlighted showNew">
                          {bookItems.type}
                          <FaStar />
                        </span>
                      </div>
                      <div className="hotel-info__content">
                        <div className="hotel-info__text">
                          <div className="hotel-info__user">
                            <span>{bookItems.ownName}</span>
                            <span>{bookItems.date}</span>
                          </div>
                          <div className="hotel-info__price">
                            {bookItems.price}k BIF
                          </div>
                        </div>
                      </div>
                      <div className="hotel-info__cta">Book Now</div>
                    </div>
                  </div>
                ) : (
                  <Fragment></Fragment>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        {/* Add */}
        {/* <button className="add-btn">
          <img src={addBtn} alt="add button" />
          <span className="btnLegend">Post Hotel</span>{" "}
        </button> */}
        <div className="container-book">
          <div className="booking__add">
            <h2 className="heading__secondary">Post your Hotel to book</h2>
            <form className="form-book">
              <div className="flex-form">
                <input
                  type="text"
                  className="input"
                  placeholder="Owner's name..."
                />
                <input type="text" className="input" placeholder="email" />
              </div>
              <div className="flex-form">
                <input type="number" className="input" placeholder="Price" />
                <input
                  type="number"
                  className="input"
                  placeholder="Phone number"
                />
              </div>
              <div className="flex-form">
                <input
                  type="text"
                  className="input"
                  placeholder="Hotel Title..."
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Hotel Location..."
                />
              </div>
              <textarea
                type="text"
                className="input flex-textarea"
                placeholder="Brief description..."
              />

              <div className="pick-pic">
                <label className="label">
                  <input type="file" />
                  <FaCamera className="iconF" />
                </label>
              </div>

              <div className="book-now">
                <button className="book-cta">Book Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default BookList;
