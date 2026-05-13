import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    setDataRent: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataRent } = rentSlice.actions;

export default rentSlice.reducer;
