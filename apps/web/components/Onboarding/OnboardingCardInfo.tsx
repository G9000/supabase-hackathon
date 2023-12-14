import { Card, CardTitle, CardContent } from "components/base/Card";
import Image from "next/image";
import { cn } from "lib/cn";

interface OnboardingCardInfoPropsI {
  headerImgSrc?: string;
  title?: string;
  description?: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function OnboardingCardInfo({
  headerImgSrc = "target.png",
  title = "Title",
  description = "Description",
  containerClassName,
  titleClassName,
  descriptionClassName,
}: OnboardingCardInfoPropsI) {
  return (
    <Card
      className={cn(
        "max-w-[325px] h-auto grid gap-4 bg-sky-50/50",
        containerClassName
      )}
    >
      <CardTitle className="flex items-center space-x-4">
        <div className="bg-sky-100  p-3 rounded-md">
          <Image
            src={`/icons/${headerImgSrc}`}
            alt="stage"
            height={32}
            width={32}
          />
        </div>
        <span className={cn("text-sm font-black text-sky-500", titleClassName)}>
          {title}
        </span>
      </CardTitle>
      <CardContent>
        <p className={cn("text-sm text-sky-500", descriptionClassName)}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
