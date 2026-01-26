import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";


const initialState = {
  savedPlaces: [
    { id: uuidv4(), type: "Home", icon: "home", address: "123 Downtown Home" },
    { id: uuidv4(), type: "Work", icon: "work", address: "256 Noida Home" },
    { id: uuidv4(), type: "Gym", icon: "gym", address: "123 Fitness World" },
  ],
  bookingData: {
    selectedDestination: "",
    pickupLocation: "",
    distance: 0,
    selectedVehicle: null,
    paymentMode: null,
  },
  vehiclePrices: [],
  userStats: { rating: 4.8, rides: 47, saved: 2.5 },
  userData: {
    name: "Sneha Borkar",
    email: "borkar3232@gmail.com",
    phoneNumber: "7378895464",
    walletBalance: 0,
  },

};



export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Pass number of hours to this function
    updateRidesAndHours: (state, action) => {
      state.userStats = {
        ...state.userStats,
        rides: state.userStats.rides + 1,
        saved: state.userStats.saved + action.payload,
      };
    },
    // Pass type as increment/decrement and balance
    updateWalletBalance: (state, action) => {
      let updatedBalance = state.userData.walletBalance;
      if (action.payload.type == "increment") {
        updatedBalance = updatedBalance + action.payload.balance;
      } else if (action.payload.type == "decrement") {
        updatedBalance = updatedBalance - action.payload.balance;
      }

      state.userData = {
        ...state.userData,
        walletBalance: updatedBalance,
      };
    },
    // Send updated userData as object
    updateProfileData: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
    // Pass the id of saved place in this
    deleteSavedPlaces: (state, action) => {
      let filteredPlaces = state.savedPlaces.filter(
        (data) => data.id != action.payload.id
      );
      state.savedPlaces = filteredPlaces;
    },

    setDestination: (state, action) => {
      console.log("setting destination location", action.payload)
      state.bookingData.selectedDestination = action.payload;
    },
    setPickupLocation: (state, action) => {
      console.log("setting pickup location", action.payload)
      state.bookingData.pickupLocation = action.payload;
    },
    setVehiclePrices: (state, action) => {
      state.vehiclePrices = action.payload;
    },
    setSelectedVehicle: (state, action) => {
      state.bookingData.selectedVehicle = action.payload;
    },
    setPaymentMode: (state, action) => {
      state.bookingData.paymentMode = action.payload;
    },
  },
});



export const {
  updateRidesAndHours,
  updateWalletBalance,
  updateProfileData,
  deleteSavedPlaces,
  setDestination,
  setPickupLocation,
  setVehiclePrices,
  setSelectedVehicle,
  setPaymentMode
} = appSlice.actions;

export default appSlice.reducer;

