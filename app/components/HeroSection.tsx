"use client";
// HeroSection.tsx
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlugZap } from "lucide-react";
import coverimage from "@/public/cover.png";
import ProductCarousel from "@/app/components/ProductCarousel";
import homechargerLight from "@/public/menu-icons/Home phone charger 1.png";
import homechargerDark from "@/public/menu-icons/Home phone charger 2.png";
import carchargerLight from "@/public/menu-icons/car phone charger1.png";
import carchargerDark from "@/public/menu-icons/car phone charger2.png";
import wirelesschargerLight from "@/public/menu-icons/Wireless Charger1.png";
import powerbankLight from "@/public/menu-icons/Power Bank 1.png";
import datacableLight from "@/public/menu-icons/Data Cable1.png";
import earphoneandspeakerLight from "@/public/menu-icons/Earphones and Speaker1.png";
import carphoneholderLight from "@/public/menu-icons/car phone holder 1.png";
import auxcableLight from "@/public/menu-icons/AUX Cable1.png";
import darkitem from "@/public/heroimages/dark-item.png";
import { CategoryItem } from "@/types/types";

// Sample categories based on the image
const categories: CategoryItem[] = [
  {
    id: "homecharger",
    icon: homechargerLight,
    name: "Home Chargers",
    href: "/products/cotton-wool",
  },
  {
    id: "carcharger",
    icon: carchargerLight,
    name: "Car Chargers",
    href: "/products/deodorant",
  },
  {
    id: "wirelesscharger",
    icon: wirelesschargerLight,
    name: "Wireless Chargers",
    href: "/products/depilatories",
  },
  {
    id: "powerbank",
    icon: powerbankLight,
    name: "Power Bank",
    href: "/products/fragrance",
  },
  {
    id: "datacable",
    icon: datacableLight,
    name: "Data Cable",
    href: "/products/haircare",
  },
  {
    id: "earphoneandspeaker",
    icon: earphoneandspeakerLight,
    name: "Earphones and Speaker",
    href: "/products/household",
  },
  {
    id: "carphoneholder",
    icon: carphoneholderLight,
    name: "Car Phone Holder",
    href: "/products/skincare",
  },
  {
    id: "auxcable",
    icon: auxcableLight,
    name: "Aux Cable",
    href: "/products/oral-care",
  },
];

export default function HeroSection() {
  return (
    <section className="w-full bg-slate-50 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <div className="space-y-6">
            <p className="text-blue-500 dark:text-blue-400 font-medium tracking-wide uppercase">
              A HUGE RANGE OF
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
              Mobile Accessories Wholesale <br />
              Always Available for you.
            </h1>
            <div className="pt-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 dark:bg-emerald-700 dark:hover:bg-green-800"
                asChild
              >
                <Link href="/contact" className="uppercase">
                  Contact with us for first order..
                </Link>
              </Button>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative">
            <div className="bg-green-200  rounded-full h-[400px] w-[400px] ml-auto relative">
              <Image
                src={darkitem}
                alt="Featured brand products"
                width={400}
                height={400}
                className="absolute top-0 right-0"
              />
            </div>
          </div>
        </div>

        {/* Categories section with horizontal scroll */}
        <div>
          {/* Scrollable container with grab cursor */}
          <ProductCarousel items={categories} />
        </div>
      </div>
    </section>
  );
}

// {[...categories, ...categories].map((category, index) => (
//   <Link
//     href={category.href}
//     key={`${category.id}-${index}`}
//     className="flex-shrink-0 w-[160px] sm:w-[180px]"
//     onClick={(e) => isGrabbing && e.preventDefault()}
//   >
//     <Card className="flex flex-col items-center p-6 h-full hover:shadow-md transition-shadow dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">
//       <div className="w-12 h-12 mb-4">
//         <Image
//           src={category.icon}
//           alt={category.name}
//           width={48}
//           height={48}
//           className="dark:filter dark:invert"
//           draggable="false"
//         />
//       </div>
//       <span className="text-center text-sm font-medium text-slate-700 dark:text-slate-200">
//         {category.name}
//       </span>
//     </Card>
//   </Link>
// ))}
