/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface accountType{
    value: string
}

const accountSlice = createSlice({
  name: "Account",
  initialState: {
    value: "0x2219772388c4CCcCB8E5D71197965cee1B124622",
  } as accountType,
  reducers: {
    setAccount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAccount } = accountSlice.actions;
export default accountSlice.reducer;
