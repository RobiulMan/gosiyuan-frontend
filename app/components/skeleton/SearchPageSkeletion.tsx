"use client";

import Navbar from "@/app/components/Navbar";
import FooterSection from "@/app/components/FooterSection";
import ProductCardSkeletonList from "@/app/components/skeleton/ProductCardSkeletonList";
import HeadLabel from "../HeadLebel";
export default function SearchPageSkeleton() {
  return (
    <>
      <HeadLabel />
      <Navbar />

      <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header skeleton */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div>
              <div className="h-10 w-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Search box skeleton */}
          <div className="mb-12">
            <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
          </div>

          {/* Results skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCardSkeletonList count={8} />
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
