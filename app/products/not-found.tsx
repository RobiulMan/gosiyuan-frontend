"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeadLabel from "@/app/components/HeadLebel";
import Navbar from "@/app/components/Navbar";
import FooterSection from "@/app/components/FooterSection";


export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Auto-redirect after countdown
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, countdown * 1000);

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <>
      <HeadLabel />
      <Navbar />
      <div className="w-full min-h-[70vh] bg-slate-50 dark:bg-gray-900 py-12 flex items-center justify-center transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold text-emerald-500 opacity-20">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Page Not Found
              </h2>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
            We couldn't find the page you were looking for. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors duration-300"
            >
              Return Home
            </Link>
            <Link
              href="/categories"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-md transition-colors duration-300"
            >
              Browse Categories
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            Redirecting to homepage in {countdown} seconds...
          </p>
        </div>
      </div>
      <FooterSection />
    </>
  );
}