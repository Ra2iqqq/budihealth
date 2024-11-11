import PocketBase from "pocketbase";
import { productsTypes } from "@/schema/products";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export const fetchProducts = async (
  page: number,
  itemsPerPage: number,
  prodType: string
): Promise<{
  items: productsTypes[];
  totalPages: number;
  totalItems: number;
}> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const options: Record<string, any> = {
      sort: "+created",
      filter: `prod_type ?~ '${prodType}'`,
    };

    if (prodType != "") {
      options.filter = `prod_type ?~ '${prodType}'`;
    }

    const response = await pb
      .collection("products")
      .getList<productsTypes>(page, itemsPerPage, options);

    const modifiedResponse = response.items.map((product) => ({
      ...product,
      prod_image: `${process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL}/api/files/vkunfrg8opgmovg/${product.id}/${product.prod_image}?token=`,
    }));

    return {
      items: modifiedResponse,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
    };
  } catch (error) {
    console.error("Error fetching bidai records:", error);
    throw error;
  }
};
