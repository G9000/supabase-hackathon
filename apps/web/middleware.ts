import { createClient } from "utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const res = NextResponse.next();
  await supabase.auth.getSession();
  return res;
}
