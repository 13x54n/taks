import { useState, useEffect } from "react";
import { useRole } from "@/context/RoleContext";
import JobCreationForm from "@/components/JobCreationForm";
import EmployeeDashboard from "./EmployeeDashboard";
import JudiciaryDashboard from "./JudiciaryDashboard"; 
import { motion } from "framer-motion";
import { address } from "@/utils/ViemConfig";
import { addJob } from "@/api/JobTreasury";

interface Application {
  application_id: string;
  job_id: string;
  applicant: string;
  resume_id: string;
  timestamp: number;
  cover_letter: string | null;
  hired: boolean;
  job_title: string;
}

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const { role, setRole } = useRole();
  const [activeTab, setActiveTab] = useState("Jobs");
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const _address = await address();
        setWalletAddress(_address)

        if (role === "Employer") {
          fetchJobs(_address);
          fetchApplications(_address);
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  // Fetch jobs for the employer
  const fetchJobs = async (e:any) => {
    try {
      setLoadingJobs(true);
      const response = await fetch(
        `http://localhost:3001/api/employer-jobs?employerWalletAddress=${e}`
      );
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  // Fetch applications for the employer
  const fetchApplications = async (e:any) => {
    try {
      setLoadingApplications(true);
      const response = await fetch(
        `http://localhost:3001/api/employer-applications?employerWalletAddress=${e}`
      );
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleHire = async (jobId: string, applicant: string) => {
    // call addJob from API
    try {
      const job = await fetch(
        `http://localhost:3001/api/get-job?job_id=${jobId}`
      );
      const data = await job.json();
        await addJob(data[0], applicant);

      const response = await fetch(`http://localhost:3001/api/hire-applicant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId, applicant }),
      });

      if (response.ok) {
        const updatedApplication = await response.json();
        alert("Applicant hired successfully");

        // Update the applications state to reflect the hired status
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application.application_id ===
            updatedApplication.application.application_id
              ? { ...application, hired: true }
              : application
          )
        );
      } else {
        alert("Failed to hire applicant");
      }
    } catch (error) {
      console.error("Error hiring applicant:", error);
      alert("An error occurred while hiring the applicant");
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    } else {
      console.warn("No role found in local storage");
    }
  }, [setRole]);

  const handleJobCreated = () => {
    setShowJobForm(false);
    fetchJobs(walletAddress);
    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide the toast after 3 seconds
  };

  if (role === "Employee") {
    return <EmployeeDashboard />;
  }

  if (role === "Judiciary") {
    return <JudiciaryDashboard />;
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-8 text-gray-800 mt-20">Dashboard</h1>

      {role === "Employer" && (
        <div className="mb-8">
          <motion.p
            className="text-2xl font-semibold mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Welcome, Employer
          </motion.p>
          <motion.button
            onClick={() => setShowJobForm(!showJobForm)}
            className="text-black font-bold py-3 px-6 rounded-lg hover:bg-black-600 transition duration-200 border"
            whileHover={{ scale: 1.05 }}
          >
            {showJobForm ? "Hide Job Form" : "Create Job"}
          </motion.button>

          {showJobForm && (
            <motion.div
              className="mt-6"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <JobCreationForm onJobCreated={handleJobCreated} />
            </motion.div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-4 border-b pb-2">
          <motion.button
            onClick={() => setActiveTab("Jobs")}
            className={`${
              activeTab === "Jobs"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Jobs
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("Applications")}
            className={`${
              activeTab === "Applications"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Applications
          </motion.button>
        </div>
      </div>

      {/* Jobs Tab */}
      {activeTab === "Jobs" && (
        <div>
          {loadingJobs ? (
            <div>Loading...</div>
          ) : jobs.length > 0 ? (
            jobs.map((job: any) => (
              <motion.div
                key={job.job_id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p>{job.description}</p>
                <p>Payment: {job.payment}</p>
                <p>Posted by: {job.employer}</p>
                <p>Transaction Hash: {job.transaction_hash}</p>
                <p className="font-semibold mt-4">
                  Applications: {job.application_count}
                </p>
              </motion.div>
            ))
          ) : (
            <div>No jobs available</div>
          )}
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === "Applications" && (
        <div>
          {loadingApplications ? (
            <div>Loading...</div>
          ) : applications.length > 0 ? (
            applications.map((application: any) => (
              <motion.div
                key={application.application_id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold">{application.job_title}</h2>
                <p>Applicant: {application.applicant}</p>
                <p>
                  Cover Letter:{" "}
                  {application.cover_letter || "No cover letter provided"}
                </p>
                {application.resume_id && (
                  <p>
                    Resume:{" "}
                    <a
                      href={`https://gateway.lighthouse.storage/ipfs/${application.resume_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View Resume
                    </a>
                  </p>
                )}
                {!application.hired && (
                  <button
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-green-700"
                    onClick={() =>
                      handleHire(application.job_id, application.applicant)
                    }
                  >
                    {application.hired ? "Hired" : "Hire"}
                  </button>
                )}
                {application.hired && (
                  <div>
                    <p className="text-green-600 font-bold mt-4">
                    This applicant has been hired
                  </p>
                  <button className="bg-gray-700 text-white px-2 rounded-sm mt-3">Release Funds</button>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div>No applications available</div>
          )}
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-md shadow-md animate-bounce">
          Transaction completed in the Chain
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
