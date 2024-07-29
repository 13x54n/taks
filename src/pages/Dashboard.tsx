// src/components/Dashboard.js
import Button from "@/components/Button";
import CardBoxClient from "@/components/CardBox/Client";
import { sampleChartData } from "@/components/ChartLineSample/config";
import SectionTitleLineWithButton from "@/components/Section/TitleLineWithButton";
import StatisticCard from "@/components/StasticsCard";
import CardBoxTransaction from "@/components/Transaction";
import { useSampleClients, useSampleTransactions } from "@/hooks/sampleData";
import { useState } from "react";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiMonitorCellphone,
  mdiReload,
} from "@mdi/js";
import CardBox from "@/components/CardBox/Index";
import ChartLineSample from "@/components/ChartLineSample";
import TableSampleClients from "@/components/Table/SampleClients";

type Transaction = {
  id: number;
  amount: number;
  account: string;
  name: string;
  date: string;
  type: TransactionType;
  business: string;
};

type Client = {
  id: number;
  avatar: string;
  login: string;
  name: string;
  company: string;
  city: string;
  progress: number;
  created: string;
  created_mm_dd_yyyy: string;
};

const Dashboard = () => {
  const disputeStats = [
    { title: "Open Disputes", value: 125 },
    { title: "Closed Disputes", value: 450 },
  ];

  const jurorStats = [
    { title: "Available Jurors", value: 30 },
    { title: "Currently Working Jurors", value: 20 },
  ];

  const { clients } = useSampleClients();
  console.log(clients);
  const { transactions } = useSampleTransactions();
  console.log(transactions);

  const clientsListed = clients.slice(0, 4);

  const [chartData, setChartData] = useState(sampleChartData());

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault();

    setChartData(sampleChartData());
  };

  return (
    <div className="mx-auto max-w-7xl p-8 m-8 lg:px-8">
      <h5 className="mb-4 font-bold text-xl text-primary">Dashboard</h5>
      <div className=" bg-green-50 rounded-2xl">
        <div className="w-full flex justify-center items-center gap-4 ">
          {disputeStats.map((stat, index) => (
            <StatisticCard key={index} title={stat.title} value={stat.value} />
          ))}
          {jurorStats.map((stat, index) => (
            <StatisticCard key={index} title={stat.title} value={stat.value} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col justify-between">
          {transactions.map((transaction: Transaction) => (
            <CardBoxTransaction
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </div>
        <div className="flex flex-col justify-between">
          {clientsListed.map((client: Client) => (
            <CardBoxClient key={client.id} client={client} />
          ))}
        </div>
      </div>
      <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
        <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
      </SectionTitleLineWithButton>

      <CardBox className="mb-6">
        {chartData && <ChartLineSample data={chartData} />}
      </CardBox>

      <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />

      <CardBox hasTable>
        <TableSampleClients />
      </CardBox>
    </div>

    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4 text-primary">Dashboard</h1>
    // </div>
  );
};

export default Dashboard;
