"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

import darkitem from "@/public/heroimages/dark-item.png";
import { Product } from "@/types/typeProduct";
import Link from "next/link";
const ProductCard = ({ product }) => {
  return (
    <Card className="group w-64 overflow-hidden shadow-md rounded-3xl dark:bg-slate-700 dark:border-none border-gray-200 py-0 ">
      <Link href={`/product/${product?.slug}`}>
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
              <div
                className="relative  h-32 mx-auto"
                style={{ width: "140px" }}
              >
                <Image
                  src={
                    product?.product_card_image?.formats?.medium?.url ||
                    product?.image[0]?.formate.medium.url
                  }
                  alt={product?.name}
                  style={{ objectFit: "cover" }}
                  className=" dark:filter   "
                  width={220}
                  height={220}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="z-50 bg-emerald-100 p-5 transition-colors duration-300  rounded-3xl group-hover:bg-emerald-200 hover:bg-emerald-200">
        <CardContent className="p-0">
          <Link href={`/product/${product?.slug}`}>
            <h3 className="text-gray-700 text-md font-bold mb-1">
              {product.name.slice(0, 40)}...
            </h3>
          </Link>
        </CardContent>
        <CardFooter className="p-0  flex justify-between">
          <p className=" text-sm text-gray-700 font-medium">
            ${product?.price}
          </p>
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
