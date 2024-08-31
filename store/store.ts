import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Add other reducers here if you have more
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
