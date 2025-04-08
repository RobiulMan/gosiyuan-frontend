import Image from "next/image";

import airplane from "@/public/service-icons/airplane-green.png";
import customer from "@/public/service-icons/customer-service-green.png";
import money from "@/public/service-icons/money-green.png";
import quality from "@/public/service-icons/quality-assurance-green.png";

import { StaticImageData } from "next/image";

interface FeatureItem {
  icon: StaticImageData;
  title: string;
  description: string;
}

const ServiceLabel = () => {
  const features: FeatureItem[] = [
    {
      icon: airplane, // You'll need to create these SVG icons
      title: "UK's, US, CA, EUROP leading suppliers of",
      description: "wholesale mobile and electronic accessories products",
    },
    {
      icon: money,
      title: "a decade years experience",
      description: "securing quality products and competitive pricing",
    },
    {
      icon: quality,
      title: "Branded products with",
      description: "instant availability and next day delivery",
    },
    {
      icon: customer,
      title: "Excellent customer service",
      description: "and competitive stock solution",
    },
  ];

  return (
    <div className=" dark:bg-gray-800 w-full bg-gray-100 py-12 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4 px-4">
              <div className="flex-shrink-0">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600  dark:text-gray-200">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceLabel;
