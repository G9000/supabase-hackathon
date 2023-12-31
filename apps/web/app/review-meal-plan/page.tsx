"use client";

import { Button } from "components/base/Button";
import { createClient } from "utils/supabase/client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/base/Tabs";
import OnboardingLayout from "components/onboarding/OnboardingLayout";
import { useMealPlaStore } from "store/app-store";
import type { MealItemI } from "store/app-store";
import { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import { flattenMealPlans } from "lib/payloadTransformer";
import { useRouter } from "next/navigation";
import { convertToDayOfTheWekk } from "lib/day";
import MeaItem, { EditMealType } from "./MealItem";

const composingRecipeConfig = {
  label: "Composing ingredients",
  showTitle: false,
};

export default function Page() {
  const router = useRouter();
  const supabase = createClient();
  const { mealPlans, updateMealPlans } = useMealPlaStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mealData, setMealData] = useState<MealItemI[]>(mealPlans || []);

  const [toggleState, setToggleState] = useState<{
    dayIndex: number;
    mealIndex: number;
  } | null>(null);

  function handleToggle(dayIndex: number, mealIndex: number) {
    setToggleState((prevState) => {
      if (
        prevState &&
        prevState.dayIndex === dayIndex &&
        prevState.mealIndex === mealIndex
      ) {
        return null;
      }

      return { dayIndex, mealIndex };
    });
  }

  const selectedIcon = (title: string) => {
    if (title === "Breakfast") return "/icons/bread.png";
    if (title === "Lunch") return "/icons/bento.png";
    if (title === "Dinner") return "/icons/egg.png";

    return "/icons/bread.png";
  };

  const mealTypeOrder = ["Breakfast", "Lunch", "Dinner"];

  function sortMealsByType(meals: any) {
    return meals.sort((a: any, b: any) => {
      return (
        mealTypeOrder.indexOf(a.mealtime_type) -
        mealTypeOrder.indexOf(b.mealtime_type)
      );
    });
  }

  function handleRemove(dayIndex: number, mealIndex: number) {
    setMealData((currentMealData) => {
      return currentMealData.map((day, idx) => {
        if (idx === dayIndex) {
          const filteredMenus = day.menus.filter((_, idx) => idx !== mealIndex);

          const sortMenu = sortMealsByType(filteredMenus);
          return { ...day, menus: sortMenu };
        }
        return day;
      });
    });

    setToggleState(null);
  }

  function handleMealTypeChange(
    dayIndex: number,
    mealIndex: number,
    newMealType: string
  ) {
    setMealData((currentMealData) => {
      return currentMealData.map((day, idx) => {
        if (idx === dayIndex) {
          const newMenus = day.menus.map((menu, idx) => {
            if (idx === mealIndex) {
              console.log("menu", menu);
              return { ...menu, mealtime_type: newMealType };
            }
            return menu;
          });

          const sortMenu = sortMealsByType(newMenus);
          return { ...day, menus: sortMenu };
        }

        return day;
      });
    });
  }

  const [toggleAddMeal, setToggleAddMeal] = useState<boolean>(false);

  async function handleAddMeal(newMealType: string, index: number) {
    let { data } = await supabase.from("diet_preferences").select("*").single();

    const payload = {
      likes: data.likes,
      dislikes: data.dislikes,
      allergies: data.allergies,
      cuisine_preference: data.cuisine_preferences,
      dietary_preference: data.dietary_preferences,
      // @ts-ignore
      current_meal_plan: mealPlans[index].menus,
      required_meal_type: newMealType,
    };

    const generateMealPlan = await fetch("/api/assistant", {
      method: "POST",
      body: JSON.stringify({
        prompt: JSON.stringify(payload),
        assistantId: "asst_ZqOoqxAQ7yBmFe7P05lMSZ8X",
      }),
    });

    if (generateMealPlan.ok) {
      const res = await generateMealPlan.json();
      const newMeal = JSON.parse(res);
      setMealData((currentMealData) => {
        return currentMealData.map((day, idx) => {
          if (idx === index) {
            const updatedMenus = [...day.menus, newMeal];
            const sortedMenus = sortMealsByType(updatedMenus);

            sortedMenus.forEach((menu: any, menuIndex: number) => {
              menu.id = menuIndex + 1;
            });

            return { ...day, menus: sortedMenus };
          }
          return day;
        });
      });

      setToggleAddMeal(false);
      updateMealPlans(mealData);
    }
  }

  useEffect(() => {
    if (mealData) {
      updateMealPlans(mealData);
    }
  }, [mealData, updateMealPlans]);

  function getMealNamesAsString(mealData: any[]): string {
    let mealNames: string[] = [];

    mealData.forEach((day) => {
      day.menus.forEach((menu: any) => {
        mealNames.push(menu.meal_name);
      });
    });

    return mealNames.join(", ");
  }

  const onSubmit = async () => {
    setIsLoading(true);
    let tempStack = [];
    try {
      const { data: dietPreferences } = await supabase
        .from("diet_preferences")
        .select("*")
        .single();

      // Batch processing to avoid loss of context
      for (const meal of mealData) {
        const payload = {
          dietary_requirement: { ...dietPreferences },
          menu: meal,
        };

        try {
          const response = await fetch("/api/assistant", {
            method: "POST",
            body: JSON.stringify({
              prompt: JSON.stringify(payload),
              assistantId: "asst_yedxygO3D9HfvcFCn623C9Ir",
            }),
          });

          if (!response.ok) {
            console.error("Error:", response.statusText);
            continue;
          }

          const responseJson = await response.json();
          const parseJson = JSON.parse(responseJson).grocery_list;

          //  IM  ASHAMED OF THIS
          const mergedMeal = {
            ...meal,
            menus: meal.menus.map((menu) => {
              const groceryList = parseJson.find((g: any) => g.id === menu.id)
                ?.grocery_list;

              if (groceryList) {
                groceryList.forEach((grocery: any) => {
                  let newId = uuid();
                  grocery.id = newId;
                  grocery.items.forEach((item: any) => {
                    item.grocery_list_id = newId;
                  });
                });
              }
              return { ...menu, grocery_list: groceryList };
            }),
          };

          console.log("mergedMeal", mergedMeal);
          tempStack.push(mergedMeal);
        } catch (error) {
          console.error("Error in internal API call:", error);
        }
      }
    } catch (error) {
      console.error("Error fetching diet preferences:", error);
    } finally {
      updateMealPlans(tempStack);
      console.log("tempStack", tempStack);

      //  IM  ASHAMED OF THIS
      const flattenData = flattenMealPlans(tempStack);

      const mealPlanData = flattenData.map(({ grocery_list, ...meal }) => ({
        ...meal,
      }));
      await supabase.from("meal_plan").insert(mealPlanData);

      console.log(flattenData[0].grocery_list);

      const groceryListData = flattenData.flatMap((list) =>
        list.grocery_list.map((grocery: any) => ({
          id: grocery.id,
          currency: grocery.currency,
          grocery_type: grocery.grocery_type,
          meal_id: list.id,
        }))
      );

      await supabase.from("grocery_list").insert(groceryListData);

      const groceryItemData = flattenData.flatMap((list) =>
        list.grocery_list.flatMap((grocery: any) =>
          grocery.items.map((item: any) => ({
            item_name: item.name,
            quantity: item.quantity,
            price_per_unit: item.price_per_unit,
            unit: item.unit,
            grocery_list_id: grocery.id,
            grocery_type: grocery.grocery_type,
            meal_id: list.id,
          }))
        )
      );

      await supabase.from("grocery_items").insert(groceryItemData);

      setIsLoading(false);
      router.push("/review-groceries");
    }
  };

  const ComposingRecipe = () => {
    return (
      <OnboardingLayout {...composingRecipeConfig}>
        <h1 className="loader mt-4 max-w-md text-center text-2xl font-extrabold opacity-50 bg-gradient-to-r from-[#0808081f] from-20% via-[#080808a2] via-50% to-[#0808081f] to-80% text-transparent bg-clip-text">
          {getMealNamesAsString(mealData)}
        </h1>
      </OnboardingLayout>
    );
  };

  return (
    <>
      {isLoading && ComposingRecipe()}
      {!isLoading && (
        <div className="flex flex-col items-center text-center max-w-sm">
          <h1 className="text-2xl font-extrabold leading-6 max-w-xs mt-4 text-center bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
            Hey James here’s your meal plan for the next 2 weeks
          </h1>
          <p className="text-base text-foreground/50 my-4">
            Let’s review and edit your meal plan below. Whenever you’re ready
            let’s continue and Dash will provide the shopping lists
          </p>
          <Button
            onClick={onSubmit}
            className="p-0 overflow-hidden border border-white/10 rounded-full"
          >
            <span className="w-full h-full p-[2px] overflow-hidden rounded-full bg-gradient-to-b from-[#fafafa50] to-[#FAFAFA00]">
              <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-[#3c3c3c] to-foreground font-bold text-base">
                Perfect! Continue
              </span>
            </span>
          </Button>

          <Tabs defaultValue={"tab-1"} className="w-full mt-10">
            <TabsList className="mb-2">
              {mealPlans?.map((item, index) => (
                <TabsTrigger
                  key={index}
                  value={`tab-${item.id}`}
                  className="w-full"
                >
                  {convertToDayOfTheWekk(item.date) || ""}
                </TabsTrigger>
              ))}
            </TabsList>
            {mealData?.map((item, index) => (
              <TabsContent key={index} value={`tab-${item.id}`}>
                <div className="w-full flex flex-col items-center gap-2 z-10 bg-white rounded-3xl p-4 shadow-smooth">
                  {item.menus.map((menu, menuIndex) => (
                    <MeaItem
                      mealIndex={menuIndex}
                      dayIndex={index}
                      icon={selectedIcon(menu.mealtime_type)}
                      mealtimeType={menu.mealtime_type}
                      mealName={menu.meal_name}
                      handleToggle={handleToggle}
                      toggled={
                        toggleState &&
                        toggleState.dayIndex === index &&
                        toggleState.mealIndex === menuIndex
                      }
                      handleRemove={() => handleRemove(index, menuIndex)}
                      handleMealTypeChange={(selectedMealType) =>
                        handleMealTypeChange(index, menuIndex, selectedMealType)
                      }
                    />
                  ))}
                  {!toggleAddMeal ? (
                    <Button
                      variant={"secondary"}
                      className="bg-foreground/5"
                      onClick={() => setToggleAddMeal(true)}
                    >
                      <Image
                        src={"/icons/plus.svg"}
                        width={16}
                        height={16}
                        alt="plus icon"
                        className="mr-2"
                      />
                      Add meal or snack...
                    </Button>
                  ) : (
                    <div className="flex gap-x-2">
                      {["Breakfast", "Lunch", "Dinner"].map((mealType, idx) => (
                        <EditMealType
                          key={idx}
                          mealType={mealType}
                          handleClick={(newMealType) =>
                            handleAddMeal(newMealType, index)
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </>
  );
}
