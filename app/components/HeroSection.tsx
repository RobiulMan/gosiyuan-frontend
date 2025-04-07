"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCarousel from "@/app/components/ProductCarousel";
import homechargerDark from "@/public/menu-icons/Home phone charger 1.png";
import carchargerDark from "@/public/menu-icons/car phone charger1.png";
import wirelesschargerDark from "@/public/menu-icons/Wireless Charger1.png";
import powerbankDark from "@/public/menu-icons/Power Bank 1.png";
import datacableDark from "@/public/menu-icons/Data Cable1.png";
import earphoneandspeakerDark from "@/public/menu-icons/Earphones and Speaker1.png";
import carphoneholderDark from "@/public/menu-icons/car phone holder 1.png";
import auxcableDark from "@/public/menu-icons/AUX Cable1.png";
import multifunctionalDark from "@/public/menu-icons/phone Multi Functional  1.png";
import screenprotector from "@/public/menu-icons/phone-screen-protector.png"
import darkitem from "@/public/heroimages/dark-item.png";
import { CategoryItem } from "@/types/types";

// Sample categories based on the image
const categories: CategoryItem[] = [
  {
    id: "homecharger",
    icon: homechargerDark,
    name: "Home Chargers",
    href: "/categories/home-chargers",
  },
  {
    id: "carcharger",
    icon: carchargerDark,
    name: "Car Chargers",
    href: "/categories/car-chargers",
  },
  {
    id: "wirelesscharger",
    icon: wirelesschargerDark,
    name: "Wireless Chargers",
    href: "/categories/wireless-chargers",
  },
  {
    id: "powerbank",
    icon: powerbankDark,
    name: "Power Bank",
    href: "/categories/power-bank",
  },
  {
    id: "datacable",
    icon: datacableDark,
    name: " Data Cable",
    href: "/categories/data-cable",
  },
  {
    id: "earphoneandspeaker",
    icon: earphoneandspeakerDark,
    name: " Earphones & Speaker",
    href: "/categories/earphones-and-speaker",
  },
  {
    id: "carphoneholder",
    icon: carphoneholderDark,
    name: "Car Phone Holder",
    href: "/categories/car-phone-holder",
  },
  {
    id: "Multi Funcaitonal",
    icon: multifunctionalDark,
    name: " Multi Funcaitonal",
    href: "/categories/multi-funcaitonal",
  },
  {
    id: "auxcable",
    icon: auxcableDark,
    name: " Aux Cable",
    href: "/categories/aux-cable",
  },  
  {
    id: "temperedglass",
    icon: screenprotector,
    name: "Tempered Glass",
    href: "/categories/tempered-glass",
  },
];







export default function HeroSection() {
  return (
    <section className="w-full bg-slate-100 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <div className="space-y-6">
            <p className="text-blue-500 dark:text-blue-400 font-medium tracking-wide uppercase">
              A HUGE RANGE OF
            </p>
            <h1 className="md:text-left text-center text-2xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
              Mobile Accessories Wholesale <br />
              Always Available for you.
            </h1>
            <div className="pt-4 text-center md:text-left">
              <Button
                className="  bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 dark:bg-emerald-700 dark:hover:bg-green-800"
                asChild
              >
                <Link href="/contact" className="uppercase">
                  Contact with us for first order..
                </Link>
              </Button>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative flex justify-center items-center w-full md:max-w-[500] mx-auto">
            <div
              className="bg-green-200 rounded-full 
    w-[300] h-[300] 
    md:w-[500] md:h-[500] 
    flex items-center justify-center 
    relative "
            >
              <Image
                src={darkitem}
                alt="Featured brand products"
                className="max-w-full max-h-full object-contain absolute md:-bottom-25 md:-right-10 -bottom-10 -right-5"
                style={{
                  transform: "scale(1.1)",
                  transformOrigin: "bottom right",
                }}
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
