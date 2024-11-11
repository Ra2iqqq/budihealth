import PocketBase from "pocketbase"; 

export default function createClient() {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    return pb;
}