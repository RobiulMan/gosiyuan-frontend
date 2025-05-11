import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import HeadLabel from "@/app/components/HeadLebel";

import HomeChargerCover from "@/public/singlepagecover/homecharger.png";
import SinglePageHeroSection from "@/app/components/SiglePageHeroSection";
import { fetchCategories, fetchDataFromStrapi } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/types/typeProduct";

export async function generateStaticParams() {
  // Fetch categories instead of products
  const {data} = await fetchDataFromStrapi(
    "/api/categories?fields[0]=slug",
    undefined,
    false,
    { next: { tags: ["categories"] } },
  );

  return data.map((category) => ({ slug: category.slug }));
}

export default async function SingleCategory({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const  categoriesDatat = await fetchCategories(undefined, slug)


  // Handle no products case
  if (!categoriesDatat || categoriesDatat.length === 0) {
    notFound();
  }



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
        <div className="container  flex justify-center space-x-5 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8  items-center">   
            {/* data has to be rendred */}
            {categoriesDatat.map((product: any) => (
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
