import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="mx-auto max-w-7xl p-8 m-8 lg:px-8">
      <div>
        <div className='flex items-center justify-center p-8 m-8 lg:px-8'>
          <h1 className='text-3xl font-semibold'>
            <span className='text-primary text-4xl pr-1'>Decentralized</span>
            Digital Justice Platform
          </h1>
        </div>

        <div className="border border-indigo-600 border-slate-100 mt-8 mx-auto rounded-md text-center grid grid-cols-4 divide-x">
          <div className="p-4">
            <h2 className="text-2xl font-medium pb-4">$890,000</h2>
            <p className="text-xl">Assets</p>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-medium pb-4">10K+</h2>
            <p className="text-xl">Proposal</p>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-medium pb-4">10K+</h2>
            <p className="text-xl">Proposal</p>
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-medium pb-4">20K+</h2>
            <p className="text-xl">Members</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Link to="/disputes">
            <button className="px-6 py-2 font-semibold text-white bg-black border border-black rounded-md hover:bg-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-black">
              Check Disputes
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="px-6 py-2 font-semibold text-white bg-black border border-black rounded-md hover:bg-gray-800 hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-black">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
