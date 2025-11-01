import HeadLabel from "@/app/components/HeadLebel";
import Navbar from "@/app/components/Navbar";
import { LoginForm } from "@/app/components/login-form";
import FooterSection from "@/app/components/FooterSection";
import Link from "next/link";
export default function LoginPage() {
  return (
    <>
      <HeadLabel />
      <Navbar />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 dark:bg-gray-900">
        <div className="w-full max-w-sm md:max-w-4xl">
          <div className=" w-full text-center  mb-4 ">
            <Link href="/" className="text-2xl">
              gosiyuan.com
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>
      <FooterSection />
    </>
  );
}
