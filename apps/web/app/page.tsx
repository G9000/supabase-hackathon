import { createClient } from "utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let { data: diet_preferences, error } = await supabase
    .from("diet_preferences")
    .select("*");

  console.log("users", JSON.stringify(diet_preferences));

  // if (!users?.done_onboarding) {
  //   router.push("/get-to-know");
  // }

  return (
    <main>
      <div>Hai</div>
    </main>
  );
}
