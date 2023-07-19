import React, { Fragment } from "react";
import "./Rents.css";
import ImagetoBase from "../../../utility/ImagetoBase";
import { useState } from "react";
import UploadImage from "../../../assets/images.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Rents = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    price: "",
    mobile: "",
    location: "",
    description: "",
    image: "",
  });

  const handlerOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handlerUploadfile = async (e) => {
    const data = await ImagetoBase(e.target.files[0]);
    // console.log(data);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(data);

    const fetchData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMIN}/uploadRent`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const fetchRes = await fetchData.json();
    console.log(fetchRes);

    // alert(dataRes.message);
    toast(fetchRes.message);
    if (fetchRes.alert) {
      navigate("/Rents");
    }
  };
  return (
    <Fragment>
      <div className="container-rent">
        <div className="container-box">
          <h2 className="heading__secondary">Post your house for rent</h2>

          <form className="form-rent" onClick={submitHandler}>
            <div className="flex-input">
              <input
                type={"text"}
                name="name"
                className="input"
                placeholder="Owner's name..."
                value={data.name}
                onChange={handlerOnChange}
              />
              <input
                type={"text"}
                name="email"
                className="input"
                placeholder="email"
                value={data.email}
                onChange={handlerOnChange}
              />
            </div>

            <div className="flex-input">
              <input
                type={"number"}
                name="price"
                className="input"
                placeholder="Price"
                value={data.price}
                onChange={handlerOnChange}
              />
              <input
                type={"number"}
                name="mobile"
                className="input"
                placeholder="Phone number"
                value={data.mobile}
                onChange={handlerOnChange}
              />
            </div>

            <input
              type={"text"}
              name="location"
              className="input"
              placeholder="House Location..."
              value={data.location}
              onChange={handlerOnChange}
            />
            <textarea
              name="description"
              className="input input-textarea"
              placeholder="Brief description..."
              value={data.description}
              onChange={handlerOnChange}
            />

            <div className="pick-pic">
              <label className="label">
                <input
                  type={"file"}
                  multiple
                  accept="image/*"
                  id="image"
                  onChange={handlerUploadfile}
                />
                <img
                  src={data.image ? data.image : UploadImage}
                  alt=""
                  className="iconF"
                />
                {/* {data.image ? data.image : <FaCamera className="iconF" />} */}
              </label>
            </div>

            <div className="rent-now">
              <button type="submit" className="rent-cta">
                Rent Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default Rents;
