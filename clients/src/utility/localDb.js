const KEYS = {
  users: "tbr_users",
  currentUser: "tbr_current_user",
  rents: "tbr_rents",
  rides: "tbr_rides",
  bookings: "tbr_bookings",
  chats: "tbr_chats",
};

const createId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getCurrentUser = () => read(KEYS.currentUser, null);
export const getUsersLocal = () => read(KEYS.users, []);

export const logoutCurrentUser = () => {
  localStorage.removeItem(KEYS.currentUser);
};

export const signUpLocal = (payload) => {
  const users = read(KEYS.users, []);
  const alreadyExists = users.some(
    (user) => user.email.toLowerCase() === payload.email.toLowerCase()
  );

  if (alreadyExists) {
    return { alert: false, message: "Email already exists." };
  }

  const newUser = {
    _id: createId("usr"),
    firstName: payload.firstName || "",
    lastName: payload.lastName || "",
    email: payload.email || "",
    password: payload.password || "",
    image: payload.image || "",
    phone: payload.phone || "",
  };

  users.push(newUser);
  write(KEYS.users, users);
  return { alert: true, message: "Signup successful.", data: newUser };
};

export const signInLocal = ({ email, password }) => {
  const users = read(KEYS.users, []);
  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() && item.password === password
  );

  if (!user) {
    return { alert: false, message: "Invalid email or password." };
  }

  write(KEYS.currentUser, user);
  return { alert: true, message: "Login successful.", data: user };
};

export const requestPasswordResetLocal = (email) => {
  const users = read(KEYS.users, []);
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return { alert: false, message: "No account found with this email." };
  }
  return {
    alert: true,
    message: "Reset link sent (demo mode). Please sign in with your current password.",
  };
};

export const createRentLocal = (payload) => {
  const rents = read(KEYS.rents, []);
  const newRent = { ...payload, _id: createId("rent"), createdAt: new Date().toISOString() };
  rents.unshift(newRent);
  write(KEYS.rents, rents);
  return { alert: true, message: "Rent posted successfully.", data: newRent };
};

export const getRentsLocal = () => read(KEYS.rents, []);

export const createRideLocal = (payload) => {
  const rides = read(KEYS.rides, []);
  const ride = { ...payload, _id: createId("ride"), createdAt: new Date().toISOString() };
  rides.unshift(ride);
  write(KEYS.rides, rides);
  return { alert: true, message: "Ride booked successfully.", data: ride };
};

export const getRidesLocal = () => read(KEYS.rides, []);

export const createBookingLocal = (payload) => {
  const bookings = read(KEYS.bookings, []);
  const booking = { ...payload, _id: createId("booking"), createdAt: new Date().toISOString() };
  bookings.unshift(booking);
  write(KEYS.bookings, bookings);
  return { alert: true, message: "Booking confirmed.", data: booking };
};

export const getBookingsLocal = () => read(KEYS.bookings, []);

export const createHotelLocal = (payload) => {
  const hotels = read("tbr_hotels", []);
  const hotel = { ...payload, _id: createId("hotel"), createdAt: new Date().toISOString() };
  hotels.unshift(hotel);
  write("tbr_hotels", hotels);
  return { alert: true, message: "Hotel posted successfully.", data: hotel };
};

export const getHotelsLocal = () => read("tbr_hotels", []);

export const getChatLocal = () => read(KEYS.chats, []);

export const createChatLocal = (payload) => {
  const chats = read(KEYS.chats, []);
  const message = {
    _id: createId("msg"),
    text: payload.text,
    sender: payload.sender || "Guest",
    createdAt: new Date().toISOString(),
  };
  chats.push(message);
  write(KEYS.chats, chats);
  return { alert: true, data: message };
};
