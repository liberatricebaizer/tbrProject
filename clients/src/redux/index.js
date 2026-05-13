import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import rentReducer from "./rentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    rent: rentReducer,
  },
});
