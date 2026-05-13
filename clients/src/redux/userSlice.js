import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  phone: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const { _id, firstName, lastName, email, image, phone } = action.payload.data;
      state._id = _id || "";
      state.firstName = firstName || "";
      state.lastName = lastName || "";
      state.email = email || "";
      state.image = image || "";
      state.phone = phone || "";
    },
    logoutRedux: (state) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
      state.phone = "";
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
