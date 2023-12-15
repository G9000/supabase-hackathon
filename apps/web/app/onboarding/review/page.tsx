"use client";

import { Button } from "components/base/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { shallow } from "zustand/shallow";
import { useOnboardingStore } from "store/app-store";
import dynamic from 'next/dynamic'
import { useState } from "react";
import { Textarea } from "components/base/Textarea";

const OnboardingLayout = dynamic(() => import('components/onboarding/OnboardingLayout'), { ssr: false })

const config = {
  label: "Review preference",
  title: "Perfect, James! Let’s recap your meal preference",
};

interface EditableTextState {
  editableText1: boolean;
  editableText2: boolean;
  editableText3: boolean;
  editableText4: boolean;
  editableText5: boolean;
}

export default function Page() {
  const router = useRouter();

  const [editableText, setEditableText] = useState<EditableTextState>({
    editableText1: false,
    editableText2: false,
    editableText3: false,
    editableText4: false,
    editableText5: false,
  });

  const makeEditable = (input: keyof EditableTextState): void => {
    setEditableText((prevState) => {
      const updatedState = {
        ...prevState,
        editableText1: false,
        editableText2: false,
        editableText3: false,
        editableText4: false,
        editableText5: false,
      };
      updatedState[input] = !prevState[input];
      return updatedState;
    });
  };

  const [
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    updateAnswer1,
    updateAnswer2,
    updateAnswer3,
    updateAnswer4,
    updateAnswer5,
  ] = useOnboardingStore((state: any) => {
    return [
      state.answer1,
      state.answer2,
      state.answer3,
      state.answer4,
      state.answer5,
      state.updateAnswer1,
      state.updateAnswer2,
      state.updateAnswer3,
      state.updateAnswer4,
      state.updateAnswer5,
    ];
  }, shallow);

  const handleNext = () => {
    router.push("/onboarding/last-step");
  };

  return (
    <OnboardingLayout {...config}>
      <div className="flex flex-row text-left gap-5 w-screen overflow-x-auto items-center py-8 scrollbar-hide">
        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 rotate-2 ml-auto">
          <div className="flex flex-row items-start justify-between">
            <Image src={"/icons/bento.png"} alt="icon" height={48} width={48} />
            <div
              onClick={() => makeEditable('editableText1')}
              className="cursor-pointer px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              {editableText.editableText1 ? 'Done' : 'Edit'}
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">You crave for</div>
          <Textarea
            className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
            // className="font-extrabold text-xl leading-6 bg-gradients-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text"
            onChange={(event) => {
              const answer1 = event.target.value;
              updateAnswer1(answer1);
            }}
            disabled={!editableText.editableText1}
          >
            {answer1}
          </Textarea>
        </div>

        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 -rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image
              src={"/icons/nauseous.png"}
              alt="icon"
              height={48}
              width={48}
            />
            <div
              onClick={() => makeEditable('editableText2')}
              className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              {editableText.editableText2 ? 'Done' : 'Edit'}
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">You don’t likes</div>

          <Textarea
            className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
            // className="font-extrabold text-xl leading-6 bg-gradients-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text"
            onChange={(event) => {
              const answer2 = event.target.value;
              updateAnswer2(answer2);
            }}
            disabled={!editableText.editableText2}
          >
            {answer2}
          </Textarea>
        </div>

        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image src={"/icons/sick.png"} alt="icon" height={48} width={48} />
            <div
              onClick={() => makeEditable('editableText3')}
              className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              {editableText.editableText3 ? 'Done' : 'Edit'}
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">You’re allergic to</div>

          <Textarea
            className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
            // className="font-extrabold text-xl leading-6 bg-gradients-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text"
            onChange={(event) => {
              const answer3 = event.target.value;
              updateAnswer3(answer3);
            }}
            disabled={!editableText.editableText3}
          >
            {answer3}
          </Textarea>
        </div>

        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 rotate-2">
          <div className="flex flex-row items-start justify-between">
            <Image
              src={"/icons/medicine.png"}
              alt="icon"
              height={48}
              width={48}
            />
            <div
              onClick={() => makeEditable('editableText4')}
              className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              {editableText.editableText4 ? 'Done' : 'Edit'}
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">
            Your diet or restrictions
          </div>

          <Textarea
            className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
            // className="font-extrabold text-xl leading-6 bg-gradients-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text"
            onChange={(event) => {
              const answer4 = event.target.value;
              updateAnswer4(answer4);
            }}
            disabled={!editableText.editableText4}
          >
            {answer4}
          </Textarea>
        </div>

        <div className="bg-white border border-foreground/3 rounded-3xl p-6 w-[242px] flex-shrink-0 -rotate-2 mr-auto">
          <div className="flex flex-row items-start justify-between">
            <Image src={"/icons/happy.png"} alt="icon" height={48} width={48} />
            <div
              onClick={() => makeEditable('editableText5')}
              className="px-4 py-1 bg-foreground/5 text-foreground/60 rounded-full font-bold text-base">
              {editableText.editableText5 ? 'Done' : 'Edit'}
            </div>
          </div>
          <div className="mt-3 mb-2 text-foreground/50">
            Your cuisine preference
          </div>

          <Textarea
            className="border-0 pl-0 text-2xl leading-6 font-bold h-[100px] focus-visible:ring-0"
            // className="font-extrabold text-xl leading-6 bg-gradients-to-r from-[#080808CC] to-[#0808088F] text-transparent bg-clip-text"
            onChange={(event) => {
              const answer5 = event.target.value;
              updateAnswer5(answer5);
            }}
            disabled={!editableText.editableText5}
          >
            {answer5}
          </Textarea>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-sm leading-5 mb-4 text-foreground/50 max-w-[277px] text-center">
          Feel free to adjust further or if you have more details you’d like to
          include! If you’re ready to roll, let’s continue
        </p>
        <Button
          onClick={handleNext}
          className="p-0 overflow-hidden border border-white/10 rounded-full"
        >
          <span className="w-full h-full p-[2px] overflow-hidden rounded-full bg-gradient-to-b from-[#fafafa50] to-[#FAFAFA00]">
            <span className="flex items-center justify-center w-full h-full px-4 rounded-full bg-gradient-to-b from-[#3c3c3c] to-foreground font-bold text-base">
              Perfect! Continue
            </span>
          </span>
        </Button>
      </div>
    </OnboardingLayout >
  );
}
