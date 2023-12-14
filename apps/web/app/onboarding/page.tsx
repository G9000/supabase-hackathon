import { CardContent } from "components/base/Card";
import OnboardignCard from "components/Onboarding/OnboardingCard";
import { Textarea } from "components/base/Textarea";

export default function Page() {
  return (
    <div>
      <OnboardignCard showHeader={false} title="What should I call you?">
        <CardContent>
          <Textarea
            placeholder="I would like to have shoyu ramen, sashimi, okonomiyaki..."
            className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
          />
        </CardContent>
      </OnboardignCard>
    </div>
  );
}
