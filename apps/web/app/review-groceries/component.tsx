import { Button } from "components/base/Button";
import Image from "next/image";
import { useState } from "react";

function flattenGroceryItems(items: any[]): any[] {
  return items.reduce((acc: any[], item) => {
    const foundIndex = acc.findIndex(
      (accItem) => accItem.item_name === item.item_name
    );
    if (foundIndex !== -1) {
      acc[foundIndex].quantity += item.quantity;
      acc[foundIndex].price_per_unit = (
        parseFloat(acc[foundIndex].price_per_unit) +
        parseFloat(item.price_per_unit)
      ).toString();
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);
}

export default function ListCard({
  data,
  selectedIcon,
}: {
  data: any;
  selectedIcon: (type: string) => string;
}) {
  const flattenedItems = flattenGroceryItems(data.items);
  const [items, setItems] = useState(flattenGroceryItems(data.items));

  const increaseQuantity = (itemName: string) => {
    const newItems = items.map((item) => {
      if (item.item_name === itemName) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setItems(newItems);
  };

  const decreaseQuantity = (itemName: string) => {
    const newItems = items.map((item) => {
      if (item.item_name === itemName && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <div className="relative flex flex-col items-start border bg-white rounded-3xl px-6 py-7 w-full shadow-smooth mb-4">
      <div className="flex items-center justify-between w-full">
        <Image
          src={selectedIcon(data.grocery_type)}
          width={48}
          height={48}
          alt="spending"
        />
        {/* <div className="text-foreground/60 text-base border border-foreground/10 rounded-full px-4 py-3 font-bold">
          {totalPrice} {data.currency}
        </div> */}
      </div>
      <div className="text-base font-bold mt-4 mb-2 text-foreground/80">
        {data.grocery_type}
      </div>
      <div className="text-sm text-foreground/50 mb-4">
        {flattenedItems.length} Items
      </div>

      <div className="border border-dashed w-full h-[1px]" />

      {items.map((item: any) => (
        <div className="mt-4 flex items-center justify-between w-full">
          <div className="flex flex-col items-start">
            <div className="text-base font-bold my-2 text-foreground/80">
              {item.item_name}
            </div>
            {/* <div className="text-sm text-foreground/50">
              {item.price_per_unit}
              <span className="text-foreground/20"> SGD</span>
            </div> */}
          </div>
          <div className="flex items-center">
            <div className="text-foreground/40 text-base border border-foreground/10 rounded-full px-3 h-10 flex justify-center items-center font-bold">
              {item.quantity} {item.unit}
            </div>
            <Button
              variant={"outline"}
              className="w-10 h-10 p-0 ml-2"
              onClick={() => decreaseQuantity(item.item_name)}
            >
              <Image
                src={"/icons/minus.svg"}
                width={16}
                height={16}
                alt="minus icon"
              />
            </Button>
            <Button
              variant={"outline"}
              className="w-10 h-10 p-0 ml-2"
              onClick={() => increaseQuantity(item.item_name)}
            >
              <Image
                src={"/icons/plus.svg"}
                width={16}
                height={16}
                alt="plus icon"
              />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
