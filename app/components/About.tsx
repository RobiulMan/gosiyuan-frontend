import Image from "next/image";
import warehouseImage from "@/public/about/warehouse-Mobile-Accessories-Wholesale-Market.jpg";

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
            <div className="pt-4">
              <p className=" dark:text-slate-100 tracking-wide text-gray-600 ">
                Wholesale Trading Supplies is a leading provider of mobile and electronic accessories  products to wholesalers and retailers in
                the UK and Europe. From our purpose built, Watford based
                warehousing unit, we are able to provide a large range of
                instantly available, bulk order products for next day delivery
                at competitive prices. For more information, please call our
                sales team today on +000 XXX XXX or email
                contact@gosiyuan.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
