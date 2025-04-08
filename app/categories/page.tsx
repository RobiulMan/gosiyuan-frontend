import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

import HomeChargerCover from "@/public/singlepagecover/homecharger.png";
import { Product } from "@/types/typeProduct";
import { fetchDataFromStrapi } from "@/lib/api";
import ProductCard from "../components/ProductCard";
import SiglePageHeroSection from "../components/SiglePageHeroSection";

export default async function Categories() {
  const data = await fetchDataFromStrapi(
    "/api/products?populate=*",
    undefined,
    false,
    { next: { tags: ["products"], revalidate: 3600 } },
  );

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
      <SiglePageHeroSection
        imageSrc={HomeChargerCover}
        title="Categories"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />
      <div className="w-full bg-slate-50 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
        <h2 className=" mt-20 mb-20 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Our Products
        </h2>
        <div className="container  flex justify-center space-x-5 mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center ">
            {/* data has to be rendred */}

            {data?.map((product) => (
              <ProductCard product={product as Product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
