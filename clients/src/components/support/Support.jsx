
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaCarSide,
  FaHotel,
  FaHome,
  FaIdBadge,
  FaUserCircle,
  FaThLarge,
  FaChevronDown,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const TOPICS = [
  { id: "all", label: "All topics", Icon: FaThLarge },
  { id: "ride", label: "Rides", Icon: FaCarSide },
  { id: "hotel", label: "Hotels", Icon: FaHotel },
  { id: "rent", label: "House rentals", Icon: FaHome },
  { id: "partner", label: "Work with us", Icon: FaIdBadge },
  { id: "account", label: "Account", Icon: FaUserCircle },
];

// Edit these answers so they match your real policies.
const FAQS = [
  {
    id: "ride-book",
    topic: "ride",
    q: "How do I book a ride?",
    a: "Open Take a Ride, enter your pick-up and drop-off places, and confirm. You can then follow your driver on the map until they arrive.",
  },
  {
    id: "ride-cancel",
    topic: "ride",
    q: "Can I cancel a ride after booking?",
    a: "Yes. Cancel from your ride details before the driver arrives. If the driver is already on the way, a cancellation fee may apply.",
  },
  {
    id: "ride-late",
    topic: "ride",
    q: "My driver is late or not moving. What should I do?",
    a: "Check the live map first. If the driver has not moved for several minutes, cancel and rebook, or message us in chat and we will help you right away.",
  },
  {
    id: "hotel-book",
    topic: "hotel",
    q: "How do I book a hotel room?",
    a: "Go to Book Now, choose a hotel, pick your dates and room, then confirm. You will see your booking in your account straight away.",
  },
  {
    id: "hotel-change",
    topic: "hotel",
    q: "Can I change my dates after booking?",
    a: "Yes, as long as the hotel has rooms free on the new dates. Open your booking, choose new dates, and save the change.",
  },
  {
    id: "rent-find",
    topic: "rent",
    q: "How do I find a house to rent?",
    a: "Open Rent Now and browse the houses and apartments listed. Each listing shows photos, location, price, and whether it is for short or long stays.",
  },
  {
    id: "rent-term",
    topic: "rent",
    q: "Can I rent for just a few days?",
    a: "Yes. Many listings allow short stays. The minimum stay is shown on each listing.",
  },
  {
    id: "partner-driver",
    topic: "partner",
    q: "How do I become a driver?",
    a: "Choose Work with Us on the home page, then Driver. Fill in the form with your details and vehicle information. Our team reviews it and contacts you.",
  },
  {
    id: "partner-list",
    topic: "partner",
    q: "How do I list my hotel or house?",
    a: "Choose Work with Us, then Renter. Add your property details and photos. Once approved, it appears on the website for customers to book.",
  },
  {
    id: "account-signup",
    topic: "account",
    q: "How do I create an account?",
    a: "Select Get Started on the home page and fill in the sign-up form. You need an account to book rides, rooms, and rentals.",
  },
  {
    id: "account-password",
    topic: "account",
    q: "I forgot my password.",
    a: "Use the forgot password link on the login page. If the email does not arrive, check your spam folder or contact us.",
  },
];

// Palette: mint #d7f5ec, mint-deep #bfe9dc, green #10654c, green-dark #0a4635
const focusRing =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#0a4635]";

const Support = ({ onOpenChat }) => {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [openId, setOpenId] = useState(null);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return FAQS.filter((item) => {
      if (topic !== "all" && item.topic !== topic) return false;
      const text = `${item.q} ${item.a}`.toLowerCase();
      return words.every((w) => text.includes(w));
    });
  }, [query, topic]);

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <main className=" bg[#0a4635]/45 bg-white font-medium text-[#10654c]">
      {/* Hero */}
      <section className="px-6 pb-8 pt-16 md:px-16 md:pb-12 md:pt-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            How can we help?
          </h1>
          <p className="mb-8 text-lg leading-relaxed md:text-xl">
            Search for an answer, or pick a topic below.
          </p>
          <label className="relative block">
            <FaSearch
              aria-hidden="true"
              className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-lg"
            />
            <span className="sr-only">Search help articles</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “cancel”, “driver”, or “password”"
              className={`w-full rounded-full border-2 border-transparent bg-white py-5 pl-14 pr-6 text-lg text-[#0a4635] shadow-[0_4px_0_#bfe9dc] placeholder:text-[#5b8f7f] ${focusRing}`}
            />
          </label>
        </div>
      </section>

      {/* Topics + answers */}
      <section className="px-6 pb-16 pt-6 md:px-16 md:pb-24 ">
        <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[240px_1fr] lg:gap-16">
          <nav
            aria-label="Help topics"
            className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-6 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {TOPICS.map(({ id, label, Icon }) => {
              const active = topic === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setTopic(id);
                    setOpenId(null);
                  }}
                  className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl border-2 px-4 py-3 text-left text-[17px] transition-colors motion-reduce:transition-none lg:border-transparent ${focusRing} ${active
                    ? "border-[#10654c] bg-[#10654c] text-[#d7f5ec]"
                    : "border-[#bfe9dc] text-[#10654c] hover:bg-[#bfe9dc]"
                    }`}
                >
                  <Icon aria-hidden="true" />
                  {label}
                </button>
              );
            })}
          </nav>

          <div>
            <p aria-live="polite" className="mb-3 text-[15px]">
              {results.length} {results.length === 1 ? "answer" : "answers"}
            </p>

            {results.length > 0 ? (
              <ul className="m-0 list-none divide-y divide-[#bfe9dc] overflow-hidden rounded-2xl  bg-[#d7f5ec] p-0">
                {results.map((item) => {
                  const open = openId === item.id;
                  return (
                    <li key={item.id}>
                      <h2 className="m-0 text-base">
                        <button
                          type="button"
                          id={`btn-${item.id}`}
                          aria-expanded={open}
                          aria-controls={`panel-${item.id}`}
                          onClick={() => toggle(item.id)}
                          className={`flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-[17px] font-semibold text-[#10654c] hover:bg-[#f3fcf9] md:px-7 md:py-6 md:text-xl ${focusRing} focus-visible:-outline-offset-[3px]`}
                        >
                          <span>{item.q}</span>
                          <FaChevronDown
                            aria-hidden="true"
                            className={`shrink-0 text-sm transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                      </h2>
                      <div
                        id={`panel-${item.id}`}
                        role="region"
                        aria-labelledby={`btn-${item.id}`}
                        className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p
                            className={`m-0 max-w-[62ch] px-5 text-[17px] leading-relaxed text-[#0a4635] md:px-7 ${open ? "pb-6" : ""
                              }`}
                          >
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="rounded-2xl bg-white px-7 py-12">
                <h2 className="mb-3 text-2xl font-bold">
                  Nothing found for “{query}”
                </h2>
                <p className="mb-6 max-w-[50ch] text-[17px] leading-relaxed">
                  Try fewer words or a different topic. Or ask us directly and
                  we will answer.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setTopic("all");
                  }}
                  className={`rounded-full bg-[#10654c] px-7 py-3 text-[17px] text-[#d7f5ec] transition-colors hover:bg-[#0a4635] ${focusRing}`}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[#10654c] px-6 py-16 text-[#d7f5ec] md:px-16 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-10">
          <div>
            <h2 className="mb-2 text-3xl font-bold leading-tight md:text-4xl">
              Still need help?
            </h2>
            <p className="text-lg">
              Our team answers every day. Choose the way that suits you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#d7f5ec] bg-[#d7f5ec] px-6 py-3 text-[17px] text-[#10654c] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#d7f5ec]"
            >
              Chat with us
            </button>
            <a
              href="mailto:support@tbragency.com"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#d7f5ec] px-6 py-3 text-[17px] transition-colors hover:bg-[#d7f5ec] hover:text-[#10654c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#d7f5ec]"
            >
              <FaEnvelope aria-hidden="true" /> support@tbragency.com
            </a>
            <a
              href="tel:+25700000000"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#d7f5ec] px-6 py-3 text-[17px] transition-colors hover:bg-[#d7f5ec] hover:text-[#10654c] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#d7f5ec]"
            >
              <FaPhoneAlt aria-hidden="true" /> +257 00 00 00 00
            </a>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="px-6 py-8 md:px-16">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-6 text-[17px]">
          <p className="m-0">Ready to go?</p>
          {[
            ["/Ride", "Take a Ride"],
            ["/Booking", "Book a Hotel"],
            ["/Rent", "Rent a House"],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={`font-bold underline underline-offset-4 ${focusRing}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Support;