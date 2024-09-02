import React, { useState } from 'react';
import { mealType } from '../types/type';
import axios from 'axios';
import { z } from 'zod';
import { useMealsContext } from '../../api/context api/meals';
const foodOptions = {
  Sweet: [
    "Gulab Jamun", "Jalebi", "Rasgulla", "Barfi", "Kaju Katli", "Ladoo", "Peda", "Ras Malai", "Chum Chum",
    "Kalakand", "Sooji Halwa", "Gajar Ka Halwa", "Mysore Pak", "Jangri", "Kheer", "Sandesh", "Mishti Doi",
    "Basundi", "Kesar Peda", "Ghevar", "Tiranga Barfi"
  ],
  Dish: [
    "Butter Chicken", "Paneer Tikka", "Biryani", "Dal Makhani", "Samosa", "Palak Paneer", "Chole Bhature",
    "Aloo Gobi", "Rogan Josh", "Tandoori Chicken", "Pani Puri", "Dosa", "Idli", "Vada Pav", "Pulao",
    "Bhindi Masala", "Kadhi Pakora", "Aloo Paratha", "Rajma", "Kachori", "Pesarattu", "Gutti Vankaya",
    "Methi Thepla", "Pav Bhaji", "Khichdi", "Vegetable Korma"
  ],
  Fruit: [
    "Apple", "Banana", "Mango", "Guava", "Papaya", "Orange", "Pineapple", "Grapes", "Pomegranate",
    "Chikoo", "Custard Apple", "Lychee", "Starfruit", "Apricot", "Jackfruit", "Dragon Fruit", "Peach",
    "Avocado", "Date"
  ],
  Beverages: [
    "Masala Chai", "Lassi", "Thandai", "Buttermilk", "Jaljeera", "Chaas", "Nimbu Pani", "Kokum Sherbet",
    "Rooibos Tea", "Rose Milk", "Chai Latte", "Masala Lemonade", "Aam Panna", "Basil Seed Drink",
    "Sattu Sharbat", "Kesar Milk", "Sharbat-e-Tukhm-e-Meloni"
  ]
};

type prop = {
  mealType: mealType;
  close: () => void;
};

const FoodEntryOverlay: React.FC<prop> = (props) => {
  const {fetchCalories}=useMealsContext()
  const [foodType, setFoodType] = useState('');
  const [food, setFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const schema = z.object({
    food: z.string().min(1, { message: 'Food is required' }),
    meal: z.string().min(1, { message: 'Meal is required' }),
    type: z.string().min(1, { message: 'Type is required' }),
    quantity: z.string().min(1, { message: 'Quantity is required' }),
  });

  const handleClose = () => {
    props.close();
  };

 

  const handleSubmit = async () => {
    const validationResult = schema.safeParse({
      food,
      meal: props.mealType,
      type: foodType,
      quantity,
    });

    if (!validationResult.success) {
      const fieldErrors: { [key: string]: string } = {};
      validationResult.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      fetchCalories()
      handleClose();
      const token=localStorage.getItem('auth')

      await axios.post(' https://backend-ten-neon-56.vercel.app/api/meal', {
        food,
        meal: props.mealType,
        type: foodType,
        quantity,
      },
    { 
      headers:{'Authorization':`bearer ${token}`}
      ,
      withCredentials: true}
    );
    
    } catch (error) {
      console.error('Error adding food:', error);
    }
    
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50'>
      <div className='w-[30vw] h-[50vh] bg-white p-4 rounded shadow-lg'>
        <h1 className='text-center text-4xl font-bold mb-6'>{props.mealType}</h1>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Food Type</label>
          <select
            value={foodType}
            onChange={(e) => {
              setFoodType(e.target.value);
              setFood(''); // Reset food selection
              setErrors({});
            }}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
          >
            <option value=''>Select Food Type</option>
            <option value='Sweet'>Sweet</option>
            <option value='Dish'>Dish</option>
            <option value='Fruit'>Fruit</option>
            <option value='Beverages'>Beverages</option>
          </select>
          {errors.type && <p className='text-red-500 text-xs'>{errors.type}</p>}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Food</label>
          <select
            value={food}
            onChange={(e) => {
              setFood(e.target.value);
              setErrors({});
            }}
            disabled={!foodType}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
          >
            <option value=''>Select Food</option>
            {foodOptions[foodType as keyof typeof foodOptions]?.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
          {errors.food && <p className='text-red-500 text-xs'>{errors.food}</p>}
        </div>
       

        <div className='mb-4 flex items-center'>
  <label htmlFor="quantityInput" className='block text-sm font-medium text-gray-700 mb-1 flex-col'>
    Quantity
    <input
      value={quantity}
      type='text'
      onChange={(e) => {
        setQuantity(e.target.value);
        setErrors({});
      }}
      className='block border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
    />
  </label>
         
  <select
    value={quantity.split(' ')[1] || ''}
    onChange={(e) => {
      setQuantity(quantity.split(' ')[0] + " " + e.target.value);
      setErrors({});
    }}
    className='block ml-5 mt-4 px-4 h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
  >
    <option value=''> select</option>
    {["cup","bowl","piece","ml"].map((num) => (
      <option key={num} value={num}>{num}</option>
    ))}
  </select>
  {errors.quantity && <p className='text-red-500 text-xs'>{errors.quantity}</p>}
</div>


        <div className='flex justify-between'>
          <button onClick={handleSubmit} className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none'>
            Submit
          </button>

          <button onClick={props.close} className='ml-4 w-20 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodEntryOverlay;
