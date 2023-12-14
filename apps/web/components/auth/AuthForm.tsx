"use client";

import { createClient } from "utils/supabase/client";

export default function AuthForm() {
  const supabase = createClient();

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <div className="space-y-5">
      <h1>Login with oAuth</h1>
      <button className="w-full" onClick={loginWithGoogle}>
        Login with Google
      </button>
    </div>
  );
}
