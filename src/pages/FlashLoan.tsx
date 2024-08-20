import React, { useEffect, useState } from "react";

import Gauge, { GaugeProps } from "@/components/Gauge";
import { getLoan } from "@/api/JobTreasury";
// import { getJobData, getLoan } from "@/api/JobTreasury";
import MockFlashEnabledJobs from "@/mocks/FlashEnabledJobs.json";
import { ethers } from "ethers";

type FuelLevelGaugeProps = Pick<GaugeProps, "value">;

interface Job {
  _id: string;
  title: string;
  flashLoanAmount: number;
  totalAmount: number;
  isLoanTaken: boolean;
  employee: string; // Single employee address
  assignedTo: string;
}

interface JobProps {
  job: Job; // Single job object
}
const JobTableCell: React.FC<JobProps> = ({ job }) => {
  return (
    <td className="px-6 py-4">
      {job.employee.slice(0, 5)}
      {job.employee.length > 5 && '...'}
      {job.employee.length > 5 && job.employee.slice(-5)}
      {" ➡️ "}
      {job.assignedTo.slice(0, 5)}
      {job.assignedTo.length > 5 && '...'}
      {job.assignedTo.length > 5 && job.assignedTo.slice(-5)}
    </td>
  );
};

const FuelLevelGauge: React.FC<FuelLevelGaugeProps> = ({ value }) => {
  const options: Omit<GaugeProps, "value"> = {
    alertLow: 10,
    colors: {
      reverse: true,
      colorStops: {
        0: [45, 90, 180, 270, 315, 360],
        10: [0, 60, 180, 270, 315, 360],
        50: [0, 0, 0, 90, 180, 315],
        100: [0, 0, 0, 45, 180, 315],
      },
    },
    icon: "💯",
    min: 0,
    max: 100,
    minLabel: "0",
    maxLabel: "900",
    type: "fuelLevel",
    valueSuffix: "",
    label: "",
  };
  return <Gauge {...options} value={value} />;
};

export default function FlashLoan() {
  const [flashEnabledJobs, setFlashEnabledJobs] = useState<any>([]);

  useEffect(() => {
    setFlashEnabledJobs(MockFlashEnabledJobs);
  }, []);

  const handleRequestLoan = async (e: string) => {
    // const data = await getJobData("project");
    // console.log(data);
    await getLoan(e);
  };

  return (
    <div className="container max-w-7xl mx-auto flex mt-8">
      <div className="text-sm flex flex-col items-center min-w-[22vw]">
        <h1 className="text-lg mb-3 font-medium">Credit Report</h1>
        <FuelLevelGauge value={20} />
        <div className="mt-4">
          <div className="flex gap-6">
            <div>
              <p className="text-gray-400">Claimable Amount</p>
              <p className="font-medium text-xl">4,562 USD</p>
            </div>
            <div>
              <p className="text-gray-400">Balance</p>
              <p className="font-medium text-xl">0 USD</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center mt-4">
            <button className="bg-[#0001] px-1 rounded w-full py-2">
              💵 Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto w-full">
        <p className="mb-3 text-sm text-white pl-4 bg-primary">
          Flash Loans Enabled taks.
        </p>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Taks Title
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Employee
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {flashEnabledJobs.map((job: object, index: any) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {job?.title}
                  </th>
                  <td className="px-6 py-4">
                    {ethers.formatUnits(BigInt(job?.flashLoanAmount), 18)}/
                    {ethers.formatUnits(BigInt(job.totalAmount), 18)} ETH
                  </td>
                  <JobTableCell job={job}/>

                  <td className="px-6 py-4">
                    <div className={job?.isLoanTaken ? "bg-[red] text-[white]": "bg-[green] text-[white] text-center"}>
                    {job?.isLoanTaken ? "Unavailable" : "Available"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-gray-200 px-1"
                      onClick={() => handleRequestLoan(job?._id)}
                    >
                      💵 Request
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px mt-4 text-sm">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
