// mistake was made, so lets just flatten for now T_T
export function flattenMealPlans(mealPlans: any[]): any[] {
  let flattenedMenus: any[] = [];

  mealPlans.forEach((mealPlan) => {
    mealPlan.menus.forEach((menu: any) => {
      let menuWithPlannedDate = { ...menu, planned_date: mealPlan.date };
      flattenedMenus.push(menuWithPlannedDate);
    });
  });

  return flattenedMenus;
}

// mistake was made, so lets just flatten for now T_T
export const flattenGroceryItems = (data: any[]): any[] => {
  let flattenedItems: any[] = [];

  data.forEach((meal) => {
    meal.grocery_list.forEach((grocery: any) => {
      grocery.items.forEach(() => {
        flattenedItems.push({
          grocery_type: grocery.grocery_type,
          meal_id: meal.id,
        });
      });
    });
  });

  return flattenedItems;
};

export function combineAndFlattenGroceries(data: any) {
  const allItems = data.flatMap((entry: any) =>
    entry.grocery_items.map((item: any) => ({
      ...item,
      grocery_type: entry.grocery_type,
      meal_id: entry.meal_id,
      currency: entry.currency,
    }))
  );

  const groupedItems = allItems.reduce((acc: any, item: any) => {
    const { grocery_type, currency, ...rest } = item;
    if (!acc[grocery_type]) {
      acc[grocery_type] = { items: [], currency };
    }
    acc[grocery_type].items.push(rest);
    return acc;
  }, {});

  return Object.entries(groupedItems).map(([type, group]) => ({
    grocery_type: type,
    items: group.items,
    currency: group.currency,
  }));
}
