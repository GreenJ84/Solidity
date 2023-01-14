/** @format */

import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "Account",
  initialState: {
    value: "",
  },
  reducers: {
    setAccount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {} = accountSlice.actions;
export default accountSlice;
