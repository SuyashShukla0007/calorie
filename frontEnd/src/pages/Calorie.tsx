import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarChart from '../components/Chart/Bar';
import DoughnutChart from '../components/Chart/Doughnut';
import { motion } from 'framer-motion';
import Loading from '../components/accessories/Loading';
import { useMealsContext } from '../api/context api/meals';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  height: number;
  weight: number;
}

interface Data {
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFat: number;
  date: string;
}

const Calorie: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const { fetchCalories } = useMealsContext();

  const [userData, setUserData] = useState<User | null>(null);
  const [avgProtein, setProtein] = useState(0);
  const [avgCalorie, setCalorie] = useState(0);
  const [avgFat, setFat] = useState(0);
  const [avgCarb, setCarb] = useState(0);
  const [dataset, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  const addElements = (arr: number[]): number =>
    arr.reduce((sum, element) => sum + element, 0);

  const calAverage = () => {
    if (dataset.length > 0) {
      const totalProtein = addElements(dataset?.map(item => item.totalProtein));
      const totalCarb = addElements(dataset?.map(item => item.totalCarbohydrates));
      const totalFat = addElements(dataset?.map(item => item.totalFat));
      const totalCalories = addElements(dataset?.map(item => item.totalCalories));

      setProtein(parseFloat((totalProtein / dataset?.length).toFixed(2)));
      setCalorie(parseFloat((totalCalories / dataset?.length).toFixed(0)));
      setCarb(parseFloat((totalCarb / dataset?.length).toFixed(2)));
      setFat(parseFloat((totalFat / dataset?.length).toFixed(2)));
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const fetchedData = await fetchCalories();
      setData(fetchedData);
    };
    fetch();
  }, [fetchCalories]);

  useEffect(() => {
    calAverage();
  }, [dataset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('auth');
        const res = await axios.get('https://backend-ten-neon-56.vercel.app/api/user', {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true,
        });
        setUserData(res.data.user);
      } catch (err) {
        console.error("error", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500); // Delays loading state by 3 seconds
      }
    };

    fetchData();
  }, []);

 return (
  <>
    {loading && <Loading />}
    {!loading && userData && (
      <div className="relative w-full lg:w-[75vw] p-4 lg:p-8 flex flex-col gap-4 lg:gap-8 overflow-auto lg:overflow-visible">
        <div className="flex flex-col mt-[5vh] lg:flex-row lg:flex-wrap gap-4 lg:gap-8 w-full">
          
          {/* User Information Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[45%] xl:w-[40%] p-4 bg-black rounded-3xl text-white mb-4"
          >
            <h2 className="text-2xl font-bold mb-4">User Information</h2>
            <ul className="space-y-2">
              <li><strong>Name:</strong> {userData.firstname}</li>
              <li><strong>Weight:</strong> {userData.weight}</li>
              <li><strong>Height:</strong> {userData.height}</li>
              <li><strong>Avg Calorie Intake:</strong> {avgCalorie} Cal</li>
              <li><strong>Avg Protein Intake:</strong> {avgProtein}g</li>
              <li><strong>Avg Carbohydrate Intake:</strong> {avgCarb}g</li>
              <li><strong>Avg Fat Intake:</strong> {avgFat}g</li>
            </ul>
          </motion.div>

          {/* Doughnut Chart on the right upper side for lg screens */}
          {avgCalorie > 0 && avgProtein > 0 && avgCarb > 0 && avgFat > 0 && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="w-full lg:w-[50%] xl:w-[45%] p-4 bg-black rounded-3xl text-white lg:h-[35vh] xl:h-[40vh] mb-4"
            >
              <DoughnutChart />
            </motion.div>
          )}

          {/* Bar Chart on the bottom middle for lg screens */}
          {avgCalorie > 0 && avgProtein > 0 && avgCarb > 0 && avgFat > 0 && <BarChart />}
        </div>
      </div>
    )}
  </>
);

};

export default Calorie;
