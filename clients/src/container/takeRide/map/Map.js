import React, { Fragment, useEffect, useReducer, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { TfiLocationArrow } from "react-icons/tfi";
import { BsCalendar4 } from "react-icons/bs";
import "./Map.css";
import ReactDOM from "react-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react";

const Map = () => {
  const [current_pos, setCurrent_pos] = useState(null);
  const [rideForm, setrideForm] = useReducer((current_state) => {
    if (current_state === false) {
      return true;
    } else if (current_state === true) {
      return false;
    }
  }, false);

  navigator.geolocation.getCurrentPosition(
    (user_pos) => {
      setCurrent_pos([user_pos.coords.latitude, user_pos.coords.longitude]);
      console.log(current_pos);
    },
    (err) => console.log(err.message)
  );

  const position = [52.51, 13.38];
  return (
    <div className="map" id="map">
      <div className="addressToGo">
        <h2 className="heading__secondary">Where to go?</h2>
        <form action="#">
          <div className="location">
            <div className="here">
              <IoLocationOutline />
            </div>
            <input
              type="text"
              id="leavingLocation"
              name="Leaving Location"
              placeholder="Leaving from..."
              className="currLoc loc"
              required
            />
          </div>

          <div className="location">
            <div className="here">
              <TfiLocationArrow />
            </div>
            <input
              type="text"
              id="destinationLocation"
              name="Destination Location"
              placeholder="Going to..."
              className="destLoc loc"
              required
            />
          </div>

          <div className="times">
            <div className="time-go time">
              <div className="here">
                <BsCalendar4 />
              </div>
              <input
                type="text"
                id="departTime"
                name="Depart Time"
                placeholder="Depart"
                className="depart date"
                required
              />
            </div>

            <div className="time-return time">
              <div className="here">
                <BsCalendar4 />
              </div>
              <input
                type="text"
                id="returnTime"
                name="Return Time"
                placeholder="Return"
                className="return date"
                required
              />
            </div>
          </div>

          <div className="takeAction">
            <button className="take-action">Take a ride</button>
          </div>
        </form>
      </div>
      <div className={`footer_search ${!rideForm ? "" : "displayed-form"}`}>
        <div className="search_location">
          <Fragment>
            <div className="flex-nav">
              <h2 className="heading__secondary">Where to go?</h2>
              <button className="btn-toggle_ride" onClick={setrideForm}>
                <IoLocationOutline />
              </button>
            </div>
            <div className="location">
              <div className="here">
                <IoLocationOutline />
              </div>
              <input
                type="text"
                id="leavingLocation"
                name="Leaving Location"
                placeholder="Leaving from..."
                className="currLoc loc"
              />
            </div>

            <div className="location">
              <div className="here">
                <TfiLocationArrow />
              </div>
              <input
                type="text"
                id="destinationLocation"
                name="Destination Location"
                placeholder="Going to..."
                className="destLoc loc"
              />
            </div>

            <div className="times">
              <div className="time-go time">
                <div className="here">
                  <BsCalendar4 />
                </div>
                <input
                  type="text"
                  id="departTime"
                  name="Depart Time"
                  placeholder="Depart"
                  className="depart date"
                />
              </div>

              <div className="time-return time">
                <div className="here">
                  <BsCalendar4 />
                </div>
                <input
                  type="text"
                  id="returnTime"
                  name="Return Time"
                  placeholder="Return"
                  className="return date"
                />
              </div>
            </div>

            <div className="takeAction">
              <button className="take-action">Take a ride</button>
            </div>
          </Fragment>
        </div>
      </div>
      {/* <iframe
        // style={{ float: "right" }}
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=burundi&t=&z=13&ie=UTF8&iwloc=&output=embed"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        className="mapping"
      /> */}
      <div
        className="mapping"
        id="map"
        style={{ border: "solid 1px black", overflow: "hidden" }}
      >
        <MapContainer center={current_pos} zoom={6} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={current_pos}>
            <Popup>???</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
