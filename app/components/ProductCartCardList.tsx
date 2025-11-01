"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "@/store/cartSlice";
import Image from "next/image";
import { toast } from "sonner";
import { CartItem } from "@/types/typeProduct";

interface ProductCartCardListProps {
  item: CartItem;
}

const ProductCartCardList = ({ item }: ProductCartCardListProps) => {
  const dispatch = useDispatch();

  // Get image URL with proper fallback
  const getImageUrl = (): string => {
    if (item?.product_card_image?.url) {
      return item.product_card_image.url;
    }
    if (item?.image && Array.isArray(item.image) && item.image.length > 0) {
      return item.image[0]?.url || "/fallback-image.png";
    }
    if (item?.imageUrl) {
      return item.imageUrl;
    }
    return "/fallback-image.png";
  };

  const handleIncrement = () => {
    if (item.quantity >= 100000) {
      toast.warning("Maximum quantity reached");
      return;
    }
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item?.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      // Remove item if quantity would be 0
      dispatch(removeFromCart(item.id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const itemTotal = (item?.price * item?.quantity).toFixed(2);

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-slate-800 transition-all hover:shadow-md">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={getImageUrl()}
          fill
          alt={item?.name}
          className="rounded-md object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium truncate">
          {item?.name.slice(0, 30) || "Product Name"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {item?.subtitle ? item.subtitle.slice(0, 30) : "Product variant"}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          ${item?.price ? item.price.toFixed(2) : "0.00"}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          className="h-8 w-8 dark:bg-gray-900 cursor-pointer"
        >
          <MinusIcon className="h-4 w-4" />
        </Button>

        <div className="h-8 rounded-sm flex items-center gap-2 dark:bg-gray-900">
          <span className="w-20 text-center  font-medium overflow-hidden">
            {item?.quantity}
          </span>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          className="h-8 w-8 dark:bg-gray-900 cursor-pointer"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Price */}
      <div className="text-right min-w-[80px]">
        <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
          ${itemTotal}
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer"
      >
        <Trash2 className="h-4 w-4 " />
      </Button>
    </div>
  );
};

export default ProductCartCardList;
