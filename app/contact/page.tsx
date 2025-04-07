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
          "inLanguage": "en-US",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Excellusense Wholesale Trading Supplies Ltd.",
            "url": "https://excellusense.com"
          },
          "about": {
            "@type": "Organization",
            "name": "Excellusense Wholesale Trading Supplies Ltd.",
            "url": "https://excellusense.com",
            "logo": "https://excellusense.com/logo.png",
            "description": "Leading provider of big brand toiletry and household products to wholesalers and retailers"
          },
          "mainEntity": {
            "@type": "ContactPoint",
            "telephone": "+44-XXX-XXXX-XXX",
            "email": "contact@excellusense.com",
            "contactType": "customer service",
            "areaServed": ["US", "CA", "UK", "Europe"],
            "availableLanguage": ["English"]
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Watford based warehousing unit",
            "addressLocality": "Watford",
            "addressCountry": "UK"
          }
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
