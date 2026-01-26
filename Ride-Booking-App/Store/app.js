import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const RIDE_COMPLETED = "Completed";
export const RIDE_CANCELLED = "Cancelled";
export const RIDE_VEHICLE_ECONOMY = "Economy";
export const RIDE_VEHICLE_COMFORT = "Comfort";
export const RIDE_VEHICLE_PREMIUM = "Premium";
export const RIDE_VEHICLE_XL = "XL";
export const RIDE_PAYMENT_WALLET = "wallet";

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
    paymentMode: RIDE_PAYMENT_WALLET,
    time: 0,
    cost: 0,
  },
  vehiclePrices: [],
  userStats: { rating: 4.8, rides: 47, saved: 2.5 },
  userData: {
    name: "Sneha Borkar",
    email: "borkar3232@gmail.com",
    phoneNumber: "7378895464",
    walletBalance: 500,
  },

  history: [
    { vehicle: RIDE_VEHICLE_ECONOMY, pickup: "Lokhanwala Complex", dropoff: "Viviana Mall", date: "2026-01-26", distance: 20, rating: 5, cost: 159, status: RIDE_COMPLETED },
    { vehicle: RIDE_VEHICLE_COMFORT, pickup: "Marine Drive", dropoff: "Gharkopar", date: "2026-01-12", distance: 11, rating: undefined, cost: undefined, status: RIDE_CANCELLED },
    { vehicle: RIDE_VEHICLE_XL, pickup: "Pink Palace", dropoff: "Amber Palace", date: "2026-01-14", distance: 33, rating: 3, cost: 780, status: RIDE_COMPLETED },
    { vehicle: RIDE_VEHICLE_PREMIUM, pickup: "DLF Club", dropoff: "Red Fort", date: "2026-01-02", distance: 50, rating: 5, cost: 886, status: RIDE_COMPLETED }
  ]
};

const getDistanceTime = () => {
  const km = (Math.random() * 14 + 1).toFixed(2);
  const speed = Math.floor(Math.random() * 60) + 20;  // kmph
  const minutes = Math.round((km / speed) * 60);  // min
  return { distance: parseFloat(km), time: minutes }
}

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
      state.bookingData.selectedDestination = action.payload;

      if (state.bookingData.pickupLocation && state.bookingData.pickupLocation.length > 0) {
        const { distance, time } = getDistanceTime()
        state.bookingData.distance = distance;
        state.bookingData.time = time;
      }
    },
    setPickupLocation: (state, action) => {
      state.bookingData.pickupLocation = action.payload;

      if (state.bookingData.selectedDestination && state.bookingData.selectedDestination.length > 0) {
        const { distance, time } = getDistanceTime()
        state.bookingData.distance = distance;
        state.bookingData.time = time;
      }
    },
    setVehiclePrices: (state, action) => {
      state.vehiclePrices = action.payload;
    },
    setSelectedVehicle: (state, action) => {
      const { name, price } = action.payload;
      state.bookingData.selectedVehicle = name;
      state.bookingData.cost = price;
    },
    setPaymentMode: (state, action) => {
      state.bookingData.paymentMode = action.payload;
    },
    clearBookingData: (state, _action) => {
      state.bookingData = { ...initialState.bookingData };
    },
    finishRide: (state, action) => {
      state.history.push({
        vehicle: state.bookingData.vehicle,
        pickup: state.bookingData.pickupLocation,
        dropoff: state.bookingData.selectedDestination,
        date: new Date().toLocaleDateString(),
        distance: state.bookingData.distance,
        rating: action.payload,
        cost: state.bookingData.cost,
        status: RIDE_COMPLETED
      });
      state.userData.walletBalance = state.userData.walletBalance - state.bookingData.cost;
      state.bookingData = { ...initialState.bookingData };
    },
    cancelRide: (state, action) => {
      state.history.push({
        vehicle: state.bookingData.vehicle,
        pickup: state.bookingData.pickupLocation,
        dropoff: state.bookingData.selectedDestination,
        date: new Date().toLocaleDateString(),
        distance: 0,
        rating: undefined,
        cost: 0,
        status: RIDE_CANCELLED
      })
      state.bookingData = { ...initialState.bookingData };
    }
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
  setPaymentMode,
  clearBookingData,
  finishRide,
  cancelRide
} = appSlice.actions;

export default appSlice.reducer;

