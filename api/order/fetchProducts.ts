import PocketBase from "pocketbase";
import { productsTypes } from "@/schema/products";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export const fetchProducts = async (
  prodType: string
): Promise<productsTypes[]> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const options: Record<string, any> = {
      sort: "+created",
    };

    if (prodType != "") {
      options.filter = `prod_type?~'${prodType}'`;
    }

    const response = await pb
      .collection("products")
      .getFullList<productsTypes>(options);

    const modifiedResponse = response.map((product) => ({
      ...product,
      prod_image: `${process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL}/api/files/${product.collectionId}/${product.id}/${product.prod_image}?token=`,
    }));

    return modifiedResponse;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchSingleProd = async (
  id: string
): Promise<productsTypes> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const response = await pb
      .collection("products")
      .getOne<productsTypes>(id, {});

    const modifiedResponse = {
      ...response,
      prod_image: `${process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL}/api/files/${response.collectionId}/${response.id}/${response.prod_image}?token=`,
    };

    return modifiedResponse;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
