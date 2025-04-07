import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import HeadLabel from "@/app/components/HeadLebel";
import { Metadata } from "next";

import HomeChargerCover from "@/public/singlepagecover/homecharger.png";
import SinglePageHeroSection from "@/app/components/SiglePageHeroSection";
import {
  fetchDataFromStrapi,
} from "@/lib/api";
import { notFound } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/types/typeProduct";




export async function generateStaticParams() {
  // Fetch categories instead of products
  const categories = await fetchDataFromStrapi(
    "/api/categories?fields[0]=slug",
    undefined,
    false,
    { next: { tags: ["categories"] } },
  );
  
  return categories.map((category) => ({ slug: category.slug }));
}


export default async function SingleCategory(
  {
    params,
  }: {
    params: Promise<{ slug: string }>
  }

) {
  const {slug} = await params;
  const products = await fetchDataFromStrapi(
    "/api/products?populate=*",
    undefined,
    false,
    { next: { tags: ["categories/slug"] } },
  );

  // Handle no products case
  if (!products || products.length === 0) {
    notFound();
  }
  const productFilterByCategory = products.filter(
    (product) =>
      product.categories &&
      product.categories.filter((category) => category.slug === slug).length > 0
  );
  const breadcrumbsText = slug
    .split("-")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <HeadLabel />
      <Navbar />
      <SinglePageHeroSection
        imageSrc={HomeChargerCover}
        title={breadcrumbsText}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: breadcrumbsText, href: `/categories/${slug}` },
        ]}
      />
      <div className="w-full bg-slate-50 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
        <h2 className=" mt-20 mb-20 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          {breadcrumbsText}
        </h2>
        <div className="container  flex justify-center space-x-5 mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center ">
            {/* data has to be rendred */}
            {productFilterByCategory.map((product: any) => (
              <ProductCard product={product as Product} key={product.id} />
            ))}
            {/* Example of a single product card */}
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
