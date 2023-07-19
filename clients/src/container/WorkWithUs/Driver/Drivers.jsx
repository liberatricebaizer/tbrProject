import React, { Fragment, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCamera, FaImage } from "react-icons/fa";
import { MdUpload } from "react-icons/md";

import "./Drivers.css";

const Drivers = () => {
  let index = 0;
  const [Nextform, setNextform] = useState(index);
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const nameHandler = (e) => {
    setUsername(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const locationHandler = (e) => {
    setLocation(e.target.value);
  };

  const descriptionHndler = (e) => {
    setDescription(e.target.value);
  };

  const nextform = () => {
    index++;
    setNextform(index);
    console.log(index);
  };
  const Prevform = () => {
    index = 0;
    setNextform(index);
  };
  let formstructure = [
    {
      input: (
        <Fragment>
          <div>
            <div className="flex-input">
              <input
                type="text"
                placeholder="Driver's name"
                onChange={nameHandler}
                value={Username}
                className="input"
              />
              <input
                type="text"
                placeholder="email"
                className="input"
                onChange={emailHandler}
                value={email}
              />
            </div>
            <div className="flex-input">
              <input
                type="text"
                className="input"
                placeholder="Price/km"
                onChange={priceHandler}
                value={price}
              />
              <input
                type="text"
                className="input"
                placeholder="Phone number"
                onChange={phoneNumberHandler}
                value={phoneNumber}
              />
            </div>
            <input
              type="text"
              className="input"
              placeholder="Location..."
              onChange={locationHandler}
              value={location}
            />
            <textarea
              type="text"
              className="input input-textarea"
              placeholder="Brief description..."
              onChange={descriptionHndler}
              value={description}
            />
            <div className="next-btn next">
              <button className="next-form" onClick={nextform}>
                Next <FaArrowRight />
              </button>
            </div>
          </div>
        </Fragment>
      ),
    },
    {
      input: (
        <Fragment>
          <div>
            <div className="documents">
              <span className="title-sec">Driver's Photo</span>
              <p className="discr-sec">
                Your profile photo helps people recognize you. Please note that
                once you submit your profile photo it cannot be changed.
              </p>
              <div className="document-content">
                <div className="pick-pic">
                  <label className="label">
                    <input type="file" accept="jpg, png" required />
                    <FaCamera className="iconF" />
                  </label>
                </div>
                <div className="requirements">
                  *Face the camera directly with your eyes and mouth clearly
                  visible <br />
                  *Make sure the photo is well lit, free of glare, and in focus
                  <br />
                  *No photos of a photo, filters, or alterations
                </div>
              </div>
            </div>

            <div className="documents">
              <span className="title-sec">Driver's License</span>
              <p className="discr-sec">
                Ensure all information is readable and not blurry. Make sure
                that all corners of the document are visible. Your document may
                not be accepted if it cannot be read properly or all four
                corners are not visible.
              </p>
              <div className="document-content">
                <div className="pick-pic">
                  <label className="label">
                    <input type="file" accept="pdf" required />
                    <MdUpload className="iconF" />
                  </label>
                </div>
              </div>
            </div>

            <div className="documents">
              <span className="title-sec">Driver's Documents</span>
              <p className="discr-sec">
                Please make sure we can easily read all the details.
              </p>
              <div className="document-content">
                <div className="pick-pic">
                  <label className="label">
                    <input type="file" />
                    <MdUpload className="iconF" />
                  </label>
                </div>
              </div>
            </div>
            <div className="back">
              <button className="next-form" onClick={Prevform}>
                <FaArrowLeft /> Back
              </button>
              <button type="submit" className="next-form">
                Submit
              </button>
            </div>
          </div>
        </Fragment>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="driver-form">
        <div className="container-driver">
          <h2 className="heading__secondary">Become our driver</h2>
          <div className="form-driver">{formstructure[Nextform].input}</div>
        </div>
      </div>
    </Fragment>
  );
};
export default Drivers;
