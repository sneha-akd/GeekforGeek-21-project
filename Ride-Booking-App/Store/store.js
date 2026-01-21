import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app.js";
import { loadState, saveState } from "./localStorage.js";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    app: store.getState().app,
  });
});

export default store;
