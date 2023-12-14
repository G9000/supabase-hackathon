import { ReactNode } from "react";

interface OnboardingLayoutPropsI {
  label?: string;
  title?: string;
  children?: ReactNode;
}

export default function OnboardingLayout({
  label = "Label Here",
  title = "Title Here",
  children,
}: OnboardingLayoutPropsI) {
  return (
    <div className="flex flex-col items-center my-10 min-h-screen">
      <div className="inline-block px-4 py-3 border rounded-full text-foreground/50 font-bold border-foreground/10 text-sm">{label}</div>
      <div className="text-2xl font-extrabold leading-6 max-w-xs mt-4 text-center bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">{title}</div>
      {children}
    </div>
  );
}
