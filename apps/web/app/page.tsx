"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "types";

export default function Page(): JSX.Element {
  const supabase = createClientComponentClient<Database>();

  async function handleClick() {
    // let { data: users, error } = await supabase
    //   .from("users")
    //   .select(`*, diet_preferences (*)`);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);
  }

  return (
    <main>
      <div>
        <button onClick={handleClick}>Test</button>
      </div>
    </main>
  );
}
