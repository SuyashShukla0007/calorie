import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SuccessAlert from '../components/accessories/SuccessAlert';
import BarChart from '../components/Chart/Bar';
import DoughnutChart from '../components/Chart/Doughnut';
//@ts-ignore
import { Navigate } from 'react-router-dom';

interface User {
  firstname: string;
  lastname: string;
  email: string;
}

const Calorie: React.FC = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
        <h1 className='text-4xl font-bold'>Hi, {userData?.firstname} </h1>
      ) : (
        <p>Loading...</p>
      )}
      <div className='h-[40vh] w-[50vw] px-10 ml-[2vw] mt-12 bg-black rounded-xl'>
        <BarChart />
      </div>
      <DoughnutChart />
    </div>
  );
};

export default Calorie;
