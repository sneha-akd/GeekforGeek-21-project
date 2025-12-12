import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenProducts: [], // products from API
  cartProducts: [],   // IDs of added products
};

// we need id, and quantity in cart
// how do we store it? 
// option1: Store as array of tuple, eg: [[id1, qty1], [id2, qty2]]
// option2: Store as map/objc eg: { id1: qty1, id2: qty2 }
// Since we have decided cartProducts to be an array, we will go with option 1

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setScreenProducts: (state, action) => {
      state.screenProducts = action.payload;
    },
    setCartProducts: (state, action) => {
      // with array of array, we cannot use includes function, it only works with value equality
      // if (!state.cartProducts.includes(action.payload)) {
      let item = state.cartProducts.find((idQty) => idQty[0] == action.payload);
      if (!item) {
        state.cartProducts.push([action.payload, 1]); // add product ID
      } else {
        item[1] = item[1] + 1;
      }
    },
    removeCartProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (e) => e[0] !== action.payload
      );
    },
  },
});

export const { setScreenProducts, setCartProducts, removeCartProduct } =
  productSlice.actions;

export default productSlice.reducer;
