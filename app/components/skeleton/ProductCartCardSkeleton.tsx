"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCartCardSkeleton = () => {
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-slate-800">
      {/* Product Image Skeleton */}
      <Skeleton className="w-20 h-20 flex-shrink-0 rounded-md" />

      {/* Product Details Skeleton */}
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Quantity Controls Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-sm" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Price Skeleton */}
      <div className="text-right min-w-[80px]">
        <Skeleton className="h-6 w-20 ml-auto" />
      </div>

      {/* Remove Button Skeleton */}
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  );
};

export default ProductCartCardSkeleton;
