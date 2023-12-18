"use client";

import { useForm } from "react-hook-form";
import { Button } from "components/base/Button";
import { Type as t, Static } from "@sinclair/typebox";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "store/app-store";
import dynamic from "next/dynamic";
import { useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from "lib/cn";
import { useCompletion } from "ai/react";
import { createClient } from "utils/supabase/client";

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

const config = {
  label: "Review preference",
  title: "Perfect, James! Let’s recap your meal preference",
  withoutPadding: false,
};

interface EditableTextState {
  editableText1: boolean;
  editableText2: boolean;
  editableText3: boolean;
  editableText4: boolean;
  editableText5: boolean;
}

export default function Page() {
  const router = useRouter();
  const supabase = createClient();

  const [editableText, setEditableText] = useState<EditableTextState>({
    editableText1: false,
    editableText2: false,
    editableText3: false,
    editableText4: false,
    editableText5: false,
  });

  const makeEditable = (input: keyof EditableTextState): void => {
    setEditableText((prevState) => {
      const updatedState = {
        ...prevState,
        editableText1: false,
        editableText2: false,
        editableText3: false,
        editableText4: false,
        editableText5: false,
      };
      updatedState[input] = !prevState[input];
      return updatedState;
    });
  };

  const {
    likes,
    dislikes,
    allergies,
    dietary_preferences,
    cuisine_preferences,
    filteredUserPreferencesData,
    isDietaryDataDone,
    updateLikes,
    updateDislikes,
    updateAllergies,
    updateDietaryPreferences,
    updateCuisinePreferences,
    updateFilteredUserPreferencesData,
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

  const {
    complete: sortingData,
    // isLoading,
  } = useCompletion({
    api: "/api/generate",
  });

  const handleNext = async () => {
    try {
      const transformedData = {
        likes,
        dislikes,
        allergies,
        dietary_preferences,
        cuisine_preferences,
      };

      const prompt = `${JSON.stringify(
        transformedData
      )}. Parse the answer and only give me the relevant keyword. Remove all punctuation marks, such as full stops and commas. Correct typographical errors and convert everything to lowercase. If the list contains verbs, remove them. Create a JSON object with fields like likes, dislikes, allergies, dietary preferences, and cuisine preferences. Make sure the answer will always be an array, even with one value.`;

      if (!filteredUserPreferencesData || !isDietaryDataDone) {
        const res = await sortingData(prompt);
        // @ts-ignore
        const convertDataResponse = JSON.parse(res);
        updateFilteredUserPreferencesData(convertDataResponse);
        updateIsDietaryDataDone(true);
      }

      const { data, error } = await supabase
        .from("diet_preferences")
        .upsert({ ...filteredUserPreferencesData }, { onConflict: "user_id" });

      if (error) {
        console.error("Error in upsert operation:", error);
      } else {
        console.log("Upsert operation successful:", data);
      }

      router.push("/onboarding-last-step");
    } catch (error: any) {
      console.error("An error occurred:", error);
    }
  };

  function handleFormChange(prev: string | undefined, next: string) {
    updateIsDietaryDataDone(prev === next);
  }

  return (
    <OnboardingLayout {...config}>
      <div className="flex flex-row text-left gap-5 w-screen overflow-x-auto items-start py-8 px-10 scrollbar-hide">
        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 rotate-2 ml-auto">
          <div className="flex flex-row items-start justify-between">
            <Image src={"/icons/bento.png"} alt="icon" height={48} width={48} />
            <div
              onClick={() => {
                makeEditable("editableText1");
                updateLikes(formData.likes);
                handleFormChange(likes, formData.likes);
              }}
              className="cursor-pointer px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base"
            >
              {editableText.editableText1 ? "Done" : "Edit"}
            </div>
          </div>
          <div className={cn({ 'opacity-50': !editableText.editableText1 })}>
            <div className="mt-3 mb-2 text-foreground/50">You crave for</div>
            <TextareaAutosize
              className="border-0 pl-0 text-2xl leading-6 font-bold w-full focus-visible:ring-0 bg-white overflow-y-hidden"
              {...register("likes")}
              disabled={!editableText.editableText1}
            />
          </div>
        </div>

        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 -rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image
              src={"/icons/nauseous.png"}
              alt="icon"
              height={48}
              width={48}
            />
            <div
              onClick={() => {
                makeEditable("editableText2");
                updateDislikes(formData.dislikes);
                handleFormChange(dislikes, formData.dislikes);
              }}
              className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base"
            >
              {editableText.editableText2 ? "Done" : "Edit"}
            </div>
          </div>

          <div className={cn({ 'opacity-50': !editableText.editableText2 })}>
            <div className="mt-3 mb-2 text-foreground/50">You don’t likes</div>
            <TextareaAutosize
              className="border-0 pl-0 text-2xl leading-6 font-bold w-full focus-visible:ring-0 bg-white overflow-y-hidden"
              {...register("dislikes")}
              disabled={!editableText.editableText2}
             />
          </div>
        </div>

        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image src={"/icons/sick.png"} alt="icon" height={48} width={48} />
            <div
              onClick={() => {
                makeEditable("editableText3");
                updateAllergies(formData.allergies);
                handleFormChange(allergies, formData.allergies);
              }}
              className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base"
            >
              {editableText.editableText3 ? "Done" : "Edit"}
            </div>
          </div>

          <div className={cn({ 'opacity-50': !editableText.editableText3 })}>
            <div className="mt-3 mb-2 text-foreground/50">You’re allergic to</div>
            <TextareaAutosize
              className="border-0 pl-0 text-2xl leading-6 font-bold w-full focus-visible:ring-0 bg-white overflow-y-hidden"
              {...register("allergies")}
              disabled={!editableText.editableText3}
            />
          </div>
        </div>

        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image
              src={"/icons/medicine.png"}
              alt="icon"
              height={48}
              width={48}
            />
            <div
              onClick={() => {
                makeEditable("editableText4");
                updateDietaryPreferences(formData.dietaryPreferences);
                handleFormChange(
                  dietary_preferences,
                  formData.dietaryPreferences
                );
              }}
              className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base"
            >
              {editableText.editableText4 ? "Done" : "Edit"}
            </div>
          </div>

          <div className={cn({ 'opacity-50': !editableText.editableText4 })}>
            <div className="mt-3 mb-2 text-foreground/50">
              Your diet or restrictions
            </div>
            <TextareaAutosize
              className="border-0 pl-0 text-2xl leading-6 font-bold w-full focus-visible:ring-0 bg-white overflow-y-hidden"
              {...register("dietaryPreferences")}
              disabled={!editableText.editableText4}
            />
          </div>
        </div>

        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 -rotate-2 mr-auto">
          <div className="flex flex-row items-start justify-between">
            <Image src={"/icons/happy.png"} alt="icon" height={48} width={48} />
            <div
              onClick={() => {
                makeEditable("editableText5");
                updateCuisinePreferences(formData.cuisinePreferences);
                handleFormChange(
                  cuisine_preferences,
                  formData.cuisinePreferences
                );
              }}
              className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base"
            >
              {editableText.editableText5 ? "Done" : "Edit"}
            </div>
          </div>

          <div className={cn({ 'opacity-50': !editableText.editableText5 })}>
            <div className="mt-3 mb-2 text-foreground/50">
              Your cuisine preference
            </div>
            <TextareaAutosize
              className="border-0 pl-0 text-2xl leading-6 font-bold w-full focus-visible:ring-0 bg-white overflow-y-hidden"
              {...register("cuisinePreferences")}
              disabled={!editableText.editableText5}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm leading-5 mb-4 text-foreground/50 max-w-[277px] text-center">
          Feel free to adjust further or if you have more details you’d like to
          include! If you’re ready to roll, let’s continue
        </p>
        <Button
          onClick={handleNext}
          className="p-0 overflow-hidden border border-white/10 rounded-full"
        >
          <span className="w-full h-full p-[2px] overflow-hidden rounded-full bg-gradient-to-b from-[#fafafa50] to-[#FAFAFA00]">
            <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-[#3c3c3c] to-foreground font-bold text-base">
              Perfect! Continue
            </span>
          </span>
        </Button>
      </div>
    </OnboardingLayout>
  );
}
