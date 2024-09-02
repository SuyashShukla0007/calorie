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
    <div className="relative p-4 lg:p-8 flex flex-col lg:flex-row gap-4 lg:gap-8">
      <div className="h-[40vh] w-full lg:w-[30vw] px-4 lg:px-10 bg-black rounded-xl">
        <motion.div variants={cardVariants} className="h-full flex items-center justify-center">
          <BarChart />
        </motion.div>
      </div>

      <div className="h-[45vh] w-full lg:w-[25vw] bg-black rounded-3xl flex items-center justify-center lg:absolute lg:right-[10vw] lg:top-[6vh]">
        <motion.div variants={cardVariants} className="h-full flex items-center justify-center">
          <DoughnutChart />
        </motion.div>
      </div>
    </div>
  );
};

export default Calorie;
