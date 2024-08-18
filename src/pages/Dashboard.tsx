import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { useWallet } from "../context/WalletContext";
import JobCreationForm from "@/components/JobCreationForm";
import RewardCard from "@/components/RewardCard";
import { Link } from "react-router-dom";
import DashCard from "@/components/DashCard";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Dashboard = () => {
  const { role, walletAddress } = useWallet();
  console.log("role", role);
  const [activeTab, setActiveTab] = useState("Jobs");
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/employer-jobs?employerWalletAddress=${walletAddress}`
        );
        const data = await response.json();
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoadingJobs(false);
      }
    };

    if (role === "Employer") {
      fetchJobs();
    }
  }, [walletAddress, role]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/employer-applications?employerWalletAddress=${walletAddress}`
        );
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoadingApplications(false);
      }
    };

    if (role === "Employer") {
      fetchApplications();
    }
  }, [walletAddress, role]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold mb-8 text-">Dashboard</h1>

      {role === "Employer" && (
        <div className="mb-8">
          <button
            onClick={() => setShowJobForm(!showJobForm)}
            className="bg-gray-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-200 border"
          >
            {showJobForm ? "Hide Job Form" : "Create Job"}
          </button>

          {showJobForm && (
            <div className="mt-6">
              <JobCreationForm onJobCreated={() => setShowJobForm(false)} />
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b pb-2">
          <button
            onClick={() => setActiveTab("Jobs")}
            className={`${
              activeTab === "Jobs"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Jobs
          </button>
          <button
            onClick={() => setActiveTab("Applications")}
            className={`${
              activeTab === "Applications"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
          >
            Applications
          </button>
        </div>
      </div>

      {activeTab === "Jobs" && (
        <div>
          {loadingJobs ? (
            <div>Loading...</div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
              >
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p>{job.description}</p>
                <p>Location: {job.location}</p>
                <p>Salary: {job.salary}</p>
                <p>Posted by: {job.employer}</p>
                <p>Transaction Hash: {job.transaction_hash}</p>
                <p className="font-semibold mt-4">
                  Applications: {job.application_count}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "Applications" && (
        <div>
          {loadingApplications ? (
            <div>Loading...</div>
          ) : (
            applications.map((application) => (
              <div
                key={application.id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
              >
                <h2 className="text-xl font-bold">{application.job_title}</h2>
                <p>Applicant: {application.employee_wallet_address}</p>
                <p>Cover Letter: {application.cover_letter}</p>
                {application.resume_link && (
                  <p>
                    Resume:{" "}
                    <a
                      href={application.resume_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View Resume
                    </a>
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Pie Chart */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Overview</h2>
        <Link
          to=""
          className="flex text-right items-center gap-2 w-full justify-end text-green-700 hover:underline"
        >
          <span>Court on Chain</span>
          <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
        </Link>
        <div className="mt-2">
          <RewardCard />
        </div>
        <div className="mt-2">
          <div className="flex justify-center gap-8 mb-4">
            <DashCard
              title="Jobs"
              icon={<BriefcaseIcon aria-hidden="true" className="h-4 w-4" />}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span>Job Actives</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span>Job Applied</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between">
                  <span>Closed</span>
                  <span>0</span>
                </div>
              </div>
            </DashCard>

            <DashCard
              title="Applied jobs"
              icon={<BriefcaseIcon aria-hidden="true" className="h-4 w-4" />}
            >
              <div className="flex flex-col space-y-2">
                <p>You have not applied any jobs</p>
              </div>
            </DashCard>
          </div>

          <DashCard
            title="Notifications"
            icon={<BriefcaseIcon aria-hidden="true" className="h-4 w-4" />}
          >
            <p>You have no notifications</p>
          </DashCard>
        </div>
        {/* <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
          <Pie
            data={{
              labels: ['Jobs Posted', 'Applications Received'],
              datasets: [
                {
                  data: [jobs.length, jobs.reduce((acc, job) => acc + job.application_count, 0)],
                  backgroundColor: ['#36A2EB', '#FF6384'],
                  hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                },
              ],
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
