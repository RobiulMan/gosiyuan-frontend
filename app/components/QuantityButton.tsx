"use client";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface QuantityButtonProps {
  quantity: number;
  setQuantity: (value: number | ((prev: number) => number)) => void;
  minQuantity?: number;
  maxQuantity?: number;
}

interface QuantityButtonProps {
  quantity: number;
  setQuantity: (value: number | ((prev: number) => number)) => void;
  minQuantity?: number;
  maxQuantity?: number;
}

const QuantityButton = ({
  quantity,
  setQuantity,
  minQuantity = 1,
  maxQuantity = 99,
}: QuantityButtonProps) => {
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Allow empty input
    if (newValue === "") {
      setQuantity(minQuantity);
      return;
    }

    const parsed = parseInt(newValue, 10);

    // Validate and set quantity
    if (!isNaN(parsed)) {
      if (parsed < minQuantity) {
        setQuantity(minQuantity);
      } else if (parsed > maxQuantity) {
        setQuantity(maxQuantity);
      } else {
        setQuantity(parsed);
      }
    }
  };

  const handleBlur = () => {
    // Ensure quantity is within bounds on blur
    if (quantity < minQuantity) {
      setQuantity(minQuantity);
    } else if (quantity > maxQuantity) {
      setQuantity(maxQuantity);
    }
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <Label className="flex items-center gap-2 text-sm leading-none font-medium select-none">
        Quantity
      </Label>
      <div className="relative inline-flex h-16 w-full items-center">
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer dark:bg-gray-900 h-9 rounded-r-none border-r-0"
          onClick={handleDecrement}
          disabled={quantity <= minQuantity}
          type="button"
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrement</span>
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          onBlur={handleBlur}
          min={minQuantity}
          max={maxQuantity}
          className="w-1/2 h-9 rounded-none dark:border-gray-900 border-x-0 text-center tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer dark:bg-gray-900 h-9 rounded-l-none border-l-0"
          onClick={handleIncrement}
          disabled={quantity >= maxQuantity}
          type="button"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increment</span>
        </Button>
      </div>
    </div>
  );
};

export default QuantityButton;
