import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="group w-75 overflow-hidden shadow-md rounded-3xl dark:bg-slate-700 dark:border-none border-gray-200 py-0 ">
      <div className="p-4">
        <div className="flex justify-between">
          {/* Badge skeleton */}
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>

        {/* Image skeleton */}
        <div className="flex justify-center p-2">
          <div className="relative h-32 w-full">
            <div className="relative h-32 mx-auto" style={{ width: "140px" }}>
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-100 p-5 rounded-3xl">
        <CardContent className="p-0">
          {/* Title skeleton */}
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>

        <CardFooter className="p-0 mt-4 flex justify-between items-center">
          {/* Price badge skeleton */}
          <Skeleton className="h-6 w-24 rounded-full" />
          {/* Wishlist button skeleton */}
          <Skeleton className="h-9 w-9 rounded-full" />
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
