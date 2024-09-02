import { useEffect } from 'react';
import MealCard from '../components/MealCard';
import { mealType } from '../components/types/type';
import { useMealsContext } from '../api/context api/meals'; // Adjust the import path as necessary
import { motion } from 'framer-motion'; // Importing framer-motion for animations
import Loading from '../components/accessories/Loading';

const Meals = () => {
  
  const { breakFast, dinner, snacks, lunch, calories, fetchCalories, carbohydrates, protein, fat, getMeals } = useMealsContext();

  useEffect(() => {
    fetchCalories();
    getMeals();
  }, [fetchCalories, getMeals]);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {!breakFast && <Loading />}

      <div className="w-[75vw] p-4 lg:p-8">
        <h1 className="text-4xl pl-12 sm:text-5xl md:text-6xl lg:text-6xl font-inknut-antiqua font-heavy mb-8">
          Today's Meal
        </h1>
        <motion.div
          id="meals"
          className="flex flex-wrap mt-[6vh] gap-4 pl-8 lg:px-0 lg:gap-6 lg:grid lg:grid-cols-4 lg:mb-8" // Added margin-bottom on large screens
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants} className="w-full sm:w-1/2 md:w-1/4 lg:w-full">
            <MealCard meals={mealType.breakfast} foods={breakFast} />
          </motion.div>
          <motion.div variants={cardVariants} className="w-full sm:w-1/2 md:w-1/4 lg:w-full">
            <MealCard meals={mealType.lunch} foods={lunch} />
          </motion.div>
          <motion.div variants={cardVariants} className="w-full sm:w-1/2 md:w-1/4 lg:w-full">
            <MealCard meals={mealType.snacks} foods={snacks} />
          </motion.div>
          <motion.div variants={cardVariants} className="w-full sm:w-1/2 md:w-1/4 lg:w-full">
            <MealCard meals={mealType.dinner} foods={dinner} />
          </motion.div>
        </motion.div>
      </div>

      <div className="w-[75vw] p-4 lg:p-8 flex flex-col lg:flex-row gap-4 lg:gap-8 lg:justify-between lg:items-start">
        {/* Added flex-row for large screens and gap between sections */}
        <motion.div variants={cardVariants} className="flex flex-col space-y-4 w-full lg:w-1/2">
          <div className="font-bold text-lg sm:text-xl pl-8 text-left sm:text-center lg:text-left">
            <div className="flex">
              <p className="text-blue-800 mb-2">Calories consumed today:</p>
              <p className="text-black">{(calories ?? 0).toFixed(0)}</p>
            </div>
          </div>
          <div className="font-bold text-lg sm:text-xl pl-8 text-left sm:text-center lg:text-left">
            <div className="flex w-[35vw]">
              <p className="text-blue-800 mb-2">Carbohydrates consumed today:</p>
              <p className="text-black">{(carbohydrates ?? 0).toFixed(2)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="flex flex-col space-y-4 w-full lg:w-1/2">
          <div className="font-bold text-lg sm:text-xl pl-8 text-left sm:text-center lg:text-left">
            <div className="flex">
              <p className="text-blue-800 mb-2">Protein consumed today:</p>
              <p className="text-black">{(protein ?? 0).toFixed(2)}</p>
            </div>
          </div>
          <div className="font-bold text-lg sm:text-xl pl-8 text-left sm:text-center lg:text-left">
            <div className="flex">
              <p className="text-blue-800 mb-2">Fat consumed today:</p>
              <p className="text-black">{(fat ?? 0).toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Meals;
