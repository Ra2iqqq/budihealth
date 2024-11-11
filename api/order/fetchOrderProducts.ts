import PocketBase from "pocketbase";
import { orderProductsTypes } from "@/schema/order_products";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export interface extendedOrderProductsTypes extends orderProductsTypes {
  total: number;
}

export const fetchOrderProducts = async (
  order_id: string
): Promise<extendedOrderProductsTypes[]> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const response = await pb
      .collection("order_products")
      .getFullList<extendedOrderProductsTypes>({
        filter: `order_id='${order_id}'`,
        expand: "prod_id, prod_color_id, prod_material_id",
      });

    const extendedResponse = response.map((item) => ({
      ...item,
      total: item.prod_qty * (item.expand?.prod_id?.prod_price || 0),
      expand: {
        ...item.expand,
        prod_id: {
          ...item.expand?.prod_id,
          prod_image: item.expand?.prod_id?.prod_image
            ? `${process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL}/api/files/${item.expand.prod_id.collectionId}/${item.prod_id}/${item.expand.prod_id.prod_image}?token=`
            : "",
        },
      },
    }));

    console.log(extendedResponse);

    return extendedResponse;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
