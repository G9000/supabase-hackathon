import { CardContent } from "components/base/Card";
import OnboardignCard from "components/OnboardingCard";
import { Textarea } from "components/base/Textarea";

const stageConfig = {
  title: "Let’s get started, What kind of meal would you like to have?",
  headerImgSrc: "bento.png",
  currStage: 2,
  totalStage: 5,
};

export default function Page() {
  return (
    <div>
      <OnboardignCard {...stageConfig}>
        <CardContent>
          <Textarea
            placeholder="I would like to have shoyu ramen, sashimi, okonomiyaki..."
            className="border-0 pl-0 text-2xl leading-6 font-bold opacity-30 h-[100px] focus-visible:ring-0"
          />
        </CardContent>
      </OnboardignCard>
    </div>
  );
}
