import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

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

interface DisputePieChartProps {
  cases: Case[];
}

const DisputePieChart: React.FC<DisputePieChartProps> = ({ cases }) => {
  const statusLabels = ["Resolved", "Unresolved"];
  const statusCounts = statusLabels.map((outcome) => {
    return cases.filter((dispute) => dispute.outcome === outcome).length;
  });

  const data = {
    labels: statusLabels,
    datasets: [
      {
        label: "Case Status",
        data: statusCounts,
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default DisputePieChart;
