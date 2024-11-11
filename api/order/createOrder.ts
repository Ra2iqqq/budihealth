import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export interface CreateOrderInterface {
  client_name: string;
  client_address: string;
  installation_type: string;
  order_type: number;
  client_source: string;
}

export interface OrderResponseInterface {
  id: string;
}

export const createOrder = async (
  data: CreateOrderInterface
): Promise<OrderResponseInterface> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const orderData = {
      created_by: pb.authStore.model?.id,
      client_name: data.client_name,
      client_address: data.client_address,
      total: 0,
      payment_status: "unpaid",
      installation_type: data.installation_type,
      client_source: data.client_source,
      order_type: data.order_type,
      order_status: 0,
    };

    const response = await pb.collection("orders").create(orderData);

    const orderFilesData = {
      order_id: response.id,
    };

    await pb.collection("order_files").create(orderFilesData);

    const orderResponse: OrderResponseInterface = {
      id: response.id,
    };

    return orderResponse;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
