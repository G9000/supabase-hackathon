"use client";

import { Button } from "components/base/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()

  const onClick = () => {
    router.push("/mealplan");
  }

  return (
    <div className="relative flex flex-col items-center text-center max-w-sm">
      <h1 className="text-2xl font-extrabold leading-6 max-w-xs mt-4 text-center bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">Nothing to see here</h1>
      <p className="text-base text-foreground/50 my-4">You’ve already bought all of the groceries. We will remind you to go shop again in 2 weeks!</p>
      <Button
        onClick={onClick}
        className="p-0 overflow-hidden border border-white/10 rounded-full"
      >
        <span className="w-full h-full p-[2px] overflow-hidden rounded-full bg-gradient-to-b from-[#fafafa50] to-[#FAFAFA00]">
          <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-[#3c3c3c] to-foreground font-bold text-base">
            See meal plan
          </span>
        </span>
      </Button>
    </div>
  );
}
