// @ts-ignore
import React, { useState } from 'react';

const CalorieCalculator = () => {
  const [height, setHeight] = useState<number | undefined>();
  const [currentWeight, setCurrentWeight] = useState<number | undefined>();
  const [desiredWeight, setDesiredWeight] = useState<number | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [sex, setSex] = useState<string>('male');
  const [lifestyle, setLifestyle] = useState<string>('sedentary');
  const [calories, setCalories] = useState<number | undefined>();

  const getCalories = () => {
    if (height && desiredWeight && age) {
      const baseCalories =
        sex === 'male'
          ? 10 * desiredWeight + 6.25 * height - 5 * age + 5
          : 10 * desiredWeight + 6.25 * height - 5 * age - 161;

      const lifestyleFactor = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        super_active: 1.9,
      }[lifestyle];
//@ts-ignore
      setCalories(baseCalories * lifestyleFactor);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-indigo-600">
        Calorie Intake Calculator
      </h1>
      <div className="mb-4">
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          Height (cm)
        </label>
        <input
          type="number"
          id="height"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setHeight(Number(e.target.value))}
          value={height}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="currentWeight" className="block text-sm font-medium text-gray-700">
          Current Weight (kg)
        </label>
        <input
          type="number"
          id="currentWeight"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setCurrentWeight(Number(e.target.value))}
          value={currentWeight}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="desiredWeight" className="block text-sm font-medium text-gray-700">
          Desired Weight (kg)
        </label>
        <input
          type="number"
          id="desiredWeight"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setDesiredWeight(Number(e.target.value))}
          value={desiredWeight}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age (years)
        </label>
        <input
          type="number"
          id="age"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setAge(Number(e.target.value))}
          value={age}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
          Sex
        </label>
        <select
          id="sex"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setSex(e.target.value)}
          value={sex}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700">
          Lifestyle
        </label>
        <select
          id="lifestyle"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setLifestyle(e.target.value)}
          value={lifestyle}
        >
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="lightly_active">Lightly Active (1-3 days/week)</option>
          <option value="moderately_active">Moderately Active (3-5 days/week)</option>
          <option value="very_active">Very Active (6-7 days/week)</option>
          <option value="super_active">Super Active (intense exercise)</option>
        </select>
      </div>
      <div className="mt-6">
        <button
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={getCalories}
        >
          Calculate Calories
        </button>
        {calories && (
          <p className="text-center text-xl font-semibold mt-4 text-gray-700">
            Daily Caloric Intake: {calories.toFixed(2)} kcal
          </p>
        )}
      </div>
    </div>
  );
};

export default CalorieCalculator;
