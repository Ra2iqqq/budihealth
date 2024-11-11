import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export const deleteOrderProducts = async (
  order_prod_id: string
): Promise<string> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    await pb.collection("order_products").delete(order_prod_id);
    return "Product deleted successfully";
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
