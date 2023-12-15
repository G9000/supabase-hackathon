import { Button } from "components/base/Button";
import Image from "next/image";
import { ReactNode } from "react";

interface OnboardingLayoutPropsI {
  label?: string;
  title?: string;
  children?: ReactNode;
  showTitle?: boolean;
}

export default function OnboardingLayout({
  label = "Label Here",
  title = "Title Here",
  showTitle = true,
  children,
}: OnboardingLayoutPropsI) {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <Image src={"/logo.svg"} width={40} height={40} alt="dish dash logo" className="mt-5" />
      <div className="h-full flex flex-col justify-center">
        <div className="flex flex-col items-center">
          <div className="inline-block px-4 py-3 border rounded-full text-foreground/50 font-bold border-foreground/10 text-sm">{label}</div>
          {showTitle && (
            <div className="text-2xl font-extrabold leading-6 max-w-xs mt-4 text-center bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">{title}</div>
          )}
        </div>
        <div className="relative flex-shrink-0 w-full h-[440px]">
          {children}
        </div>
      </div>
      <div className="mb-4 flex gap-2 items-center">
        <Image className="rounded-full bg-foreground/10 object-cover" width={40} height={40} src={'/logo.svg'} alt='profile picture' />
        <Button variant={"danger"}>Logout</Button>
      </div>
    </div>
  );
}
