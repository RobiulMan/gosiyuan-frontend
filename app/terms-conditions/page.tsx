import FooterSection from "../components/FooterSection";
import HeadLabel from "../components/HeadLebel";
import Navbar from "../components/Navbar";
import SiglePageHeroSection from "../components/SiglePageHeroSection";
import Cover from "@/public/singlepagecover/about.png";
import PrivacyPolicyContent from "../components/PrivacyPolicyContent";
import TermsConditionsContent from "../components/TermsConditionsContent";

export default function TermsConditionPage() {
    return (
        <>
            <HeadLabel />
            <Navbar />
            <SiglePageHeroSection
                imageSrc={Cover}
                title="Terms Conditions"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms Conditions" }]}
            />
            <div className="dark:bg-gray-800">
               <TermsConditionsContent />

            </div>

            <FooterSection />
        </>
    );
}
