"use client";

import OnboardingLayout from "components/onboarding/OnboardingLayout";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import OnboardingCard from "components/onboarding/OnboardingCard";
import { CardContent } from "components/base/Card";
import { Textarea } from "components/base/Textarea";
import { RadioGroup, RadioGroupItem } from "components/base/Radio";
import { Label } from "components/base/Label";
import { Input } from "components/base/Input";
import { useForm } from "react-hook-form";
import { useOnboardingStore } from "store/app-store";
import { shallow } from "zustand/shallow";

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

export default function Page() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [radioValue, setRadioValue] = useState('');

  const {
    register,
    handleSubmit: validateForm,
  } = useForm();

  const [
    answer1,
    answer2,
    answer4,
    answer5,
    howManyDays,
    updateHowManyDays,
  ] = useOnboardingStore((state: any) => {
    return [
      state.answer1,
      state.answer2,
      state.answer4,
      state.answer5,
      state.howManyDays,
      state.updateHowManyDays,
    ];
  }, shallow);

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

  const onSubmit = (d: any) => {
    alert(JSON.stringify(d));
    // setIsLoading(true);
  };

  const handleRadioChange = (event: any) => {
    const selectedValue = event.target.value;
    updateHowManyDays(selectedValue);
    console.log(selectedValue)
  };

  const ComposingRecipe = () => {
    return (
      <OnboardingLayout {...composingRecipeConfig}>
        <h1 className="loader mt-4 max-w-md text-center text-2xl font-extrabold opacity-50 bg-gradient-to-r from-[#0808081f] from-20% via-[#080808a2] via-50% to-[#0808081f] to-80% text-transparent bg-clip-text">
          I would like to have meal plan for 2 weeks with 1000 SGD. I like shoyu
          ramen, sashimi, okonomiyaki. I don’t like Pork, Spicy, and Salmon. My
          restriction is haram food, peanuts, and lactose intolerant. My fav
          cuisine are Chinese and Japanese food
        </h1>
      </OnboardingLayout>
    );
  };

  return (
    <>
      {isLoading && ComposingRecipe()}
      {!isLoading && (
        <OnboardingLayout {...config}>
          <form onSubmit={validateForm(onSubmit)}>
            <input value={answer1} {...register('likes')} hidden />
            <input value={answer2} {...register('dislikes')} hidden />
            <input value={answer4} {...register('dietaryPreferences')} hidden />
            <input value={answer5} {...register('cuisinePreferences')} hidden />
            <input value={howManyDays} {...register('howManyDays')} hidden />

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
                  <OnboardingCard {...stageConfig1} handleNext={handleNext}>
                    <CardContent>
                      <RadioGroup
                        onChange={handleRadioChange}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="A Day"
                            id="option-one"
                            className="w-6 h-6"
                          />
                          <Label
                            htmlFor="option-one"
                            className="font-extrabold text-2xl"
                          >
                            A day
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="A Week"
                            id="option-two"
                            className="w-6 h-6"
                          />
                          <Label
                            htmlFor="option-two"
                            className="font-extrabold text-2xl"
                          >
                            A Week
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="option-three"
                            id="option-three"
                            className="w-6 h-6"
                          />
                          <Input
                            placeholder="2 Weeks"
                            className="font-extrabold text-2xl border-none px-0"
                          />
                        </div>
                      </RadioGroup>
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
                        {...register('budget')}
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
          </form>
        </OnboardingLayout>
      )}
    </>
  );
}
