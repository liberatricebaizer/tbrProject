import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  rentList: [],
};
export const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    setDataRent: (state, action) => {
      console.log(action);
      state.rentList = [...action.payload];
    },
  },
});

export const { setDataRent } = rentSlice.actions;
export default rentSlice.reducer;
