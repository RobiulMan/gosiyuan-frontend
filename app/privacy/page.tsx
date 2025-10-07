import FooterSection from "../components/FooterSection";
import HeadLabel from "../components/HeadLebel";
import Navbar from "../components/Navbar";
import SiglePageHeroSection from "../components/SiglePageHeroSection";
import Cover from "@/public/singlepagecover/about.png";
import PrivacyPolicyContent from "../components/PrivacyPolicyContent";

export default function Privacy() {
    return (
        <>
            <HeadLabel />
            <Navbar />
            <SiglePageHeroSection
                imageSrc={Cover}
                title="Privacy"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
            />
            <div className="dark:bg-gray-800">
                <PrivacyPolicyContent />

            </div>

            <FooterSection />
        </>
    );
}
