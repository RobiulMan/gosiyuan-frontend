import { Product, ProductCategory } from "@/types/typeProduct";
import { STRAPI_API_TOKEN, STRAPI_API_URL } from "./urls";
import { ProductSchema, ValidatedProduct } from "@/types/validation/product";

export const fetchDataFromStrapi = async (
  url: string,
  idOrSlug?: string,
  isSlug = false,
  options: { cache?: RequestCache; next?: { tags?: string[]; revalidate?: number } } = {},
): Promise<{ data: ValidatedProduct[], meta?: any }> => {
  const fetchOption = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: {
      // Define default tags based on URL pattern
      tags: options.next?.tags || [
        url.includes('/products') ? 'products' : 
        url.includes('/categories') ? 'categories' : 'content'
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
    const products = Array.isArray(responseData.data) ? responseData.data : [responseData.data];

    // Return both data and meta
    return { 
      data: products,
      meta: responseData.meta
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
  options: { cache?: RequestCache; next?: { tags?: string[]; revalidate?: number } } = {}
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
    options
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
    const response = await fetch(`${STRAPI_API_URL}/api/categories?populate=*`, fetchOption);
    const data = await response.json();
    
 
    if (!response.ok || !data.data) {
      return [];
    }

    return data.data
  } catch (error) {
    return [];
  }
};


