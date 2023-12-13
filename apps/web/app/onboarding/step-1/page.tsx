import { CardContent } from "components/base/Card";
import OnboardignCard from "components/OnboardingCard";
import { Textarea } from "components/base/Textarea";
import OnboardingCardInfo from "components/OnboardingCardInfo";

// Temprary config
const stageConfig = {
  title: "Let’s get started, What kind of meal would you like to have?",
  headerImgSrc: "bento.png",
  currStage: 1,
  totalStage: 5,
};

const tipConfig = {
  headerImgSrc: "target.png",
  title: "Tips, try to write details as much as possible",
  description:
    "As example you can tell Dash about your diet, or organic meal preferences too.",
};

export default function Page() {
  return (
    <div className="grid gap-y-4">
      <OnboardignCard {...stageConfig}>
        <CardContent>
          <Textarea
            placeholder="I would like to have shoyu ramen, sashimi, okonomiyaki..."
            className="border-0 pl-0 text-2xl leading-6 font-bold opacity-30 h-[100px] focus-visible:ring-0"
          />
        </CardContent>
      </OnboardignCard>
      <OnboardingCardInfo {...tipConfig} />
    </div>
  );
}
