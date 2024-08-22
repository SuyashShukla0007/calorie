// @ts-ignore
import React, { useState } from 'react'
import convert from 'convert'
const Bmi = () => {
  const [Height, setHeight] = useState<number>()
  const [Weight, setWeight] = useState<number>()
  const [bmi, setBmi] = useState<number>()

  function getBmi() {
    // @ts-ignore
    const h = convert(Height, "cm").to("m")
    // @ts-ignore
    setBmi(Weight / (h * h))
  }

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight"
    if (bmi < 24.9) return "Normal weight"
    if (bmi < 29.9) return "Overweight"
    return "Obese"
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-indigo-600">BMI Calculator</h1>
      <div className="mb-4">
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          Height (cm)
        </label>
        <input
          type="number"
          id="height"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={e => setHeight(Number(e.target.value))}
          value={Height}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={e => setWeight(Number(e.target.value))}
          value={Weight}
        />
      </div>
      <div className="mt-6">
        <button
          type="button"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={getBmi}
        >
          Calculate BMI
        </button>
        {bmi && (
          <>
            <p className="text-center text-xl font-semibold mt-4 text-gray-700">
              Your BMI: {bmi.toFixed(2)} ({getBmiCategory(bmi)})
            </p>
            <div className="mt-4 relative w-full bg-gray-200 rounded">
             
            </div>
            
          </>
        )}
      </div>
    </div>
  )
}

export default Bmi

// write backend api such that health tips are provided according to weight