import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import HeadLabel from "../components/HeadLebel";

import Cover from "@/public/singlepagecover/about.png";
import { Product } from "@/types/typeProduct";
import { fetchDataFromStrapi } from "@/lib/api";
import ProductCard from "../components/ProductCard";
import SiglePageHeroSection from "../components/SiglePageHeroSection";

import HomeChargerCover from "@/public/singlepagecover/homecharger.png";

export default async function ProductPage() {
  // const data = await fetchDataFromStrapi("/api/products?populate=*");

  const data = await fetchDataFromStrapi(
    "/api/products?populate=*",
    undefined,
    false,
    { next: { tags: ["products"], revalidate: 3600 } },
  );
  return (
    <>
      <HeadLabel />
      <Navbar />

      <SiglePageHeroSection
        imageSrc={HomeChargerCover}
        title="Products"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
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
