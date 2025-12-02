import Link from "next/link";
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
              Gosiyuan Wholesale Trading <br /> Supplies .
            </h1>
            <div className="pt-4 text-justify">
              <p className="dark:text-slate-100 tracking-wide text-gray-600 mt-5">
                Gosiyuan Wholesale Trading Supplies is one of the UK’s leading
                suppliers of wholesale branded toiletries, household products,
                mobile accessories, and electronics. We serve a wide variety of
                customers including household name retailers, distributors,
                wholesalers, chemists, pound stores, online stores, and the
                export market.
              </p>

              <p className="dark:text-slate-100 tracking-wide text-gray-600 mt-5">
                With over a decade of experience sourcing quality products at
                competitive prices, we pride ourselves on supplying exactly what
                our customers need — when they need it.
              </p>

              <p className="dark:text-slate-100 tracking-wide text-gray-600 mt-5">
                Our 15,000 sq ft warehouse and purpose-designed picking floor
                houses over 1,500 pallets of branded stock at any one time. This
                ensures a wide range of competitively priced, in-demand products
                with instant availability and next-day delivery options.
              </p>

              <p className="dark:text-slate-100 tracking-wide text-gray-600 mt-5">
                We’re committed to excellent customer service and tailored stock
                solutions. Additional services like weekly stock lists, an
                online catalogue, promotional email newsletters, and account
                facilities make ordering simple and efficient for our loyal
                client base.
              </p>
            </div>
            <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-slate-200 font-medium mb-2">
                Contact our team:
              </p>
              <div className="flex flex-col space-y-2">
                <Link
                  href="tel:+8615607358657"
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +86 15607 358-657
                </Link>

                <Link
                  href="mailto:support@gosiyuan.com"
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  support@gosiyuan.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </>
  );
}
