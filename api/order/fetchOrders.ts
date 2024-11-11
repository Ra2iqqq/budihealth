import PocketBase from "pocketbase";
import { ordersTypes } from "@/schema/orders";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export const fetchOrders = async (
  page: number,
  itemsPerPage: number,
  id: string,
  role: string
): Promise<{
  items: ordersTypes[];
  totalPages: number;
  totalItems: number;
}> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const options: Record<string, any> = {
      sort: "-created",
      expand: "created_by",
    };

    if (role !== "admin") {
      options.filter = `created_by = '${id}'`;
    }

    const response = await pb
      .collection("orders")
      .getList<ordersTypes>(page, itemsPerPage, options);

    return {
      items: response.items,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
    };
  } catch (error) {
    console.error("Error fetching orders records:", error);
    throw error;
  }
};

export const fetchOrderDetailed = async (id: string): Promise<ordersTypes> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const response = await pb.collection("orders").getOne<ordersTypes>(id, {
      expand: "created_by",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
