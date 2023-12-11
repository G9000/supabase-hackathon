"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./page.module.css";

import type { Database } from "types";

export default function Page(): JSX.Element {
  const supabase = createClientComponentClient<Database>();

  async function handleClick() {
    let { data: users, error } = await supabase.from("users").select("*");

    console.log(users, error);
  }

  return (
    <main className={styles.main}>
      <div>
        <button onClick={handleClick}>Test</button>
      </div>
    </main>
  );
}
