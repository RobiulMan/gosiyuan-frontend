import Image from "next/image";
import warehouseImage from "@/public/about/warehouse-Mobile-Accessories-Wholesale-Market.jpg";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="pt-32 w-full bg-slate-100 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
          {/* Left column - Text content */}

          <div className="space-y-6 ">
            <Image
              src={warehouseImage}
              alt="Featured brand products"
              className=" rounded-4xl"
            />
          </div>

          {/* Right column - Image */}
          <div>
            <p className="text-blue-500 dark:text-blue-400  mb-12 font-medium tracking-widest uppercase">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-600 dark:text-slate-100 leading-tight">
              Gosiyuan Wholesale  <br /> Trading Supplies.
            </h1>
            <div className="pt-6">
              <p className="dark:text-slate-200 text-gray-700 leading-relaxed text-base">
                Wholesale Trading Supplies is a leading provider of mobile and electronic
                accessories products to wholesalers and retailers in the UK and Europe.
              </p>

              <p className="mt-4 dark:text-slate-300 text-gray-600 leading-relaxed text-base">
                From our purpose built, Watford based warehousing unit, we are able to
                provide a large range of instantly available, bulk order products for
                next day delivery at competitive prices.
              </p>

              <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-slate-200 font-medium mb-2">
                  Contact our team:
                </p>
                <div className="flex flex-col space-y-2">
                  <Link
                    href="tel:+8615360539718"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    +86 15360 539-718
                  </Link>

                  <Link
                    href="mailto:support@gosiyuan.com"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    support@gosiyuan.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
