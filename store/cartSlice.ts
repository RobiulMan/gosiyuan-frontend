import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  quantityPrice?: number;
  imageUrl?: string;
}

export interface cartState {
  cartItems: CartItem[];
}

const initialState: cartState = {
  cartItems: [],
};

// Load cart from localStorage (only on client side)
const loadCartItemFromStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

// Save cart to localStorage
const saveCartItemToStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Initialize cart from localStorage
    initializeCart: (state) => {
      state.cartItems = loadCartItemFromStorage();
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartItems.find(
        (existingItem) => existingItem?.id === action.payload.id,
      );

      if (item) {
        // Update existing item quantity
        item.quantity += action.payload.quantity;
        item.quantityPrice = item.quantity * item.price;
      } else {
        // Add new item
        state.cartItems.push({
          ...action.payload,
          quantityPrice: action.payload.price * action.payload.quantity,
        });
      }

      // ✅ Save to localStorage
      saveCartItemToStorage(state.cartItems);
    },

    // Update item quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number | string; quantity: number }>,
    ) => {
      const item = state.cartItems.find(
        (existingItem) => existingItem.id === action.payload.id,
      );

      if (item) {
        item.quantity = action.payload.quantity;
        item.quantityPrice = item.quantity * item.price;

        // ✅ Save to localStorage
        saveCartItemToStorage(state.cartItems);
      }
    },

    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );

      // ✅ Save to localStorage
      saveCartItemToStorage(state.cartItems);
    },

    // Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];

      // ✅ Clear localStorage
      saveCartItemToStorage([]);
    },
  },
});

// Action creators
export const {
  initializeCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: cartState }) =>
  state.cart.cartItems;

export const selectCartTotal = (state: { cart: cartState }) =>
  state.cart.cartItems.reduce(
    (total, item) => total + (item.quantityPrice || item.price * item.quantity),
    0,
  );

export const selectCartCount = (state: { cart: cartState }) =>
  state.cart.cartItems.reduce((count, item) => count + item.quantity, 0);

export const selectCartItemById =
  (id: number | string) => (state: { cart: cartState }) =>
    state.cart.cartItems.find((item) => item.id === id);

export default cartSlice.reducer;
