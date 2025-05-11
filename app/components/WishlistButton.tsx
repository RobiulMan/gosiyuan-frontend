"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/typeProduct";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

const WishlistButton = ({
  product,
  onRemove,
}: {
  product: Product;
  onRemove?: (productId: number) => void; // Optional callback for parent notification
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if the product is in the wishlist after the component mounts
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.some((item: Product) => item.id === product.id));
  }, [product.id]);

  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isWishlisted) {
      // Remove product from wishlist
      const updatedWishlist = wishlist.filter(
        (item: Product) => item.id !== product.id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      // Notify parent component if onRemove is provided
      if (onRemove) {
        onRemove(product.id);
      }
    } else {
      // Add product to wishlist
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    setIsWishlisted(!isWishlisted);
  };

  return (
    <Button
      size="icon"
      className={`rounded-full ${
        isWishlisted
          ? "bg-emerald-400 text-white hover:bg-gray-700"
          : "bg-gray-700 text-white hover:bg-emerald-400"
      } cursor-pointer`}
      onClick={handleWishlistToggle}
    >
      <Heart className="h-5 w-5" />
    </Button>
  );
};

export default WishlistButton;