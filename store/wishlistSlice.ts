import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/typeProduct";

interface WishlistState {
  wishlistItem: Product[];
}

const initialState: WishlistState = {
  wishlistItem: [],
};

// Load wishlist from localStorage (only on client side)
const loadWishlistFromStorage = (): Product[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

// Save wishlist to localStorage
const saveWishlistToStorage = (items: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Initialize wishlist from localStorage
    initializeWishlist: (state) => {
      state.wishlistItem = loadWishlistFromStorage();
    },

    // Add product to wishlist
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.wishlistItem.some(
        (item) => item.id === action.payload.id,
      );
      if (!exists) {
        state.wishlistItem.push(action.payload);
        saveWishlistToStorage(state.wishlistItem);
      }
    },

    // Remove product from wishlist
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.wishlistItem = state.wishlistItem.filter(
        (item) => item.id !== action.payload,
      );
      saveWishlistToStorage(state.wishlistItem);
    },

    // Toggle product in wishlist
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const index = state.wishlistItem.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.wishlistItem.splice(index, 1);
      } else {
        state.wishlistItem.push(action.payload);
      }
      saveWishlistToStorage(state.wishlistItem);
    },

    // Clear entire wishlist
    clearWishlist: (state) => {
      state.wishlistItem = [];
      saveWishlistToStorage([]);
    },
  },
});

export const {
  initializeWishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) =>
  state.wishlist.wishlistItem;

export const selectIsInWishlist =
  (productId: number) => (state: { wishlist: WishlistState }) =>
    state.wishlist?.wishlistItem.some((item) => item?.id === productId);

export const selectWishlistCount = (state: { wishlist: WishlistState }) =>
  state.wishlist.wishlistItem.length;

export default wishlistSlice.reducer;
