// @ts-ignore
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { data } from "../../api/context api/meals";
import { useMealsContext } from "../../api/context api/meals";
import { useEffect, useState } from "react";
import axios from "axios";

defaults.responsive = true;

interface User {
  firstname: string;
  lastname: string;
  email: string;
  height: number;
  weight: number;
}

const BarChart = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { fetchCalories } = useMealsContext();
  const [dataset, setData] = useState<data[]>([]);

  const [avgProtein, setProtein] = useState(0);
  const [avgCalorie, setCalorie] = useState(0);
  const [avgFat, setFat] = useState(0);
  const [avgCarb, setCarb] = useState(0);

  const addElements = (arr: number[]): number => arr.reduce((sum, element) => sum + element, 0);

  const calAverage = () => {
    if (dataset.length > 0) {
      const totalProtein = addElements(dataset.map(item => item.totalProtein));
      const totalCarb = addElements(dataset.map(item => item.totalCarbohydrates));
      const totalFat = addElements(dataset.map(item => item.totalFat));
      const totalCalories = addElements(dataset.map(item => item.totalCalories));

      setProtein(totalProtein / dataset.length);
      setCalorie(totalCalories / dataset.length);
      setCarb(totalCarb / dataset.length);
      setFat(totalFat / dataset.length);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('auth');
        const res = await axios.get('https://calorie-2.onrender.com/api/user', {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true
        });
        setUserData(res.data.user);
      } catch (err) {
        console.error("error", err);
      }
    };

    fetchData();
  }, []);

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

  if (dataset.length === 0) {
    return (
      <div className="text-white p-4">
        <h2 className="text-2xl font-bold mb-4">User Information</h2>
        <ul className="space-y-2">
          <li><strong>Name:</strong> {userData?.firstname}</li>
          <li><strong>Weight:</strong> {userData?.weight}</li>
          <li><strong>Height:</strong> {userData?.height}</li>
          <li><strong>Avg Calorie Intake:</strong> {avgCalorie}</li>
          <li><strong>Avg Protein Intake:</strong> {avgProtein}</li>
          <li><strong>Avg Carbohydrate Intake:</strong> {avgCarb}</li>
          <li><strong>Avg Fat Intake:</strong> {avgFat}</li>
        </ul>
      </div>
    );
  } else {
    return (
      <>
        <div className="text-white p-4">
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <ul className="space-y-2">
            <li><strong>Name:</strong> {userData?.firstname}</li>
            <li><strong>Weight:</strong> {userData?.weight}</li>
            <li><strong>Height:</strong> {userData?.height}</li>
            <li><strong>Avg Calorie Intake:</strong> {avgCalorie}</li>
            <li><strong>Avg Protein Intake:</strong> {avgProtein}</li>
            <li><strong>Avg Carbohydrate Intake:</strong> {avgCarb}</li>
            <li><strong>Avg Fat Intake:</strong> {avgFat}</li>
          </ul>
        </div>
        <div className="absolute h-[40vh] top-[52vh] bg-black">
          <Line
            className="h-96 w-[60vw]"
            data={{
              labels: dataset.map(data => data.date.substring(5)),
              datasets: [
                {
                  label: "Calories Intake",
                  data: dataset.map(data => data.totalCalories),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  ticks: {
                    color: "white",
                    font: {
                      weight: "bolder",
                      size: 16,
                    },
                  },
                  grid: {
                    display: true,
                    color: "rgba(255, 255, 255,.4)",
                  },
                },
                y: {
                  ticks: {
                    color: "white",
                    font: {
                      weight: "bolder",
                      size: 16,
                    },
                  },
                  grid: {
                    display: true,
                    color: "rgba(255, 255, 255, 0.4)",
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: "white",
                    font: {
                      weight: "bolder",
                      size: 14,
                    },
                  },
                },
                title: {
                  display: false,
                  text: "Weekly Calorie Intake",
                  color: "white",
                  font: {
                    size: 20,
                    weight: "bolder",
                  },
                },
              },
            }}
          />
        </div>
      </>
    );
  }
};

export default BarChart;
