"use client";
import FooterSection from "@/app/components/FooterSection";
import Navbar from "@/app/components/Navbar";
import HeadLabel from "../components/HeadLebel";

import { Product } from "@/types/typeProduct";
import ProductCard from "../components/ProductCard";
import SiglePageHeroSection from "../components/SiglePageHeroSection";

import HomeChargerCover from "@/public/singlepagecover/homecharger.png";
import { useEffect, useState, useRef } from "react";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeletion";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [visibleItems, setVisibleItems] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true); // Separate initial loading state
  const [scrollLoading, setScrollLoading] = useState(false); // Loading state for infinite scrolling
  const observerRef = useRef<HTMLDivElement | null>(null);

  const itemsPerPage = 10; // Number of items to load per page

  // Fetch wishlist data from localStorage
  useEffect(() => {
    setInitialLoading(true); // Set initial loading to true before fetching
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
    setVisibleItems(storedWishlist.slice(0, itemsPerPage)); // Load the first page
    setInitialLoading(false); // Set initial loading to false after fetching
  }, []);

  // Infinite scrolling logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [wishlist, page]);

  const loadMoreItems = () => {
    if (scrollLoading) return; // Prevent multiple triggers
    setScrollLoading(true);

    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const newItems = wishlist.slice(startIndex, endIndex);
    if (newItems.length > 0) {
      setVisibleItems((prevItems) => [...prevItems, ...newItems]);
      setPage(nextPage);
    }
    setScrollLoading(false); // Reset scroll loading state
  };

  const handleRemoveFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product.id !== productId)
    );
    setVisibleItems((prevVisibleItems) =>
      prevVisibleItems.filter((product) => product.id !== productId)
    );
  };
  return (
    <>
      <HeadLabel />
      <Navbar />

      <SiglePageHeroSection
        imageSrc={HomeChargerCover}
        title="Favorites"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />
      <div className="w-full bg-slate-50 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
        <h2 className="mt-20 mb-20 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          My Favorites
        </h2>
        <div className="container flex justify-center space-x-5 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-center">
            {/* Render skeletons during initial loading */}
            {
              visibleItems.length > 0 ? (
                  visibleItems.map((product) => (
                    <ProductCard product={product} key={product.id} onRemove={handleRemoveFromWishlist}/>
                  ))
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    Your wishlist is empty.
                  </p>
                )}
          </div>
        </div>
        {/* Observer element */}
        <div ref={observerRef} className="h-10">
          {/* Render skeletons during infinite scrolling */}
          {/* {scrollLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={`scroll-${index}`} />
            ))} */}
        </div>
      </div>
      <FooterSection />
    </>
  );
}


// {initialLoading
//               ? Array.from({ length: itemsPerPage }).map((_, index) => (
//                   <ProductCardSkeleton key={index} />
//                 ))
//               : visibleItems.length > 0 ? (
//                   visibleItems.map((product) => (
//                     <ProductCard product={product} key={product.id} onRemove={handleRemoveFromWishlist}/>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-600 dark:text-gray-300">
//                     Your wishlist is empty.
//                   </p>
//                 )}