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
  const todayData:any = dataset?.find((data) => data.date.startsWith(today)) || {};

  // Combine all data into a single dataset for the Doughnut chart
  const chartData = {
    labels: ['Protein', 'Carbohydrates', 'Total Fat'],
    datasets: [
      {
      data: [
  parseFloat((typeof todayData.totalProtein === 'number' ? todayData.totalProtein : 10).toFixed(2)),
  parseFloat((typeof todayData.totalCarbohydrates === 'number' ? todayData.totalCarbohydrates : 10).toFixed(2)),
  parseFloat((typeof todayData.totalFat === 'number' ? todayData.totalFat : 10).toFixed(2)),
],
        backgroundColor: [
          "#fc0303", // Protein color
          "#0388fc", // Carbohydrates color
          "#ecfc03", // Total Fat color
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
    <div className="h-80  w-[30vw] ">

      {!dataset?((<p>Loading...</p>)):((<Doughnut data={chartData} options={chartOptions} />))}
      
    </div>
  );
};

export default DoughnutChart;
