import { notFound } from "next/navigation";
import { Metadata } from "next";
import fetchDataFromStrapi from "@/lib/api";
import Navbar from "@/app/components/Navbar";
import FooterSection from "@/app/components/FooterSection";
import HeadLabel from "@/app/components/HeadLebel";
import Image from "next/image";
import ProductImageGallery from "@/app/components/ProductImageGallery";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const products = await fetchDataFromStrapi("", params.slug, true);
  const product = products[0];

  return product
    ? { title: product.name, description: product.subtitle }
    : { title: "Product Not Found" };
}

export async function generateStaticParams() {
  const products = await fetchDataFromStrapi("/api/products?fields[0]=slug");
  return products.map((product) => ({ slug: product.slug }));
}

export default async function SingleProductPage({ params }: any) {
  const products = await fetchDataFromStrapi("", params.slug, true);

  if (!products || products.length === 0) {
    notFound();
  }

  const product = products[0];
  if (!product) {
    notFound();
  }
  return (
    <>
      <HeadLabel />
      <Navbar />
      <div className="w-full bg-slate-50 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
        <div className="container flex justify-center mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full max-w-7xl">
            {/* Product image */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              {/* You'll need to render description based on its actual structure */}
              <div>
                <ProductImageGallery
                  images={product.image}
                  productName={product.name}
                />
              </div>
            </div>

            {/* Product details */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {product.subtitle}
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-4">
                ${product.price} USD
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
