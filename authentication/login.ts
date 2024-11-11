import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export async function verifyUser(username: string, password: string) {
  try {
    console.log(`Attempting to authenticate user: ${username}`);
    const authData = await pb
      .collection("users")
      .authWithPassword(username, password);

    if (pb.authStore.model?.isActive == false) {
      console.log("Authentication failed");
      pb.authStore.clear();
      return { success: false, error: "User is not active" };
    }

    console.log("Authentication successful");
    return { success: true, data: authData };
  } catch (error) {
    console.error("Authentication error:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}
