import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PictureItem } from "../pages/ShirtCustomization";

export interface CartItem extends PictureItem {
  shirtType: string;
}

export interface CartState {
  items: CartItem[];
}

const loadCartFromLocalStorage = (): CartState => {
  const savedCart = localStorage.getItem("board");
  if (savedCart) {
    return {
      items: JSON.parse(savedCart),
    };
  }
  return { items: [] };
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      localStorage.setItem("board", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("board");
    },
    setCartFromLocalStorage(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("board", JSON.stringify(state.items));
    },
  },
});

export const { addItemToCart, clearCart, setCartFromLocalStorage, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
