import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./ProductSlice";

// Using a temp path for deployed build on github
export const basename = process.env.NODE_ENV === 'production' ? "/GeekforGeek-21-project/Ecommarce/dist" : "";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
  },
});