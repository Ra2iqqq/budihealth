import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export const deleteUser = async (id: string) => {
  try {
    if (!pb.authStore.isValid) {
      throw new Error("User is not authenticated");
    }

    console.log(id);
    await pb.collection("users").delete(id);

    console.log("sucess");
    return "Success deleting user";
  } catch (error) {
    console.error("Error deleting user :", error);
    return undefined;
  }
};
