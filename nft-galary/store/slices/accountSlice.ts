/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface accountType{
    value: string
}

const accountSlice = createSlice({
  name: "Account",
  initialState: {
    value: "",
  } as accountType,
  reducers: {
    setAccount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;
