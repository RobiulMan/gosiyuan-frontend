"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import QuantityButton from "@/app/components/QuantityButton";
import { addToCart } from "@/store/cartSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { showAddToCartToast } from "./toast/ShowAddToCartToast";

const PLACEHOLDER_IMAGE = "https://placehold.co/40x40/333333/cccccc?text=P";
interface ProductActionsProps {
  product: any; // Replace with your Product type
}

export default function ProductActions({ product }: ProductActionsProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    dispatch(addToCart({ ...product, quantity }) as any);

    const timeoutPromice = new Promise<{ name: string; imageUrl: string }>(
      (resolve) => {
        setTimeout(() => {
          resolve({ name: product.name, imageUrl: product.thumbnail.url });
          setIsAddingToCart(false);
        }, 1000);
      },
    );

    showAddToCartToast(timeoutPromice);
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, quantity }) as any);
    router.push("/checkout"); // or your cart page
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-4">
          ${product.price} USD
        </p>
        <Button
          size="icon"
          className="rounded-full bg-gray-700 text-white hover:bg-gray-900 cursor-pointer"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
        {product.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-8">
        {product.subtitle}
      </p>

      <div className="flex items-center">
        <div className="text-center md:text-left mt-8">
          <QuantityButton quantity={quantity} setQuantity={setQuantity} />
        </div>
        <div className="pt-4 w-full text-center md:text-left mt-8">
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 dark:bg-emerald-700 dark:hover:bg-green-800"
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>

      <div className="flex mt-5 items-center">
        <Button
          onClick={handleBuyNow}
          className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 dark:bg-emerald-700 dark:hover:bg-green-800"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
