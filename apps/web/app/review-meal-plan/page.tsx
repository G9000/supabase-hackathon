"use client";

import { Button } from "components/base/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/base/Tabs";
import OnboardingLayout from "components/onboarding/OnboardingLayout";
import Image from "next/image";
import { useState } from "react";

const data = [
  {
    id: 1,
    date: 9,
    menus: [
      {
        id: 1,
        title: 'Breakfast',
        menu: 'Tamagoyaki 1',
      },
      {
        id: 2,
        title: 'Lunch',
        menu: 'Tamagoyaki',
      },
      {
        id: 3,
        title: 'Dinner',
        menu: 'Tamagoyaki',
      }
    ]
  },
  {
    id: 2,
    date: 10,
    menus: [
      {
        id: 1,
        title: 'Breakfast',
        menu: 'Tamagoyaki 2',
      },
      {
        id: 2,
        title: 'Lunch',
        menu: 'Tamagoyaki',
      },
      {
        id: 3,
        title: 'Dinner',
        menu: 'Tamagoyaki',
      }
    ]
  }
]

const composingRecipeConfig = {
  label: "Composing ingredients",
  showTitle: false,
};

export default function Page() {
  const [toggleStates, setToggleStates] = useState<boolean[]>(Array(data.length).fill(false));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleToggle = (index: number) => {
    const newToggles = [...toggleStates];
    newToggles[index] = !newToggles[index];
    setToggleStates(newToggles);
  };

  const selectedIcon = (title: string) => {
    if (title === 'Breakfast') return '/icons/bread.png';
    if (title === 'Lunch') return '/icons/bento.png';
    if (title === 'Dinner') return '/icons/egg.png';

    return '/icons/bread.png';
  }

  const onSubmit = () => {
    setIsLoading(true);
  };

  const ComposingRecipe = () => {
    return (
      <OnboardingLayout {...composingRecipeConfig}>
        <h1 className="loader mt-4 max-w-md text-center text-2xl font-extrabold opacity-50 bg-gradient-to-r from-[#0808081f] from-20% via-[#080808a2] via-50% to-[#0808081f] to-80% text-transparent bg-clip-text">
          Generating shopping lists of Ramen, Tamagoyaki, Fuyunghai, Capcai, Sushi, Karaage for the next 2 weeks
        </h1>
      </OnboardingLayout>
    );
  };

  return (
    <>
      {isLoading && ComposingRecipe()}
      {!isLoading && (
        <div className="flex flex-col items-center text-center max-w-sm px-4 md:px-0">
          <h1 className="text-2xl font-extrabold leading-6 max-w-xs mt-4 text-center bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">Hey James here’s your meal plan for the next 2 weeks</h1>
          <p className="text-base text-foreground/50 my-4">Let’s review and edit your meal plan below. Whenever you’re ready let’s continue and Dash will provide the shopping lists</p>
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

          <Tabs defaultValue={'default'} className="w-full mt-10">
            <TabsList className="mb-2">
              {data.map((item, index) => (
                <TabsTrigger key={index} value={`tab-${item.id}`}>
                  {item.date}
                </TabsTrigger>
              ))}
            </TabsList>
            {data.map((item, index) => (
              <TabsContent key={index} value={`tab-${item.id}`}>
                <div className="w-full flex flex-col items-center gap-2 z-10">
                  {item.menus.map((menu, menuIndex) => (
                    <div key={menuIndex} className="relative flex items-center border bg-white rounded-3xl p-4 w-full shadow-smooth">
                      <Image src={selectedIcon(menu.title)} width={48} height={48} alt='breakfast' />
                      <div className="relative flex flex-col items-start ml-4 z-0">
                        <div className="text-foreground/50 text-sm">{menu.title}</div>
                        <div className="text-foreground text-base font-bold text-left max-w-[220px]">{menu.menu}</div>
                      </div>
                      <div className="flex items-center absolute top-1/2 -translate-y-[50%] right-6 z-20 gap-2 h-full bg-gradient-to-l from-white from-0% via-white via-90% to-white/50 to-100% pl-6">
                        {toggleStates[menu.id] && (
                          <>
                            <Button variant={"danger"} className="w-10 h-10 p-0">
                              <Image src={'/icons/delete.svg'} width={16} height={16} alt='delete icon' />
                            </Button>
                            <Button variant={"secondary"} className="bg-foreground/5">
                              Edit
                            </Button>
                          </>
                        )}
                        <Button
                          onClick={() => handleToggle(menu.id)}
                          variant={"secondary"} className="bg-foreground/5 w-10 h-10 p-0"
                        >
                          <Image src={'/icons/more.svg'} width={16} height={16} alt='more icon' />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant={"secondary"} className="bg-foreground/5">
                    <Image src={'/icons/plus.svg'} width={16} height={16} alt='plus icon' className="mr-2" />
                    Add meal or snack...
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </>
  );
}
