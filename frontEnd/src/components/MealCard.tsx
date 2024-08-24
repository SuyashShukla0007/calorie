// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { Meal, mealType } from './types/type';
import FoodOverlay from './accessories/FoodOverlay';
import { useMealsContext } from '../api/context api/meals';
// @ts-ignore
import edit from '../assets/pen.png';
// @ts-ignore
import del from '../assets/delete.png';
// @ts-ignore
import axios from 'axios';

export type Foods = {
  Food: string, 
  Meal: string, 
  type: string, 
  quantity: string
}

type prop = {
  meals: mealType,
  foods: Foods[]
}

const MealCard = (props: prop) => {
  const { getMeals,fetchCalories } = useMealsContext();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    getMeals();
    fetchCalories();
  };

  

  return (
    <div className='relative'>
      {show && <FoodOverlay mealType={props.meals} close={handleClose} />}
      <div className={`transition-all duration-300 ${show ? 'blur-xl' : ''}`}>
        <div className='h-[350px] w-[250px] bg-blue-500 flex flex-col rounded-xl items-center transform transition-transform duration-500 hover:scale-105' style={{ fontFamily: 'Roboto, sans-serif' }}>
          <div className='text-2xl tracking-wide py-[2px] font-inknut-antiqua space-x-3 text-white font-heavy absolute top-[3px] pb-2'>{props.meals}</div>
          <ul className='h-[240px] w-[210px] bg-blue-200 flex flex-col rounded-lg relative top-12 overflow-y-scroll shadow-inner'>
            {props.foods?.map((food: Foods, index: number) => (
              <li key={index} className='border-[2px] border-blue-400 rounded-md flex m-[3px] justify-between mt-4 p-2 transition-colors duration-300 hover:bg-blue-300 items-center'>
                <div className='flex-grow'>
                  {food.Food} X {food.quantity} <p>{/* calorie count of that food */}</p>
                </div>
               
              </li>
            ))}
          </ul>
          <button className='bg-blue-700 relative top-[65px] px-5 py-1 rounded-lg text-white transition-transform duration-300 hover:scale-110' style={{ fontFamily: 'Roboto, sans-serif' }} onClick={handleClick}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
