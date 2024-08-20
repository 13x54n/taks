import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Case {
  case_id: string;
  title: string;
  status: "Vote Pending" | "Active" | "Closed";
  category: string;
  outcome: "Resolved" | "Unresolved";
  date_created: string;
  date_voting_started: string | null;
  date_closed: string | null;
  juror_count: number;
  votes: object;
  is_current_user_juror: boolean;
  current_user_decision: string;
  expiry_time: string;
}

interface CaseStatusBarChartProps {
  cases: Case[];
}

const CaseStatusBarChart: React.FC<CaseStatusBarChartProps> = ({ cases }) => {
  // Count the occurrences of each status
  const statusCounts = cases.reduce(
    (acc, curr) => {
      acc[curr.status] += 1;
      return acc;
    },
    {
      "Vote Pending": 0,
      Active: 0,
      Closed: 0,
    }
  );

  const data = {
    labels: ["Vote Pending", "Active", "Closed"],
    datasets: [
      {
        label: "Number of Cases",
        data: [
          statusCounts["Vote Pending"],
          statusCounts["Active"],
          statusCounts["Closed"],
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default CaseStatusBarChart;
