import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import rentSliceReducer from "./rentSlice";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    rent: rentSliceReducer,
  },
});
