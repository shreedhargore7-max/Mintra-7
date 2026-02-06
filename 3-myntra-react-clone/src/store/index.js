import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import fetchStatusReducer from "./fetchStatusSlice";
import bagReducer from "./bagSlice";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    fetchStatus: fetchStatusReducer,
    bag: bagReducer,
  },
});

export default store;


