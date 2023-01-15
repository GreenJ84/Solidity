/** @format */

import { createSlice } from "@reduxjs/toolkit";

export interface collectionType {
  value: string;
}

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    value: "",
  } as collectionType,
  reducers: {
    setCollection: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
