"use client";

import OnboardingLayout from "components/onboarding/OnboardingLayout";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCompletion } from "ai/react";
import OnboardingCard from "components/onboarding/OnboardingCard";
import { Type as t, Static } from "@sinclair/typebox";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { CardContent } from "components/base/Card";
import { Textarea } from "components/base/Textarea";
import { Label } from "components/base/Label";
import { Input } from "components/base/Input";
import { useForm } from "react-hook-form";
import { useOnboardingStore } from "store/app-store";

const config = {
  label: "Planning & Budget",
  title: "Sweet! Last one, tell us about your plan",
};

export const stageConfig1 = {
  title:
    "How long would you like this meal plan to cover? Pick the duration that suits you!",
  headerImgSrc: "calendar.png",
  currStage: 1,
  totalStage: 2,
};

export const stageConfig2 = {
  title: "What is your budget for 2 Weeks meal plan?",
  headerImgSrc: "money.png",
  currStage: 2,
  totalStage: 2,
};

const composingRecipeConfig = {
  label: "Composing recipe",
  showTitle: false,
};

const mealPlanningSchema = t.Object({
  mealPlanFrequency: t.String(),
  budget: t.String(),
});

type MealPlanningSchema = Static<typeof mealPlanningSchema>;

export default function Page() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { filteredUserPreferencesData, mealPlanFrequency, budget } =
    useOnboardingStore();

  const {
    register,
    setValue,
    handleSubmit: validateForm,
    watch,
  } = useForm<MealPlanningSchema>({
    resolver: typeboxResolver(mealPlanningSchema),
    defaultValues: {
      mealPlanFrequency: mealPlanFrequency || "",
      budget: budget || "",
    },
  });

  const formData = watch();

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (step === 1) {
      validateForm(onSubmit)();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const { complete: generateSummary, completion: generateSummaryCompletion } =
    useCompletion({
      api: "/api/generate",
    });

  const onSubmit = async (d: any) => {
    setIsLoading(true);
    const transformedData = {
      ...filteredUserPreferencesData,
      mealPlanFrequency: d.mealPlanFrequency,
      budget: d.budget,
    };

    const prompt = `${JSON.stringify(
      transformedData
    )}. Parse the data. Generate a short paragraph of user profile summary for this person. You are not required to give any explanation or whatsoever. Avoid writting too much.`;

    await generateSummary(prompt);
    // router.push("/onboarding/last-step");
  };

  const [customValue, setCustomValue] = useState("");
  function handleCustomMealPlanFrequency(e: any) {
    const newValue = e.target.value;
    setCustomValue(newValue);
    setValue("mealPlanFrequency", newValue);
  }

  const ComposingRecipe = () => {
    return (
      <OnboardingLayout {...composingRecipeConfig}>
        <h1 className="loader mt-4 max-w-md text-center text-2xl font-extrabold opacity-50 bg-gradient-to-r from-[#0808081f] from-20% via-[#080808a2] via-50% to-[#0808081f] to-80% text-transparent bg-clip-text">
          {generateSummaryCompletion}
        </h1>
      </OnboardingLayout>
    );
  };

  return (
    <>
      {isLoading && ComposingRecipe()}
      {!isLoading && (
        <OnboardingLayout {...config}>
          {step >= 0 && (
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 200 }}
                animate={{
                  opacity: 1,
                  scale: step > 0 ? 0.9 : 1,
                  y: step > 0 ? -40 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <OnboardingCard
                  {...stageConfig1}
                  handleNext={handleNext}
                  handleNextDisabled={formData?.mealPlanFrequency?.length === 0}
                >
                  <CardContent className="flex flex-col gap-y-">
                    <Label
                      htmlFor="option-one"
                      className="flex items-center gap-x-3 font-extrabold text-2xl"
                    >
                      <input
                        {...register("mealPlanFrequency")}
                        className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none  checked:bg-black"
                        type="radio"
                        value="A day"
                        id="field-rain"
                      />
                      A day
                    </Label>
                    <Label
                      htmlFor="option-two"
                      className="flex items-center gap-x-3 font-extrabold text-2xl"
                    >
                      <input
                        {...register("mealPlanFrequency")}
                        className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none  checked:bg-black"
                        type="radio"
                        value="A week"
                        id="option-two"
                      />
                      A week
                    </Label>
                    <Label
                      htmlFor="option-three"
                      className="flex items-center gap-x-3 font-extrabold text-2xl"
                    >
                      <input
                        {...register("mealPlanFrequency")}
                        className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none  checked:bg-black"
                        type="radio"
                        value={customValue}
                        id="option-three"
                        checked={formData.mealPlanFrequency === customValue} // this is kind of fuckery
                      />
                      <Input
                        placeholder="Let you decide"
                        className="font-extrabold text-2xl border-none px-0 shadow-none focus-visible:ring-0 text-black"
                        onChange={handleCustomMealPlanFrequency}
                        value={customValue}
                      />
                    </Label>
                  </CardContent>
                </OnboardingCard>
              </motion.div>
            </div>
          )}
          {step >= 1 && (
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 200 }}
                animate={{
                  opacity: 1,
                  scale: step > 1 ? 0.9 : 1,
                  y: step > 1 ? -40 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <OnboardingCard
                  {...stageConfig2}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  lastStep
                  lastStepButton={"Finish & compose"}
                >
                  <CardContent>
                    <Textarea
                      placeholder="Ex, 1000 SGD"
                      className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                      {...register("budget")}
                    />
                    <div className="flex items-center">
                      <Image
                        src={"/info.svg"}
                        width={16}
                        height={16}
                        alt="info"
                      />
                      <span className="ml-1 text-foreground/50 text-base font-extrabold">
                        Please include your currency
                      </span>
                    </div>
                  </CardContent>
                </OnboardingCard>
              </motion.div>
            </div>
          )}
        </OnboardingLayout>
      )}
    </>
  );
}
