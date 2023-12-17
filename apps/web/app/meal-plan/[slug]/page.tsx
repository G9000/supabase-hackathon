"use client";

import { Button } from "components/base/Button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "components/base/Collapsibe";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/base/Tabs";
import OnboardingLayout from "components/onboarding/OnboardingLayout";
import Image from "next/image";

const config = {
    label: "Breakfast recipe",
    title: "Chinese Deep-Fried Chicken Youlinji",
};

const newData = [
    {
        "recipe": [
            {
                "id": 1,
                "name": "Baked Salmon",
                "is_done": false,
                "recipe": {
                    "instructions": [
                        {
                            "id": 1,
                            "step": 1,
                            "description": "Preheat oven to 400 degrees F (200 degrees C). Line a shallow baking pan with aluminum foil."
                        },
                    ],
                    "cooking_time": "20 mins"
                },
                "shopping_list": [
                    {
                        "id": 1,
                        "icon": "Pantry Essentials",
                        "is_done": false,
                        "items": [
                            {
                                "id": 1,
                                "name": "Rice",
                                "quantity": 1,
                                "price_per_unit": 1.99,
                                "unit": "kg",
                                "is_done": false
                            },
                            {
                                "id": 2,
                                "name": "Eggs",
                                "quantity": 12,
                                "price_per_unit": 1.99,
                                "unit": "pcs",
                                "is_done": false
                            },
                            {
                                "id": 3,
                                "name": "Vinegar",
                                "quantity": 750,
                                "price_per_unit": 1.99,
                                "unit": "ml",
                                "is_done": false
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

export default function Page() {

    const selectedIcon = (type: string) => {
        if (type === 'Pantry Essentials') return '/icons/pantry-essentials.png';
        if (type === 'Vegetables & Fruits') return '/icons/vegetable.png';
        if (type === 'Nuts, Seeds, & Dried Fruits') return '/icons/nuts.png';
        if (type === 'Meats & Pultry') return '/icons/meat.png';
        if (type === 'Seafood') return '/icons/seafood.png';
        if (type === 'Dairy, Cheese, & Eggs') return '/icons/cheese.png';
        if (type === 'Seasonings, Herbs, & Spices') return '/icons/onion.png';
        if (type === 'Dressings, Sauces, Vinegar, Oils') return '/icons/leaf.png';
        if (type === 'Pasta, Pasta Sauce') return '/icons/noodle.png';
        if (type === 'Canned food, & Instant Noodle') return '/icons/canned-food.png';

        return '/icons/pantry-essentials.png';
    }

    const icon = newData[0]?.recipe[0]?.shopping_list[0]?.icon;
    const items = newData[0]?.recipe[0]?.shopping_list[0]?.items;
    const cookingTime = newData[0]?.recipe[0]?.recipe?.cooking_time;
    const instructions = newData[0]?.recipe[0]?.recipe?.instructions;

    return (

        <OnboardingLayout {...config}>
            <div className="my-5 relative">
                <Image src={'/icons/noodle.png'} width={375} height={184} alt="menu image" />
            </div>
            <Tabs defaultValue={'tab-1'} className="w-full flex flex-col">
                <TabsList className="mb-2">
                    <TabsTrigger value={`tab-1`} className="w-32">
                        Ingredients
                    </TabsTrigger>
                    <TabsTrigger value={`tab-2`} className="w-24">
                        Recipe
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={`tab-1`}>
                    <div className="mb-20 flex flex-col items-center">
                        <Collapsible className="w-full">
                            <div className="relative flex flex-col items-start border bg-white rounded-3xl px-6 pt-7 w-full shadow-smooth mb-4">
                                <div className="flex items-center justify-between w-full">
                                    {icon && (
                                        <Image src={selectedIcon(icon)} width={48} height={48} alt="spending" />
                                    )}

                                    <CollapsibleTrigger asChild className="data-[state=open]:rotate-180 transition-all">
                                        <Button
                                            variant={"outline"} className="w-10 h-10 p-0 ml-2"
                                        >
                                            <Image src={'/icons/chevron-down.svg'} width={16} height={16} alt='chevron icon' />
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col items-start">
                                        <div className="text-base font-bold mt-4 mb-2 text-foreground/80">{icon}</div>
                                        <div className="text-sm text-foreground/50 mb-4">{items?.length} Items</div>
                                    </div>
                                </div>

                                {items && items.map((item, index) => (
                                    <CollapsibleContent className="w-full" key={index}>
                                        <>
                                            <div className="border border-dashed w-full h-[1px]" />
                                            <div className="my-4 flex items-center justify-between w-full">
                                                <div className="flex flex-col items-start">
                                                    <div className="text-base font-bold my-2 text-foreground/80">{item.name}</div>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="text-foreground/60 text-base border border-foreground/10 rounded-full px-3 h-10 flex justify-center items-center font-bold">{item.quantity}{item.unit}</div>
                                                </div>

                                            </div>
                                        </>
                                    </CollapsibleContent>
                                ))}
                            </div>
                        </Collapsible>
                    </div>
                </TabsContent>


                <TabsContent value={`tab-2`} className="max-w-[375px]">
                    <div className="mb-20 flex flex-col items-center">
                        <div className="w-full">
                            <Collapsible className="w-full">
                                <div className="relative flex flex-col items-start border bg-white rounded-3xl px-6 py-7 w-full shadow-smooth mb-4">
                                    <div className="flex items-center justify-between w-full">
                                        <Image src={'/icons/fire.png'} width={48} height={48} alt="spending" />

                                        <CollapsibleTrigger asChild className="data-[state=open]:rotate-180 transition-all">
                                            <Button
                                                variant={"outline"} className="w-10 h-10 p-0 ml-2"
                                            >
                                                <Image src={'/icons/chevron-down.svg'} width={16} height={16} alt='chevron icon' />
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>

                                    <div className="flex items-center justify-between w-full my-4">
                                        <div>
                                            <div className="text-base font-bold">Cooking instructions</div>
                                            <div className="text-foreground/50">{instructions?.length} Steps</div>
                                        </div>
                                        <div className="border border-foreground/10 font-bold rounded-full px-4 py-3">{cookingTime}</div>
                                    </div>

                                    <CollapsibleContent className="w-full">
                                        {instructions?.map((item, index) => (
                                            <div key={index}>
                                                <div className="border border-dashed w-full h-[1px]" />
                                                <div className="font-bold my-2">Step{item.step}</div>
                                                <div className="text-foreground/50">{item.description}</div>
                                            </div>

                                        ))}
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="fixed left-1/2 bottom-10 -translate-x-1/2">
                <Button className="p-0 overflow-hidden border border-white/10 rounded-full">
                    <span className="w-full h-full p-[2px] overflow-hidden rounded-full bg-gradient-to-b from-[#fafafa50] to-[#FAFAFA00]">
                        <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-[#3c3c3c] to-foreground font-bold text-base">
                            Finish cooking
                        </span>
                    </span>
                </Button>
            </div>
        </OnboardingLayout>
    );
}
