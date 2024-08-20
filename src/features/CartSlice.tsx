import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./ApiSlice"; // Import the Product type from your ApiSlice

// Extending Product to include quantity for cart items
export interface CartItem extends Product {
  quantity: number;
}

// The cart's initial state, an empty array of items
const initialState: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

const cartSlice = createSlice({
  name: "cart", // Slice name, used as a prefix for action types
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
        // A new product is added to the cart with a quantity of 1. The spread operator (...) is used to copy all properties of action.payload into a new object, and quantity: 1 is added to this object.
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeToCart: (state, action: PayloadAction<number>) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addToCart, removeToCart } = cartSlice.actions;
export default cartSlice.reducer;
