import PocketBase, { RecordModel } from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export interface CreateOrderInterface {
  order_id: string;
  prod_id: string;
  prod_color_id: string;
  prod_material_id: string;
  system: string;
  hook: string;
  open_control: string;
  prod_qty: number;
}

export const addOrderProducts = async (
  data: CreateOrderInterface
): Promise<RecordModel> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const existingProducts = await pb
      .collection("order_products")
      .getList(1, 1, {
        filter: `order_id="${data.order_id}" && prod_id="${data.prod_id}"`,
      });

    if (existingProducts.items.length > 0) {
      const existingProduct = existingProducts.items[0];
      const updatedProduct = await pb
        .collection("order_products")
        .update(existingProduct.id, {
          prod_qty: existingProduct.prod_qty + data.prod_qty,
        });
      return updatedProduct;
    } else {
      const orderData = {
        order_id: data.order_id,
        prod_id: data.prod_id,
        // prod_color_id: data.prod_color_id,
        // prod_material_id: data.prod_material_id,
        system: data.system,
        hook: data.hook,
        open_control: data.open_control,
        prod_qty: data.prod_qty,
      };

      const response = await pb.collection("order_products").create(orderData);

      return response;
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
