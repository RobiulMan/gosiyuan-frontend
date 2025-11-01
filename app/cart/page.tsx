"use client";
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import HeadLabel from "../components/HeadLebel";
import SiglePageHeroSection from "../components/SiglePageHeroSection";

import HomeChargerCover from "@/public/singlepagecover/homecharger.png";
import ProductCartCardList from "../components/ProductCartCardList";
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
import { useEffect, useState } from "react";
import { selectCartItems } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";
import CartSkeletonList from "../components/skeleton/CartSkeletonList";
import { makePaymentRequest } from "@/lib/api";
import OrderLoadingOverlay from "../components/skeleton/OrderLoadingOverlay";

export default function ShippingCartPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState<
    "loading" | "processing" | "success" | null
  >(null);
  const [orderNumber, setOrderNumber] = useState<string>("");

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "",
  });

  const cartItems = useAppSelector(selectCartItems);
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const totalItems = cartItems?.reduce(
    (acc: number, item: any) => acc + item.quantityPrice,
    0,
  );

  const handleInputChange = (field: string, value: string) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePayment = async () => {
    try {
      // Validate required fields
      if (
        !customerData.name ||
        !customerData.email ||
        !customerData.address ||
        !customerData.phone
      ) {
        alert("Please fill in all required fields");
        return;
      }

      if (cartItems.length === 0) {
        alert("Your cart is empty");
        return;
      }

      // Show loading overlay - starts with "loading" status
      setOrderLoading("loading");

      // Simulate payment processing delay (2 seconds)
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // Change to "processing" status
      setOrderLoading("processing");

      // Generate unique order number
      const orderNumber = `COD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const orderData = {
        orderNumber,
        products: cartItems,
        paymentMethod: customerData.paymentMethod || "cod",
        paymentStatus: "pending",
        orderStatus: "confirmed",
        totalAmount: totalItems,
        customerEmail: customerData.email,
        customerDetails: {
          name: customerData.name,
          phone: customerData.phone,
          email: customerData.email,
        },
        shippingAddress: {
          address: customerData.address,
          // You can add more address fields here if needed
          street: customerData.address.split(",")[0] || "",
          city: customerData.address.split(",")[1] || "",
          country: customerData.address.split(",")[2] || "",
        },
      };

      console.log(orderData);

      const res = await makePaymentRequest("/api/cod-orders", orderData);

      if (res) {
        console.log("Order created successfully!", res);

        setOrderLoading("success");

        // Simulate order processing delay (2 seconds)
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.href = `/orders/${res.order.id}`;

        // Reset form
        setCustomerData({
          name: "",
          email: "",
          address: "",
          phone: "",
          paymentMethod: "",
        });
      }
    } catch (error) {
      console.error("Order creation failed:", error);

      setOrderLoading(null);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <HeadLabel />
      <Navbar />
      {/* Add the overlay component */}
      <OrderLoadingOverlay
        isOpen={orderLoading !== null}
        status={orderLoading || "loading"}
        orderNumber={orderNumber}
      />

      <SiglePageHeroSection
        imageSrc={HomeChargerCover}
        title="Shopping Cart"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shipping Cart" }]}
      />
      <div className="w-full bg-slate-50 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
        <h2 className="mt-20 mb-20 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Shipping Cart
        </h2>
        <main className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]  ">
          <div>
            <h1 className="text-2xl font-bold">Your Cart</h1>
            <div className="mt-4 space-y-4">
              {isLoading ? (
                <CartSkeletonList count={cartItems.length} />
              ) : cartItems.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Your cart is empty.
                </p>
              ) : (
                cartItems.map((item) => (
                  <ProductCartCardList item={item} key={item.id} />
                ))
              )}
            </div>
          </div>
          <div className="space-y-4  ">
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${totalItems > 0 ? totalItems : 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Taxes</span>
                  <span>$0.0</span>
                </div>
                <Separator className="dark:bg-slate-600" />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>${totalItems > 0 ? totalItems : 0}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-slate-800">
              <CardHeader>
                <CardTitle>Shipping &amp; Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
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
                    <Label htmlFor="email">Email *</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Main St, Anytown USA"
                    className="dark:border-slate-500"
                    value={customerData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="phone"
                    placeholder="+1 234 567 890"
                    className="dark:border-slate-500"
                    value={customerData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="payment" className="mb-3.5">
                    Payment Method
                  </Label>
                  <Select
                    value={customerData.paymentMethod}
                    onValueChange={(value) =>
                      handleInputChange("paymentMethod", value)
                    }
                  >
                    <SelectTrigger className=" cursor-pointer w-full dark:bg-gray-900">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className="cursor-pointer dark:bg-slate-700 w-full">
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="credit-card">
                        Credit Card
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      </SelectItem>
                      <SelectItem value="paypal">
                        PayPal
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      </SelectItem>
                      <SelectItem value="apple-pay">
                        Apple Pay
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className="w-full cursor-pointer"
                  onClick={handlePayment}
                  disabled={
                    isLoading ||
                    cartItems.length === 0 ||
                    !customerData.paymentMethod ||
                    customerData.paymentMethod !== "cod"
                  }
                >
                  {isLoading
                    ? "Placing Order..."
                    : !customerData.paymentMethod
                      ? "Select Payment Method"
                      : customerData.paymentMethod !== "cod"
                        ? "Only COD Available"
                        : "Place Order"}
                </Button>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By placing your order, you agree to our{" "}
                  <Link href="#" className="underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
      <FooterSection />
    </>
  );
}
