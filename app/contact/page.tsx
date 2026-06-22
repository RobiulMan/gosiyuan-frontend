import ContactForm from "../components/ContactForm";
import FooterSection from "../components/FooterSection";
import HeadLabel from "../components/HeadLebel";
import Navbar from "../components/Navbar";
import SiglePageHeroSection from "../components/SiglePageHeroSection";
import Cover from "@/public/singlepagecover/about.png";
import JsonLd from "@/app/components/JsonLd/JsonLd";

export default function Contact() {
  return (
    <>
      <HeadLabel />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          inLanguage: "en-US",
          isPartOf: {
            "@type": "WebSite",
            name: "gosiyuan Wholesale Trading Supplies.",
            url: "https://gosiyuan.com",
          },
          about: {
            "@type": "Organization",
            name: "gosiyuan Wholesale Trading Supplies.",
            url: "https://gosiyuan.com",
            logo: "https://gosiyuan.com/logo.png",
            description:
              "gosiyuan Wholesale Trading Supplies . is a leading provider of mobile and electronic accessories products to wholesalers and retailers in the US, CA, UK and Europe.",
          },
          mainEntity: {
            "@type": "ContactPoint",
            telephone: "+86 15607 358-657",
            email: "contact@gosiyuan.com",
            contactType: "customer service",
            areaServed: ["US", "CA", "UK", "Europe"],
            availableLanguage: ["English"],
          },
          address: {
            "@type": "PostalAddress",
            streetAddress:
              "4C-12, 4C-13, Jia Nian Business Center, Building 204, Huaqiang North Shangbu Industrial District",
            addressLocality: "Futian District",
            addressRegion: "Shenzhen",
            addressCountry: "China",
          },
        }}
      />

      <Navbar />
      <SiglePageHeroSection
        imageSrc={Cover}
        title="Contact us"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <div className="dark:bg-gray-800">
        <ContactForm />
      </div>

      <FooterSection />
    </>
  );
}
