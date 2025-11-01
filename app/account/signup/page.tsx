import HeadLabel from "@/app/components/HeadLebel";
import Navbar from "@/app/components/Navbar";
import FooterSection from "@/app/components/FooterSection";
import { SignupForm } from "@/app/components/signup-form";
import Link from "next/link";
export default function SignupPage() {
  return (
    <>
      <HeadLabel />
      <Navbar />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 dark:bg-gray-900">
        <div className="w-full max-w-sm md:max-w-4xl ">
          <div className=" w-full text-center  mb-4 ">
            <Link href="/" className="text-2xl">
              gosiyuan.com
            </Link>
          </div>
          <SignupForm />
        </div>
      </div>
      <FooterSection />
    </>
  );
}
