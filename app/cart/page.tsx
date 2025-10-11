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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function ShippingCartPage() {
  const { cartItems } = useSelector((state: any) => state.cart);

  const totalItems = cartItems?.reduce(
    (acc: number, item: any) => acc + item.quantityPrice,
    0,
  );
  return (
    <>
      <HeadLabel />
      <Navbar />

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
              {cartItems.length === 0 ? (
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
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="dark:border-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="dark:border-slate-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Main St, Anytown USA"
                    className="dark:border-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="phone"
                    placeholder="+1 234 567 890"
                    className="dark:border-slate-500"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="payment" className="mb-3.5">
                    Payment Method
                  </Label>
                  <Select id="payment">
                    <SelectTrigger className=" cursor-pointer w-full dark:bg-gray-900">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent className=" cursor-pointer dark:bg-slate-700 w-full">
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="apple-pay">Apple Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full cursor-pointer  ">Place Order</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        {/* Observer element */}
        {/* <div ref={observerRef} className="h-10"> */}
        {/* Render skeletons during infinite scrolling */}
        {/* {scrollLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={`scroll-${index}`} />
            ))} */}
        {/* </div> */}
      </div>
      <FooterSection />
    </>
  );
}

// {initialLoading
//               ? Array.from({ length: itemsPerPage }).map((_, index) => (
//                   <ProductCardSkeleton key={index} />
//                 ))
//               : visibleItems.length > 0 ? (
//                   visibleItems.map((product) => (
//                     <ProductCard product={product} key={product.id} onRemove={handleRemoveFromWishlist}/>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-600 dark:text-gray-300">
//                     Your wishlist is empty.
//                   </p>
//                 )}
