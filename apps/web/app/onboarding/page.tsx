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
import { stageConfigs } from "./config";

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

  const {
    register,
    handleSubmit: validateForm,
    watch,
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

  const watchedValues = watch();

  const handleNext = () => {
    if (step === stageConfigs.length - 1) {
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
      router.push("/onboarding/review");
    }
  };

  return (
    <>
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
            <OnboardignCard
              {...stageConfigs[0]?.questionConfig}
              handleNext={handleNext}
              handleNextDisabled={watchedValues.likes.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[0]?.textConfig}
                  {...register("likes")}
                />
              </CardContent>
            </OnboardignCard>
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
            <OnboardignCard
              {...stageConfigs[1]?.questionConfig}
              handleNext={handleNext}
              handleBack={handleBack}
              handleNextDisabled={watchedValues.dislikes.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[1]?.textConfig}
                  {...register("dislikes")}
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
              {...stageConfigs[2]?.questionConfig}
              handleNext={handleNext}
              handleBack={handleBack}
              handleNextDisabled={watchedValues.allergies.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[2]?.textConfig}
                  {...register("allergies")}
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
              {...stageConfigs[3]?.questionConfig}
              handleNext={handleNext}
              handleBack={handleBack}
              handleNextDisabled={watchedValues.dietaryPreferences.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[3]?.textConfig}
                  {...register("dietaryPreferences")}
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
              {...stageConfigs[4]?.questionConfig}
              handleNext={handleNext}
              handleBack={handleBack}
              handleNextDisabled={watchedValues.cuisinePreferences.length === 0}
              lastStep
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[4]?.textConfig}
                  {...register("cuisinePreferences")}
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      )}
    </>
  );
}
