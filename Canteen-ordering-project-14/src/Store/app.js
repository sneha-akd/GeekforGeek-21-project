import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurantData: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRestaurantData: (state, action) => {
      state.restaurantData = action.payload;
    },
  },
});

export const { setRestaurantData } = appSlice.actions;

export default appSlice.reducer;