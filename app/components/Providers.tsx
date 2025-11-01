"use client";

import { ReactNode } from "react";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { initializeCart } from "@/store/cartSlice";
import { initializeWishlist } from "@/store/wishlistSlice";

export function ReduxProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeCart());
    store.dispatch(initializeWishlist());
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
