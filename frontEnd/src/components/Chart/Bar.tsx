// @ts-ignore
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useMealsContext } from "../../api/context api/meals";
import { useEffect, useState } from "react";

defaults.responsive = true;

interface Data {
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFat: number;
  date: string;
}

const BarChart = () => {
  const { fetchCalories } = useMealsContext();
  const [dataset, setData] = useState<Data[]>([]);





  useEffect(() => {
    const fetch = async () => {
      const fetchedData = await fetchCalories();
      setData(fetchedData);
    };
    fetch();
  }, [fetchCalories]);

 

  return (
    <div className="absolute left-[3vw] h-[40vh] w-[40vw] rounded-xl top-[58vh] bg-black">
      <Line
        className="h-96 w-[40vw]"
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
  );
};

export default BarChart;
