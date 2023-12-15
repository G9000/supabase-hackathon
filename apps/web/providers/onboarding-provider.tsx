"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  ReactNode,
} from "react";

interface OnboardingContextI {
  likes: string;
  dislikes: string;
  allergies: string;
  dietaryPreferences: string;
  cuisinePreferences: string;
  setLikes: Dispatch<SetStateAction<string>>;
  setDislikes: Dispatch<SetStateAction<string>>;
  setAllergies: Dispatch<SetStateAction<string>>;
  setDietaryPreferences: Dispatch<SetStateAction<string>>;
  setCuisinePreferences: Dispatch<SetStateAction<string>>;
}

const defaultContext: OnboardingContextI = {
  likes: "",
  dislikes: "",
  allergies: "",
  dietaryPreferences: "",
  cuisinePreferences: "",
  setLikes: () => {},
  setDislikes: () => {},
  setAllergies: () => {},
  setDietaryPreferences: () => {},
  setCuisinePreferences: () => {},
};

export const OnboardingContext =
  createContext<OnboardingContextI>(defaultContext);

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingContext must be used within a OnboardingProvider"
    );
  }
  return context;
}

export default function OnboardingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [allergies, setAllergies] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [cuisinePreferences, setCuisinePreferences] = useState("");

  const contextValue = useMemo(
    () => ({
      likes,
      dislikes,
      allergies,
      dietaryPreferences,
      cuisinePreferences,
      setLikes,
      setDislikes,
      setAllergies,
      setDietaryPreferences,
      setCuisinePreferences,
    }),
    [likes, dislikes, allergies, dietaryPreferences, cuisinePreferences]
  );

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
}
