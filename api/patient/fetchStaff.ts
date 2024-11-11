import PocketBase, { RecordModel } from "pocketbase";
import { usersTypes } from "@/schema/users";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export const fetchUsers = async (
  page: number,
  itemsPerPage: number,
  role: string
): Promise<{ items: usersTypes[]; totalPages: number; totalItems: number }> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const options: Record<string, any> = {
      sort: "+created",
    };

    if (role != "") {
      options.filter = `role='${role}'`;
    }

    const response = await pb
      .collection("users")
      .getList<usersTypes>(page, itemsPerPage, options);

    const usersWithAvatar = response.items.map((user) => ({
      ...user,
      avatar: user.avatar
        ? `${process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL}/api/files/_pb_users_auth_/${user.id}/${user.avatar}?token=`
        : "",
    }));

    return {
      items: usersWithAvatar,
      totalPages: response.totalPages,
      totalItems: response.totalItems,
    };
  } catch (error) {
    console.error("Error fetching staff records:", error);
    throw error;
  }
};

export const fetchSingleUser = async (
  id: string
): Promise<usersTypes | null> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const response = await pb.collection("users").getOne<usersTypes>(id, {});

    const userWithAvatar: usersTypes = {
      ...response,
      avatar: response.avatar
        ? `${process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL}/api/files/_pb_users_auth_/${response.id}/${response.avatar}?token=`
        : "",
    };

    return userWithAvatar;
  } catch (error) {
    console.error("Error fetching orders records:", error);
    return null;
  }
};

export const createUser = async (
  formData: FormData
): Promise<RecordModel | undefined> => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    const response = await pb.collection("users").create(formData);

    return response;
  } catch (error) {
    console.error("Error fetching staff records:", error);
    return undefined;
  }
};
