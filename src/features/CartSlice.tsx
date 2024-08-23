import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./ApiSlice";

// Extending Product to include quantity for cart items
export interface CartItem extends Product {
  quantity: number;
}

// The cart's initial state, an empty array of items
const initialState: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

const cartSlice = createSlice({
  name: "cart",
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
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeToCart: (state, action: PayloadAction<number>) => {
      const updatedState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const IncreaseAmount = state.find((item) => {
        return item.id === action.payload;
      });
      if (IncreaseAmount) {
        IncreaseAmount.quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const decrementAmount = state.find((item) => {
        return item.id === action.payload;
      });
      if (decrementAmount) {
        if (decrementAmount.quantity > 1) {
          decrementAmount.quantity -= 1;
        }
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, removeToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export const calculateTotalPrice = (state: CartItem[]) => {
  return state.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};
export const QuantityValue = (state: CartItem[]) => {
  return state.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
};
export default cartSlice.reducer;

// Extending Product to include quantity for cart items
// The cart's initial state, an empty array of items
// A new product is added to the cart with a quantity of 1. The spread operator (...) is used to copy all properties of action.payload into a new object, and quantity: 1 is added to this object.
