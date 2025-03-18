import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import HeroSection from "./components/HeroSection";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <>
      <div className="w-full dark:bg-emerald-900  font-bold text-center p-2 ">
        <p>
          Call for our wholesale price list{" "}
          <Link href="tel:+0111111111111" className="text-blue-300">
            +0111111111111
          </Link>
        </p>
      </div>
      <Navbar />
      <HeroSection />
      <div className="w-full bg-slate-50 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
        <h2 className=" mt-20 mb-20 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Our Products
        </h2>
        <div className="container  flex justify-center space-x-5 mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center ">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
