import AboutSection from "../components/About";
import FooterSection from "../components/FooterSection";
import HeadLabel from "../components/HeadLebel";
import Navbar from "../components/Navbar";
import SiglePageHeroSection from "../components/SiglePageHeroSection";
import Cover from "@/public/singlepagecover/about.png";

export default function About() {
  return (
    <>
      <HeadLabel />

      <Navbar />
      <SiglePageHeroSection
        imageSrc={Cover}
        title="About us"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="pt-32 w-full bg-slate-100 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 w-1/2">
          {/* Right column - Image */}
          <div>
            <p className="text-blue-500 dark:text-blue-400 font-medium tracking-widest uppercase text-sp mb-12 ">
              WELCOME TO
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-600 dark:text-slate-100 leading-tight">
              Wholesale Trading <br /> Supplies Ltd.
            </h1>
            <div className="pt-4 text-justify">
              <p className=" dark:text-slate-100 tracking-wide text-gray-600 mt-5 ">
                Wholesale Trading Supplies is one of the UK’s leading suppliers
                of wholesale branded toiletries and household products,
                supplying a wide variety of customers including household name
                retailers, distributors, wholesalers, chemists, pound stores,
                online stores and the export market.
              </p>

              <p className=" dark:text-slate-100 tracking-wide text-gray-600 mt-5 ">
                With more than 50 years experience securing quality products and
                competitive pricing, we pride ourselves on being able to supply
                what our customers need when they need it.
              </p>
              <p className=" dark:text-slate-100 tracking-wide text-gray-600 mt-5 ">
                Our 15,000 sq ft warehouse and purpose designed picking ﬂoor
                houses over 1500 pallets of branded stock at any one time, and
                ensures a wide range of competitively priced, branded products
                with instant availability and next day delivery.
              </p>
              <p className=" dark:text-slate-100 tracking-wide text-gray-600 mt-5 ">
                We pride ourselves on our excellent customer service and
                competitive stock solutions, and add to this extra services such
                as weekly stock lists, an online catalogue, email newsletter
                promotions and account facilities, all designed to make
                purchasing stock easy for our loyal client base.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
