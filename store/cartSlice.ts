import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number | string;
  name: string; // Assuming a name exists
  price: number;
  quantity: number;
  quantityPrice?: number; // Optional field for calculated total price
  imageUrl?: string; // Optional: good for display purposes
}

export interface cartState {
  cartItems: CartItem[];
}

const initialState: cartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const item = state.cartItems.find(
        (existingItem) => existingItem?.id === action.payload.id,
      );
      if (item) {
        item.quantity += action.payload.quantity;
        item.quantityPrice = item.quantity * item.price;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantityPrice: action.payload.price * action.payload.quantity,
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
