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
  headerImgSrc: string;
  currStage: number;
  totalStage: number;
  title: string;
  textPlaceholder: string;
}

export default function OnboardignCard({
  headerImgSrc,
  currStage,
  totalStage,
  title,
  textPlaceholder,
}: OnboardignCardPropsI) {
  return (
    <Card className="max-w-[325px] h-auto grid gap-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <Image src="/icons/bento.png" alt="" height={48} width={48} />
          </div>
          <Badge variant="outline" className="px-4 py-3">
            <span className=" text-sm font-black opacity-40"> 1 of 5</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        Let’s get started, What kind of meal would you like to have?
      </CardContent>
      <CardContent>
        <Textarea
          placeholder="I would like to have shoyu ramen, sashimi, okonomiyaki..."
          className="border-0 pl-0 text-2xl leading-6 font-bold opacity-30 h-[100px] focus-visible:ring-0"
        />
      </CardContent>

      <CardFooter>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  );
}
