// @ts-ignore
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { data } from "../../api/context api/meals";
import { useMealsContext } from "../../api/context api/meals";
import { useEffect, useState } from "react";

defaults.responsive = true;

const BarChart = () => {
  const { fetchCalories } = useMealsContext();

  const [dataset, setData] = useState<data[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setData(await fetchCalories());
    };
    fetch();
  }, []);

  console.log(dataset);

  return (
    <Line
      className="h-96 w-[60vw]"
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
  );
};

export default BarChart;
