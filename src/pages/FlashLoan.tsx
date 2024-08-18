import React from "react";

import Gauge, { GaugeProps } from "@/components/Gauge";
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { getJobData, getLoan } from "@/api/JobTreasury";

type FuelLevelGaugeProps = Pick<GaugeProps, "value">;

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
  const handleRequestLoan = async () => {
    const data = await getJobData("project");
    console.log(data)
  }
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                2534 # Build a Flash Loan
              </th>
              <td className="px-6 py-4">5,748 USD</td>
              <td className="px-6 py-4">0x6a68...8dff</td>
              <td className="px-6 py-4">
                <button className="bg-gray-200 px-1" onClick={() => handleRequestLoan()}>💵 Request</button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                854 # Job Portal on MERN Stack
              </th>
              <td className="px-6 py-4">12 USD</td>
              <td className="px-6 py-4">0x6a68...8dff</td>
              <td className="px-6 py-4">
                <button className="bg-gray-200 px-1">💵 Request</button>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                9887 # ZeroNet Configuration on Ubuntu
              </th>
              <td className="px-6 py-4">1,234.09 USD</td>
              <td className="px-6 py-4">0x6a68...8dff</td>
              <td className="px-6 py-4">
                <button className="bg-gray-200 px-1">💵 Request</button>
              </td>
            </tr>
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
