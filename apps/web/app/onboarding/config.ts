export const pageConfig = {
  label: "Meal preferences",
  title: "Let’s get started with your meal preferences",
};

export const stageConfigs = [
  {
    questionConfig: {
      title: "Let’s get started, What kind of meal would you like to have?",
      headerImgSrc: "bento.png",
      currStage: 1,
      totalStage: 5,
    },
    textConfig: {
      placeholder: "I would like to have shoyu ramen, satay,okonomiyaki...",
    },
  },
  {
    questionConfig: {
      title:
        "Are there any ingredients you’d rather avoid? We’ll keep them out of the pot!",
      headerImgSrc: "nauseous.png",
      currStage: 2,
      totalStage: 5,
    },
    textConfig: {
      placeholder: "I don’t like peanuts, kiwi, and durian...",
    },
  },
  {
    questionConfig: {
      title:
        "Any allergies, sensitivities or intolerance we should be aware of?",
      headerImgSrc: "sick.png",
      currStage: 3,
      totalStage: 5,
    },
    textConfig: {
      placeholder:
        "I’m allergic to peanut, lactose intolerant and I don’t like spicy...",
    },
  },
  {
    questionConfig: {
      title:
        "Do you follow any specific diet, like halal, or maybe you’re on plant-based train?",
      headerImgSrc: "medicine.png",
      currStage: 4,
      totalStage: 5,
    },
    textConfig: {
      field: "diet",
      placeholder: "I'm on a keto diet, halal, vegan...",
    },
  },
  {
    questionConfig: {
      title:
        "Favourite cuisine style? Asian, Italian, Arabic, or something else?",
      headerImgSrc: "happy.png",
      currStage: 5,
      totalStage: 5,
    },
    textConfig: {
      field: "cuisine",
      placeholder: "I love Asian, Italian, Arabic...",
    },
  },
];
