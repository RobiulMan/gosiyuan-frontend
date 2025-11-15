import { LoggerService } from "@/lib/logService/logService";
import { STRAPI_API_URL, STRAPI_API_TOKEN } from "@/lib/urls";
import { NextRequest, NextResponse } from "next/server";
//
interface StrapiProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  description?: string;
  subtitle?: string;
  size?: string;
  original_price?: number;
  product_card_image?: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  };
  image?: Array<{
    id: number;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
    };
  }>;
  thumbnail?: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  };
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface TransformedProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  description?: string;
  subtitle?: string;
  product_card_image?: {
    id: number;
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  };
  image?: Array<{
    url: string;
    thumbnail?: string;
    small?: string;
  }>;
  thumbnail?: {
    url: string;
    thumbnail?: string;
  };
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

export interface SearchContext {
  requestId: string;
  query: string;
  limit: number;
  timestamp: string;
  duration?: number;
}

function transformStrapiProduct(
  strapiProduct: StrapiProduct,
): TransformedProduct {
  // Handle product_card_image
  let product_card_image;
  if (strapiProduct.product_card_image?.url) {
    product_card_image = {
      id: strapiProduct.product_card_image.id,
      url: strapiProduct.product_card_image.url,
      formats: strapiProduct.product_card_image.formats
        ? {
            thumbnail: strapiProduct.product_card_image.formats.thumbnail
              ? {
                  url: strapiProduct.product_card_image.formats.thumbnail.url,
                }
              : undefined,
          }
        : undefined,
    };
  }

  // Handle image array
  let image;
  if (strapiProduct.image && Array.isArray(strapiProduct.image)) {
    image = strapiProduct.image.map((img) => ({
      url: img.url,
      thumbnail: img.formats?.thumbnail?.url,
      small: img.formats?.small?.url,
    }));
  }

  // Handle thumbnail
  let thumbnail;
  if (strapiProduct.thumbnail?.url) {
    thumbnail = {
      url: strapiProduct.thumbnail.url,
      thumbnail: strapiProduct.thumbnail.formats?.thumbnail?.url,
    };
  }

  // Handle categories
  let categories;
  if (strapiProduct.categories && Array.isArray(strapiProduct.categories)) {
    categories = strapiProduct.categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    }));
  }

  return {
    id: strapiProduct.id,
    name: strapiProduct.name,
    slug: strapiProduct.slug,
    price: strapiProduct.price,
    description: strapiProduct.description,
    subtitle: strapiProduct.subtitle,
    product_card_image,
    image,
    thumbnail,
    categories,
  };
}

// ============================================================================
// VALIDATION
// ============================================================================

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  query: string;
  limit: number;
}

function validateSearchInput(query: string, limit: string): ValidationResult {
  const errors: string[] = [];
  const parsedLimit = parseInt(limit || "8");

  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    errors.push("Search query cannot be empty");
  } else if (trimmedQuery.length < 2) {
    errors.push("Search query must be at least 2 characters");
  } else if (trimmedQuery.length > 500) {
    errors.push("Search query must not exceed 500 characters");
  }

  if (isNaN(parsedLimit) || parsedLimit < 1) {
    errors.push("Limit must be a positive number");
  } else if (parsedLimit > 100) {
    errors.push("Limit cannot exceed 100");
  }

  return {
    isValid: errors.length === 0,
    errors,
    query: trimmedQuery,
    limit: Math.min(parsedLimit, 100),
  };
}

// ============================================================================
// API ROUTE HANDLER
// ============================================================================

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const requestId = `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const context: SearchContext = {
    requestId,
    query: "",
    limit: 0,
    timestamp: new Date().toISOString(),
  };

  const logger = new LoggerService(context);

  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const limit = searchParams.get("limit") || "8";

    context.query = query;

    logger.logRequestStart(query, parseInt(limit));

    // Validate input
    const validation = validateSearchInput(query, limit);

    logger.logValidation(validation.isValid, validation.errors);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          results: [],
          total: 0,
          errors: validation.errors,
        },
        { status: 400 },
      );
    }

    context.limit = validation.limit;

    // Build Strapi URL
    const strapiUrl = new URL(`${STRAPI_API_URL}/api/products`);

    const params = new URLSearchParams({
      "filters[$or][0][name][$containsi]": validation.query,
      "filters[$or][1][slug][$containsi]": validation.query,
      "filters[$or][2][description][$containsi]": validation.query,
      "pagination[limit]": validation.limit.toString(),
      populate: "*",
      sort: "createdAt:desc",
    });

    strapiUrl.search = params.toString();

    logger.logStrapiRequest(strapiUrl.toString(), "GET");

    // Fetch from Strapi
    const response = await fetch(strapiUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error(
        `Strapi API returned error status ${response.status}`,
        new Error(errorText),
      );

      return NextResponse.json(
        {
          results: [],
          total: 0,
          error: `Strapi API error: ${response.status} ${response.statusText}`,
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    const resultCount = data.data?.length || 0;
    const totalCount = data.meta?.pagination?.total || resultCount;

    logger.logStrapiResponse(response.status, resultCount, totalCount);

    // Transform data
    const results: TransformedProduct[] = (data.data || []).map(
      (product: any) => transformStrapiProduct(product),
    );

    logger.logTransformation(resultCount, results.length);

    const duration = Date.now() - startTime;
    logger.logRequestComplete(results.length, duration);

    return NextResponse.json(
      {
        results,
        total: totalCount,
        pagination: data.meta?.pagination,
        metadata: {
          requestId,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.logError(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      error instanceof Error ? error : undefined,
    );

    return NextResponse.json(
      {
        results: [],
        total: 0,
        error:
          error instanceof Error ? error.message : "Failed to search products",
        metadata: {
          requestId,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    );
  }
}
