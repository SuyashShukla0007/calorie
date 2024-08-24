import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SuccessAlert from '../components/accessories/SuccessAlert';
import BarChart from '../components/Chart/Bar';
import DoughnutChart from '../components/Chart/Doughnut';
//@ts-ignore
import { Navigate } from 'react-router-dom';
import {motion} from 'framer-motion'
interface User {
  firstname: string;
  lastname: string;
  email: string;
}




const Calorie: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

 

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token=localStorage.getItem('auth');
        const res = await axios.get(' https://calorie-2.onrender.com/api/user',{ 
          headers:{'Authorization':`Bearer ${token}`},
          withCredentials: true});
        setUserData(res.data.user);
        console.log(res.data.user);

        const userKey = `${res.data.user.email}_alertShown`;
        const alertShown = localStorage.getItem(userKey);

        if (!alertShown) {
          setShowSuccessAlert(true);
          localStorage.setItem(userKey, 'true');
        }
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [window.location.href]);

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => setShowSuccessAlert(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  return (
<div> 
      {showSuccessAlert && <SuccessAlert />}
      {userData ? (
        <motion.div variants={cardVariants}>
        <h1 className='text-4xl font-bold'>Hi, {userData?.firstname} </h1>
        </motion.div>
      ) : (
        <p>Loading...</p>
      )}
      
      <div className='h-[40vh] w-[30vw] px-10 ml-[2vw] mt-12 bg-black rounded-xl'>
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
