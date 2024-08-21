import { Link } from "react-router-dom";
import { ArrowRightIcon, BriefcaseIcon, BellIcon } from "@heroicons/react/24/outline";
import RewardCard from "@/components/RewardCard";
import DashCard from "@/components/DashCard";
import CaseBarChart from "@/components/CaseBarChart";
import CasePieChart from "@/components/CasePieChart";
import CaseItem from "@/components/CaseItem";
import { mockCasesData } from "../mock-data";

const JudiciaryDashboard = () => {
  // Calculate the counts for each status
  const statusCounts = mockCasesData.reduce(
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

  return (
    <div className="mt-8 container md:mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Overview</h2>

      <Link
        to="/verification"
        className="flex text-right items-center gap-2 w-full justify-end text-green-700 hover:underline"
      >
        <span>Get Verification</span>
        <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
      </Link>
      <div>
        <DashCard
          title="Cases"
          icon={<BriefcaseIcon aria-hidden="true" className="h-4 w-4" />}
        >
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span>Vote Pending</span>
              <span>{statusCounts["Vote Pending"]}</span>
            </div>
            <div className="flex justify-between">
              <span>Active</span>
              <span>{statusCounts["Active"]}</span>
            </div>
            <div className="flex justify-between">
              <span>Closed</span>
              <span>{statusCounts["Closed"]}</span>
            </div>
          </div>
        </DashCard>
      </div>
      <div className="mt-2">
        <div className="flex justify-center gap-8 mb-4">
          <DashCard
            title="Cases"
            icon={<BriefcaseIcon aria-hidden="true" className="h-4 w-4" />}
          >
            <div className="h-64 flex justify-center items-center">
              <CaseBarChart cases={mockCasesData} />
            </div>
          </DashCard>

          <DashCard title="Case Status">
            <div className="h-64 flex justify-center items-center">
              <CasePieChart cases={mockCasesData} />
            </div>
          </DashCard>
        </div>

        <DashCard
          title="Dispute Cases"
          icon={<BriefcaseIcon aria-hidden="true" className="h-4 w-4" />}
        >
          <div className="flex flex-col space-y-2">
            <CaseItem />
          </div>
        </DashCard>

        <DashCard
          title="Notifications"
          icon={<BellIcon aria-hidden="true" className="h-4 w-4" />}
        >
          <p>You have no notifications</p>
        </DashCard>
      </div>
    </div>
  );
};

export default JudiciaryDashboard;
