export enum FoodType {
  Sweet = "sweet",
  Dish = "dish",
  Fruit = "fruit"
}

export enum mealType{
  breakfast="Breakfast",
  lunch="Lunch",
  snacks="Snacks",
  dinner="Dinner"
}

export type food = {
  Food: string;
  type: FoodType;
  quantity: string;
}

export type Meal=
{
  meals:mealType
  foods:food[]
}

export type Food = {
  Food: string;
  quantity: number;
 calories: number;
 };