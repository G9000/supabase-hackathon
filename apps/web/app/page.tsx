"use client";
import { createClient } from "utils/supabase/server";
import { cookies } from "next/headers";

import { Button } from "components/base/Button";
import Image from "next/image";

const data = [
  {
    id: 1,
    title: "Generate recipes",
    desc: "Dash can provide you recipes based on your, your diet program, favourite foods, hated ingredients, and so much more!",
    image: "/icons/mascot.svg",
  },
  {
    id: 2,
    title: "Inventory sync",
    desc: "While Dash provides the recipes, you can also sync your current groceries stock with Dash. So it can reminds you to shop",
    image: "/icons/mascot.svg",
  },
  {
    id: 3,
    title: "Budget estimation",
    desc: "Don’t worries about the recipes. We can provides the recommendations precisely based on your shop budgets",
    image: "/icons/mascot.svg",
  },
];

export default function Page(): JSX.Element {
  async function handleClick() {
    console.log("user");
  }

  return (
    <div className="flex flex-col md:flex-row items-center overflow-x-auto gap-4 w-screen my-40 p-4 md:px-14">
      <div className="flex flex-col flex-shrink-0 items-start md:w-[325px] border shadow-smooth border-[#08080808] rounded-3xl p-6 bg-white">
        <Image src={"/icons/mascot.svg"} width={64} height={65} alt="logo" />
        <h1 className="text-2xl font-extrabold leading-6 max-w-xs mt-4 bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
          Introducing DishDash your personalized meal planner assistant
        </h1>
        <p className="text-sm text-foreground/50 leading-5 mt-3 mb-4">
          Get meal planning recommendation based on your preferences and
          schedule it the way you want
        </p>
        <Button
          onClick={handleClick}
          className="p-0 overflow-hidden border border-white/10 rounded-full"
        >
          <span className="w-full h-full p-[2px] overflow-hidden rounded-full bg-gradient-to-b from-[#fafafa50] to-[#FAFAFA00]">
            <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-[#3c3c3c] to-foreground font-bold text-base">
              Get started
            </span>
          </span>
        </Button>
      </div>
      {data.map((item) => (
        <div
          className="border border-[#08080808] rounded-3xl overflow-hidden shadow-smooth p-6 bg-white flex-shrink-0 md:w-[325px] px-4"
          key={item.id}
        >
          <Image src={item.image} width={325} height={216} alt="illustration" />
          <div>
            <h1 className="text-2xl font-extrabold leading-6 max-w-xs mt-4 bg-gradient-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text">
              {item.title}
            </h1>
            <p className="text-sm text-foreground/50 leading-5 mt-3 mb-4">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
