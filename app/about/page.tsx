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
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <p>About Page</p>
        </main>
      </div>

      <FooterSection />
    </>
  );
}
