"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Search, X, TrendingUp, Clock, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface SearchResult {
  id: number;
  // Custom hook for debouncing
  name: string;
  slug: string;
  price: number;
  image?: { url: string };
  product_card_image?: { url: string };
  rating?: number;
}

interface SearchState {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
}

// Custom hook for search history
const useSearchHistory = (key: string = "search_history") => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      setHistory(stored ? JSON.parse(stored) : []);
    } catch (e) {
      console.error("Failed to load search history:", e);
    }
  }, [key]);

  const addToHistory = useCallback(
    (query: string) => {
      try {
        const updated = [query, ...history.filter((h) => h !== query)].slice(
          0,
          5,
        );
        setHistory(updated);
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save search history:", e);
      }
    },
    [history, key],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(key);
  }, [key]);

  return { history, addToHistory, clearHistory };
};

// Main SearchBar Component
export default function SearchBar() {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>({
    results: [],
    isLoading: false,
    error: null,
    totalResults: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [trendingQueries, setTrendingQueries] = useState<string[]>([]);

  const debouncedQuery = useDebounce(query, 300);
  const { history, addToHistory, clearHistory } = useSearchHistory();

  // Fetch trending queries (mock - replace with API)
  useEffect(() => {
    const mockTrending = ["Charger", "Battery", "Cable", "Power Bank"];
    setTrendingQueries(mockTrending);
  }, []);

  // Fetch search results
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setState({ results: [], isLoading: false, error: null, totalResults: 0 });
      return;
    }

    const controller = new AbortController();
    const fetchResults = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const response = await fetch(
          `/api/products/search?q=${encodeURIComponent(debouncedQuery)}&limit=8`,
          { signal: controller.signal },
        );

        if (!response.ok) throw new Error("Search failed");

        const data = await response.json();
        setState({
          results: data.results || [],
          isLoading: false,
          error: null,
          totalResults: data.total || data.results?.length || 0,
        });
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: "Failed to fetch results",
          }));
        }
      }
    };

    fetchResults();
    return () => controller.abort();
  }, [debouncedQuery]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getImageUrl = useCallback((result: SearchResult): string => {
    if (result?.product_card_image?.url) return result.product_card_image.url;
    if (Array.isArray(result?.image)) {
      return result.image[0]?.url || "/placeholder.png";
    }
    if (
      result?.image &&
      typeof result.image === "object" &&
      "url" in result.image
    ) {
      return (result.image as any).url;
    }
    return "/placeholder.png";
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        addToHistory(query);
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setIsOpen(false);
        setQuery("");
      }
    },
    [query, router, addToHistory],
  );

  const handleQuickSearch = useCallback(
    (searchTerm: string) => {
      addToHistory(searchTerm);
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setQuery("");
      setIsOpen(false);
    },
    [router, addToHistory],
  );

  const showDropdown =
    isOpen && (query.trim() || state.results.length > 0 || history.length > 0);

  // Memoize search results rendering
  const resultsList = useMemo(
    () =>
      state.results.map((result) => (
        <Link
          key={result.id}
          href={`/products/${result.slug}`}
          onClick={() => {
            addToHistory(query);
            setIsOpen(false);
            setQuery("");
          }}
          className="group flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
        >
          <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700">
            <Image
              src={getImageUrl(result)}
              alt={result.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {result.name}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ${result.price.toFixed(2)}
              </p>
              {result.rating && (
                <span className="text-xs text-yellow-500">
                  ★ {result.rating}
                </span>
              )}
            </div>
          </div>

          <Zap className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" />
        </Link>
      )),
    [state.results, query, addToHistory, getImageUrl],
  );

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center group">
          <Search className="absolute left-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setState({
                  results: [],
                  isLoading: false,
                  error: null,
                  totalResults: 0,
                });
                inputRef.current?.focus();
              }}
              className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Enhanced Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl z-50 overflow-hidden">
          {/* Loading State */}
          {state.isLoading && (
            <div className="p-8 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Searching...
              </p>
            </div>
          )}

          {/* Error State */}
          {state.error && !state.isLoading && (
            <div className="p-4 text-center text-red-600 dark:text-red-400 text-sm">
              {state.error}
            </div>
          )}

          {/* Results */}
          {!state.isLoading && state.results.length > 0 && (
            <>
              <div className="max-h-80 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 py-2 bg-gray-50 dark:bg-gray-700">
                  RESULTS ({state.totalResults})
                </div>
                {resultsList}
              </div>

              {/* View All Button */}
              <form
                onSubmit={handleSearch}
                className="border-t dark:border-gray-700"
              >
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-sm font-medium text-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  View all {state.totalResults} results
                </button>
              </form>
            </>
          )}

          {/* Trending or History */}
          {!state.isLoading &&
            query.trim() === "" &&
            (history.length > 0 || trendingQueries.length > 0) && (
              <>
                {/* Recent Searches */}
                {history.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        RECENT
                      </span>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1 p-2">
                      {history.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleQuickSearch(item)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors flex items-center gap-2 group"
                        >
                          <Clock className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                {trendingQueries.length > 0 && (
                  <div
                    className={
                      history.length > 0 ? "border-t dark:border-gray-700" : ""
                    }
                  >
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        TRENDING
                      </span>
                    </div>
                    <div className="space-y-1 p-2">
                      {trendingQueries.map((query) => (
                        <button
                          key={query}
                          onClick={() => handleQuickSearch(query)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors flex items-center gap-2 group"
                        >
                          <TrendingUp className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

          {/* No Results */}
          {!state.isLoading && query.trim() && state.results.length === 0 && (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No products found for <strong>"{query}"</strong>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
