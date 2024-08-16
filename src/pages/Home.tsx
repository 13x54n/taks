import { useState, useEffect } from "react";
import TaksCard from "@/components/TaksCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/jobs");
        const data = await response.json();
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
      <div className="flex items-start w-full gap-4">
        <div className="flex-1">
          {/* @section Search Container */}
          <div className="flex items-center gap-2 border-b-2 pb-1">
            <p>🔍</p>
            <input
              type="text"
              className="focus:outline-none w-full"
              placeholder="Search for tasks best suited for you..."
            />
          </div>

          <h1 className="text-md font-semibold text-gray-600 my-3">Tasks for you</h1>

          <Tabs defaultValue="best_matches">
            <TabsList>
              <TabsTrigger value="best_matches">Best Matches</TabsTrigger>
              <TabsTrigger value="most_recent">Most Recent</TabsTrigger>
              <TabsTrigger value="saved_tasks">Saved Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="best_matches">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <TaksCard
                    key={job.id}
                    jobId={job.id} // Make sure `job.id` is defined
                    title={job.title}
                    description={job.description}
                    creator={job.employer}
                    proposals="Less than 5"
                    timePosted={job.created_at}
                    tokenStake={job.salary}
                    transactionHash={job.transaction_hash}
                  />
                ))
              ) : (
                <div>No jobs found.</div>
              )}
            </TabsContent>
            <TabsContent value="most_recent">Most Recent will be listed here.</TabsContent>
            <TabsContent value="saved_tasks">Saved tasks.</TabsContent>
          </Tabs>
        </div>
        <div className="max-w-[12vw] focus:ring-0 focus:border-none">
          <div className="text-sm p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[100%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
            <p>Connect your wallet to see your task bid power and start delegating.</p>
            <button className="w-full bg-[#7ED956] font-medium text-white py-2 mt-3">
              Connect Wallet
            </button>
          </div>

          <div className="flex items-start text-sm bg-gray-50 p-4 mt-4 justify-between">
            <div className="">
              <p>Delegates</p>
              <h1 className="text-xl font-semibold">433.12K</h1>
            </div>
            <div className="text-center">
              <p>All Tasks</p>
              <h1 className="text-xl font-semibold">88</h1>
            </div>
            <div className="">
              <p>Treasury</p>
              <h1 className="text-xl font-semibold">$2.29B</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
