import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Heart } from "lucide-react";
import { fetchDataFromStrapi } from "@/lib/api";
import Navbar from "@/app/components/Navbar";
import FooterSection from "@/app/components/FooterSection";
import HeadLabel from "@/app/components/HeadLebel";
import ProductImageGallery from "@/app/components/ProductImageGallery";
import RichTextRenderer from "@/app/components/RichTextRenderer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }>}): Promise<Metadata> {
  const {slug} = await params;
  if (!slug) {
    return { title: "Product Not Found" };
  }

  const { data } = await fetchDataFromStrapi("", slug, true, {
    next: { tags: ["products/slug"] },
  });

  const product = data[0];

  return product
    ? { title: product.name, description: product.subtitle }
    : { title: "Product Not Found" };
}

export async function generateStaticParams() {
  const { data } = await fetchDataFromStrapi(
    "/api/products?fields[0]=slug",
    undefined,
    false,
    { next: { tags: ["products"] } },
  );
  return data.map((product) => ({ slug: product.slug }));
}

export default async function SingleProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  if (!slug) {
    return notFound();
  }

  const { data } = await fetchDataFromStrapi("", slug, true, {
    next: { tags: ["products"] },
  });

  if (!data || data.length === 0) {
    notFound();
  }

  const product = data[0];
  if (!product) {
    notFound();
  }

  return (
    <>
      <HeadLabel />
      <Navbar />
      <div className="w-full bg-slate-50 dark:bg-gray-900 py-12 relative overflow-hidden transition-colors duration-300">
        <div className="container flex justify-center mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start w-full max-w-7xl">
            {/* Product image */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              {/* You'll need to render description based on its actual structure */}
              <div>
                <ProductImageGallery
                  images={product.image}
                  productName={product.name}
                />
              </div>
            </div>

            {/* Product details */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-4">
                  {/* ${product.price} USD */}
                </p>
                <Button
                  size="icon"
                  className="rounded-full bg-gray-700 text-white hover:bg-gray-900 cursor-pointer "
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-8">
                {product.subtitle}
              </p>

              <div className="pt-4 text-center md:text-left mt-8">
                <Button
                  className="  bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 dark:bg-emerald-700 dark:hover:bg-green-800"
                  asChild
                >
                  <Link href="/contact" className="uppercase">
                    Contact with us for first order..
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Product Description */}
        <div className="container flex w-1/2 justify-center mx-auto px-4 mt-12">
          <div className="bg-white dark:bg-transparent p-6 rounded-lg shadow-lg">
            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="cursor-pointer">
                  Product Description
                </TabsTrigger>
                <TabsTrigger
                  value="shippingandreturn"
                  className="cursor-pointer"
                >
                  Shipping & Return
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="text-justify">
                <RichTextRenderer content={product.description} />
              </TabsContent>
              <TabsContent value="shippingandreturn" className="text-justify">
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Our Return Policy
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-justify">
                  We prioritize your satisfaction and strive to make your
                  shopping experience with us risk-free and enjoyable. We
                  understand that you might need to return a product
                  occasionally. In that case, we offer a straightforward 30-day
                  return policy from the date you receive your item, with no
                  return costs.
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Returns Eligibility Products must be in the same condition as
                  when received - unworn, unused, with tags, and in the original
                  packaging. Proof of purchase is required. Please note,
                  steering wheels and wheels are custom products and may only be
                  returned due to quality issues.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Initiating a Return To start a return, please contact us at
                  support@infinaware.com or use our live chat. Once your return
                  is approved, we will send you instructions on how to return
                  your package. We are happy to cover the return shipping costs
                  for all non-defective or undamaged products. Damaged or
                  defective items will, of course, also be accepted for return.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  (The buyer will be required to pay return shipping costs for
                  refund requests arising from a temporary change in the buyer's
                  wishes.)
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Please remember, items sent back to us without first
                  requesting a return cannot be accepted. For any queries about
                  returns, contact us at support@infinaware.com.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Damages and Problems We encourage you to inspect your order
                  upon receipt. If the item is defective, damaged, or if you
                  received the wrong item, please contact us immediately so we
                  can evaluate the issue and make it right. Your 100%
                  satisfaction is our goal.
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Exceptions Certain types of items cannot be returned, such as
                  custom products, hazardous materials, flammable liquids or
                  gases. Regrettably, we also cannot accept returns on gift
                  cards. If you have queries about your specific item, don't
                  hesitate to contact us.
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Exchanges To ensure you get what you want as fast as possible,
                  we recommend that you return your item and place a new order
                  once your return is accepted.
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Refunds Once we receive and inspect your returned item, we
                  will notify you and inform you if the refund has been
                  approved. Approved refunds will be processed automatically to
                  your original payment method within 3-5 business days. Please
                  note, it may take some additional time for your bank or credit
                  card company to post the refund to your account.
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Note To expedite the return process, please ship via EMS and
                  declare the package as a testing sample with a value under
                  $100. Please avoid DHL/Fedex/UPS as these services may incur
                  customs detentions, high taxes, and potential delivery issues.
                  Losses incurred by selecting these express services for return
                  will be borne by the sender.
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Your satisfaction is paramount to us. We're always here to
                  help and make your return as easy as possible. Thank you for
                  choosing to shop with us!
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
