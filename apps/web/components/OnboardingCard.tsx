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

interface OnboardignCardPropsI {
  showHeader?: boolean;
  headerImgSrc?: string;
  currStage?: number;
  totalStage?: number;
  title?: string;
  titleClassName?: string;
  handleBtnClick?: () => void;
  children?: ReactNode;
}

export default function OnboardignCard({
  showHeader = true,
  headerImgSrc = "bento.png",
  currStage = 1,
  totalStage = 1,
  title = "Title Here",
  titleClassName,
  handleBtnClick,
  children,
}: OnboardignCardPropsI) {
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

      <CardContent className={cn("text-sm", titleClassName)}>
        {title}
      </CardContent>
      {children}
      <CardFooter>
        <Button onClick={handleBtnClick}>Continue</Button>
      </CardFooter>
    </Card>
  );
}
