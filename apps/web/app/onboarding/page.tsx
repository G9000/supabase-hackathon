'use client';

import { CardContent } from "components/base/Card";
import OnboardignCard from "components/Onboarding/OnboardingCard";
import { Textarea } from "components/base/Textarea";
import { useState } from "react";
import { motion } from "framer-motion";


const stageConfig1 = {
  title: "Let’s get started, What kind of meal would you like to have?",
  headerImgSrc: "bento.png",
  currStage: 1,
  totalStage: 5,
};

const stageConfig2 = {
  title: "Are there any ingredients you’d rather avoid? We’ll keep them out of the pot!",
  headerImgSrc: "nauseous.png",
  currStage: 2,
  totalStage: 5,
};

const stageConfig3 = {
  title: "Any allergies, sensitivities or intolerance we should be aware of?",
  headerImgSrc: "sick.png",
  currStage: 3,
  totalStage: 5
};

const stageConfig4 = {
  title: "Do you follow any specific diet, like halal, or maybe you’re on plant-based train?",
  headerImgSrc: "medicine.png",
  currStage: 4,
  totalStage: 5
};

const stageConfig5 = {
  title: "Favourite cuisine style? Asian, Italian, Arabic, or something else?",
  headerImgSrc: "happy.png",
  currStage: 5,
  totalStage: 5
};

export default function Page() {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(prevStep => prevStep + 1)
  }

  const handleBack = () => {
    setStep(prevStep => prevStep - 1)
  }

  const handleSubmit = () => {
    // todo
  }

  return (
    <div >
      {step >= 0 &&
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
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
                restDelta: 0.001
              }
            }}
          >
            <OnboardignCard showHeader={false} title="What should I call you?" handleNext={handleNext}>
              <CardContent>
                <Textarea
                  placeholder="I would like to have shoyu ramen, sashimi, okonomiyaki..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      }

      {step >= 1 &&
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 200 }}
            animate={{ opacity: 1, scale: step > 1 ? 0.9 : 1, y: step > 1 ? -40 : 0 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
            <OnboardignCard {...stageConfig1} handleNext={handleNext} handleBack={handleBack}>
              <CardContent>
                <Textarea
                  placeholder="I would like to have shoyu ramen, sashimi, okonomiyaki..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold opacity-30 h-[100px] focus-visible:ring-0"
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      }

      {step >= 2 &&
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 200 }}
            animate={{ opacity: 1, scale: step > 2 ? 0.9 : 1, y: step > 2 ? -40 : 0 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
            <OnboardignCard {...stageConfig2} handleNext={handleNext} handleBack={handleBack}>
              <CardContent>
                <Textarea
                  placeholder="I don’t like peanuts, kiwi, and durian..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold opacity-30 h-[100px] focus-visible:ring-0"
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      }

      {step >= 3 &&
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 200 }}
            animate={{ opacity: 1, scale: step > 3 ? 0.9 : 1, y: step > 3 ? -40 : 0 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
            <OnboardignCard {...stageConfig3} handleNext={handleNext} handleBack={handleBack}>
              <CardContent>
                <Textarea
                  placeholder="I’m allergic to peanut, lactose intolerant and I don’t like spicy..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold opacity-30 h-[100px] focus-visible:ring-0"
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      }

      {step >= 4 &&
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 200 }}
            animate={{ opacity: 1, scale: step > 4 ? 0.9 : 1, y: step > 4 ? -40 : 0 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
            <OnboardignCard {...stageConfig4} handleNext={handleNext} handleBack={handleBack}>
              <CardContent>
                <Textarea
                  placeholder="Halal and occasionally pescatarian..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold opacity-30 h-[100px] focus-visible:ring-0"
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      }

      {step >= 5 &&
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 200 }}
            animate={{ opacity: 1, scale: step > 5 ? 0.9 : 1, y: step > 5 ? -40 : 0 }}
            transition={{
              duration: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                restDelta: 0.001
              }
            }}
          >
            <OnboardignCard {...stageConfig5} handleNext={handleSubmit} handleBack={handleBack} lastStep>
              <CardContent>
                <Textarea
                  placeholder="I like Chinese and Japanese food..."
                  className="border-0 pl-0 text-2xl leading-6 font-bold opacity-30 h-[100px] focus-visible:ring-0"
                />
              </CardContent>
            </OnboardignCard>
          </motion.div>
        </div>
      }

    </div>
  );
}
