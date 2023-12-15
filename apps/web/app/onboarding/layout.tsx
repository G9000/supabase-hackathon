import { PropsWithChildren } from "react";
import OnboardingProvider from "providers/onboarding-provider";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
      <OnboardingProvider>
        <div className="z-10">{children}</div>
      </OnboardingProvider>
    </main>
  );
}
