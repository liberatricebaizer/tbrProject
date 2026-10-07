



import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSearch,
  FaChevronDown,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import Footer from "../../footer/Footer";
import Rent1 from "../../../assets/rent1.jpg";
import Rent2 from "../../../assets/rent2.jpg";
import Rent3 from "../../../assets/rent3.jpg";
import Rent4 from "../../../assets/rent4.jpg";

/* Palette: mint #d7f5ec, mint-deep #bfe9dc, green #10654c, green-dark #0a4635 */

const IMAGES = [Rent1, Rent2, Rent3, Rent4];

const SEEDS = [
  ["Bujumbura", 500, "Cozy apartment near downtown."],
  ["Kigobe", 650, "Spacious home with good ventilation."],
  ["Gihosha", 750, "Family house, secure area."],
  ["Nyakabiga", 400, "Affordable room, great for students."],
  ["Cibitoke", 520, "Newly renovated apartment."],
  ["Rohero", 610, "Nice space with parking nearby."],
  ["Kinindo", 900, "Luxury style living area."],
  ["Musaga", 450, "Quiet neighborhood, easy access."],
].map(([location, price, description], i) => ({
  _id: `seed_${i + 1}`,
  name: "Toussaint",
  email: "toussaint@example.com",
  mobile: "+257 7 000 000",
  location,
  price,
  description,
  image: IMAGES[i % 4],
}));

// Rent is shown in thousands of BIF per month.
const PRESETS = [
  { label: "Under 450k", min: "", max: "450" },
  { label: "450k – 650k", min: "450", max: "650" },
  { label: "650k – 800k", min: "650", max: "800" },
  { label: "Over 800k", min: "800", max: "" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#0a4635]";
const inputCls =
  "w-full rounded-xl border-2 border-[#bfe9dc] bg-white px-4 py-3 text-base text-[#0a4635] placeholder:text-[#5b8f7f] focus:border-[#10654c] focus:outline-none";

const Pill = ({ label, active, open, onClick }) => (
  <button
    type="button"
    aria-expanded={open}
    onClick={onClick}
    className={`inline-flex shrink-0 items-center gap-2 rounded-full border-2 px-5 py-2.5 text-[15px] font-semibold transition-colors motion-reduce:transition-none ${focusRing} ${active
      ? "border-[#10654c] bg-[#10654c] text-[#d7f5ec]"
      : "border-[#bfe9dc] bg-white hover:border-[#10654c]"
      }`}
  >
    {label}
    <FaChevronDown
      aria-hidden="true"
      className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}
    />
  </button>
);

const HouseCard = ({ house, liked, onLike }) => (
  <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_0_#bfe9dc]">
    <div className="relative aspect-[4/3] overflow-hidden bg-[#bfe9dc]">
      <Link to="/HousesProfiles/House1" state={{ house }} aria-label={`View house in ${house.location}`}>
        <img
          src={house.image}
          alt={`House in ${house.location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
      </Link>
      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Remove from saved" : "Save house"}
        onClick={onLike}
        className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white ${focusRing}`}
      >
        {liked ? <FaHeart className="text-rose-500" /> : <FaRegHeart />}
      </button>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <p className="m-0 flex items-center gap-1.5 text-lg font-bold">
        <FaMapMarkerAlt aria-hidden="true" /> {house.location}
      </p>
      <p className="mt-1 text-[15px] text-[#4d7a6b]">Hosted by {house.name}</p>
      <p className="mt-3 text-[16px] leading-relaxed text-[#0a4635] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
        {house.description}
      </p>

      <p className="m-0 mt-auto pt-5">
        <span className="text-2xl font-bold">{house.price}k BIF</span>
        <span className="text-[15px]"> / month</span>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link
          to="/HousesProfiles/House1"
          state={{ house }}
          className={`rounded-xl border-2 border-[#10654c] px-4 py-2.5 text-center font-semibold transition-colors hover:bg-[#d7f5ec] ${focusRing}`}
        >
          View house
        </Link>
        <Link
          to="/RentForm"
          state={{ house }}
          className={`rounded-xl bg-[#10654c] px-4 py-2.5 text-center font-semibold text-[#d7f5ec] transition-colors hover:bg-[#0a4635] ${focusRing}`}
        >
          Rent now
        </Link>
      </div>
    </div>
  </article>
);

const RentList = () => {
  const rentData = useSelector((state) => state.rent.data);
  const baseList = Array.isArray(rentData) && rentData.length > 0 ? rentData : SEEDS;

  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [areas, setAreas] = useState([]);
  const [sort, setSort] = useState("recommended");
  const [menu, setMenu] = useState(null); // "price" | "area" | null
  const [liked, setLiked] = useState([]);
  const [limit, setLimit] = useState(12);
  const barRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) setMenu(null);
    };
    const esc = (e) => e.key === "Escape" && setMenu(null);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const allAreas = useMemo(
    () => [...new Set(baseList.map((h) => h.location).filter(Boolean))].sort(),
    [baseList]
  );

  const houses = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice === "" ? null : Number(minPrice);
    const max = maxPrice === "" ? null : Number(maxPrice);

    const list = baseList.filter((h) => {
      const text = `${h.name || ""} ${h.location || ""} ${h.description || ""}`.toLowerCase();
      if (q && !text.includes(q)) return false;
      if (areas.length && !areas.includes(h.location)) return false;
      const price = Number(h.price);
      if (Number.isNaN(price)) return min === null && max === null;
      if (min !== null && price < min) return false;
      if (max !== null && price > max) return false;
      return true;
    });

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [baseList, query, minPrice, maxPrice, areas, sort]);

  const priceActive = minPrice !== "" || maxPrice !== "";
  const anyActive = priceActive || areas.length > 0 || query !== "";
  const priceLabel = priceActive ? `${minPrice || 0}k – ${maxPrice ? `${maxPrice}k` : "any"}` : "Price";
  const areaLabel =
    areas.length === 0 ? "Area" : areas.length === 1 ? areas[0] : `${areas.length} areas`;

  const toggleArea = (a) =>
    setAreas((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));
  const toggleLike = (id) =>
    setLiked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const reset = () => {
    setQuery("");
    setMinPrice("");
    setMaxPrice("");
    setAreas([]);
    setMenu(null);
  };

  return (
    <Fragment>
      <main className="bg[#d7f5ec] px-4 pb-20 pt-20 font-medium text-[#10654c] md:px-10">
        <div className="mx-auto max-w-[110rem]">
          <header className="mb-8">
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Find a house to rent
            </h1>
            <p className="m-0 text-lg">Short or long stays, in the area you like.</p>
          </header>

          <div ref={barRef} className="mb-12">
            <label className="relative mb-12 block">
              <FaSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2"
              />
              <span className="sr-only">Search houses</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by area, host, or description"
                className={`w-full rounded-full border-2 border-transparent bg-white py-4 pl-12 pr-5 text-base text-[#0a4635] shadow-[0_4px_0_#bfe9dc] placeholder:text-[#5b8f7f] ${focusRing}`}
              />
            </label>

            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <Pill
                label={priceLabel}
                active={priceActive}
                open={menu === "price"}
                onClick={() => setMenu(menu === "price" ? null : "price")}
              />
              <Pill
                label={areaLabel}
                active={areas.length > 0}
                open={menu === "area"}
                onClick={() => setMenu(menu === "area" ? null : "area")}
              />
              {anyActive && (
                <button
                  type="button"
                  onClick={reset}
                  className={`shrink-0 px-2 text-[15px] font-bold underline underline-offset-4 ${focusRing}`}
                >
                  Reset all
                </button>
              )}
            </div>

            {menu === "price" && (
              <div className="mt-3 rounded-2xl bg-white p-5 shadow-[0_4px_0_#bfe9dc]">
                <p className="mb-3 font-bold">Monthly rent (k BIF)</p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {PRESETS.map((p) => {
                    const on = minPrice === p.min && maxPrice === p.max;
                    return (
                      <button
                        key={p.label}
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setMinPrice(on ? "" : p.min);
                          setMaxPrice(on ? "" : p.max);
                        }}
                        className={`rounded-full border-2 px-4 py-2 text-[15px] transition-colors ${focusRing} ${on
                          ? "border-[#10654c] bg-[#10654c] text-[#d7f5ec]"
                          : "border-[#bfe9dc] hover:bg-[#d7f5ec]"
                          }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
                <div className="flex max-w-md items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    aria-label="Minimum rent"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className={inputCls}
                  />
                  <span aria-hidden="true">to</span>
                  <input
                    type="number"
                    min="0"
                    inputMode="numeric"
                    aria-label="Maximum rent"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            )}

            {menu === "area" && (
              <div className="mt-3 rounded-2xl bg-white p-5 shadow-[0_4px_0_#bfe9dc]">
                <p className="mb-3 font-bold">Choose one or more areas</p>
                <div className="flex flex-wrap gap-2">
                  {allAreas.map((a) => {
                    const on = areas.includes(a);
                    return (
                      <button
                        key={a}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleArea(a)}
                        className={`rounded-full border-2 px-4 py-2 text-[15px] transition-colors ${focusRing} ${on
                          ? "border-[#10654c] bg-[#10654c] text-[#d7f5ec]"
                          : "border-[#bfe9dc] hover:bg-[#d7f5ec]"
                          }`}
                      >
                        {a}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p aria-live="polite" className="m-0">
              {houses.length} {houses.length === 1 ? "house" : "houses"} for rent
            </p>
            <label className="flex items-center gap-2 text-[15px]">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={`rounded-xl border-2 border-[#bfe9dc] bg-white px-3 py-2 text-[15px] ${focusRing}`}
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>

          {houses.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {houses.slice(0, limit).map((h) => (
                  <HouseCard
                    key={h._id || h.email || h.mobile}
                    house={h}
                    liked={liked.includes(h._id)}
                    onLike={() => toggleLike(h._id)}
                  />
                ))}
              </div>
              {houses.length > limit && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setLimit((l) => l + 12)}
                    className={`rounded-full border-2 border-[#10654c] px-8 py-3 text-base font-semibold transition-colors hover:bg-[#10654c] hover:text-[#d7f5ec] ${focusRing}`}
                  >
                    Show more houses
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl bg-white px-7 py-14 text-center">
              <h2 className="mb-3 text-2xl font-bold">No houses found</h2>
              <p className="mx-auto mb-6 max-w-[46ch] text-[17px] leading-relaxed">
                Try another area, widen the price range, or search with fewer words.
              </p>
              <button
                type="button"
                onClick={reset}
                className={`rounded-xl bg-[#10654c] px-6 py-3 text-base font-semibold text-[#d7f5ec] hover:bg-[#0a4635] ${focusRing}`}
              >
                Reset all
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default RentList;