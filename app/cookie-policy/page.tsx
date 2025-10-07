import FooterSection from "../components/FooterSection";
import HeadLabel from "../components/HeadLebel";
import Navbar from "../components/Navbar";
import SiglePageHeroSection from "../components/SiglePageHeroSection";
import Cover from "@/public/singlepagecover/about.png";
import CookiePolicyContent from "../components/CookiePolicyContent";

export default function CookiePolicyPage() {
    return (
        <>
            <HeadLabel />
            <Navbar />
            <SiglePageHeroSection
                imageSrc={Cover}
                title="Cookie Policy"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cookie Policy" }]}
            />
            <div className="dark:bg-gray-800">
                <CookiePolicyContent />
            </div>

            <FooterSection />
        </>
    );
}
