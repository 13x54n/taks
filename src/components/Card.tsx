export default function Card({ status, numOfCases }) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {status}
        </h5>
      </div>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {numOfCases}
      </p>
    </div>
  );
}
