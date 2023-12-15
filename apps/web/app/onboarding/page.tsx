"use client";

import { useForm } from "react-hook-form";
import { Type as t, Static } from "@sinclair/typebox";
import { CardContent } from "components/base/Card";
import OnboardignCard from "components/onboarding/OnboardingCard";
import { Textarea } from "components/base/Textarea";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { useOnboardingContext } from "providers/onboarding-provider";
import {
  stageConfig1,
  stageConfig2,
  stageConfig3,
  stageConfig4,
  stageConfig5,
} from "./config";

const onboardingSchema = t.Object({
  likes: t.String(),
  dislikes: t.String(),
  allergy: t.String(),
  dietary_preferences: t.String(),
  cuisine_preferences: t.String(),
});

type SignInSchema = Static<typeof onboardingSchema>;

export default function Page() {
  const {
    setLikes,
    setDislikes,
    setAllergy,
    setDietaryPreferences,
    setCuisinePreferences,
  } = useOnboardingContext();

  const router = useRouter();
  const [step, setStep] = useState(0);

  const { register, handleSubmit: validateForm } = useForm<SignInSchema>({
    resolver: typeboxResolver(onboardingSchema),
    defaultValues: {
      likes: "",
      dislikes: "",
      allergy: "",
      dietary_preferences: "",
      cuisine_preferences: "",
    },
  });

  const handleNext = () => {
    if (step === 5) {
      validateForm(handleFormSubmit)();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = (data: any) => {
    setLikes(data.likes);
    setDislikes(data.dislikes);
    setAllergy(data.allergy);
    setDietaryPreferences(data.dietary_preferences);
    setCuisinePreferences(data.cuisine_preferences);

    console.log("data", data);

    router.push("/onboarding/review");
  };
  return (
    <>
      {step >= 0 && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full">
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
            <OnboardignCard
              showHeader={false}
              title="What should I call you?"
              handleNext={handleNext}
            >
              <CardContent>
                <Textarea
                  placeholder="I would like to have shoyu ramen, sashimi, okonomiyaki..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      )}

      {step >= 1 && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 w-full">
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
            <OnboardignCard
              {...stageConfig1}
              handleNext={handleNext}
              handleBack={handleBack}
            >
              <CardContent>
                <Textarea
                  placeholder="I would like to have shoyu ramen, sashimi, okonomiyaki..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...register("likes")}
                />
              </CardContent>
            </OnboardignCard>
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
            <OnboardignCard
              {...stageConfig2}
              handleNext={handleNext}
              handleBack={handleBack}
            >
              <CardContent>
                <Textarea
                  placeholder="I don’t like peanuts, kiwi, and durian..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...register("dislikes")}
                />
              </CardContent>
            </OnboardignCard>
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
            <OnboardignCard
              {...stageConfig3}
              handleNext={handleNext}
              handleBack={handleBack}
            >
              <CardContent>
                <Textarea
                  placeholder="I’m allergic to peanut, lactose intolerant and I don’t like spicy..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...register("allergy")}
                />
              </CardContent>
            </OnboardignCard>
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
            <OnboardignCard
              {...stageConfig4}
              handleNext={handleNext}
              handleBack={handleBack}
            >
              <CardContent>
                <Textarea
                  placeholder="Halal and occasionally pescatarian..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...register("dietary_preferences")}
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      )}

      {step >= 5 && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 200 }}
            animate={{
              opacity: 1,
              scale: step > 5 ? 0.9 : 1,
              y: step > 5 ? -40 : 0,
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
            <OnboardignCard
              {...stageConfig5}
              handleNext={handleNext}
              handleBack={handleBack}
              lastStep
            >
              <CardContent>
                <Textarea
                  placeholder="I like Chinese and Japanese food..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...register("cuisine_preferences")}
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      )}
    </>
  );
}
