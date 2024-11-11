import PocketBase from "pocketbase";
import { useRouter } from "next/router";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);

export function readIsValid() {
  return pb.authStore.isValid;
}

export function readToken() {
  return pb.authStore.token;
}

export function readId() {
  return pb.authStore.model?.id;
}

export function readRole() {
  return pb.authStore.model?.role;
}

export function readName() {
  return pb.authStore.model?.name;
}

export function readAvatar() {
  return `${process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL}/api/files/_pb_users_auth_/${pb.authStore.model?.id}/${pb.authStore.model?.avatar}?token=`;
}

export function logout() {
  pb.authStore.clear();
  return "Logged out successfully";
}
