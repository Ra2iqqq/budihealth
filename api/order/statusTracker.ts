import PocketBase, { RecordModel } from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export const submitSelectProducts = async ({
  id,
  total,
  status,
}: {
  id: string;
  total: number;
  status: number;
}): Promise<RecordModel | undefined> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    // example update data
    if (status === 0) {
      const data = {
        payment_total: total,
        order_status: status + 1,
      };

      const record = await pb.collection("orders").update(id, data);

      return record;
    }
    console.log("Status is not 0");
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export const submitCancelProducts = async ({
  id,
  status,
}: {
  id: string;
  status: number;
}): Promise<RecordModel | undefined> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    // example update data
    if (status === 1) {
      const data = {
        order_status: status - 1,
        payment_total: 0,
      };

      const record = await pb.collection("orders").update(id, data);

      return record;
    }
    console.log("Status is not 1");
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};
