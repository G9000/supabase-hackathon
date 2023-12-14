import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "./server";

export async function readUserSession() {
  noStore();
  const cookieStore = cookies();
  const supabsae = createClient(cookieStore);
  return await supabsae.auth.getSession();
}
