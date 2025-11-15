"use client";

import { Suspense } from "react";
import SearchPageSkeleton from "../components/skeleton/SearchPageSkeletion";
import SearchPageContent from "./SearchPageContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  );
}
