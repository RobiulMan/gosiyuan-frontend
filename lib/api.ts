import { Product } from "@/types/typeProduct";
import { STRAPI_API_TOKEN, STRAPI_API_URL } from "./urls";
import { ProductSchema, ValidatedProduct } from "@/types/validation/product";
const fetchDataFromStrapi = async (
  url: string,
  idOrSlug?: string,
  isSlug = false,
  options: { cache?: RequestCache; next?: { tags?: string[] } } = {},
): Promise<ValidatedProduct[]> => {
  const fetchOption = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    ...options,
  };
  let apiUrl = `${STRAPI_API_URL}${url}`;

  // If idOrSlug is provided, construct the URL based on whether it's an ID or slug
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
      return [];
    }

    const data = await response.json();

    // Check the shape of the response data
    if (!data || !data.data) {
      console.error("Unexpected API response format:", data);
      return [];
    }

    // Parse and return the array of products
    const products = Array.isArray(data.data) ? data.data : [data.data];
    return products;
  } catch (error) {
    console.error("API or validation error:", error);
    return [];
  }
};

export default fetchDataFromStrapi;
