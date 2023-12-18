"use client";

import { Button } from "components/base/Button";

import Image from "next/image";
import { createClient } from "utils/supabase/client";
import { useState, useEffect } from "react";
import ListCard from "./component";
import { useRouter } from "next/navigation";
import { combineAndFlattenGroceries } from "lib/payloadTransformer";

export default function Page() {
  const supabase = createClient();
  const router = useRouter();
  const [localData, setLocalData] = useState<any[]>([]);

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

  async function fetchGrocery() {
    let { data } = await supabase.from("grocery_list").select(`
      *,
      grocery_items(*)
    `);

    setLocalData(combineAndFlattenGroceries(data));
  }

  useEffect(() => {
    fetchGrocery();
    // console.log(localData);
  }, []);

  const onSubmit = () => {
    router.push("/shopping");
  };

  return (
    <div className="relative flex flex-col items-center text-center max-w-sm">
      <div className="mb-20 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold leading-6 max-w-xs mt-4 text-center bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
          Awesome! Now here’s your shoping list
        </h1>
        <p className="text-base text-foreground/50 my-4">
          Let’s check the your inventory and this list. You can reduce or remove
          groceries if you already had it
        </p>

        {/* <div className="relative flex flex-col items-start border bg-white rounded-3xl px-6 py-7 w-full shadow-smooth mb-4">
          <div className="flex items-center justify-between w-full">
            <Image
              src={"/icons/spending.png"}
              width={48}
              height={48}
              alt="spending"
            />
            <div className="text-foreground/60 text-base border border-foreground/10 rounded-full px-4 py-3 font-bold">
              32 SGD
            </div>
          </div>
          <div className="text-base font-bold my-2 text-foreground/80">
            Total Spending
          </div>
          <div className="text-sm text-foreground/50">15 Items</div>
        </div> */}

        {localData.map((item) => (
          <ListCard data={item} selectedIcon={selectedIcon} />
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
