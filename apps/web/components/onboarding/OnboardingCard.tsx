import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/base/Card";
import { Badge } from "components/base/Badge";
import { Button } from "components/base/Button";
import Image from "next/image";
import { cn } from "lib/cn";

interface OnboardingCardPropsI {
  showHeader?: boolean;
  headerImgSrc?: string;
  currStage?: number;
  totalStage?: number;
  title?: string;
  titleClassName?: string;
  handleNext?: () => void;
  handleNextDisabled?: boolean;
  handleBack?: () => void;
  children?: ReactNode;
  lastStep?: boolean;
  lastStepButton?: string;
}

export default function OnboardingCard({
  showHeader = true,
  headerImgSrc = "bento.png",
  currStage = 1,
  totalStage = 1,
  title = "Title Here",
  titleClassName,
  handleNext,
  handleNextDisabled = false,
  handleBack,
  children,
  lastStep,
  lastStepButton,
}: OnboardingCardPropsI) {
  const selectedWord = () => {
    if (lastStep && lastStepButton) {
      return lastStepButton;
    } else if (lastStep) {
      return "Continue & Review";
    } else {
      return "Continue";
    }
  };

  return (
    <Card className="max-w-[325px] h-auto grid gap-4">
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <Image
                src={`/icons/${headerImgSrc}`}
                alt="stage"
                height={48}
                width={48}
              />
            </div>
            <Badge variant="outline" className="px-4 py-3">
              <span className=" text-sm font-black opacity-40">{`${currStage} of ${totalStage}`}</span>
            </Badge>
          </CardTitle>
        </CardHeader>
      )}

      <CardContent className={cn("text-sm text-foreground/50", titleClassName)}>
        {title}
      </CardContent>
      {children}
      <CardFooter className="flex gap-x-2">
        <Button
          onClick={handleNext}
          disabled={handleNextDisabled}
          className="p-0 overflow-hidden border border-white/10 rounded-full"
        >
          <span className="w-full h-full p-[2px] overflow-hidden rounded-full bg-gradient-to-b from-[#fafafa50] to-[#FAFAFA00]">
            <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-[#3c3c3c] to-foreground font-bold text-base">
              {selectedWord()}
            </span>
          </span>
        </Button>
        {handleBack && (
          <Button onClick={handleBack} variant="secondary">
            Back
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
