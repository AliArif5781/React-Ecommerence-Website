import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./ApiSlice";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  wishlist: Product[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeToCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      if (!state.wishlist.some((item) => item.id === action.payload.id)) {
        state.wishlist.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const {
  addToCart,
  removeToCart,
  incrementQuantity,
  decrementQuantity,
  addToWishlist,
  removeFromWishlist,
} = cartSlice.actions;

export const calculateTotalPrice = (items: CartItem[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const QuantityValue = (items: CartItem[]) => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export default cartSlice.reducer;
