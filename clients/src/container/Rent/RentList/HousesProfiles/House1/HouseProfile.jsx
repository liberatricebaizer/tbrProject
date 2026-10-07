



import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaImages,
  FaBed,
  FaBath,
  FaUtensils,
  FaTree,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import Rent1 from "../../../../../assets/rent1.jpg";
import Rent2 from "../../../../../assets/rent2.jpg";
import Rent3 from "../../../../../assets/rent3.jpg";
import Rent4 from "../../../../../assets/rent4.jpg";
import Profile from "../../../../../assets/baizer.jpg";
import Footer from "../../../../footer/Footer";

/* Palette: mint #d7f5ec, mint-deep #bfe9dc, green #10654c, green-dark #0a4635 */

const ALL_IMAGES = [Rent1, Rent2, Rent3, Rent4];

// Shown when the page is opened without a selected house. Edit as needed.
const DEFAULT_HOUSE = {
  title: "Use the entire accommodation space in a private house for a day",
  name: "Toussaint Iradukunda",
  location: "Kigobe, Bujumbura, Burundi",
  price: 500,
  rating: 4.96,
  reviews: 45,
  bedrooms: 10,
  bathrooms: 5,
  kitchens: 2,
  gardens: 1,
  image: Rent3,
  description:
    "A spacious private house with plenty of room for families and groups. Enjoy a quiet neighborhood, a garden, and full use of the kitchens and living areas. Contact the host to arrange your dates.",
};

const MORE_HOUSES = [
  ["Kigobe", 650, "Spacious home with good ventilation."],
  ["Gihosha", 750, "Family house, secure area."],
  ["Nyakabiga", 400, "Affordable room, great for students."],
  ["Cibitoke", 520, "Newly renovated apartment."],
].map(([location, price, description], i) => ({
  _id: `more_${i}`,
  name: "Toussaint",
  location,
  price,
  description,
  image: ALL_IMAGES[i % 4],
}));

const focusRing =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#0a4635]";

const Lightbox = ({ images, start, onClose }) => {
  const [i, setI] = useState(start);
  const next = () => setI((c) => (c + 1) % images.length);
  const prev = () => setI((c) => (c - 1 + images.length) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  });

  const btn = `absolute grid h-12 w-12 place-items-center rounded-full bg-white text-[#10654c] ${focusRing}`;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a4635]/45 p-4"
    >
      <button type="button" aria-label="Close gallery" onClick={onClose} className={`${btn} right-4 top-4`}>
        <FaTimes />
      </button>
      <button type="button" aria-label="Previous photo" onClick={prev} className={`${btn} left-4`}>
        <FaChevronLeft />
      </button>
      <img src={images[i]} alt={`Photo ${i + 1} of ${images.length}`} className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
      <button type="button" aria-label="Next photo" onClick={next} className={`${btn} right-4`}>
        <FaChevronRight />
      </button>
      <p className="absolute bottom-5 m-0 rounded-full bg-white px-4 py-1 text-sm font-bold text-[#10654c]">
        {i + 1} / {images.length}
      </p>
    </div>
  );
};

const HouseProfile = () => {
  const { state } = useLocation();
  const isDemo = !state?.house;
  const house = state?.house || DEFAULT_HOUSE;

  const [liked, setLiked] = useState(false);
  const [lightboxAt, setLightboxAt] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [state]);

  const main = house.image || Rent3;
  const gallery = [main, ...ALL_IMAGES.filter((img) => img !== main)];
  const title = house.title || `${house.name}'s house in ${house.location}`;

  const stats = [
    { Icon: FaBed, value: house.bedrooms, label: "Bedrooms" },
    { Icon: FaBath, value: house.bathrooms, label: "Bathrooms" },
    { Icon: FaUtensils, value: house.kitchens, label: "Kitchens" },
    { Icon: FaTree, value: house.gardens, label: "Garden" },
  ].filter((s) => s.value != null);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch (e) {
      /* share cancelled */
    }
  };

  const initials = String(house.name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Fragment>
      <main className="bg[#d7f5ec] px-4 pb-20 pt-20 font-medium text-[#10654c] md:px-10">
        <div className="mx-auto max-w-[110rem]">
          {/* Title row */}
          <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">{title}</h1>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-[15px]">
            <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1">
              {house.rating != null && (
                <span className="inline-flex items-center gap-1.5 font-bold">
                  <FaStar className="text-[#20c997]" aria-hidden="true" /> {house.rating}
                </span>
              )}
              {house.reviews != null && <span>{house.reviews} reviews</span>}
              <span className="inline-flex items-center gap-1.5">
                <FaMapMarkerAlt aria-hidden="true" /> {house.location}
              </span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={share}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold hover:bg-[#bfe9dc] ${focusRing}`}
              >
                <FaShareAlt aria-hidden="true" /> Share
              </button>
              <button
                type="button"
                aria-pressed={liked}
                onClick={() => setLiked((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold hover:bg-[#bfe9dc] ${focusRing}`}
              >
                {liked ? <FaHeart className="text-rose-500" aria-hidden="true" /> : <FaRegHeart aria-hidden="true" />}
                {liked ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div className="relative grid h-72 gap-3 overflow-hidden rounded-3xl md:h-[26rem] md:grid-cols-3 md:grid-rows-2">
            {gallery.slice(0, 3).map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => setLightboxAt(idx)}
                aria-label={`Open photo ${idx + 1}`}
                className={`overflow-hidden bg-[#bfe9dc] ${focusRing} focus-visible:-outline-offset-[3px] ${idx === 0 ? "md:col-span-2 md:row-span-2" : "hidden md:block"
                  }`}
              >
                <img
                  src={img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transition-none"
                />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setLightboxAt(0)}
              className={`absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[15px] font-bold shadow-[0_4px_0_#bfe9dc] ${focusRing}`}
            >
              <FaImages aria-hidden="true" /> Show all {gallery.length} photos
            </button>
          </div>

          {/* Details + rent card */}
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-10">
              <section className="flex items-center gap-4">
                {isDemo ? (
                  <img src={Profile} alt="" className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-[#10654c] text-xl font-bold text-[#d7f5ec]">
                    {initials}
                  </span>
                )}
                <div>
                  <h2 className="m-0 text-2xl font-bold">Hosted by {house.name}</h2>
                  <p className="m-0 text-[15px] text-[#4d7a6b]">{house.location}</p>
                </div>
              </section>

              {stats.length > 0 && (
                <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-4">
                  {stats.map(({ Icon, value, label }) => (
                    <li key={label} className="rounded-2xl bg-white p-5 shadow-[0_4px_0_#bfe9dc]">
                      <Icon className="mb-3 text-xl text-[#20c997]" aria-hidden="true" />
                      <p className="m-0 text-2xl font-bold">{value}</p>
                      <p className="m-0 text-[15px]">{label}</p>
                    </li>
                  ))}
                </ul>
              )}

              <section>
                <h2 className="mb-3 text-2xl font-bold">About this house</h2>
                <p className="m-0 max-w-[65ch] text-[17px] leading-relaxed text-[#0a4635]">
                  {house.description}
                </p>
              </section>
            </div>

            <aside className="rounded-3xl bg-white p-6 shadow-[0_4px_0_#bfe9dc] lg:sticky lg:top-6">
              <p className="m-0">
                <span className="text-3xl font-bold">{house.price}k BIF</span>
                <span className="text-[15px]"> / month</span>
              </p>
              <Link
                to="/RentForm"
                state={{ house }}
                className={`mt-5 block rounded-xl bg-[#10654c] px-6 py-3.5 text-center text-lg font-semibold text-[#d7f5ec] transition-colors hover:bg-[#0a4635] ${focusRing}`}
              >
                Rent now
              </Link>
              {(house.mobile || house.email) && (
                <div className="mt-4 grid gap-2">
                  {house.mobile && (
                    <a
                      href={`tel:${house.mobile.replace(/\s/g, "")}`}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#10654c] px-4 py-2.5 font-semibold hover:bg-[#d7f5ec] ${focusRing}`}
                    >
                      <FaPhoneAlt aria-hidden="true" /> Call host
                    </a>
                  )}
                  {house.email && (
                    <a
                      href={`mailto:${house.email}`}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#10654c] px-4 py-2.5 font-semibold hover:bg-[#d7f5ec] ${focusRing}`}
                    >
                      <FaEnvelope aria-hidden="true" /> Email host
                    </a>
                  )}
                </div>
              )}
              <p className="m-0 mt-4 text-center text-sm text-[#4d7a6b]">
                You will not be charged yet.
              </p>
            </aside>
          </div>

          {/* More houses */}
          <section className="mt-16" aria-label="More houses to rent">
            <h2 className="mb-5 text-2xl font-bold">More houses to rent</h2>
            <div className="-mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0">
              {MORE_HOUSES.map((h) => (
                <Link
                  key={h._id}
                  to="/HousesProfiles/House1"
                  state={{ house: h }}
                  className={`group w-64 shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-[0_4px_0_#bfe9dc] ${focusRing}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#bfe9dc]">
                    <img
                      src={h.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </div>
                  <div className="p-4">
                    <p className="m-0 flex items-center gap-1.5 font-bold">
                      <FaMapMarkerAlt aria-hidden="true" /> {h.location}
                    </p>
                    <p className="m-0 mt-1">
                      <span className="text-xl font-bold">{h.price}k BIF</span>
                      <span className="text-sm"> / month</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      {lightboxAt !== null && (
        <Lightbox images={gallery} start={lightboxAt} onClose={() => setLightboxAt(null)} />
      )}
      <Footer />
    </Fragment>
  );
};

export default HouseProfile;