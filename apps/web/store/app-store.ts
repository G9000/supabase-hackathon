import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";

interface userPreferenceI {
  likes?: string[];
  dislikes?: string[];
  allergies?: string[];
  dietary_preferences?: string[];
  cuisine_preferences?: string[];
}

export interface OnboardingI {
  likes?: string;
  dislikes?: string;
  allergies?: string;
  dietary_preferences?: string;
  cuisine_preferences?: string;
  filteredUserPreferencesData?: userPreferenceI;
  mealPlanFrequency: string;
  budget: string;
  isDietaryDataDone: boolean;
  updateLikes: (likes: string) => void;
  updateDislikes: (dislikes: string) => void;
  updateAllergies: (allergies: string) => void;
  updateDietaryPreferences: (dietary_preferences: string) => void;
  updateCuisinePreferences: (cuisine_preferences: string) => void;
  updateFilteredUserPreferencesData: (
    filteredUserPreferencesData: userPreferenceI | undefined
  ) => void;
  updateMealPlanFrequency: (mealPlanFrequency: string) => void;
  updateBudget: (budget: string) => void;
  updateIsDietaryDataDone: (isDietaryDataDone: boolean) => void;
}

export const useOnboardingStore = createWithEqualityFn<OnboardingI>()(
  persist(
    (set) => ({
      likes: "",
      dislikes: "",
      allergies: "",
      dietary_preferences: "",
      cuisine_preferences: "",
      filteredUserPreferencesData: undefined,
      mealPlanFrequency: "A day",
      budget: "",
      isDietaryDataDone: false,
      updateLikes: (likes: string) => set({ likes }),
      updateDislikes: (dislikes: string) => set({ dislikes }),
      updateAllergies: (allergies: string) => set({ allergies }),
      updateDietaryPreferences: (dietary_preferences: string) =>
        set({ dietary_preferences }),
      updateCuisinePreferences: (cuisine_preferences: string) =>
        set({ cuisine_preferences }),
      updateFilteredUserPreferencesData: (
        filteredUserPreferencesData: userPreferenceI | undefined
      ) => set({ filteredUserPreferencesData }),
      updateMealPlanFrequency: (mealPlanFrequency: string) =>
        set({ mealPlanFrequency }),
      updateBudget: (budget: string) => set({ budget }),
      updateIsDietaryDataDone: (isDietaryDataDone: boolean) =>
        set({ isDietaryDataDone }),
    }),
    {
      name: "onboarding-store",
      getStorage: () => sessionStorage,
    }
  )
);

export interface MenuI {
  id: number;
  meal_name: string;
  mealtime_type: string;
  cuisine: string;
}

export interface MealItemI {
  id: number;
  date: string;
  menus: MenuI[];
}
export interface MealPlanI {
  mealPlans: MealItemI[];
  updateMealPlans: (mealPlans: MealItemI[] | undefined) => void;
}

export const useMealPlaStore = createWithEqualityFn<MealPlanI>()(
  persist(
    (set) => ({
      mealPlans: [],
      updateMealPlans: (mealPlans: MealItemI[] | undefined) =>
        set({ mealPlans }),
    }),
    {
      name: "meal-plan-store",
      getStorage: () => sessionStorage,
    }
  )
);
