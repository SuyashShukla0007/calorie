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
  height:number;
  weight:number;
}

const BarChart = () => {
  const [userData, setUserData] = useState<User | null>(null);

  const { fetchCalories } = useMealsContext();

  const [dataset, setData] = useState<data[]>([]);

const [avgProtein,setProtein]=useState(0)

const [avgCalorie,setCalorie]=useState(0)

const [avgFat,setFat]=useState(0)
const [avgCarb,setCarb]=useState(0)
const [length,setLength]=useState(0)
const addElements = (arr: number[]): number => {
  return arr.reduce((sum, element) => sum + element, 0);
};
const calAverage=()=>{
  const totalProtein = addElements(dataset.map(item => item.totalProtein));
  const totalCarb = addElements(dataset.map(item => item.totalCarbohydrates));
  const totalFat = addElements(dataset.map(item => item.totalFat));
  const totalCalories = addElements(dataset.map(item => item.totalCalories));
console.log(totalProtein)
console.log(totalCarb)
console.log(totalFat)
console.log(totalCalories)
  
console.log(dataset.length)

  setLength(dataset.length)
  setProtein(totalProtein/length);
  setCalorie(totalCalories/length);

  setCarb(totalCarb/length);
  setFat(totalFat/length);

}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token=localStorage.getItem('auth');
        const res = await axios.get(' https://calorie-2.onrender.com/api/user',{ 
          headers:{'Authorization':`Bearer ${token}`},
          withCredentials: true});
        setUserData(res.data.user);
        console.log(res.data.user);

      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
    calAverage();
  }, [window.location.href]);

  useEffect(() => {
    const fetch = async () => {
      setData(await fetchCalories());
    };
    fetch();
  }, []);

  

  if (!dataset) {
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
    return (<>
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
      <div className="absolute h-[40vh] w-[40vw] rounded-xl top-[52vh] bg-black ">
        <Line
          className="h-96 w-40vw]"
          data={{
            labels: dataset.map((data) => data.date.substring(5)),
            datasets: [
              {
                label: "Calories Intake",
                data: dataset.map((data) => data.totalCalories),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
            ],
          }}
          options={{
            scales: {
              x: {
                ticks: {
                  color: "white", // Change x-axis tick font color
                  font: {
                    weight: "bolder",
                    size: 16,
                  },
                },
                grid: {
                  display: true, // Ensure grid lines are displayed
                  color: "rgba(255, 255, 255,.4)", // Set grid line color (light for visibility)
                },
              },
              y: {
                ticks: {
                  color: "white", // Change y-axis tick font color
                  font: {
                    weight: "bolder",
                    size: 16,
                  },
                },
                grid: {
                  display: true, // Ensure grid lines are displayed
                  color: "rgba(255, 255, 255, 0.4)", // Set grid line color (light for visibility)
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
                color: "white", // Ensure the title is visible
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
  
}


export default BarChart;
