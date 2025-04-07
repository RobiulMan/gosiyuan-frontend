"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { cn } from "@/lib/utils";

interface GalleryImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface ProductImageGalleryProps {
  images: GalleryImage[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Sync the Carousel API with our state
  useEffect(() => {
    if (!api) return;
    
    const onChange = (emblaApi: EmblaCarouselType) => {
      setCurrent(emblaApi.selectedScrollSnap());
    };

    api.on("select", onChange);
    return () => {
      api.off("select", onChange);
    };
  }, [api]);

  // If no images are provided, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Carousel */}
      <Carousel className="w-full mb-4" setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative">
              <div className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={image.url}
                  alt={image.alt || `${productName} image ${index + 1}`}
                  width={500}
                  height={500}
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2 w-10 h-10 border-none dark:bg-gray-500 cursor-pointer" />
            <CarouselNext className="right-2 w-10 h-10 border-none dark:bg-gray-500 cursor-pointer" />
          </>
        )}
      </Carousel>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "w-16 h-16 border-2 rounded-md overflow-hidden flex-shrink-0",
                current === index ? "border-blue-500" : "border-transparent"
              )}
            >
              <Image
                src={image.url}
                alt={image.alt || `${productName} thumbnail ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}