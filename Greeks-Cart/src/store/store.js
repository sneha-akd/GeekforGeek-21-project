import { configureStore } from "@reduxjs/toolkit";
import geeksReducer from "./geeksSlice";

export const store = configureStore({
  reducer: {
    geeks: geeksReducer,
  },
});