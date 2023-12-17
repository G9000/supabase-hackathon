import { useState } from "react";
import Image from "next/image";
import { Button } from "components/base/Button";
import { cn } from "lib/cn";

export function EditMealType({
  mealType,
  handleClick,
  isSelected,
}: {
  mealType: string;
  handleClick: (mealType: string) => void;
  isSelected?: boolean;
}) {
  return (
    <Button
      variant="outline"
      onClick={() => handleClick(mealType)}
      className={cn(isSelected ? "border-black" : "opacity-70")}
    >
      {mealType}
    </Button>
  );
}

export default function MeaItem({
  mealIndex,
  dayIndex,
  icon,
  mealtimeType,
  mealName,
  toggled = false,
  handleToggle,
  handleRemove,
  handleMealTypeChange,
}: {
  mealIndex: number;
  dayIndex: number;
  icon: string;
  mealtimeType: string;
  mealName: string;
  toggled: boolean | null;
  handleToggle: (dayIndex: number, mealIndex: number) => void;
  handleRemove: () => void;
  handleMealTypeChange: (mealType: string) => void;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedMealType, setSelectedMealType] = useState(mealtimeType);

  return (
    <div
      key={dayIndex}
      className="relative flex flex-col items-start justify-center space-y-4 border bg-white rounded-3xl p-4 w-full shadow-smooth"
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center w-[80%]">
          <Image src={icon} width={48} height={48} alt="breakfast" />
          <div className="relative flex flex-col items-start ml-4 z-0 text-left">
            <div className="text-foreground/50 text-sm">{mealtimeType}</div>
            <div className="text-foreground text-base font-bold">
              {mealName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {toggled && (
            <div className="absolute flex gap-x-2 right-[70px]">
              {!isEditing && (
                <Button
                  variant={"danger"}
                  className="w-10 h-10 p-0"
                  onClick={handleRemove}
                >
                  <Image
                    src={"/icons/delete.svg"}
                    width={16}
                    height={16}
                    alt="delete icon"
                  />
                </Button>
              )}

              {!isEditing && (
                <Button
                  variant={"secondary"}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          )}

          {!isEditing && (
            <Button
              onClick={() => handleToggle(dayIndex, mealIndex)}
              variant={"secondary"}
              className="bg-foreground/5 w-10 h-10 p-0"
            >
              <Image
                src={"/icons/more.svg"}
                width={16}
                height={16}
                alt="more icon"
              />
            </Button>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-x-2">
            {["Breakfast", "Lunch", "Dinner"]
              .filter((mealType) => mealType !== mealtimeType)
              .map((mealType, index) => (
                <EditMealType
                  key={index}
                  mealType={mealType}
                  isSelected={selectedMealType === mealType}
                  handleClick={(newMealType) =>
                    setSelectedMealType(newMealType)
                  }
                />
              ))}
          </div>

          <Button
            variant="secondary"
            onClick={() => {
              setIsEditing(false);
              handleToggle(dayIndex, mealIndex);
              handleMealTypeChange(selectedMealType);
            }}
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
}
