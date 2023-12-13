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

interface OnboardignCardPropsI {
  headerImgSrc?: string;
  currStage?: number;
  totalStage?: number;
  title?: string;
  children?: ReactNode;
}

export default function OnboardignCard({
  headerImgSrc = "bento.png",
  currStage = 1,
  totalStage = 1,
  title = "Title Here",
  children,
}: OnboardignCardPropsI) {
  return (
    <Card className="max-w-[325px] h-auto grid gap-4">
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
      <CardContent className="text-sm">{title}</CardContent>
      {children}
      <CardFooter>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  );
}
