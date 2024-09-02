import React from 'react';
import BarChart from '../components/Chart/Bar';
import DoughnutChart from '../components/Chart/Doughnut';
import { motion } from 'framer-motion';

const Calorie: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative p-4 lg:p-8 flex flex-col gap-4 lg:gap-8">
      <div className="w-full lg:w-[45vw] xl:w-[40vw] 2xl:w-[35vw] px-4 lg:px-6 xl:px-8 bg-black rounded-xl h-[40vh] lg:h-[45vh] xl:h-[50vh] flex items-center justify-center">
        <motion.div variants={cardVariants} className="w-full h-full flex items-center justify-center">
          <BarChart />
        </motion.div>
      </div>

      <div className="w-full lg:w-[45vw] xl:w-[40vw] 2xl:w-[35vw] px-4 lg:px-6 xl:px-8 bg-black rounded-3xl h-[45vh] lg:h-[50vh] xl:h-[55vh] flex items-center justify-center">
        <motion.div variants={cardVariants} className="w-full h-full flex items-center justify-center">
          <DoughnutChart />
        </motion.div>
      </div>
    </div>
  );
};

export default Calorie;
