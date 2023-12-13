import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/base/Card";
import { Badge } from "components/base/Badge";
import { Textarea } from "components/base/Textarea";
import { Button } from "components/base/Button";
import Image from "next/image";

interface OnboardignCardPropsI {
  headerImgSrc?: string;
  currStage?: number;
  totalStage?: number;
  title?: string;
  textPlaceholder?: string;
}

export default function OnboardignCard({
  headerImgSrc = "",
  currStage = 1,
  totalStage = 1,
  title = "Title Here",
  textPlaceholder = "Placeholder",
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
      <CardContent>
        <Textarea
          placeholder={textPlaceholder}
          className="border-0 pl-0 text-2xl leading-6 font-bold opacity-30 h-[100px] focus-visible:ring-0"
        />
      </CardContent>

      <CardFooter>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  );
}
