import { Product, ProductCategory } from "@/types/typeProduct";
import { STRAPI_API_TOKEN, STRAPI_API_URL } from "./urls";
import { ProductSchema, ValidatedProduct } from "@/types/validation/product";

export const fetchDataFromStrapi = async (
  url: string,
  idOrSlug?: string,
  isSlug = false,
  options: {
    cache?: RequestCache;
    next?: { tags?: string[]; revalidate?: number };
  } = {},
): Promise<{ data: ValidatedProduct[]; meta?: any }> => {
  const fetchOption = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: {
      // Define default tags based on URL pattern
      tags: options.next?.tags || [
        url.includes("/products")
          ? "products"
          : url.includes("/categories")
            ? "categories"
            : "content",
      ],
      // Optional time-based revalidation as fallback
      ...(options.next?.revalidate && { revalidate: options.next.revalidate }),
    },
    ...options,
  };

  let apiUrl = `${STRAPI_API_URL}${url}`;

  if (idOrSlug) {
    if (isSlug) {
      // Query by slug using filter
      apiUrl = `${STRAPI_API_URL}/api/products?filters[slug][$eq]=${idOrSlug}&populate=*`;
    } else {
      // Query directly by ID
      apiUrl = `${STRAPI_API_URL}/api/products/${idOrSlug}?populate=*`;
    }
  }

  try {
    const response = await fetch(apiUrl, fetchOption);

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return { data: [] };
    }

    const responseData = await response.json();

    // Check the shape of the response data
    if (!responseData || !responseData.data) {
      console.error("Unexpected API response format:", responseData);
      return { data: [] };
    }

    // Parse the array of products
    const products = Array.isArray(responseData.data)
      ? responseData.data
      : [responseData.data];

    // Return both data and meta
    return {
      data: products,
      meta: responseData.meta,
    };
  } catch (error) {
    console.error("API or validation error:", error);
    return { data: [] };
  }
};

export const fetchPaginatedProducts = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  filters?: Record<string, any>,
  options: {
    cache?: RequestCache;
    next?: { tags?: string[]; revalidate?: number };
  } = {},
) => {
  // Build query string with pagination
  let query = `?populate=*&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`;

  // Add any filters
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      query += `&filters[${key}]=${encodeURIComponent(value)}`;
    }
  }

  return fetchDataFromStrapi(
    `/api/products${query}`,
    undefined,
    false,
    options,
  );
};

export const fetchCategories = async (
  options: { cache?: RequestCache; next?: { tags?: string[] } } = {},
  slug: string,
) => {
  const fetchOption = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    ...options,
  };

  const encodedSlug = encodeURIComponent(slug);

  // Correct URL to filter products by category slug
  let apiUrl = `${STRAPI_API_URL}/api/products?filters[categories][slug][$eq]=${encodedSlug}&populate=*`;

  try {
    const response = await fetch(apiUrl, fetchOption);

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    // Check the shape of the response data
    if (!data || !data.data) {
      console.error("Unexpected API response format:", data);
      return [];
    }

    // Return the array of categories
    return data.data;
  } catch (error) {
    console.error("API or validation error:", error);
    return [];
  }
};

// 3. Add a utility function to get valid category slugs
export const getAllCategorySlugs = async (
  options: { cache?: RequestCache; next?: { tags?: string[] } } = {},
) => {
  const fetchOption = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    ...options,
  };

  try {
    const response = await fetch(
      `${STRAPI_API_URL}/api/categories?populate=*`,
      fetchOption,
    );
    const data = await response.json();

    if (!response.ok || !data.data) {
      return [];
    }

    return data.data;
  } catch (error) {
    return [];
  }
};

export const makePaymentRequest = async (endpoint: any, payload: any) => {
  const res = await fetch(`${STRAPI_API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
};

// export const fetchOrderById = async () => {
//   if (!orderId) {
//     setError("Order ID not found");
//     setLoading(false);
//     return;
//   }
//
//   try {
//     // const fetchOption = {
//     //   method: "GET",
//     //   headers: {
//     //     Authorization: `Bearer ${STRAPI_API_TOKEN}`,
//     //   },
//     //   ...options,
//     // };
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}/api/cod-orders?filters[id][$eq]=${orderId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${STRAPI_API_TOKEN}`,
//         },
//       },
//     );
//
//     if (!res.ok) {
//       throw new Error("Failed to fetch order");
//     }
//
//     const data = await res.json();
//
//     // Check if we have results
//     if (data.orders?.results?.length > 0) {
//       const strapiOrder = data.orders.results[0];
//       const transformedOrder = transformStrapiOrder(strapiOrder);
//       setOrder(transformedOrder);
//     } else {
//       throw new Error("Order not found");
//     }
//   } catch (err) {
//     setError(err instanceof Error ? err.message : "Error loading invoice");
//   } finally {
//     setLoading(false);
//   }
// };
