import React, { Fragment, useMemo, useState } from "react";
import "./RentList.css";
import { FaFilter, FaSearch } from "react-icons/fa";
import Footer from "../../footer/Footer";
import { useSelector } from "react-redux";
import RentCard from "../../../components/RentCard";
import Rent1 from "../../../assets/rent1.jpg";
import Rent2 from "../../../assets/rent2.jpg";
import Rent3 from "../../../assets/rent3.jpg";
import Rent4 from "../../../assets/rent4.jpg";
import Rent5 from "../../../assets/rent1.jpg";
import Rent6 from "../../../assets/rent2.jpg";
import Rent7 from "../../../assets/rent3.jpg";
import Rent8 from "../../../assets/rent4.jpg";

const RentList = () => {
  const rentData = useSelector((state) => state.rent.data);

  const rentSeeds = useMemo(
    () => [
      {
        _id: "seed_1",
        name: "Toussaint",
        email: "toussaint@example.com",
        price: 500,
        mobile: "+257 7 000 000",
        location: "Bujumbura",
        description: "Cozy apartment near downtown.",
        image: Rent1,
      },
      {
        _id: "seed_2",
        name: "Toussaint",
        email: "toussaint@example.com",
        price: 650,
        mobile: "+257 7 000 000",
        location: "Kigobe",
        description: "Spacious home with good ventilation.",
        image: Rent2,
      },
      {
        _id: "seed_3",
        name: "Toussaint",
        email: "toussaint@example.com",
        price: 750,
        mobile: "+257 7 000 000",
        location: "Gihosha",
        description: "Family house, secure area.",
        image: Rent3,
      },
      {
        _id: "seed_4",
        name: "Toussaint",
        email: "toussaint@example.com",
        price: 400,
        mobile: "+257 7 000 000",
        location: "Nyakabiga",
        description: "Affordable room, great for students.",
        image: Rent4,
      },
      {
        _id: "seed_5",
        name: "Toussaint",
        email: "toussaint@example.com",
        price: 520,
        mobile: "+257 7 000 000",
        location: "Cibitoke",
        description: "Newly renovated apartment.",
        image: Rent5,
      },
      {
        _id: "seed_6",
        name: "Toussaint",
        email: "toussaint@example.com",
        price: 610,
        mobile: "+257 7 000 000",
        location: "Rohero",
        description: "Nice space with parking nearby.",
        image: Rent6,
      },
      {
        _id: "seed_7",
        name: "Toussaint",
        email: "toussaint@example.com",
        price: 900,
        mobile: "+257 7 000 000",
        location: "Kinindo",
        description: "Luxury style living area.",
        image: Rent7,
      },
      {
        _id: "seed_8",
        name: "Toussaint",
        email: "toussaint@example.com",
        price: 450,
        mobile: "+257 7 000 000",
        location: "Musaga",
        description: "Quiet neighborhood, easy access.",
        image: Rent8,
      },
    ],
    []
  );

  const dataFromStore = Array.isArray(rentData) ? rentData : [];
  const baseList = dataFromStore.length > 0 ? dataFromStore : rentSeeds;

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const lq = locationQuery.trim().toLowerCase();
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);

    return baseList.filter((item) => {
      const text = `${item.name || ""} ${item.email || ""} ${item.location || ""} ${
        item.description || ""
      }`.toLowerCase();

      if (q && !text.includes(q)) return false;
      if (lq && !(item.location || "").toLowerCase().includes(lq)) return false;

      const priceValue = Number(item.price);
      if (Number.isNaN(priceValue)) {
        if (min !== null || max !== null) return false;
        return true;
      }

      if (min !== null && priceValue < min) return false;
      if (max !== null && priceValue > max) return false;
      return true;
    });
  }, [baseList, locationQuery, maxPrice, minPrice, searchQuery]);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>
              <FaSearch />
              {/* <span>Srch</span> */}
            </button>
          </div>

          <div className="filter">
            <button
              className="filter-btn"
              type="button"
              onClick={() => setShowFilter((v) => !v)}
            >
              Filter <FaFilter />
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="rent-filter-panel">
            <div className="rent-filter-row">
              <label>
                Min price
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </label>
              <label>
                Max price
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </label>
              <label>
                Location
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="e.g. Bujumbura"
                />
              </label>
            </div>

            <div className="rent-filter-actions">
              <button
                className="rent-filter-reset"
                type="button"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice("");
                  setLocationQuery("");
                  setSearchQuery("");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}

        <div className="booking__content">
          <div className="booking__hotels">
            {filteredList.length === 0 ? (
              <p style={{ textAlign: "center", color: "#777" }}>
                No rents found. Try another search or filter.
              </p>
            ) : (
              filteredList.slice(0, 12).map((el) => (
                <RentCard
                  name={el.name}
                  email={el.email}
                  price={el.price}
                  mobile={el.mobile}
                  location={el.location}
                  description={el.description}
                  image={el.image}
                  key={el._id || el.email || el.mobile}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
export default RentList;
