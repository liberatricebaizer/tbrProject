

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaTimes,
  FaPlus,
  FaCamera,
  FaWifi,
  FaTv,
  FaDumbbell,
  FaUtensils,
  FaCoffee,
  FaTshirt,
  FaSnowflake,
  FaParking,
} from "react-icons/fa";
import hotel1 from "../../../assets/img4.jpg";
import hotel2 from "../../../assets/img3.jpg";
import hotel3 from "../../../assets/img2.jpg";
import hotel4 from "../../../assets/img1.jpg";
import hotel5 from "../../../assets/rent1.jpg";
import ImagetoBase from "../../../utility/ImagetoBase";
import {
  createBookingLocal,
  createHotelLocal,
  getHotelsLocal,
} from "../../../utility/localDb";

/* Palette: mint #d7f5ec, mint-deep #bfe9dc, green #10654c, green-dark #0a4635, accent #20c997 */

const AMENITIES = [
  { id: "wifi", label: "Wifi", Icon: FaWifi },
  { id: "tv", label: "TV", Icon: FaTv },
  { id: "gym", label: "Gym", Icon: FaDumbbell },
  { id: "kitchen", label: "Kitchen", Icon: FaUtensils },
  { id: "breakfast", label: "Breakfast", Icon: FaCoffee },
  { id: "washer", label: "Washer", Icon: FaTshirt },
  { id: "air condition", label: "Air conditioning", Icon: FaSnowflake },
  { id: "parking", label: "Parking", Icon: FaParking },
];

// Prices are in thousands of BIF per night (646 = 646k BIF).
const SEED = [
  { profile: hotel1, hotelName: "Club du Lac tanganyika", ownName: "Toussaint", price: 646, fields: ["tv", "wifi", "gym"] },
  { profile: hotel2, hotelName: "Clob du Lac tanganyika", ownName: "Toussaint", price: 589, fields: ["washer", "breakfast", "kitchen"] },
  { profile: hotel3, hotelName: "Geto", ownName: "baizer", price: 127, fields: ["washer", "parking", "gym"] },
  { profile: hotel4, hotelName: "Club du Lac tanganyika", ownName: "Toussaint", price: 500, fields: ["air condition", "washer", "gym"] },
  { profile: hotel5, hotelName: "Club du Lac tanganyika", ownName: "Toussaint", price: 100, fields: ["washer", "breakfast", "kitchen"] },
].map((h, i) => ({ ...h, type: "New", date: "Sun, Feb 19th", _id: `seed_${i}` }));

const focusRing =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#0a4635]";
const inputCls =
  "w-full rounded-xl border-2 border-[#bfe9dc] bg-white px-4 py-3 text-base text-[#0a4635] placeholder:text-[#5b8f7f] focus:border-[#10654c] focus:outline-none";
const primaryBtn = `rounded-xl bg-[#10654c] px-6 py-3 text-base font-semibold text-[#d7f5ec] transition-colors hover:bg-[#0a4635] ${focusRing}`;

const today = () => new Date().toISOString().slice(0, 10);

/* ---------- small shared pieces ---------- */

const Modal = ({ title, onClose, size = "max-w-lg", children }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0a4635]/50 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`flex max-h-[92vh] w-full ${size} flex-col overflow-hidden rounded-t-3xl bg-white text-[#10654c] sm:rounded-3xl`}
      >
        <div className="flex items-center justify-between border-b border-[#bfe9dc] px-6 py-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className={`grid h-10 w-10 place-items-center rounded-full hover:bg-[#d7f5ec] ${focusRing}`}
          >
            <FaTimes />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-1.5 block text-[15px] font-semibold">{label}</span>
    {children}
  </label>
);

const AmenityPicker = ({ selected, onToggle }) => (
  <div className="grid grid-cols-2 gap-2">
    {AMENITIES.map(({ id, label, Icon }) => {
      const on = selected.includes(id);
      return (
        <button
          key={id}
          type="button"
          aria-pressed={on}
          onClick={() => onToggle(id)}
          className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-[15px] transition-colors ${focusRing} ${on
            ? "border-[#10654c] bg-[#10654c] text-[#d7f5ec]"
            : "border-[#bfe9dc] hover:bg-[#d7f5ec]"
            }`}
        >
          <Icon aria-hidden="true" /> {label}
        </button>
      );
    })}
  </div>
);

/* ---------- filters ---------- */

const FilterPanel = ({ minPrice, maxPrice, setMinPrice, setMaxPrice, selected, onToggle, onClear }) => (
  <div className="space-y-8">
    <div>
      <h3 className="mb-3 text-lg font-bold">Price per night</h3>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min="0"
          inputMode="numeric"
          aria-label="Minimum price in thousands of BIF"
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
          aria-label="Maximum price in thousands of BIF"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={inputCls}
        />
      </div>
      <p className="mt-2 text-sm">In thousands of BIF (k BIF)</p>
    </div>
    <div>
      <h3 className="mb-3 text-lg font-bold">Amenities</h3>
      <AmenityPicker selected={selected} onToggle={onToggle} />
    </div>
    <button
      type="button"
      onClick={onClear}
      className={`text-[15px] font-bold underline underline-offset-4 ${focusRing}`}
    >
      Clear all filters
    </button>
  </div>
);

/* ---------- hotel card ---------- */

const HotelCard = ({ hotel, liked, onLike, onBook }) => {
  const amenities = (hotel.fields || [])
    .map((f) => AMENITIES.find((a) => a.id === String(f).toLowerCase()))
    .filter(Boolean);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_0_#bfe9dc]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#bfe9dc]">
        <img
          src={hotel.profile}
          alt={hotel.hotelName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        {hotel.type && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-bold">
            <FaStar className="text-[#20c997]" aria-hidden="true" />
            {hotel.type}
          </span>
        )}
        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? "Remove from saved" : "Save hotel"}
          onClick={onLike}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white ${focusRing}`}
        >
          {liked ? <FaHeart className="text-rose-500" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold leading-snug">{hotel.hotelName}</h3>
        {hotel.location && (
          <p className="mt-1 flex items-center gap-1.5 text-[15px]">
            <FaMapMarkerAlt aria-hidden="true" /> {hotel.location}
          </p>
        )}
        <p className="mt-1 text-[15px] text-[#4d7a6b]">
          Hosted by {hotel.ownName}
          {hotel.date ? ` · ${hotel.date}` : ""}
        </p>

        {amenities.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Amenities">
            {amenities.slice(0, 4).map(({ id, label, Icon }) => (
              <li
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#d7f5ec] px-3 py-1 text-sm"
              >
                <Icon aria-hidden="true" /> {label}
              </li>
            ))}
            {amenities.length > 4 && (
              <li className="rounded-full bg-[#d7f5ec] px-3 py-1 text-sm">
                +{amenities.length - 4}
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          <p className="m-0">
            <span className="text-2xl font-bold">{hotel.price}k BIF</span>
            <span className="text-[15px]"> / night</span>
          </p>
          <button type="button" onClick={onBook} className={primaryBtn}>
            Book now
          </button>
        </div>
      </div>
    </article>
  );
};

/* ---------- booking modal ---------- */

const BookingModal = ({ hotel, onClose, onConfirm }) => {
  const [f, setF] = useState({ guestName: "", phone: "", checkIn: "", checkOut: "", guests: 1 });
  const set = (e) => setF((p) => ({ ...p, [e.target.name]: e.target.value }));

  const nights =
    f.checkIn && f.checkOut
      ? Math.round((new Date(f.checkOut) - new Date(f.checkIn)) / 86400000)
      : 0;
  const total = nights > 0 ? nights * hotel.price : 0;

  const submit = (e) => {
    e.preventDefault();
    if (!f.guestName.trim() || !f.phone.trim()) {
      toast.error("Enter your name and phone number.");
      return;
    }
    if (nights < 1) {
      toast.error("Choose a check-out date after check-in.");
      return;
    }
    onConfirm({ ...f, guests: Number(f.guests), nights, total });
  };

  return (
    <Modal title="Confirm your booking" onClose={onClose}>
      <div className="mb-6 flex items-center gap-4 rounded-2xl bg-[#d7f5ec] p-3">
        <img src={hotel.profile} alt="" className="h-20 w-24 rounded-xl object-cover" />
        <div>
          <p className="m-0 text-lg font-bold">{hotel.hotelName}</p>
          <p className="m-0 text-[15px]">{hotel.price}k BIF / night</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Check-in">
            <input type="date" name="checkIn" min={today()} value={f.checkIn} onChange={set} className={inputCls} />
          </Field>
          <Field label="Check-out">
            <input type="date" name="checkOut" min={f.checkIn || today()} value={f.checkOut} onChange={set} className={inputCls} />
          </Field>
        </div>
        <Field label="Guests">
          <input type="number" name="guests" min="1" max="20" value={f.guests} onChange={set} className={inputCls} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name">
            <input type="text" name="guestName" value={f.guestName} onChange={set} className={inputCls} />
          </Field>
          <Field label="Phone number">
            <input type="tel" name="phone" value={f.phone} onChange={set} className={inputCls} />
          </Field>
        </div>

        <div className="flex items-center justify-between rounded-2xl border-2 border-[#bfe9dc] px-4 py-3">
          <span>
            {nights > 0
              ? `${nights} ${nights === 1 ? "night" : "nights"} × ${hotel.price}k BIF`
              : "Pick your dates to see the total"}
          </span>
          <span className="text-xl font-bold">{total > 0 ? `${total}k BIF` : "—"}</span>
        </div>

        <button type="submit" className={`${primaryBtn} w-full text-lg`}>
          Confirm booking
        </button>
      </form>
    </Modal>
  );
};

/* ---------- post hotel modal ---------- */

const EMPTY_HOTEL = {
  ownName: "", email: "", price: "", phone: "",
  hotelName: "", location: "", description: "", image: "", fields: [],
};

const PostHotelModal = ({ onClose, onSubmit }) => {
  const [f, setF] = useState(EMPTY_HOTEL);
  const set = (e) => setF((p) => ({ ...p, [e.target.name]: e.target.value }));
  const toggleAmenity = (id) =>
    setF((p) => ({
      ...p,
      fields: p.fields.includes(id) ? p.fields.filter((x) => x !== id) : [...p.fields, id],
    }));

  const onImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const image = await ImagetoBase(file);
    setF((p) => ({ ...p, image }));
  };

  const submit = (e) => {
    e.preventDefault();
    const { ownName, email, price, phone, hotelName, location, description } = f;
    if (!ownName || !email || !price || !phone || !hotelName || !location || !description) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    if (Number(price) <= 0) {
      toast.error("Enter a price greater than 0.");
      return;
    }
    onSubmit(f);
  };

  return (
    <Modal title="Post your hotel" size="max-w-5xl" onClose={onClose}>
      <form onSubmit={submit} className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Owner's name">
            <input type="text" name="ownName" value={f.ownName} onChange={set} className={inputCls} />
          </Field>
          <Field label="Email">
            <input type="email" name="email" value={f.email} onChange={set} className={inputCls} />
          </Field>
          <Field label="Hotel name">
            <input type="text" name="hotelName" value={f.hotelName} onChange={set} className={inputCls} />
          </Field>
          <Field label="Location">
            <input type="text" name="location" value={f.location} onChange={set} className={inputCls} />
          </Field>
          <Field label="Price per night (k BIF)">
            <input type="number" min="1" name="price" value={f.price} onChange={set} className={inputCls} />
          </Field>
          <Field label="Phone number">
            <input type="tel" name="phone" value={f.phone} onChange={set} className={inputCls} />
          </Field>
        </div>

        <Field label="Short description">
          <textarea name="description" rows={3} value={f.description} onChange={set} className={`${inputCls} resize-y`} />
        </Field>

        <div>
          <p className="mb-1.5 text-[15px] font-semibold">What does it offer?</p>
          <AmenityPicker selected={f.fields} onToggle={toggleAmenity} />
        </div>

        <div>
          <p className="mb-1.5 text-[15px] font-semibold">Photo</p>
          <label className="relative flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#10654c] bg-[#f3fcf9] transition-colors hover:bg-[#d7f5ec] focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-[3px] focus-within:outline-[#0a4635]">
            <input type="file" accept="image/*" onChange={onImage} className="sr-only" />
            {f.image ? (
              <img src={f.image} alt="Selected hotel" className="h-full w-full object-cover" />
            ) : (
              <span className="flex flex-col items-center gap-2">
                <FaCamera className="text-3xl" aria-hidden="true" />
                Choose a photo
              </span>
            )}
          </label>
        </div>

        <button type="submit" className={`${primaryBtn} w-full text-lg`}>
          Post hotel
        </button>
      </form>
    </Modal>
  );
};

/* ---------- page ---------- */

const BookList = () => {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selected, setSelected] = useState([]);
  const [sort, setSort] = useState("recommended");
  const [liked, setLiked] = useState([]);
  const [posted, setPosted] = useState(() => getHotelsLocal());
  const [bookingHotel, setBookingHotel] = useState(null);
  const [showPost, setShowPost] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleAmenity = (id) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const clearFilters = () => {
    setQuery("");
    setMinPrice("");
    setMaxPrice("");
    setSelected([]);
  };
  const toggleLike = (id) =>
    setLiked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const hotels = useMemo(() => {
    const all = [...posted, ...SEED];
    const q = query.trim().toLowerCase();
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    const list = all.filter((h) => {
      const text = `${h.hotelName} ${h.ownName} ${h.location || ""}`.toLowerCase();
      if (q && !text.includes(q)) return false;
      if (h.price < min || h.price > max) return false;
      const have = (h.fields || []).map((x) => String(x).toLowerCase());
      return selected.every((a) => have.includes(a));
    });

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [posted, query, minPrice, maxPrice, selected, sort]);

  const chips = [];
  if (minPrice !== "" || maxPrice !== "") {
    chips.push({
      key: "price",
      label: `${minPrice || 0}k – ${maxPrice ? `${maxPrice}k` : "any"} BIF`,
      clear: () => {
        setMinPrice("");
        setMaxPrice("");
      },
    });
  }
  selected.forEach((id) =>
    chips.push({
      key: id,
      label: AMENITIES.find((a) => a.id === id).label,
      clear: () => toggleAmenity(id),
    })
  );

  const confirmBooking = (details) => {
    const h = bookingHotel;
    createBookingLocal({
      type: "hotel",
      hotelName: h.hotelName,
      ownName: h.ownName,
      price: h.price,
      location: h.location || "",
      ...details,
    });
    toast.success(`Booked ${h.hotelName} for ${details.nights} ${details.nights === 1 ? "night" : "nights"}.`);
    setBookingHotel(null);
  };

  const postHotel = (f) => {
    const result = createHotelLocal({
      ownName: f.ownName,
      email: f.email,
      price: Number(f.price),
      phone: f.phone,
      hotelName: f.hotelName,
      location: f.location,
      description: f.description,
      profile: f.image || hotel1,
      type: "New",
      date: new Date().toDateString(),
      fields: f.fields,
    });
    toast(result.message);
    setPosted(getHotelsLocal());
    setShowPost(false);
  };

  const filterProps = {
    minPrice, maxPrice, setMinPrice, setMaxPrice,
    selected, onToggle: toggleAmenity, onClear: clearFilters,
  };

  return (
    <main className="bg[#d7f5ec] px-4 pb-20 pt-20  font-medium text-[#10654c] md:px-10">
      <div className="mx-auto max-w-[110rem]">
        {/* Header + search */}
        <header className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Find your hotel
            </h1>
            <p className="m-0 text-lg">Search, compare, and book in a few taps.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowPost(true)}
            className={`inline-flex items-center gap-2 rounded-full border-2 border-[#10654c] px-6 py-3 text-base font-semibold transition-colors hover:bg-[#10654c] hover:text-[#d7f5ec] ${focusRing}`}
          >
            <FaPlus aria-hidden="true" /> Post your hotel
          </button>
        </header>

        <div className="mb-12 flex gap-3">
          <label className="relative block flex-1">
            <FaSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2"
            />
            <span className="sr-only">Search hotels</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by hotel, owner, or place"
              className={`w-full rounded-full border-2 border-transparent bg-white py-4 pl-12 pr-5 text-base text-[#0a4635] shadow-[0_4px_0_#bfe9dc] placeholder:text-[#5b8f7f] ${focusRing}`}
            />
          </label>
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className={`inline-flex items-center gap-2 rounded-full bg-[#10654c] px-6 text-base font-semibold text-[#d7f5ec] lg:hidden ${focusRing}`}
          >
            <FaFilter aria-hidden="true" /> Filters
            {chips.length > 0 && (
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#d7f5ec] text-sm text-[#10654c]">
                {chips.length}
              </span>
            )}
          </button>
        </div>

        <div className="grid items-start gap-10 lg:gridcols[280px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden rounded-2xl bg-white p-6 lg:sticky lg:top-6 lg:block">
            <FilterPanel {...filterProps} />
          </aside>

          {/* Results */}
          <section aria-label="Hotels">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p aria-live="polite" className="m-0 text-base">
                {hotels.length} {hotels.length === 1 ? "hotel" : "hotels"} found
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

            {chips.length > 0 && (
              <ul className="mb-5 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <li key={c.key}>
                    <button
                      type="button"
                      onClick={c.clear}
                      aria-label={`Remove filter ${c.label}`}
                      className={`inline-flex items-center gap-2 rounded-full bg-[#10654c] px-4 py-1.5 text-sm text-[#d7f5ec] ${focusRing}`}
                    >
                      {c.label} <FaTimes aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {hotels.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-3">
                {hotels.map((h) => (
                  <HotelCard
                    key={h._id}
                    hotel={h}
                    liked={liked.includes(h._id)}
                    onLike={() => toggleLike(h._id)}
                    onBook={() => setBookingHotel(h)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white px-7 py-14 text-center">
                <h2 className="mb-3 text-2xl font-bold">No hotels match your search</h2>
                <p className="mx-auto mb-6 max-w-[46ch] text-[17px] leading-relaxed">
                  Try a different name, widen the price range, or remove some amenities.
                </p>
                <button type="button" onClick={clearFilters} className={primaryBtn}>
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {showFilters && (
        <Modal title="Filters" onClose={() => setShowFilters(false)}>
          <FilterPanel {...filterProps} />
          <button
            type="button"
            onClick={() => setShowFilters(false)}
            className={`${primaryBtn} mt-8 w-full text-lg`}
          >
            Show {hotels.length} {hotels.length === 1 ? "hotel" : "hotels"}
          </button>
        </Modal>
      )}
      {bookingHotel && (
        <BookingModal
          hotel={bookingHotel}
          onClose={() => setBookingHotel(null)}
          onConfirm={confirmBooking}
        />
      )}
      {showPost && <PostHotelModal onClose={() => setShowPost(false)} onSubmit={postHotel} />}
    </main>
  );
};

export default BookList;