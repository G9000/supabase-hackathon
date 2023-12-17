import { cn } from "lib/cn";
import { ReactNode } from "react";

interface OnboardingLayoutPropsI {
  label?: string;
  title?: string;
  children?: ReactNode;
  showTitle?: boolean;
  withoutPadding?: boolean;
}

export default function OnboardingLayout({
  label = "Label Here",
  title = "Title Here",
  showTitle = true,
  children,
  withoutPadding = false,
}: OnboardingLayoutPropsI) {
  return (
    <div className={cn('flex flex-col items-center justify-between', {
      'px-0': withoutPadding,
      'px-4 md:px-0': !withoutPadding
    })}>
      <div className="h-full flex flex-col justify-center">
        <div className="flex flex-col items-center px-4 md:px-0">
          <div className="inline-block px-4 py-3 border rounded-full text-foreground/50 font-bold border-foreground/10 text-sm">
            {label}
          </div>
          {showTitle && (
            <div className="text-2xl font-extrabold leading-6 max-w-xs mt-4 text-center bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
              {title}
            </div>
          )}
        </div>
        <div className="relative flex-shrink-0 w-full min-h-[440px]">
          {children}
        </div>
      </div>
    </div>
  );
}
