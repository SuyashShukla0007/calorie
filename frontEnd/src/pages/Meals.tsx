// @ts-ignore
import React, { useState,useEffect } from 'react';
import MealCard from '../components/MealCard';
import { mealType } from '../components/types/type';
import { useMealsContext } from '../api/context api/meals'; // Adjust the import path as necessary
import { motion } from 'framer-motion'; // Importing framer-motion for animations
// @ts-ignore
import axios from 'axios';


const Meals = () => {
  const { breakFast, dinner, snacks, lunch,calories,fetchCalories,carbohydrates,protein,fat,getMeals } = useMealsContext();

useEffect(() => {

fetchCalories();
getMeals()
  
}, [])


 


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

useEffect(() => {
  
fetchCalories()
  
}, [])


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
    <div className='w-[100vw]'>
      <h1 className='text-6xl ml-8 mt-12 font-inknut-antiqua font-heavy'>Today's Meal</h1>
      <motion.div
        id="meals"
        className='flex gap-7 absolute top-[30%] left-[26%]'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={cardVariants}>
          <MealCard meals={mealType.breakfast} foods={breakFast} />
        </motion.div>
        <motion.div variants={cardVariants}>
          <MealCard meals={mealType.lunch} foods={lunch} />
        </motion.div>
        <motion.div variants={cardVariants}>
          <MealCard meals={mealType.snacks} foods={snacks} />
        </motion.div>
        <motion.div variants={cardVariants}>
          <MealCard meals={mealType.dinner} foods={dinner} />
        </motion.div>
      </motion.div>
    </div>

    <motion.div variants={cardVariants}>
    <div className="font-bold text-xl flex flex-col absolute bottom-[5%] left-[25%] space-y-8 p-4 items-start">
  <div className="flex flex-row items-start">
    <p className="text-blue-800 mb-2">Calories consumed today:</p>
{/*     <p className="text-black">{calories.toFixed(0)}</p> */}
    <p className="text-black">{(calories ?? 0).toFixed(0)}</p>

  </div>

  <div className="flex flex-row items-start">
    <p className="text-blue-800 mb-2">Carbohydrates consumed today:</p>
{/*     <p className="text-black">{carbohydrates}g</p> */}
    <p className="text-black">{(carbohydrates ?? 0).toFixed(2)}</p>

  </div>
</div>


  <div className="font-bold text-xl flex flex-col absolute bottom-[5%] left-[75%] space-y-8 p-4 items-start">
  <div className="flex flex-row items-start">
    <p className="text-blue-800 mb-2">Protein consumed today:</p>
{/*     <p className="text-black">{protein}g</p> */}
    <p className="text-black">{(protein ?? 0).toFixed(2)}</p>
    
  </div>

  <div className="flex flex-row items-start">
    <p className="text-blue-800 mb-2">Fat consumed today:</p>
{/*     <p className="text-black">{fat}g</p> */}
    <p className="text-black">{(fat ?? 0).toFixed(2)}</p>
    
  </div>
</div>

</motion.div>

    </>
  );
}

export default Meals;
