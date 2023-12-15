import { PropsWithChildren } from "react";
import OnboardingProvider from "providers/onboarding-provider";
import OnboardingLayout from "components/onboarding/OnboardingLayout";
import { pageConfig } from "./config";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <main>
      <OnboardingProvider>
        <div className="z-10">
          <OnboardingLayout {...pageConfig}>{children}</OnboardingLayout>
        </div>
      </OnboardingProvider>
    </main>
  );
}
