"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

import darkitem from "@/public/heroimages/dark-item.png";

const ProductCard = () => {
  return (
    <Card className="group w-64 overflow-hidden shadow-md rounded-3xl dark:bg-slate-700 dark:border-none border-gray-200 py-0 ">
      <div className="p-4">
        <Badge
          variant="outline"
          className=" dark:text-white text-gray-900 border-1 border-gray-500   dark:border-gray-300 font-bold  rounded-full px-4 py-2 mb-4"
        >
          Pack Size: 12
        </Badge>

        <div className="flex justify-center p-2">
          <div className="relative h-32 w-full">
            {/* Main product image */}
            <div className="relative  h-32 mx-auto" style={{ width: "120px" }}>
              <Image
                src={darkitem}
                alt="A & E Dinosaur & Pirate Plasters Box"
                style={{ objectFit: "contain" }}
                className=" dark:filter  "
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-100 p-4 transition-colors duration-300  rounded-3xl group-hover:bg-emerald-200 hover:bg-emerald-200">
        <CardContent className="p-0">
          <h3 className="text-gray-700 text-md font-bold mb-1">
            A & E Dinosaur & Pirate Plasters 20&apos;s
          </h3>
        </CardContent>
        <CardFooter className="p-0  flex justify-between">
          <p className=" text-sm text-gray-700 font-medium">£7.40 + VAT</p>
          <Button
            size="icon"
            className="rounded-full bg-gray-700 text-white hover:bg-gray-900 cursor-pointer "
          >
            <Heart className="h-5 w-5" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductCard;
