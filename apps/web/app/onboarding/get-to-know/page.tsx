"use client";

import { useForm } from "react-hook-form";
import { Type as t, Static } from "@sinclair/typebox";
import { CardContent } from "components/base/Card";
import OnboardingCard from "components/onboarding/OnboardingCard";
import { Textarea } from "components/base/Textarea";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { useOnboardingContext } from "providers/onboarding-provider";
import { stageConfigs, pageConfig } from "../config";
import { shallow } from 'zustand/shallow';
import { useOnboardingStore } from "store/app-store";
import dynamic from 'next/dynamic';

const OnboardingLayout = dynamic(() => import('components/onboarding/OnboardingLayout'), { ssr: false })

const onboardingSchema = t.Object({
  likes: t.String(),
  dislikes: t.String(),
  allergies: t.String(),
  dietaryPreferences: t.String(),
  cuisinePreferences: t.String(),
});

type SignInSchema = Static<typeof onboardingSchema>;

export default function Page() {
  const {
    setLikes,
    setDislikes,
    setAllergies,
    setDietaryPreferences,
    setCuisinePreferences,
  } = useOnboardingContext();

  const router = useRouter();
  const [step, setStep] = useState(0);

  const [
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    isComplete,
    updateAnswer1,
    updateAnswer2,
    updateAnswer3,
    updateAnswer4,
    updateAnswer5,
    updateIsComplete,
  ] = useOnboardingStore((state: any) => {
    return [
      state.answer1,
      state.answer2,
      state.answer3,
      state.answer4,
      state.answer5,
      state.isComplete,
      state.updateAnswer1,
      state.updateAnswer2,
      state.updateAnswer3,
      state.updateAnswer4,
      state.updateAnswer5,
      state.updateIsComplete,
    ];
  }, shallow);

  const {
    register,
    handleSubmit: validateForm,
  } = useForm<SignInSchema>({
    resolver: typeboxResolver(onboardingSchema),
    defaultValues: {
      likes: "",
      dislikes: "",
      allergies: "",
      dietaryPreferences: "",
      cuisinePreferences: "",
    },
  });


  const handleNext = () => {
    if (step === 1) {
      validateForm(handleFormSubmit)();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const isFormDataComplete = (data: SignInSchema) => {
    return Object.values(data).every((value) => value.trim() !== "");
  };

  const handleFormSubmit = (data: SignInSchema) => {
    if (isFormDataComplete(data)) {
      setLikes(data.likes);
      setDislikes(data.dislikes);
      setAllergies(data.allergies);
      setDietaryPreferences(data.dietaryPreferences);
      setCuisinePreferences(data.cuisinePreferences);
      updateIsComplete(true);
      router.push("/onboarding/review");
    }
  };

  return (
    <OnboardingLayout {...pageConfig}>
      {step >= 0 && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: step > 0 ? 0.8 : 1 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                restDelta: 0.001,
              },
            }}
          >
            <OnboardingCard
              {...stageConfigs[0]?.questionConfig}
              handleNext={handleNext}
              handleNextDisabled={answer1.length === 0}
            >
              {answer1.length}
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[0]?.textConfig}
                  {...register("likes")}
                  onChange={(event) => {
                    const answer1 = event.target.value;
                    updateAnswer1(answer1);
                  }}
                />
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
              {...stageConfigs[1]?.questionConfig}
              handleNext={handleNext}
              handleBack={handleBack}
              handleNextDisabled={answer2.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[1]?.textConfig}
                  {...register("dislikes")}
                  onChange={(event) => {
                    const answer2 = event.target.value;
                    updateAnswer2(answer2);
                  }}
                />
              </CardContent>
            </OnboardingCard>
          </motion.div>
        </div>
      )}

      {step >= 2 && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 200 }}
            animate={{
              opacity: 1,
              scale: step > 2 ? 0.9 : 1,
              y: step > 2 ? -40 : 0,
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
              {...stageConfigs[2]?.questionConfig}
              handleNext={handleNext}
              handleBack={handleBack}
              handleNextDisabled={answer3.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[2]?.textConfig}
                  {...register("allergies")}
                  onChange={(event) => {
                    const answer3 = event.target.value;
                    updateAnswer3(answer3);
                  }}
                />
              </CardContent>
            </OnboardingCard>
          </motion.div>
        </div>
      )}

      {step >= 3 && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 200 }}
            animate={{
              opacity: 1,
              scale: step > 3 ? 0.9 : 1,
              y: step > 3 ? -40 : 0,
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
              {...stageConfigs[3]?.questionConfig}
              handleNext={handleNext}
              handleBack={handleBack}
              handleNextDisabled={answer4.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[3]?.textConfig}
                  {...register("dietaryPreferences")}
                  onChange={(event) => {
                    const answer4 = event.target.value;
                    updateAnswer4(answer4);
                  }}
                />
              </CardContent>
            </OnboardingCard>
          </motion.div>
        </div>
      )}

      {step >= 4 && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 200 }}
            animate={{
              opacity: 1,
              scale: step > 4 ? 0.9 : 1,
              y: step > 4 ? -40 : 0,
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
              {...stageConfigs[4]?.questionConfig}
              handleNext={handleNext}
              handleBack={handleBack}
              handleNextDisabled={answer5.length === 0}
              lastStep
            >
              <CardContent>
                <Textarea
                  value={answer5}
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[4]?.textConfig}
                  {...register("cuisinePreferences")}
                  onChange={(event) => {
                    const answer5 = event.target.value;
                    updateAnswer5(answer5);
                  }}
                />
              </CardContent>
            </OnboardingCard>
          </motion.div>
        </div>
      )}
    </OnboardingLayout>
  );
}
