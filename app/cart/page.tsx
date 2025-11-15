"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/cartSlice";
import { makePaymentRequest } from "@/lib/api";
// import { createLogger } from "@/lib/services/LoggerService";
// import type { LoggerService } from "@/lib/services/LoggerService";
//
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import HeadLabel from "../components/HeadLebel";
import SiglePageHeroSection from "../components/SiglePageHeroSection";
import ProductCartCardList from "../components/ProductCartCardList";
import CartSkeletonList from "../components/skeleton/CartSkeletonList";
import OrderLoadingOverlay from "../components/skeleton/OrderLoadingOverlay";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Link from "next/link";
import HomeChargerCover from "@/public/singlepagecover/homecharger.png";
import { createLogger, LoggerService } from "@/lib/logService/logService";
// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

interface CustomerData {
  name: string;
  email: string;
  address: string;
  phone: string;
  paymentMethod: string;
}

interface OrderData {
  orderNumber: string;
  products: Array<any>;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  totalAmount: number;
  customerEmail: string;
  customerDetails: {
    name: string;
    phone: string;
    email: string;
  };
  shippingAddress: {
    address: string;
    street: string;
    city: string;
    country: string;
  };
}

type OrderLoadingState = "loading" | "processing" | "success" | null;

const INITIAL_CUSTOMER_DATA: CustomerData = {
  name: "",
  email: "",
  address: "",
  phone: "",
  paymentMethod: "",
};

const PAYMENT_METHODS = [
  { value: "cod", label: "Cash on Delivery", available: true },
  { value: "credit-card", label: "Credit Card", available: false },
  { value: "paypal", label: "PayPal", available: false },
  { value: "apple-pay", label: "Apple Pay", available: false },
];

const SHIPPING_COST = 0;
const TAX_RATE = 0;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate unique order number
 */
const generateOrderNumber = (): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `COD-${timestamp}-${randomStr}`;
};

/**
 * Parse address into components
 */
const parseAddress = (addressString: string) => {
  const parts = addressString.split(",").map((s) => s.trim());
  return {
    street: parts[0] || "",
    city: parts[1] || "",
    country: parts[2] || "",
  };
};

/**
 * Calculate order totals
 */
const calculateTotals = (subtotal: number) => {
  const tax = subtotal * TAX_RATE;
  const shipping = SHIPPING_COST;
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total };
};

// ============================================================================
// VALIDATION
// ============================================================================

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate customer data before order submission
 */
const validateCustomerData = (
  data: CustomerData,
  cartItems: Array<any>,
): ValidationResult => {
  const errors: string[] = [];

  if (!data.name?.trim()) errors.push("Name is required");
  if (!data.email?.trim()) errors.push("Email is required");
  if (data.email && !data.email.includes("@"))
    errors.push("Invalid email format");
  if (!data.address?.trim()) errors.push("Address is required");
  if (!data.phone?.trim()) errors.push("Phone is required");
  if (!data.paymentMethod) errors.push("Payment method is required");
  if (data.paymentMethod !== "cod")
    errors.push("Only Cash on Delivery is currently available");
  if (cartItems.length === 0) errors.push("Your cart is empty");

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ShippingCartPage() {
  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState<OrderLoadingState>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>(
    INITIAL_CUSTOMER_DATA,
  );
  const [logger, setLogger] = useState<LoggerService | null>(null);

  // Redux Selectors
  const cartItems = useAppSelector(selectCartItems) || [];

  // Initialize Logger
  useEffect(() => {
    const sessionId = `checkout-${Date.now()}`;
    const loggerInstance = createLogger(sessionId, {
      sessionId,
    });

    setLogger(loggerInstance);
    loggerInstance.info("Checkout page loaded", {
      timestamp: new Date().toISOString(),
      page: "shipping-cart",
    });

    return () => {
      loggerInstance.destroy();
    };
  }, []);

  // Initialize Page
  useEffect(() => {
    const initializePage = async () => {
      try {
        if (!logger) return;

        await new Promise((resolve) => setTimeout(resolve, 500));

        logger.success("Checkout page initialized", {
          cartItemsCount: cartItems.length,
          formFields: ["name", "email", "address", "phone", "paymentMethod"],
        });
      } catch (error) {
        if (logger) {
          logger.critical(
            "Failed to initialize checkout page",
            error instanceof Error ? error : new Error(String(error)),
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [cartItems.length, logger]);

  // Calculations
  const subtotal = cartItems.reduce(
    (acc: number, item: any) => acc + (item.quantityPrice || 0),
    0,
  );
  const { tax, shipping, total } = calculateTotals(subtotal);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  /**
   * Handle form input changes
   */
  const handleInputChange = useCallback(
    (field: keyof CustomerData, value: string) => {
      setCustomerData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setValidationErrors([]);

      if (logger) {
        logger.debug("Form input changed", {
          field,
          hasValue: !!value,
        });
      }
    },
    [logger],
  );

  /**
   * Handle payment method change
   */
  const handlePaymentMethodChange = useCallback(
    (value: string) => {
      handleInputChange("paymentMethod", value);
      if (logger) {
        logger.debug("Payment method selected", {
          method: value,
        });
      }
    },
    [handleInputChange, logger],
  );

  /**
   * Handle order submission
   */
  const handlePayment = useCallback(async () => {
    if (!logger) return;

    const startTime = Date.now();

    try {
      // Log validation start
      logger.info("Order validation started", {
        hasName: !!customerData.name,
        hasEmail: !!customerData.email,
        hasAddress: !!customerData.address,
        hasPhone: !!customerData.phone,
        hasPaymentMethod: !!customerData.paymentMethod,
        cartItemsCount: cartItems.length,
      });

      // Validate
      const validation = validateCustomerData(customerData, cartItems);
      logger.logValidation(validation.isValid, validation.errors);

      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        return;
      }

      // Validation passed
      logger.logValidation(true);

      setOrderLoading("loading");

      // Generate order data
      const orderNumber = generateOrderNumber();
      const { street, city, country } = parseAddress(customerData.address);

      logger.logOrderEvent("created", orderNumber, {
        itemsCount: cartItems.length,
        totalAmount: total,
        paymentMethod: customerData.paymentMethod,
      });

      const orderData: OrderData = {
        orderNumber,
        products: cartItems,
        paymentMethod: customerData.paymentMethod,
        paymentStatus: "pending",
        orderStatus: "confirmed",
        totalAmount: total,
        customerEmail: customerData.email,
        customerDetails: {
          name: customerData.name,
          phone: customerData.phone,
          email: customerData.email,
        },
        shippingAddress: {
          address: customerData.address,
          street,
          city,
          country,
        },
      };

      logger.debug("Order data prepared", {
        orderNumber,
        itemCount: cartItems.length,
        totalAmount: total,
      });

      // Change to processing
      setOrderLoading("processing");
      logger.info("Order submission started", {
        orderNumber,
        stage: "processing",
      });

      // Submit order
      const response = await makePaymentRequest("/api/cod-orders", orderData);

      if (response?.order?.id) {
        const duration = Date.now() - startTime;

        logger.logPaymentTransaction(
          orderNumber,
          total,
          "success",
          customerData.paymentMethod,
          undefined,
        );

        logger.success("Order created successfully", {
          orderId: response.order.id,
          orderNumber,
          totalAmount: total,
          duration: `${duration}ms`,
        });

        setOrderLoading("success");

        logger.info("Redirecting to order confirmation", {
          orderId: response.order.id,
          redirectUrl: `/orders/${response.order.id}`,
        });

        // Redirect
        window.location.href = `/orders/${response.order.id}`;

        // Reset form
        setCustomerData(INITIAL_CUSTOMER_DATA);
        logger.success("Checkout form reset", {
          orderNumber,
        });
      } else {
        throw new Error("Invalid order response");
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      const err = error instanceof Error ? error : new Error(String(error));

      logger.logPaymentTransaction(
        generateOrderNumber(),
        total,
        "failed",
        customerData.paymentMethod,
        err,
      );

      logger.error("Order submission failed", err);

      setValidationErrors([
        "Failed to create order. Please try again or contact support.",
      ]);
      setOrderLoading(null);

      logger.logPerformanceMetric(
        "Order Processing Time",
        duration,
        "ms",
        5000,
      );
    }
  }, [customerData, cartItems, total, logger]);

  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  const isPaymentDisabled =
    isLoading ||
    cartItems.length === 0 ||
    !customerData.paymentMethod ||
    customerData.paymentMethod !== "cod" ||
    orderLoading !== null;

  const getButtonText = (): string => {
    if (isLoading) return "Loading...";
    if (orderLoading === "loading" || orderLoading === "processing")
      return "Processing Order...";
    if (!customerData.paymentMethod) return "Select Payment Method";
    if (customerData.paymentMethod !== "cod") return "Only COD Available";
    if (cartItems.length === 0) return "Cart Empty";
    return "Place Order";
  };

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <>
      <HeadLabel />
      <Navbar />

      <OrderLoadingOverlay
        isOpen={orderLoading !== null}
        status={orderLoading || "loading"}
        orderNumber={generateOrderNumber()}
      />

      <SiglePageHeroSection
        imageSrc={HomeChargerCover}
        title="Shopping Cart"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shipping Cart" }]}
      />

      <main className="w-full bg-slate-50 dark:bg-gray-900 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
            Shipping Cart
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
            {/* Cart Items Section */}
            <section>
              <h3 className="mb-4 text-2xl font-bold">Your Cart</h3>
              <div className="space-y-4">
                {isLoading ? (
                  <CartSkeletonList count={Math.max(cartItems.length, 3)} />
                ) : cartItems.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      Your cart is empty.
                    </p>
                    <Link href="/products">
                      <Button className="mt-4">Browse Products</Button>
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <ProductCartCardList key={item.id} item={item} />
                  ))
                )}
              </div>
            </section>

            {/* Checkout Section */}
            <aside className="space-y-4">
              {/* Order Summary Card */}
              <Card className="dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Shipping
                      </span>
                      <span className="font-medium">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {tax > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Taxes
                      </span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator className="dark:bg-slate-600" />
                  <div className="flex items-center justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping & Payment Card */}
              <Card className="dark:bg-slate-800">
                <CardHeader>
                  <CardTitle>Shipping &amp; Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="dark:border-slate-500"
                        value={customerData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="dark:border-slate-500"
                        value={customerData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="123 Main St, Anytown, USA"
                      className="dark:border-slate-500"
                      value={customerData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 234 567 890"
                      className="dark:border-slate-500"
                      value={customerData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label htmlFor="payment">
                      Payment Method <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={customerData.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                    >
                      <SelectTrigger className="cursor-pointer w-full dark:bg-gray-900">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent className="cursor-pointer dark:bg-slate-700 w-full">
                        {PAYMENT_METHODS.map((method) => (
                          <SelectItem
                            key={method.value}
                            value={method.value}
                            disabled={!method.available}
                          >
                            {method.label}
                            {!method.available && (
                              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Coming Soon
                              </span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Validation Errors */}
                  {validationErrors.length > 0 && (
                    <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                      <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                        Please fix the following errors:
                      </p>
                      <ul className="space-y-1">
                        {validationErrors.map((error, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-red-700 dark:text-red-400 flex items-start"
                          >
                            <span className="mr-2">•</span>
                            <span>{error}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    onClick={handlePayment}
                    disabled={isPaymentDisabled}
                    className="w-full cursor-pointer"
                    size="lg"
                  >
                    {getButtonText()}
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                    By placing your order, you agree to our{" "}
                    <Link
                      href="/terms-conditions"
                      className="underline hover:text-gray-700 dark:hover:text-gray-200 transition"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-gray-700 dark:hover:text-gray-200 transition"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </CardFooter>
              </Card>
            </aside>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
}
