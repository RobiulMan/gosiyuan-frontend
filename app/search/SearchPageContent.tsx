"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/app/components/Navbar";
import FooterSection from "@/app/components/FooterSection";
import ProductCard from "@/app/components/ProductCard";
import ProductCardSkeletonList from "@/app/components/skeleton/ProductCardSkeletonList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, ChevronLeft, Sparkles } from "lucide-react";
import HeadLabel from "../components/HeadLebel";

interface SearchResult {
  id: number;
  name: string;
  slug: string;
  price: number;
  image?: { url: string };
  product_card_image?: { url: string };
}

export default function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(query)}&limit=20`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to load results. Please try again.");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchInput.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchInput)}`);
      }
    },
    [searchInput, router],
  );

  const totalResults = results.length;

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
          {/* Header with back button */}
          <div className="flex items-center gap-3 mb-10">
            <Link href="/">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Search Results
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Find your perfect product
              </p>
            </div>
          </div>

          {/* Enhanced Search Box */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-30 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 px-5 py-4 shadow-sm hover:shadow-md dark:shadow-lg transition-shadow duration-300">
                  <Search className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for products, brands, categories..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base"
                  />
                  <Button
                    type="submit"
                    className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg px-6 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Results Info */}
          {!isLoading && !error && (
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {totalResults} {totalResults === 1 ? "result" : "results"}{" "}
                  found
                </p>
                {query && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Showing results for{" "}
                    <span className="font-medium text-gray-900 dark:text-white">
                      "{query}"
                    </span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-5 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-700 rounded-2xl mb-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-red-700 dark:text-red-300 font-medium">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ProductCardSkeletonList count={results.length || 8} />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8  items-center">
              {results.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard
                    product={
                      {
                        ...product,
                        subtitle: "",
                      } as any
                    }
                  />
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900/30 blur-2xl rounded-full opacity-50 scale-150"></div>
                <Search className="relative w-20 h-20 text-blue-400 dark:text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                No results found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-sm">
                We couldn't find any products matching{" "}
                <span className="font-semibold">"{query}"</span>. Try different
                keywords or explore our categories.
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg px-8 shadow-md hover:shadow-lg transition-all duration-200">
                  Back to Home
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-purple-200 dark:bg-purple-900/30 blur-2xl rounded-full opacity-50 scale-150"></div>
                <Search className="relative w-20 h-20 text-purple-400 dark:text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Start searching
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Type a product name, brand, or category in the search box above
              </p>
            </div>
          )}
        </div>
      </div>

      <FooterSection />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}
