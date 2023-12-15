import { Button } from "components/base/Button";
import Image from "next/image";
import { readUserSession } from "utils/supabase/session";

export default async function Footer() {
  const { data } = await readUserSession();

  const profilePicture = data.session?.user?.user_metadata?.avatar_url;

  return (
    <div className="mb-4 flex gap-2 items-center">
      <Image
        className="rounded-full bg-foreground/10 object-cover"
        width={40}
        height={40}
        src={profilePicture || "/logo.svg"}
        alt="profile picture"
      />
      <form action="/auth/logout">
        <Button variant={"danger"}>Logout</Button>
      </form>
    </div>
  );
}
