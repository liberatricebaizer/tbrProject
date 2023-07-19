import React, { Fragment, useEffect, useRef, useState } from "react";

import { FaTimes } from "react-icons/fa";
import "./Filter.css";

const Filter = (props) => {
  const CheckedWifi = useRef();
  const checkedParking = useRef();
  const checkedTv = useRef();
  const checkedGym = useRef();
  const checkedWasher = useRef();
  const checkedKitchen = useRef();
  const checkedBreakFast = useRef();
  const checkedAircondition = useRef();

  const [wifi_Checkbox, setWifi_checkbox] = useState(false);
  const [parking_Checbox, setParking_Checkox] = useState(false);
  const [tv_Checkbox, setTv_Ckeckbox] = useState(false);
  const [gym_Checkbox, setGym_Checkbox] = useState(false);
  const [washer_Checkbox, setWasher_Checkbox] = useState(false);
  const [kitchen_Checkbox, setKitchen_Checkbox] = useState(false);
  const [BreakFast_Checkbox, setBreakFast_Checkbox] = useState(false);
  const [Aircondition_Checkbox, setAircondition_Checkbox] = useState(false);

  useEffect(() => {
    if (CheckedWifi.current.checked) {
      setWifi_checkbox(true);
    } else {
      setWifi_checkbox(false);
    }

    if (checkedParking.current.checked) {
      setParking_Checkox(true);
    } else {
      setParking_Checkox(false);
    }

    if (checkedTv.current.checked) {
      setTv_Ckeckbox(true);
    } else {
      setTv_Ckeckbox(false);
    }

    if (checkedGym.current.checked) {
      setGym_Checkbox(true);
    } else {
      setGym_Checkbox(false);
    }

    if (checkedWasher.current.checked) {
      setWasher_Checkbox(true);
    } else {
      setWasher_Checkbox(false);
    }

    if (checkedKitchen.current.checked) {
      setKitchen_Checkbox(true);
    } else {
      setKitchen_Checkbox(false);
    }

    if (checkedKitchen.current.checked) {
      setBreakFast_Checkbox(true);
    } else {
      setBreakFast_Checkbox(false);
    }
    if (checkedAircondition.current.checked) {
      setAircondition_Checkbox(true);
    } else {
      setAircondition_Checkbox(false);
    }
  }, []);
  return (
    <Fragment>
      <div className={`backdrop-filter ${props.className}`}>
        <div className="blur" onClick={props.onCloseFilter}></div>
        <div className="Filter">
          <div className="items">
            <div className="filter-title">
              <div className="close-tab">
                <h2 className="heading__filter">Filter</h2>
                <FaTimes onClick={props.onCloseFilter} className="close-btn" />
              </div>
            </div>
            <form className="overflow-form">
              <div className="filter-items">
                <div className="header-filter">
                  <h2 className="heading__filter">Price Range</h2>
                  <p>The average nightly price is $94</p>
                </div>
                <div className="filter-input">
                  <input
                    type="text"
                    className="input-price"
                    placeholder="Min Price"
                    onChange={props.onSetMinPrice}
                  />
                  <input
                    type="text"
                    className="input-price"
                    placeholder="Max Price"
                    onChange={props.onsetMaxPrice}
                  />
                </div>

                {/* <div className="room">
                  <div className="room-lenght">
                    <h2 className="heading__filter">Rooms and beds</h2>
                  </div>
                  <div className="rooms-container">
                    <h2 className="place-title">Bedrooms</h2>
                    <div className="flex-room">
                      <button type="buroomtton" className="rooms">
                        1
                      </button>
                      <button type="button" className="rooms">
                        2
                      </button>
                      <button type="button" className="rooms">
                        3
                      </button>
                      <button type="button" className="rooms">
                        4
                      </button>
                      <button type="button" className="rooms">
                        5
                      </button>
                      <button type="button" className="rooms">
                        6
                      </button>
                      <button type="button" className="rooms">
                        7
                      </button>
                      <button type="button" className="rooms">
                        8+
                      </button>
                    </div>
                  </div>

                  <div className="rooms-container">
                    <h2 className="place-title">Bathrooms</h2>
                    <div className="flex-room">
                      <button type="button" className="rooms">
                        1
                      </button>
                      <button type="button" className="rooms">
                        2
                      </button>
                      <button type="button" className="rooms">
                        3
                      </button>
                      <button type="button" className="rooms">
                        4
                      </button>
                      <button type="button" className="rooms">
                        5
                      </button>
                      <button type="button" className="rooms">
                        6
                      </button>
                      <button type="button" className="rooms">
                        7
                      </button>
                      <button type="button" className="rooms">
                        8+
                      </button>
                    </div>
                  </div>
                </div> */}
                {/*                 
                <div className="property-container">
                  <h2 className="heading__filter">Property Type</h2>
                  <div className="property">
                    <div className="property__type">
                      <div className="property-block">
                        <FaHouseDamage className="icon" />
                      </div>
                      <div className="property-block">
                        <p>House</p>
                      </div>
                    </div>
                    <div className="property__type">
                      <div className="property-block">
                        <FaHouseUser className="icon" />
                      </div>
                      <div className="property-block">
                        <p>Appartement</p>
                      </div>
                    </div>
                    <div className="property__type">
                      <div className="property-block">
                        <FaWarehouse className="icon" />
                      </div>
                      <div className="property-block">
                        <p>Guest</p>
                      </div>
                    </div>
                    <div className="property__type">
                      <div className="property-block">
                        <FaHotel className="icon" />
                      </div>
                      <div className="property-block">
                        <p>Hotels</p>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="essentials__content">
                  <h2 className="heading__filter">Essentials</h2>
                  <div className="essentials">
                    <div className="flex-essentiel">
                      <div className="essentials__input">
                        <input
                          type="checkbox"
                          id="essentials1"
                          value="Air condition"
                          onChange={props.ongetaircondition}
                          ref={checkedAircondition}
                        />
                        <label htmlFor="essentials1">
                          <p className="essential-title">Air condition</p>
                        </label>
                      </div>
                      <div className="essentials__input">
                        <input
                          type="checkbox"
                          id="essentials2"
                          value="parking"
                          onChange={props.ongetparking}
                          ref={checkedParking}
                        />
                        <label htmlFor="essentials2">
                          <p className="essential-title">Parking</p>
                        </label>
                      </div>
                    </div>
                    <div className="flex-essentiel">
                      <div className="essentials__input">
                        <input
                          type="checkbox"
                          id="essentials3"
                          value="wifi"
                          onClick={props.ongetWifi}
                          ref={CheckedWifi}
                        />
                        <label htmlFor="essentials3">
                          <p className="essential-title">Wifi</p>
                        </label>
                      </div>
                      <div className="essentials__input">
                        <input
                          type="checkbox"
                          id="essentials4"
                          value="tv"
                          onChange={props.ongettv}
                          ref={checkedTv}
                        />
                        <label htmlFor="essentials4">
                          <p className="essential-title">TV</p>
                        </label>
                      </div>
                    </div>

                    <div className="flex-essentiel">
                      <div className="essentials__input">
                        <input
                          type="checkbox"
                          id="essentials5"
                          onChange={props.ongetgym}
                          value="Gym"
                          ref={checkedGym}
                        />
                        <label htmlFor="essentials5">
                          <p className="essential-title">Gym</p>
                        </label>
                      </div>
                      <div className="essentials__input">
                        <input
                          type="checkbox"
                          id="essentials6"
                          value="Washer"
                          onChange={props.ongetwasher}
                          ref={checkedWasher}
                        />
                        <label htmlFor="essentials6">
                          <p className="essential-title">Washer</p>
                        </label>
                      </div>
                    </div>

                    <div className="flex-essentiel">
                      <div className="essentials__input">
                        <input
                          type="checkbox"
                          id="essentials7"
                          onChange={props.ongetkitchen}
                          value="Kitchen"
                          ref={checkedKitchen}
                        />
                        <label htmlFor="essentials7">
                          <p className="essential-title">Kitchen</p>
                        </label>
                      </div>
                      <div className="essentials__input">
                        <input
                          type="checkbox"
                          id="essentials8"
                          value="BreakFast"
                          onChange={props.ongetbreakfast}
                          ref={checkedBreakFast}
                        />
                        <label htmlFor="essentials8">
                          <p className="essential-title">BreakFast</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Filter;
