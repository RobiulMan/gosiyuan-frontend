import { Loader2, CheckCircle2, Package } from "lucide-react";

interface OrderLoadingOverlayProps {
  isOpen: boolean;
  status: "loading" | "processing" | "success";
  orderNumber?: string;
}

export default function OrderLoadingOverlay({
  isOpen,
  status,
  orderNumber,
}: OrderLoadingOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
        {/* Loading State */}
        {status === "loading" && (
          <>
            <div className="flex justify-center mb-6">
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Processing Order
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please wait while we process your payment...
            </p>
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
            </div>
          </>
        )}

        {/* Processing State */}
        {status === "processing" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Package className="w-16 h-16 text-amber-500" />
                <Loader2 className="w-16 h-16 text-amber-500 absolute inset-0 animate-spin opacity-50" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Confirming Order
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Preparing your order for delivery...
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Payment Confirmed
                </span>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Processing Order
                </span>
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              </div>
            </div>
          </>
        )}

        {/* Success State */}
        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your order has been confirmed.
            </p>
            {orderNumber && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Order Number
                </p>
                <p className="text-lg font-mono font-bold text-green-600 dark:text-green-400">
                  {orderNumber}
                </p>
              </div>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Redirecting to invoice page...
            </p>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 1.4s infinite;
        }

        .delay-100 {
          animation-delay: 0.2s;
        }

        .delay-200 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
