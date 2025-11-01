"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  validateQuantity,
  parseQuantity,
  isSafeQuantity,
} from "@/lib/helpers/quantityHelpers";
import { toast } from "sonner";

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
  maxQuantity = 100000,
}: QuantityButtonProps) => {
  const handleIncrement = () => {
    //if quantity is already at max, do nothing
    if (quantity >= maxQuantity) {
      toast.warning("Maximum quantity reached");
      return;
    }
    setQuantity((prev) => {
      const newValue = prev + 1;
      return validateQuantity(newValue, minQuantity, maxQuantity);
    });
  };

  const handleDecrement = () => {
    setQuantity((prev) => {
      const newValue = prev - 1;
      return validateQuantity(newValue, minQuantity, maxQuantity);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty input temporarily
    if (inputValue === "") {
      setQuantity(0); // Temporary, will be fixed on blur
      return;
    }

    // Parse and validate the quantity
    const parsed = parseQuantity(inputValue);

    // Check if it's a safe number
    if (isSafeQuantity(parsed)) {
      const validated = validateQuantity(parsed, minQuantity, maxQuantity);
      setQuantity(validated);
    }
  };

  const handleBlur = () => {
    // Ensure quantity is valid on blur
    const validated = validateQuantity(quantity, minQuantity, maxQuantity);
    if (validated !== quantity) {
      setQuantity(validated);
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
