import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import HeroSection from "./components/HeroSection";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { fetchDataFromStrapi } from "@/lib/api";
import { Product } from "@/types/typeProduct";
import AboutSection from "./components/About";
import HeadLabel from "./components/HeadLebel";
import ServiceLabel from "./components/ServiceLabel";
import { baseMetadata } from '@/lib/metadata';

export const metadata = baseMetadata;

export default async function Home() {
  const {data} = await fetchDataFromStrapi(
    "/api/products?populate=*",
    undefined,
    false,
    { next: { tags: ["products"], revalidate:3600 } },
  );

  return (
    <>
      <HeadLabel />

      <Navbar />
      <HeroSection />
      <AboutSection />
      <div className="w-full bg-slate-50 dark:bg-gray-900 py-18 relative overflow-hidden transition-colors duration-300 ">
        <h2 className=" mt-20 mb-20 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Our Products
        </h2>
        <div className="container flex justify-center space-x-5 mx-auto px-4">
          <div
            className="grid  items-center

  grid-cols-1   
  md:grid-cols-3   
            xl:grid-cols-5
  gap-12 

            "
          >
            {data?.map((product) => (
              <ProductCard product={product as Product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
      <ServiceLabel />
      <FooterSection />
    </>
  );
}
