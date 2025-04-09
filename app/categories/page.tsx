import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";


import HomeChargerCover from "@/public/singlepagecover/homecharger.png";
import { Product } from "@/types/typeProduct";
import { fetchDataFromStrapi, fetchPaginatedProducts } from "@/lib/api";
import ProductCard from "../components/ProductCard";
import SiglePageHeroSection from "../components/SiglePageHeroSection";
import Pagination from "@/app/components/Pagination";
import HeadLabel from "@/app/components/HeadLebel";


export default async function Categories({ searchParams }: { searchParams: Promise<{ page?: string }> }) {


  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const pageSize = 15;
  
  const { data, meta } = await fetchPaginatedProducts(currentPage, pageSize);
  
  const pagination = meta?.pagination;

  return (
    <>
      <HeadLabel />
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
        <Pagination currentPage={pagination?.page ||  1} totalPages={pagination?.pageCount || 1} baseUrl="/categories" />
      </div>
      <FooterSection />
    </>
  );
}
