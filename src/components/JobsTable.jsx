import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobsTable = ({ jobs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold font-nunito text-gray-500 uppercase tracking-wider">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold font-nunito text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold font-nunito text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold font-nunito text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold font-nunito text-gray-500 uppercase tracking-wider">
              Candidates
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold font-nunito text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentItems.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-bold font-nunito text-amber-700">
                  {job.title}
                </div>
                <div className="text-xs text-gray-500">{job.type}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {job.department}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {job.location}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    job.status === "Published"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {job.totalCandidates}
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  to={`/jobs/${job.id}`}
                  className="text-button hover:text-primary font-medium text-sm"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, jobs.length)} of {jobs.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsTable;
