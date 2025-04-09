import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function PaginationComponent({ currentPage, totalPages, baseUrl }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push(-1); // Use -1 as a marker for ellipsis
    }
    
    // Add pages in the calculated range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push(-2); // Use -2 as another marker for ellipsis
    }
    
    // Always show last page if it's not the first page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="my-8">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious href={`${baseUrl}?page=${currentPage - 1}`} />
          ) : (
            <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
        
        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === -1 || page === -2 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink 
                href={`${baseUrl}?page=${page}`} 
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        {/* Next Button */}
        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext href={`${baseUrl}?page=${currentPage + 1}`} />
          ) : (
            <PaginationNext href="#" className="pointer-events-none opacity-50" />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}