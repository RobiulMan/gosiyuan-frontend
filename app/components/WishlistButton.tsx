"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/typeProduct";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleWishlist, selectIsInWishlist } from "@/store/wishlistSlice";

interface WishlistButtonProps {
  product: Product;
  onRemove?: (productId: number) => void;
}

const WishlistButton = ({ product, onRemove }: WishlistButtonProps) => {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsInWishlist(product.id));

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));

    if (isWishlisted && onRemove) {
      onRemove(product.id);
    }
  };

  return (
    <Button
      size="icon"
      className={`rounded-full ${
        isWishlisted
          ? "bg-emerald-400 text-white hover:bg-gray-700"
          : "bg-gray-900 text-white hover:bg-emerald-400"
      } cursor-pointer`}
      onClick={handleWishlistToggle}
    >
      <Heart className="h-5 w-5" />
    </Button>
  );
};

export default WishlistButton;
