// @ts-ignore
import React, { useState } from 'react';

const IdealWeight = () => {
  const [height, setHeight] = useState<number>();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [lifestyle, setLifestyle] = useState<'sedentary' | 'active' | 'very active'>('sedentary');
  const [idealWeight, setIdealWeight] = useState<number>();
  const [tips, setTips] = useState<string>('');

  const getBaseWeight = () => (gender === 'male' ? 50 : 45.5);
  const getLifestyleFactor = () => (lifestyle === 'sedentary' ? 1.0 : lifestyle === 'active' ? 1.1 : 1.2);

  const calculateIdealWeight = async () => {
    if (height) {
      const weight = getBaseWeight() + 0.9 * (height - 152.4) * getLifestyleFactor();
      setIdealWeight(weight);

      // Fetch health tips based on weight
      const response = await fetch('  https://calorie-2.onrender.com/api/health-tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight })
      });

      const data = await response.json();
      setTips(data.tips);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-indigo-600">Ideal Weight Calculator</h1>
      <div className="mb-4">
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          Height (cm)
        </label>
        <input
          type="number"
          id="height"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={e => setHeight(Number(e.target.value))}
          value={height}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          id="gender"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={e => setGender(e.target.value as 'male' | 'female')}
          value={gender}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="lifestyle" className="block text-sm font-medium text-gray-700">Lifestyle</label>
        <select
          id="lifestyle"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={e => setLifestyle(e.target.value as 'sedentary' | 'active' | 'very active')}
          value={lifestyle}
        >
          <option value="sedentary">Sedentary</option>
          <option value="active">Active</option>
          <option value="very active">Very Active</option>
        </select>
      </div>
      <div className="mt-6">
        <button
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={calculateIdealWeight}
        >
          Calculate Ideal Weight
        </button>
        {idealWeight && (
          <>
            <p className="text-center text-xl font-semibold mt-4 text-gray-700">
              Your Ideal Weight: {idealWeight.toFixed(2)} kg
            </p>
            {tips && (
              <p className="text-center text-lg mt-2 text-green-600">
                Health Tips: {tips}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IdealWeight;
