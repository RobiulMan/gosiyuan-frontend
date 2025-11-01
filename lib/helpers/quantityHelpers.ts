// ============================================
// QUANTITY & PRICE HELPER FUNCTIONS
// ============================================

/**
 * Validates and sanitizes quantity input
 * @param value - Input value (string or number)
 * @param min - Minimum allowed quantity (default: 1)
 * @param max - Maximum allowed quantity (default: unlimited)
 * @returns Validated quantity number
 */
export const validateQuantity = (
  value: string | number,
  min: number = 1,
  max?: number,
): number => {
  // Convert to string first
  const strValue = String(value).trim();

  // Handle empty string
  if (strValue === "" || strValue === "0") {
    return min;
  }

  // Parse to integer
  const parsed = parseInt(strValue, 10);

  // Check if valid number
  if (isNaN(parsed) || !isFinite(parsed)) {
    return min;
  }

  // Check minimum
  if (parsed < min) {
    return min;
  }

  // Check maximum if provided
  if (max !== undefined && parsed > max) {
    return max;
  }

  return parsed;
};

/**
 * Validates and formats price
 * @param price - Price value
 * @returns Valid price number with 2 decimal places
 */
export const validatePrice = (price: number): number => {
  // Check if valid number
  if (isNaN(price) || !isFinite(price) || price < 0) {
    return 0;
  }

  // Round to 2 decimal places to avoid floating point issues
  return Math.round(price * 100) / 100;
};

/**
 * Calculates total price with proper validation
 * @param price - Unit price
 * @param quantity - Quantity
 * @returns Total price rounded to 2 decimals
 */
export const calculateTotal = (price: number, quantity: number): number => {
  const validPrice = validatePrice(price);
  const validQuantity = Math.max(0, quantity);

  // Calculate total
  const total = validPrice * validQuantity;

  // Check for overflow or invalid result
  if (!isFinite(total) || isNaN(total)) {
    return 0;
  }

  // Round to 2 decimal places
  return Math.round(total * 100) / 100;
};

/**
 * Formats price for display
 * @param price - Price value
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted price string
 */
export const formatPrice = (
  price: number,
  currency: string = "USD",
  locale: string = "en-US",
): string => {
  const validPrice = validatePrice(price);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(validPrice);
};

/**
 * Formats quantity with thousand separators
 * @param quantity - Quantity value
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted quantity string
 */
export const formatQuantity = (
  quantity: number,
  locale: string = "en-US",
): string => {
  return new Intl.NumberFormat(locale).format(quantity);
};

/**
 * Safely parses quantity from input
 * @param input - Input value from user
 * @returns Parsed integer or 0
 */
export const parseQuantity = (input: string): number => {
  // Remove any non-digit characters except negative sign
  const cleaned = input.replace(/[^\d-]/g, "");
  const parsed = parseInt(cleaned, 10);

  return isNaN(parsed) ? 0 : Math.max(0, parsed);
};

/**
 * Checks if quantity is within safe JavaScript number range
 * @param quantity - Quantity to check
 * @returns Boolean indicating if safe
 */
export const isSafeQuantity = (quantity: number): boolean => {
  return (
    Number.isFinite(quantity) &&
    quantity >= 0 &&
    quantity <= Number.MAX_SAFE_INTEGER
  );
};

/**
 * Cart item calculation with validation
 * @param price - Unit price
 * @param quantity - Quantity
 * @param discount - Discount percentage (0-100)
 * @returns Object with subtotal, discount, and total
 */
export const calculateCartItem = (
  price: number,
  quantity: number,
  discount: number = 0,
) => {
  const validPrice = validatePrice(price);
  const validQuantity = validateQuantity(quantity);
  const validDiscount = Math.max(0, Math.min(100, discount));

  const subtotal = calculateTotal(validPrice, validQuantity);
  const discountAmount = (subtotal * validDiscount) / 100;
  const total = subtotal - discountAmount;

  return {
    unitPrice: validPrice,
    quantity: validQuantity,
    subtotal: validatePrice(subtotal),
    discountPercent: validDiscount,
    discountAmount: validatePrice(discountAmount),
    total: validatePrice(total),
  };
};
