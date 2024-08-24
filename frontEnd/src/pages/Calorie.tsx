import React, { useEffect, useState } from 'react';
import BarChart from '../components/Chart/Bar';
import DoughnutChart from '../components/Chart/Doughnut';
//@ts-ignore
import { Navigate } from 'react-router-dom';
import {motion} from 'framer-motion'




const Calorie: React.FC = () => {

 

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },

  };

 



  return (
<div> 
      
      <div className='h-[40vh] w-[30vw] px-10 ml-[2vw] mt-10 bg-black rounded-xl'>
      <motion.div variants={cardVariants}>
        <BarChart />
        </motion.div>
      </div>
      
      
      <div className='top-[6vh] absolute right-[10vw] rounded-3xl bg-black h-[45vh] w-[25vw] flex items-center justify-center'>
      <motion.div variants={cardVariants}>
      <DoughnutChart />
      </motion.div>
      </div>
      
    
      </div>

  );
};

export default Calorie;
