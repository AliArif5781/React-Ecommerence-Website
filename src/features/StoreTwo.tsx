// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from "./AddItemCart";
const storeTwo = configureStore({
  reducer: {
    cart: SliceReducer,
  },
});

export default storeTwo;
export type RootState = ReturnType<typeof storeTwo.getState>;
export type AppDispatch = typeof storeTwo.dispatch;
