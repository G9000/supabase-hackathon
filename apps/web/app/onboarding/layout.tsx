import { PropsWithChildren } from "react";
import OnboardingProvider from "providers/onboarding-provider";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <OnboardingProvider>
      <div className="z-10">{children}</div>
    </OnboardingProvider>
  );
}
