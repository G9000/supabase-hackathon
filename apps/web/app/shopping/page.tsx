"use client";

import { Button } from "components/base/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "components/base/Collapsibe";
import OnboardingLayout from "components/onboarding/OnboardingLayout";
import Image from "next/image";
import { createClient } from "utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { combineAndFlattenGroceries } from "lib/payloadTransformer";

const data = [
  {
    id: 1,
    type: "Pantry Essentials",
    total: "10 SGD",
    content: [
      {
        id: 1,
        name: "Eggs",
        total: "1pcs",
        price: "10",
      },
      {
        id: 1,
        name: "Eggs",
        total: "1pcs",
        price: "10",
      },
      {
        id: 1,
        name: "Eggs",
        total: "1pcs",
        price: "10",
      },
    ],
  },
  {
    id: 2,
    type: "Vegetables & Fruits",
    total: "20 SGD",
    content: [
      {
        id: 1,
        name: "Avocado",
        total: "1pcs",
        price: "12.34",
      },
      {
        id: 1,
        name: "Avocado",
        total: "1pcs",
        price: "12.34",
      },
    ],
  },
];

const composingRecipeConfig = {
  label: "Composing ingredients",
  showTitle: false,
};

export default function Page() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFinishShopping, setIsFinishShopping] = useState<boolean>(false);
  const [localData, setLocalData] = useState<any[]>([]);

  const router = useRouter();

  const selectedIcon = (type: string) => {
    if (type === "Pantry Essentials") return "/icons/pantry-essentials.png";
    if (type === "Vegetables & Fruits") return "/icons/vegetable.png";
    if (type === "Nuts, Seeds, & Dried Fruits") return "/icons/nuts.png";
    if (type === "Meats & Pultry") return "/icons/meat.png";
    if (type === "Seafood") return "/icons/seafood.png";
    if (type === "Dairy, Cheese, & Eggs") return "/icons/cheese.png";
    if (type === "Seasonings, Herbs, & Spices") return "/icons/onion.png";
    if (type === "Dressings, Sauces, Vinegar, Oils") return "/icons/leaf.png";
    if (type === "Pasta, Pasta Sauce") return "/icons/noodle.png";
    if (type === "Canned food, & Instant Noodle")
      return "/icons/canned-food.png";

    return "/icons/pantry-essentials.png";
  };

  const onSubmit = () => {
    setIsLoading(true);
  };

  const onFinishShopping = () => {
    router.push("/shopping/finish");
  };

  async function fetchGrocery() {
    let { data } = await supabase.from("grocery_list").select(`
      *,
      grocery_items(*)
    `);

    setLocalData(combineAndFlattenGroceries(data));
    console.log(combineAndFlattenGroceries(data));
  }

  useEffect(() => {
    fetchGrocery();
    console.log(localData);
  }, []);

  return (
    <div className="relative flex flex-col items-center text-center max-w-sm">
      <div className="mb-20 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold leading-6 max-w-xs mt-4 text-center bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
          James shopping list for the next 2 weeks
        </h1>
        <p className="text-base text-foreground/50 my-4">
          Check the items you already bought and finish when you already had all
          of it. We will remind you again later!
        </p>

        <div className="relative flex flex-col items-start border bg-white rounded-3xl px-6 py-7 w-full shadow-smooth mb-4">
          <div className="flex items-center justify-between w-full">
            <Image
              src={"/icons/spending.png"}
              width={48}
              height={48}
              alt="spending"
            />
            <Button
              className="p-0 overflow-hidden border border-white/10 rounded-full"
              disabled={!isFinishShopping}
              onClick={onFinishShopping}
            >
              <span className="w-full h-full p-[2px] overflow-hidden rounded-full bg-gradient-to-b from-[#fafafa50] to-[#FAFAFA00]">
                <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-[#3c3c3c] to-foreground font-bold text-base">
                  {isFinishShopping ? "Finish shopping" : "Finish"}
                </span>
              </span>
            </Button>
          </div>
          <div className="flex flex-row items-center justify-between w-full mt-4">
            <div className="flex flex-col items-start">
              <div className="text-base font-bold my-2 text-foreground/80">
                Total Spending
              </div>
              <div className="text-sm text-foreground/50">
                {isFinishShopping ? "All bought" : "15 Items"}
              </div>
            </div>
            <div className="text-foreground/60 text-base border border-foreground/10 rounded-full px-4 py-3 font-bold">
              32 SGD
            </div>
          </div>
        </div>

        {localData.map((data, index) => (
          <Collapsible className="w-full" key={index}>
            <div className="relative flex flex-col items-start border bg-white rounded-3xl px-6 pt-7 w-full shadow-smooth mb-4">
              <div className="flex items-center justify-between w-full">
                <Image
                  src={selectedIcon(data.grocery_type)}
                  width={48}
                  height={48}
                  alt="spending"
                />
                {data.items.length === 0 && (
                  <div className="h-10 bg-[#00D0651A] rounded-full px-3 flex items-center font-bold text-[#00D065]">
                    Done
                  </div>
                )}
                {data.items.length > 0 && (
                  <CollapsibleTrigger
                    asChild
                    className="data-[state=open]:rotate-180 transition-all"
                  >
                    <Button variant={"outline"} className="w-10 h-10 p-0 ml-2">
                      <Image
                        src={"/icons/chevron-down.svg"}
                        width={16}
                        height={16}
                        alt="chevron icon"
                      />
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-start">
                  <div className="text-base font-bold mt-4 mb-2 text-foreground/80">
                    {data.grocery_type}
                  </div>
                  <div className="text-sm text-foreground/50 mb-4">
                    {data.items.length === 0
                      ? "No items left"
                      : `${data.items.length} items left`}
                  </div>
                </div>
                {/* <div className="text-foreground/60 text-base border border-foreground/10 rounded-full px-4 py-3 font-bold">
                  32 SGD
                </div> */}
              </div>

              <CollapsibleContent className="pb-7 w-full">
                {data.items.length > 0 && (
                  <div className="border border-dashed w-full h-[1px]" />
                )}
                {data.items.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="mt-4 flex items-center justify-between w-full"
                  >
                    <div className="flex flex-col items-start">
                      <div className="text-base font-bold my-2 text-foreground/80">
                        {item.item_name}
                      </div>
                      {/* <div className="text-sm text-foreground/50">
                        {item.price}{" "}
                        <span className="text-foreground/20">SGD</span>
                      </div> */}
                    </div>
                    <div className="flex items-center">
                      <div className="text-foreground/60 text-base border border-foreground/10 rounded-full px-3 h-10 flex justify-center items-center font-bold">
                        {item.quantity}
                      </div>
                      <Button
                        variant={"secondary"}
                        className="h-10 p-0 ml-2 px-3"
                      >
                        Check
                      </Button>
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
      </div>

      <div className="fixed left-1/2 bottom-10 -translate-x-1/2">
        <Button
          onClick={onSubmit}
          className="p-0 overflow-hidden border border-white/10 rounded-full"
        >
          <span className="w-full h-full p-[2px] overflow-hidden rounded-full bg-gradient-to-b from-[#fafafa50] to-[#FAFAFA00]">
            <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-[#3c3c3c] to-foreground font-bold text-base">
              Finalize shopping list
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
}
