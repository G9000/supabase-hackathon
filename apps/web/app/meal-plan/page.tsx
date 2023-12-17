"use client";

import { Button } from "components/base/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/base/Tabs";
import Image from "next/image";

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

export default function Page() {

  const selectedIcon = (title: string) => {
    if (title === 'Breakfast') return '/icons/bread.png';
    if (title === 'Lunch') return '/icons/bento.png';
    if (title === 'Dinner') return '/icons/egg.png';

    return '/icons/bread.png';
  }

  return (
    <div className="flex flex-col items-center text-center max-w-sm">
      <h1 className="text-2xl font-extrabold leading-6 max-w-xs mt-4 text-center bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">Hey James here’s your meal plan for the next 2 weeks</h1>
      <p className="text-base text-foreground/50 my-4">Click the cards to see the full recipe and step by step guide to cook it. Happy cooking!</p>

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
                <div key={menuIndex} className="relative flex flex-col items-start border bg-white rounded-3xl p-6 w-full shadow-smooth">
                  <div className="flex items-center">
                    <Image src={selectedIcon(menu.title)} width={48} height={48} alt='breakfast' />
                    <div className="relative flex flex-col items-start ml-4 z-0">
                      <div className="text-foreground/50 text-sm">{menu.title}</div>
                      <div className="text-foreground text-base font-bold">{menu.menu}</div>
                    </div>
                  </div>

                  <div key={index} className="mt-4 flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="text-foreground/60 text-base border border-foreground/10 rounded-full px-3 h-10 flex justify-center items-center font-bold">12 ingredients</div>
                      <div className="text-foreground/60 text-base border border-foreground/10 rounded-full px-3 h-10 flex justify-center items-center font-bold">15 min</div>
                    </div>
                    <Button variant={"secondary"} className="h-10 p-0 ml-2 px-3">Cook</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
