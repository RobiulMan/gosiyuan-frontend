import React from "react";
import { toast } from "sonner";

interface ProductData {
  name: string;
  imageUrl: string;
}

// Mock placeholder image URL for the example
const PLACEHOLDER_IMAGE = "https://placehold.co/40x40/333333/cccccc?text=P";

export const showAddToCartToast = (timeoutPromise: Promise<ProductData>) => {
  toast.promise(timeoutPromise, {
    loading: "Adding to cart...",
    // --- SUCCESS CUSTOM UI ---
    success: (data: ProductData) => (
      <div style={{ display: "flex", alignItems: "center", padding: "4px" }}>
        {/* Product Image */}
        <img
          src={data?.imageUrl || PLACEHOLDER_IMAGE}
          alt={data?.name || "Product"}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "6px",
            marginRight: "12px",
            objectFit: "cover",
          }}
          // Fallback in case the image URL is broken
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
        {/* Message Content */}
        <div>
          <strong style={{ display: "block", fontSize: "15px" }}>
            Success!
          </strong>
          <span style={{ fontSize: "13px", color: "#555" }}>
            {data?.name ? data.name.slice(0, 10).concat("...") : "Item"} added
            to cart.
          </span>
        </div>
      </div>
    ),
    // -------------------------
    error: "Failed to add item to cart. Please try again.",
  });
};

// Usage Example:
/*
import { showAddToCartToast } from "@/app/components/toast/ShowAddToCartToast";

const handleAddToCart = (product) => {
  const addPromise = new Promise<ProductData>((resolve, reject) => {
    // Your API call or logic here
    setTimeout(() => {
      resolve({
        name: product.name,
        imageUrl: product.imageUrl,
      });
    }, 1000);
  });

  showAddToCartToast(addPromise);
};
*/
