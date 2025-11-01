"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, Home, Printer, ChevronDown } from "lucide-react";
import Link from "next/link";
import { STRAPI_API_TOKEN, STRAPI_API_URL } from "@/lib/urls";
import Navbar from "@/app/components/Navbar";
import FooterSection from "@/app/components/FooterSection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  deliveryAddress: string;
}

// Transform Strapi API response to match your component's expected format
const transformStrapiOrder = (strapiOrder: any): Order => {
  const firstProduct = strapiOrder.products[0];
  console.log("First product in order:", firstProduct);

  return {
    orderId: strapiOrder.orderNumber,
    customerName: strapiOrder.customerDetails.name,
    customerEmail: strapiOrder.customerDetails.email,
    customerPhone: strapiOrder.customerDetails.phone,
    items: strapiOrder.products.map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
    })),
    subtotal: strapiOrder.totalAmount,
    tax: 0,
    shippingCost: 0,
    total: strapiOrder.totalAmount,
    paymentMethod: strapiOrder.paymentMethod,
    status: strapiOrder.orderStatus,
    createdAt: strapiOrder.createdAt,
    deliveryAddress:
      strapiOrder.shippingAddress.address || strapiOrder.shippingAddress.street,
  };
};

export default function InvoicePage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrderById = async () => {
      if (!orderId) {
        setError("Order ID not found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${STRAPI_API_URL || "http://localhost:1337"}/api/cod-orders?filters[id][$eq]=${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await res.json();

        if (data.orders?.results?.length > 0) {
          const strapiOrder = data.orders.results[0];
          const transformedOrder = transformStrapiOrder(strapiOrder);
          setOrder(transformedOrder);
        } else {
          throw new Error("Order not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading invoice");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderById();
  }, [orderId]);

  const downloadPDF = async () => {
    if (!order || !contentRef.current) return;

    setPdfLoading(true);
    try {
      // Import required libraries
      const jsPDF = (await import("jspdf")).jsPDF;
      const html2canvas = (await import("html2canvas")).default;

      const element = contentRef.current;

      // Create canvas from HTML element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice-${order.orderId}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Error generating PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  const handlePrint = () => {
    if (!contentRef.current || !order) return;

    const printWindow = window.open("", "", "width=900,height=600");
    if (printWindow) {
      const clonedContent = contentRef.current.cloneNode(true) as HTMLElement;
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice - ${order.orderId}</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                padding: 20px;
                background: white;
              }
              .invoice-container {
                max-width: 900px;
                margin: 0 auto;
              }
              .invoice-header {
                margin-bottom: 32px;
                padding-bottom: 32px;
                border-bottom: 1px solid #e5e7eb;
              }
              .invoice-header-content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 32px;
              }
              .invoice-title {
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 8px;
              }
              .order-number {
                margin-top: 8px;
                font-size: 14px;
              }
              .invoice-status {
                text-align: right;
              }
              .status-item {
                font-size: 14px;
                margin-bottom: 8px;
              }
              .customer-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 32px;
                margin-bottom: 32px;
              }
              .customer-info h3 {
                font-size: 12px;
                font-weight: 600;
                margin-bottom: 16px;
              }
              .customer-info p {
                margin: 4px 0;
                font-size: 14px;
              }
              .items-table {
                width: 100%;
                margin-bottom: 32px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              thead {
                border-bottom: 2px solid #d1d5db;
              }
              th {
                text-align: left;
                padding: 8px;
                font-size: 12px;
                font-weight: 600;
              }
              td {
                padding: 12px 8px;
                font-size: 14px;
                border-bottom: 1px solid #e5e7eb;
              }
              td.text-right {
                text-align: right;
              }
              img {
                max-width: 40px;
                height: 40px;
                object-fit: cover;
                border-radius: 4px;
              }
              .summary-section {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 32px;
              }
              .summary-box {
                width: 256px;
              }
              .summary-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                color: #374151;
                font-size: 14px;
              }
              .summary-total {
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                border-top: 1px solid #d1d5db;
                font-size: 18px;
                font-weight: 700;
                color: #111827;
              }
              .invoice-footer {
                border-top: 1px solid #e5e7eb;
                padding-top: 24px;
                text-align: center;
                font-size: 12px;
                color: #4b5563;
              }
              @media print {
                body {
                  padding: 0;
                  margin: 0;
                }
                .invoice-container {
                  padding: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <div class="invoice-header">
                <div class="invoice-header-content">
                  <div>
                    <div class="invoice-title">INVOICE</div>
                    <div class="order-number">Order #${order.orderId}</div>
                  </div>
                  <div class="invoice-status">
                    <div class="status-item"><span style="font-weight: 600;">Status:</span> ${order.status}</div>
                    <div class="status-item"><span style="font-weight: 600;">Date:</span> ${new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              <div class="customer-section">
                <div class="customer-info">
                  <h3>BILL TO</h3>
                  <p>${order.customerName}</p>
                  <p style="color: #6b7280;">${order.customerEmail}</p>
                  <p style="color: #6b7280;">${order.customerPhone}</p>
                </div>
                <div class="customer-info">
                  <h3>DELIVERY ADDRESS</h3>
                  <p style="white-space: pre-line;">${order.deliveryAddress}</p>
                  <p style="color: #6b7280; margin-top: 8px;"><span style="font-weight: 600;">Payment:</span> ${order.paymentMethod.toUpperCase()}</p>
                </div>
              </div>

              <div class="items-table">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th class="text-right">Price</th>
                      <th class="text-right">Qty</th>
                      <th class="text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${order.items
                      .map(
                        (item) => `
                      <tr>
                        <td>
                          <img src="${item.image}" alt="${item.name}" />
                        </td>
                        <td>${item.name}</td>
                        <td class="text-right">৳${item.price}</td>
                        <td class="text-right">${item.quantity}</td>
                        <td class="text-right" style="font-weight: 600;">৳${item.price * item.quantity}</td>
                      </tr>
                    `,
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>

              <div class="summary-section">
                <div class="summary-box">
                  <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>৳${order.subtotal}</span>
                  </div>
                  <div class="summary-row">
                    <span>Tax:</span>
                    <span>৳${order.tax}</span>
                  </div>
                  <div class="summary-row">
                    <span>Shipping:</span>
                    <span>৳${order.shippingCost}</span>
                  </div>
                  <div class="summary-total">
                    <span>Total:</span>
                    <span>৳${order.total}</span>
                  </div>
                </div>
              </div>

              <div class="invoice-footer">
                <p>Thank you for your order!</p>
                <p style="margin-top: 8px;">For any queries, contact our support team.</p>
              </div>
            </div>
          </body>
        </html>
      `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <p className="text-red-500 text-center mb-4">
                {error || "Order not found"}
              </p>
              <Link href="/">
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 dark:bg-slate-800">
        <div className="max-w-3xl mx-auto">
          {/* Header with Dropdown Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Invoice</h1>

            {/* Dropdown Menu for PDF & Print */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={pdfLoading} className="gap-2">
                  {pdfLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {pdfLoading ? "Generating..." : "Export"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={downloadPDF} disabled={pdfLoading}>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download PDF</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  <span>Print</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Invoice Content with ref */}
          <Card
            id="invoice-content"
            ref={contentRef}
            className="p-8 dark:bg-gray-900"
          >
            {/* Invoice Header */}
            <div className="mb-8 pb-8 border-b">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="mt-2">Order #{order.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="font-semibold">Status:</span>{" "}
                    {order.status}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold mb-4">BILL TO</h3>
                <p>{order.customerName}</p>
                <p className="text-sm">{order.customerEmail}</p>
                <p className="text-sm">{order.customerPhone}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4">DELIVERY ADDRESS</h3>
                <p className="whitespace-pre-line">{order.deliveryAddress}</p>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Payment:</span>{" "}
                  {order.paymentMethod.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 text-sm font-semibold">
                      Item
                    </th>
                    <th className="text-right py-2 text-sm font-semibold">
                      Price
                    </th>
                    <th className="text-right py-2 text-sm font-semibold">
                      Qty
                    </th>
                    <th className="text-right py-2 text-sm font-semibold">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="py-3 text-gray-700">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 object-cover rounded"
                        />
                      </td>
                      <td className="py-3">{item.name.slice(0, 20)}...</td>
                      <td className="text-right">${item.price}</td>
                      <td className="text-right">{item.quantity}</td>
                      <td className="text-right font-semibold">
                        ${""}
                        {item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="flex justify-between py-2 dark:text-gray-300 text-gray-700">
                  <span>Subtotal:</span>
                  <span>${order.subtotal}</span>
                </div>
                <div className="flex justify-between py-2 dark:text-gray-300 text-gray-700">
                  <span>Tax:</span>
                  <span>${order.tax}</span>
                </div>
                <div className="flex justify-between py-2 dark:text-gray-300 text-gray-700">
                  <span>Shipping:</span>
                  <span>${order.shippingCost}</span>
                </div>
                <div className="flex justify-between py-3 border-t-1 border-gray-300 text-lg dark:text-gray-300 font-bold text-gray-900">
                  <span>Total:</span>
                  <span>${order.total}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-6 text-center text-sm text-gray-600 dark:text-gray-300">
              <p>Thank you for your order!</p>
              <p className="mt-2">For any queries, contact our support team.</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          nav,
          footer,
          .no-print {
            display: none !important;
          }
          .min-h-screen {
            padding: 0 !important;
            margin: 0 !important;
          }
          #invoice-content {
            box-shadow: none !important;
            border: none !important;
            page-break-inside: avoid;
          }
          .flex.justify-between.items-center {
            display: none !important;
          }
        }
      `}</style>

      <FooterSection />
    </>
  );
}
