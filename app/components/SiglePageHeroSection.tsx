import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define the type for breadcrumb items
type BreadcrumbItem = {
  label: string;
  href?: string;
};

// Props type definition
type SinglePageHeroSectionProps = {
  imageSrc: string | StaticImageData;
  title: string;
  breadcrumbs?: BreadcrumbItem[];
};

export default function SinglePageHeroSection({
  imageSrc,
  title,
  breadcrumbs = [],
}: SinglePageHeroSectionProps) {
  return (
    <div className="relative w-full ">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-white ">
        {/* Title and Breadcrumb Container */}
        <div className="max-w-screen-xl mx-auto px-8 py-28 text-center flex flex-col items-center">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>

          {/* Shadcn Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList className="text-white">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <BreadcrumbSeparator />}
                  {crumb.href ? (
                    <BreadcrumbItem>
                      <BreadcrumbLink>
                        <Link href={crumb.href ? crumb.href : '/'}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}
