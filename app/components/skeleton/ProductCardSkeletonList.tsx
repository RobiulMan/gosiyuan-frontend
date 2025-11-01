"use client";

import ProductCardSkeleton from "./ProductCardSkeleton";

interface CartSkeletonListProps {
  count?: number;
}

const ProductCardSkeletonList = ({ count = 3 }: CartSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
};

export default ProductCardSkeletonList;
