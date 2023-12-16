import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const onboardingStore = (set) => ({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    isComplete: false,
    howManyDays: '',
    budget: '',

    updateAnswer1: (answer1) => set({ answer1 }),
    updateAnswer2: (answer2) => set({ answer2 }),
    updateAnswer3: (answer3) => set({ answer3 }),
    updateAnswer4: (answer4) => set({ answer4 }),
    updateAnswer5: (answer5) => set({ answer5 }),
    updateIsComplete: (isComplete) => set({ isComplete }),
    updateHowManyDays: (howManyDays) => set({ howManyDays }),
    updateBudget: (budget) => set({ budget }),
});

export const useOnboardingStore = create(
    persist(onboardingStore, {
        name: 'onboarding-store',
    })
);
