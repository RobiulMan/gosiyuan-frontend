"use client";

import React from "react";
import ProductCartCardSkeleton from "./ProductCartCardSkeleton";

interface CartSkeletonListProps {
  count?: number;
}

const CartSkeletonList = ({ count = 3 }: CartSkeletonListProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCartCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CartSkeletonList;
