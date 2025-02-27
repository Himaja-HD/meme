import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Create and configure Redux store
export const store = configureStore({
  reducer: {
    user: userReducer, // User state management
  },
});
