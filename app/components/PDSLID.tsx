"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";

// Define types for our category items
interface CategoryItem {
  id: string;
  icon: string;
  name: string;
  href: string;
}

interface CardCarouselProps {
  items: CategoryItem[];
  itemsToShow?: number;
}

export default function CardCarousel({
  items,
  itemsToShow = 5, // Default to showing 5 items at once
}: CardCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate dimensions on mount and window resize
  useEffect(() => {
    const calculateDimensions = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.clientWidth;
        setContainerWidth(containerWidth);
        // Calculate card width based on container and items to show
        const newCardWidth = containerWidth / itemsToShow;
        setCardWidth(newCardWidth);
      }
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, [itemsToShow]);

  // Handle next slide
  const handleNext = () => {
    if (currentIndex < items.length - itemsToShow) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to beginning
      setCurrentIndex(0);
    }
  };

  // Handle previous slide
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Loop to end
      setCurrentIndex(items.length - itemsToShow);
    }
  };

  // Mouse and touch handlers for manual scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsGrabbing(true);
    setIsDragging(false);
    setStartX(e.pageX);
    if (carouselRef.current) {
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);

    if (isDragging && carouselRef.current) {
      // Snap to nearest card
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setCurrentIndex(
        Math.max(0, Math.min(newIndex, items.length - itemsToShow)),
      );

      // Smoothly scroll to the correct position
      carouselRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isGrabbing) return;

    e.preventDefault();
    setIsDragging(true);

    if (carouselRef.current) {
      const x = e.pageX;
      const walk = (startX - x) * 1.5;
      carouselRef.current.scrollLeft = scrollLeft + walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsGrabbing(true);
    setIsDragging(false);
    setStartX(e.touches[0].pageX);
    if (carouselRef.current) {
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isGrabbing) return;

    setIsDragging(true);

    if (carouselRef.current) {
      const x = e.touches[0].pageX;
      const walk = (startX - x) * 1.5;
      carouselRef.current.scrollLeft = scrollLeft + walk;
    }
  };

  const handleTouchEnd = () => {
    setIsGrabbing(false);

    if (isDragging && carouselRef.current) {
      // Snap to nearest card
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setCurrentIndex(
        Math.max(0, Math.min(newIndex, items.length - itemsToShow)),
      );

      // Smoothly scroll to the correct position
      carouselRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Card click handler
  const handleCardClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  // Update scroll position when currentIndex changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex, cardWidth]);

  return (
    <div className="relative mt-12 z-50">
      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrev}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 border-none"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      {/* Cards container */}
      <div
        ref={carouselRef}
        className={`overflow-hidden ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <div
          className="flex transition-transform"
          style={{
            width: `${items.length * cardWidth}px`,
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, index) => (
            <Link
              href={item.href}
              key={`${item.id}-${index}`}
              className="flex-shrink-0"
              style={{ width: `${cardWidth}px` }}
              onClick={handleCardClick}
            >
              <div className="px-2">
                <Card className="flex flex-col items-center p-6 h-full hover:shadow-md transition-shadow dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">
                  <div className="w-12 h-12 mb-4">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="dark:filter dark:invert"
                      draggable="false"
                    />
                  </div>
                  <span className="text-center text-sm font-medium text-slate-700 dark:text-slate-200">
                    {item.name}
                  </span>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 border-none"
      >
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
