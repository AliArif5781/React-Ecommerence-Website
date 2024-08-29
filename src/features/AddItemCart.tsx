// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PictureItem } from "../pages/ShirtCustomization";

// Define CartItem using PictureItem to maintain consistency
export interface CartItem extends PictureItem {
  shirtType: string; // Type of shirt (white, black, etc.)
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const Slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItemToCart, clearCart } = Slice.actions;
export default Slice.reducer;
