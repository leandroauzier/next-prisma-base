"use server";

import { deleteUser } from "../services/userService";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(id: string, targetId: string) {
  await deleteUser(id, targetId);
  revalidatePath("/users");
}
