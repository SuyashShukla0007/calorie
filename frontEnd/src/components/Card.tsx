// @ts-ignore
import React from 'react';
import { Article } from './types/interface'; // Ensure this path is correct
import img from '../assets/Calories_1200x628.jpg'; // Ensure this path is correct

const Card = (props: Article) => {
  return (
    
      <div className="relative h-[340px] w-[240px] text-wrap border-[1px] border-black rounded-md overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mb-10">
        <a href={props.url} className="block">
        <img src={props.urlToImage || img} alt="" className="h-[200px] w-full object-cover" />

        <div className="bg-white p-2">
          <p className="text-gray-900 text-lg font-medium mb-2 ">{props.title}</p>
         
        </div>
        </a>
      </div>
    
  );
}

export default Card;
