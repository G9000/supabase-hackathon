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
import { stageConfigs, pageConfig } from "../config";
import { useOnboardingStore } from "store/app-store";
import dynamic from "next/dynamic";

const OnboardingLayout = dynamic(
  () => import("components/onboarding/OnboardingLayout"),
  { ssr: false }
);

const onboardingSchema = t.Object({
  likes: t.String(),
  dislikes: t.String(),
  allergies: t.String(),
  dietaryPreferences: t.String(),
  cuisinePreferences: t.String(),
});

type OnboardingSchema = Static<typeof onboardingSchema>;

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const {
    likes,
    dislikes,
    allergies,
    dietary_preferences,
    cuisine_preferences,
    updateLikes,
    updateDislikes,
    updateAllergies,
    updateDietaryPreferences,
    updateCuisinePreferences,
    updateIsDietaryDataDone,
  } = useOnboardingStore();

  const {
    register,
    handleSubmit: validateForm,
    watch,
  } = useForm<OnboardingSchema>({
    resolver: typeboxResolver(onboardingSchema),
    defaultValues: {
      likes: likes || "",
      dislikes: dislikes || "",
      allergies: allergies || "",
      dietaryPreferences: dietary_preferences || "",
      cuisinePreferences: cuisine_preferences || "",
    },
  });

  const formData = watch();

  const handleNext = () => {
    if (step === 4) {
      validateForm(handleFormSubmit)();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const isFormDataComplete = (data: OnboardingSchema) => {
    return Object.values(data).every((value) => value.trim() !== "");
  };

  const handleFormSubmit = (data: OnboardingSchema) => {
    updateIsDietaryDataDone(false);
    if (isFormDataComplete(data)) {
      updateLikes(data.likes);
      updateDislikes(data.dislikes);
      updateAllergies(data.allergies);
      updateDietaryPreferences(data.dietaryPreferences);
      updateCuisinePreferences(data.cuisinePreferences);
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
              handleNextDisabled={formData.likes.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[0]?.textConfig}
                  {...register("likes")}
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
              handleNextDisabled={formData.dislikes.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[1]?.textConfig}
                  {...register("dislikes")}
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
              handleNextDisabled={formData.allergies.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[2]?.textConfig}
                  {...register("allergies")}
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
              handleNextDisabled={formData.dietaryPreferences.length === 0}
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[3]?.textConfig}
                  {...register("dietaryPreferences")}
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
              handleNextDisabled={formData.cuisinePreferences.length === 0}
              lastStep
            >
              <CardContent>
                <Textarea
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                  {...stageConfigs[4]?.textConfig}
                  {...register("cuisinePreferences")}
                />
              </CardContent>
            </OnboardingCard>
          </motion.div>
        </div>
      )}
    </OnboardingLayout>
  );
}
