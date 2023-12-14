import { redirect } from "next/navigation";
import AuthForm from "components/auth/AuthForm";
import { readUserSession } from "utils/supabase/session";

export default async function Login() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect("/");
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <AuthForm />
      <div>adsad</div>
    </div>
  );
}
