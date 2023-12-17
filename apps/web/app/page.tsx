import { createClient } from "utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabsae = createClient(cookieStore);
  let { data: users, error } = await supabsae
    .from("users")
    .select("done_onboarding")
    .single();

  // console.log("users", users);

  // if (!users?.done_onboarding) {
  //   router.push("/get-to-know");
  // }

  return (
    <main>
      <div>Hai</div>
    </main>
  );
}
