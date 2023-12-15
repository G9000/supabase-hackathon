"use client";

import OnboardingLayout from "components/onboarding/OnboardingLayout";
import { useOnboardingContext } from "providers/onboarding-provider";
import { Button } from "components/base/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const config = {
  label: "Review preference",
  title: "Perfect, James! Let’s recap your meal preference",
};

export default function Page() {
  const router = useRouter();
  const {
    likes,
    dislikes,
    allergy,
    dietaryPreferences,
    cuisinePreferences,
    // setLikes,
    // setDislikes,
    // setAllergy,
    // setDietaryPreferences,
    // setCuisinePreferences,
  } = useOnboardingContext();

  const handleNext = () => {
    router.push("/onboarding/last-step");
  };

  return (
    <OnboardingLayout {...config}>
      <div className="flex flex-col md:flex-row text-left gap-5 w-screen overflow-auto items-center justify-center py-8">
        <div className="border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image src={"/icons/bento.png"} alt="icon" height={48} width={48} />
            <div className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              Edit
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">You crave for</div>
          <div className="font-extrabold text-xl leading-6 bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
            {likes}
          </div>
        </div>

        <div className="border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 -rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image
              src={"/icons/nauseous.png"}
              alt="icon"
              height={48}
              width={48}
            />
            <div className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              Edit
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">You don’t likes</div>
          <div className="font-extrabold text-xl leading-6 bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
            {dislikes}
          </div>
        </div>

        <div className="border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image src={"/icons/sick.png"} alt="icon" height={48} width={48} />
            <div className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              Edit
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">You’re allergic to</div>
          <div className="font-extrabold text-xl leading-6 bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
            {allergy}
          </div>
        </div>

        <div className="border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image
              src={"/icons/medicine.png"}
              alt="icon"
              height={48}
              width={48}
            />
            <div className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              Edit
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">
            Your diet or restrictions
          </div>
          <div className="font-extrabold text-xl leading-6 bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
            {dietaryPreferences}
          </div>
        </div>

        <div className="border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 -rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image src={"/icons/happy.png"} alt="icon" height={48} width={48} />
            <div className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              Edit
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">
            Your cuisine preference
          </div>
          <div className="font-extrabold text-xl leading-6 bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
            {cuisinePreferences}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm leading-5 mb-4 text-foreground/50 max-w-[277px] text-center">
          Feel free to adjust further or if you have more details you’d like to
          include! If you’re ready to roll, let’s continue
        </p>
        <Button className="p-0 overflow-hidden border border-black rounded-full" onClick={handleNext}>
          <span className="w-full h-full p-[1px] overflow-hidden rounded-full bg-gradient-to-b from-slate-600 to-transparent">
            <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-slate-900 to-slate-950 font-bold text-base">
              Perfect! Continue
            </span>
          </span>
        </Button>
      </div>
    </OnboardingLayout>
  );
}
