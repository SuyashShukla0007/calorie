import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import React from 'react';
import { Foods } from "../../components/MealCard";

export type data={

  date:string,
  totalCalories:number,
  totalCarbohydrates:number,
  totalProtein:number,
  totalFat:number
}



interface ContextType {
  breakFast:Foods[];
  lunch: Foods[];
  snacks: Foods[];
  dinner: Foods[];
  getMeals: () => void;
  fetchCalories:()=>any
  calories:number,
  protein:number,
  fat:number,
  carbohydrates:number
}

const MealsContext = createContext<ContextType | undefined>(undefined);

export const MealsProvider = ({ children }: { children: ReactNode }) => {
  const [breakFast, setBreakfast] = useState<Foods[]>([]);
  const [lunch, setLunch] = useState<Foods[]>([]);
  const [snacks, setSnacks] = useState<Foods[]>([]);
  const [dinner, setDinner] = useState<Foods[]>([]);

const [calories,setCalories]=useState(0)
const [fat,setFat]=useState(0)
const [protein,setProtein]=useState(0)
const [carbohydrates,setCarbohydrates]=useState(0)


  const getMeals = async () => {
    try {
      const token = localStorage.getItem('auth');
      const res = await axios.get('https://calorie-2.onrender.com/api/meal/foods',{ 
        headers:{'Authorization':`Bearer ${token}`},
        withCredentials: true});
      setBreakfast(res.data.Breakfast);
      setLunch(res.data.Lunch);
      setSnacks(res.data.Snacks);
      setDinner(res.data.Dinner);
    } catch (error) {
      console.error("error getting foods", error);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  // caloriesApi.ts

  const fetchCalories = async () => {
    try {
      const token = localStorage.getItem('auth');

      const res = await axios.get(' https://calorie-2.onrender.com/api/meal/calorie',{
        headers:{'Authorization':`Bearer ${token}`},
        withCredentials: true
      });
      const data:data = res.data;
  
      // Ensure data is an array and has at least one element
      if (Array.isArray(data) && data.length > 0) {
        const lastEntry = data[data.length - 1];
        setCalories(lastEntry.totalCalories);
        setFat(lastEntry.totalFat);
        setProtein(lastEntry.totalProtein);
        setCarbohydrates(lastEntry.totalCarbohydrates);
        return data;
      } else {
        // Handle case where data is not in expected format
        console.error('Data is not an array or is empty');
        
      }
    } catch (error) {
      console.error('Error fetching calories:', error);
    }
  };
  
  return (
    <MealsContext.Provider value={{getMeals,breakFast,lunch,dinner,snacks,fetchCalories,calories,fat,protein,carbohydrates}}>
      {children}
    </MealsContext.Provider>
  );
};

export const useMealsContext = () => {
  const context = React.useContext(MealsContext);
  if (context === undefined) {
    throw new Error('useMealsContext must be used within a MealsProvider');
  }
  return context;
};
