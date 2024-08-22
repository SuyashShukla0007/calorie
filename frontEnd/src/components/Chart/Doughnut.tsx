import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useMealsContext } from "../../api/context api/meals";
import { data } from "../../api/context api/meals";
ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { fetchCalories } = useMealsContext();
  const [dataset, setData] = useState<data[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setData(await fetchCalories());
    };
    fetch();
  }, []);
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const todayData:any = dataset.find((data) => data.date.startsWith(today)) || {};

  // Combine all data into a single dataset for the Doughnut chart
  const chartData = {
    labels: ['Protein', 'Carbohydrates', 'Total Fat'],
    datasets: [
      {
        data: [
          todayData.totalProtein || 0,
          todayData.totalCarbohydrates || 0,
          todayData.totalFat || 0,
        ],
        backgroundColor: [
          "#FF6384", // Protein color
          "#36A2EB", // Carbohydrates color
          "#FFCE56", // Total Fat color
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true, // Enable legend if you want to display labels
      },
      tooltip: {
        callbacks: {
          // @ts-ignore
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="h-96 mt-4 w-[40vw] ml-[10vw]">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default DoughnutChart;
