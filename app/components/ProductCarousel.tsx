"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { CategoryItem } from "@/types/types";

interface CardCarouselProps {
  items: CategoryItem[];
  itemsToShow?: number;
}

export default function ProductCarousel({
  items,
  itemsToShow = 5, // Default to showing 5 items at once
}: CardCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-screen-lg mx-left px-4"
    >
      <CarouselContent className="-ml-1">
        {items.map((item, index) => (
          <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/5">
            <Link href={item.href || "/"} className="block h-full ">
              <Card className="dark:bg-gray-700 hover:dark:bg-green-200 hover:bg-green-200 hover:dark:text-gray-800  w-full h-full  ">
                <CardContent className="flex aspect-square  items-center justify-center p-6 h-full">
                  <div className="flex flex-col items-center space-y-4">
                    <CardDescription className="text-center ">
                      <Image
                        src={item.icon.src}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="dark:filter "
                        draggable="false"
                      />
                    </CardDescription>
                    <CardTitle className="text-center text-sm ">
                      {item.name}
                    </CardTitle>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="size-12 cursor-pointer text-green-900 hover:dark:bg-green-300 hover:dark:text-gray-900" />
    </Carousel>
  );
}

// {[...categories, ...categories].map((category, index) => (
//   <Link
//     href={category.href}
//     key={`${category.id}-${index}`}
//     className="flex-shrink-0 w-[160px] sm:w-[180px]"
//     onClick={(e) => isGrabbing && e.preventDefault()}
//   >
//     <Card className="flex flex-col items-center p-6 h-full hover:shadow-md transition-shadow dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">
//       <div className="w-12 h-12 mb-4">
//         <Image
//           src={category.icon}
//           alt={category.name}
//           width={48}
//           height={48}
//           className="dark:filter dark:invert"
//           draggable="false"
//         />
//       </div>
//       <span className="text-center text-sm font-medium text-slate-700 dark:text-slate-200">
//         {category.name}
//       </span>
//     </Card>
//   </Link>
// ))}
